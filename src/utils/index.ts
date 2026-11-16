import type { RichPresenceEmoji } from "@/RichPresence";

const MEDIA_PROXY_PREFIXES = ["mp:external/", "mp:attachments/"] as const;
const MAX_SAFE_INTEGER_STR = "9007199254740991";

const isAsciiDigit = (code: number): boolean => code >= 48 && code <= 57;

const isUnsafeLargeIntegerDigits = (digits: string): boolean =>
  digits.length > MAX_SAFE_INTEGER_STR.length ||
  (digits.length === MAX_SAFE_INTEGER_STR.length &&
    digits > MAX_SAFE_INTEGER_STR);

/**
 * Parses a raw JSON string while preserving integer values exceeding
 * `Number.MAX_SAFE_INTEGER` (such as 64-bit Discord Snowflakes like `emoji.id`)
 * as strings so precision is not lost.
 */
export const parseRichPresenceJson = <T = unknown>(rawJson: string): T => {
  if (typeof rawJson !== "string") {
    throw new TypeError("Expected rawJson to be a JSON string.");
  }

  const length = rawJson.length;
  const chunks: string[] = [];
  let lastIndex = 0;
  let i = 0;

  while (i < length) {
    const code = rawJson.charCodeAt(i);

    if (code === 34) {
      // '"' -> copy string literals verbatim so numbers inside strings are untouched.
      i += 1;
      while (i < length) {
        const ch = rawJson.charCodeAt(i);
        if (ch === 92) {
          i += 2;
          continue;
        }
        i += 1;
        if (ch === 34) {
          break;
        }
      }
      continue;
    }

    if (code === 45 || isAsciiDigit(code)) {
      const start = i;
      if (code === 45) {
        i += 1;
      }

      if (i >= length || !isAsciiDigit(rawJson.charCodeAt(i))) {
        continue;
      }

      const digitsStart = i;
      let hasInvalidLeadingZero = false;

      if (rawJson.charCodeAt(i) === 48) {
        i += 1;
        if (i < length && isAsciiDigit(rawJson.charCodeAt(i))) {
          hasInvalidLeadingZero = true;
          while (i < length && isAsciiDigit(rawJson.charCodeAt(i))) {
            i += 1;
          }
        }
      } else {
        while (i < length && isAsciiDigit(rawJson.charCodeAt(i))) {
          i += 1;
        }
      }

      const digitsEnd = i;
      let hasFractionOrExponent = false;

      if (i < length && rawJson.charCodeAt(i) === 46) {
        hasFractionOrExponent = true;
        i += 1;
        while (i < length && isAsciiDigit(rawJson.charCodeAt(i))) {
          i += 1;
        }
      }

      if (
        i < length &&
        (rawJson.charCodeAt(i) === 101 || rawJson.charCodeAt(i) === 69)
      ) {
        hasFractionOrExponent = true;
        i += 1;
        if (
          i < length &&
          (rawJson.charCodeAt(i) === 43 || rawJson.charCodeAt(i) === 45)
        ) {
          i += 1;
        }
        while (i < length && isAsciiDigit(rawJson.charCodeAt(i))) {
          i += 1;
        }
      }

      if (!hasInvalidLeadingZero && !hasFractionOrExponent) {
        const digits = rawJson.slice(digitsStart, digitsEnd);
        if (isUnsafeLargeIntegerDigits(digits)) {
          chunks.push(
            rawJson.slice(lastIndex, start),
            `"${rawJson.slice(start, digitsEnd)}"`,
          );
          lastIndex = digitsEnd;
        }
      }
      continue;
    }

    i += 1;
  }

  if (chunks.length === 0) {
    return JSON.parse(rawJson) as T;
  }

  chunks.push(rawJson.slice(lastIndex));
  return JSON.parse(chunks.join("")) as T;
};

const normalizeIdValue = (value?: string | number | null): string => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? String(value) : "";
  }
  return typeof value === "string" ? value.trim() : "";
};

/**
 * Returns `url` when it uses a safe HTTP(S) scheme, or `undefined` otherwise.
 */
export const getSafeExternalUrl = (url?: string | null): string | undefined => {
  if (typeof url !== "string") {
    return undefined;
  }

  const trimmed = url.trim();
  if (!trimmed) {
    return undefined;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return trimmed;
    }
  } catch {
    return undefined;
  }

  return undefined;
};

/**
 * Resolves a Discord Rich Presence asset identifier or URL to a renderable image URL.
 */
export const getDiscordAssetUrl = (
  appId?: string | number | null,
  asset?: string | number | null,
): string | undefined => {
  const trimmed = normalizeIdValue(asset);
  if (!trimmed) {
    return undefined;
  }

  if (/^\d+$/.test(trimmed)) {
    const resolvedAppId = normalizeIdValue(appId);
    return resolvedAppId
      ? `https://cdn.discordapp.com/app-assets/${resolvedAppId}/${trimmed}.png`
      : undefined;
  }

  for (const prefix of MEDIA_PROXY_PREFIXES) {
    if (trimmed.startsWith(prefix) && trimmed.length > prefix.length) {
      // Discord encodes `mp:external/...` and `mp:attachments/...` relative to media.discordapp.net.
      return `https://media.discordapp.net/${trimmed.slice(3)}`;
    }
  }

  if (trimmed.startsWith("spotify:")) {
    const id = trimmed.slice("spotify:".length).trim();
    return id ? `https://i.scdn.co/image/${id}` : undefined;
  }

  if (trimmed.startsWith("youtube:")) {
    const id = trimmed.slice("youtube:".length).trim();
    return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined;
  }

  if (trimmed.startsWith("twitch:")) {
    const rawChannel = trimmed.slice("twitch:".length).trim();
    const channel = rawChannel.startsWith("live_user_")
      ? rawChannel.slice("live_user_".length)
      : rawChannel;
    return channel
      ? `https://static-cdn.jtvnw.net/previews-ttv/live_user_${channel}-320x180.jpg`
      : undefined;
  }

  if (/^data:image\//i.test(trimmed)) {
    return trimmed;
  }

  return getSafeExternalUrl(trimmed);
};

/**
 * Resolves a custom Discord status emoji to its CDN image URL, returning `undefined` for Unicode emojis.
 */
export const getDiscordEmojiUrl = (
  emoji?: RichPresenceEmoji | null,
): string | undefined => {
  const id = normalizeIdValue(emoji?.id);
  if (!/^\d+$/.test(id)) {
    return undefined;
  }

  const ext = emoji?.animated ? "gif" : "webp";
  return `https://cdn.discordapp.com/emojis/${id}.${ext}?size=48&quality=lossless`;
};

export const formatDuration = (ms?: number | null) => {
  if (!ms || ms <= 0) return "00:00";
  const secs = Math.floor(ms / 1000);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};
