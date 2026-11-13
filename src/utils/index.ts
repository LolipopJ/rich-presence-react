import type { RichPresenceEmoji } from "@/RichPresence";

const MEDIA_PROXY_PREFIXES = ["mp:external/", "mp:attachments/"] as const;

const normalizeIdValue = (value?: string | number | null): string => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? String(value) : "";
  }
  return typeof value === "string" ? value.trim() : "";
};

/**
 * Returns `url` when it uses a safe HTTP(S) scheme, or `undefined` otherwise.
 */
export const getSafeExternalUrl = (url?: string): string | undefined => {
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
  appId?: string | number,
  asset?: string | number,
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
  emoji?: RichPresenceEmoji,
): string | undefined => {
  const id = normalizeIdValue(emoji?.id);
  if (!/^\d+$/.test(id)) {
    return undefined;
  }

  const ext = emoji?.animated ? "gif" : "webp";
  return `https://cdn.discordapp.com/emojis/${id}.${ext}?size=48&quality=lossless`;
};

export const formatDuration = (ms?: number) => {
  if (!ms || ms <= 0) return "00:00";
  const secs = Math.floor(ms / 1000);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};
