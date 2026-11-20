(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("react")) : typeof define === "function" && define.amd ? define(["exports", "react"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.RichPresenceReact = {}, global.React));
})(this, (function(exports2, React) {
  "use strict";
  function _interopNamespaceDefault(e) {
    const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
    if (e) {
      for (const k in e) {
        if (k !== "default") {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }
  const React__namespace = /* @__PURE__ */ _interopNamespaceDefault(React);
  const RichPresenceType = {
    UNKNOWN: -1,
    PLAYING: 0,
    STREAMING: 1,
    LISTENING: 2,
    WATCHING: 3,
    CUSTOM: 4,
    COMPETING: 5
  };
  const RichPresenceStatusDisplayType = {
    NAME: 0,
    STATE: 1,
    DETAILS: 2
  };
  const Tooltip = ({ text, children, className = "" }) => {
    const [visible, setVisible] = React.useState(false);
    if (!text) {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
    }
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: `rich-presence-tooltip-anchor ${className}`,
        onMouseEnter: () => setVisible(true),
        onMouseLeave: () => setVisible(false)
      },
      children,
      visible && /* @__PURE__ */ React.createElement("div", { className: "rich-presence-tooltip", role: "tooltip" }, text)
    );
  };
  const HEADER_TITLE_EN = {
    [RichPresenceType.UNKNOWN]: "Doing",
    [RichPresenceType.PLAYING]: "Playing",
    [RichPresenceType.STREAMING]: "Streaming",
    [RichPresenceType.LISTENING]: "Listening to",
    [RichPresenceType.WATCHING]: "Watching",
    [RichPresenceType.CUSTOM]: "Doing",
    [RichPresenceType.COMPETING]: "Competing in"
  };
  const HEADER_TITLE_ZH = {
    [RichPresenceType.UNKNOWN]: "正在",
    [RichPresenceType.PLAYING]: "正在玩",
    [RichPresenceType.STREAMING]: "正在播",
    [RichPresenceType.LISTENING]: "正在听",
    [RichPresenceType.WATCHING]: "正在看",
    [RichPresenceType.CUSTOM]: "正在",
    [RichPresenceType.COMPETING]: "正在竞赛"
  };
  const i18n = {
    en: {
      headerTitle: HEADER_TITLE_EN,
      actions: {
        watchStream: "Watch Stream"
      },
      status: {
        remainingTime: (time) => `${time} left`
      }
    },
    zh: {
      headerTitle: HEADER_TITLE_ZH,
      actions: {
        watchStream: "观看直播"
      },
      status: {
        remainingTime: (time) => `剩余 ${time}`
      }
    }
  };
  const SvgClock = (props) => /* @__PURE__ */ React__namespace.createElement("svg", { "aria-hidden": "true", role: "img", xmlns: "http://www.w3.org/2000/svg", width: 12, height: 12, fill: "none", viewBox: "0 0 24 24", ...props }, /* @__PURE__ */ React__namespace.createElement("path", { fill: "currentColor", fillRule: "evenodd", d: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5a1 1 0 1 0-2 0v5c0 .27.1.52.3.7l3 3a1 1 0 0 0 1.4-1.4L13 11.59V7Z", clipRule: "evenodd" }));
  const SvgPlay = (props) => /* @__PURE__ */ React__namespace.createElement("svg", { "aria-hidden": "true", role: "img", xmlns: "http://www.w3.org/2000/svg", width: 12, height: 12, fill: "none", viewBox: "0 0 24 24", ...props }, /* @__PURE__ */ React__namespace.createElement("path", { fill: "var(--rich-presence-text-color-positive)", fillRule: "evenodd", d: "M20.97 4.06c0 .18.08.35.24.43.55.28.9.82 1.04 1.42.3 1.24.75 3.7.75 7.09v4.91a3.09 3.09 0 0 1-5.85 1.38l-1.76-3.51a1.09 1.09 0 0 0-1.23-.55c-.57.13-1.36.27-2.16.27s-1.6-.14-2.16-.27c-.49-.11-1 .1-1.23.55l-1.76 3.51A3.09 3.09 0 0 1 1 17.91V13c0-3.38.46-5.85.75-7.1.15-.6.49-1.13 1.04-1.4a.47.47 0 0 0 .24-.44c0-.7.48-1.32 1.2-1.47l2.93-.62c.5-.1 1 .06 1.36.4.35.34.78.71 1.28.68a42.4 42.4 0 0 1 4.4 0c.5.03.93-.34 1.28-.69.35-.33.86-.5 1.36-.39l2.94.62c.7.15 1.19.78 1.19 1.47ZM20 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15.5 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM5 7a1 1 0 0 1 2 0v1h1a1 1 0 0 1 0 2H7v1a1 1 0 1 1-2 0v-1H4a1 1 0 1 1 0-2h1V7Z", clipRule: "evenodd" }));
  const SvgStream = (props) => /* @__PURE__ */ React__namespace.createElement("svg", { "aria-hidden": "true", role: "img", xmlns: "http://www.w3.org/2000/svg", width: 12, height: 12, fill: "none", viewBox: "0 0 24 24", ...props }, /* @__PURE__ */ React__namespace.createElement("circle", { cx: 12, cy: 12, r: 2, fill: "currentColor" }), /* @__PURE__ */ React__namespace.createElement("path", { stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", d: "M7.76 7.76a6 6 0 0 0 0 8.48M16.24 7.76a6 6 0 0 1 0 8.48M4.93 4.93a10 10 0 0 0 0 14.14M19.07 4.93a10 10 0 0 1 0 14.14" }));
  const SvgTeam = (props) => /* @__PURE__ */ React__namespace.createElement("svg", { "aria-hidden": "true", role: "img", xmlns: "http://www.w3.org/2000/svg", width: 12, height: 12, fill: "none", viewBox: "0 0 24 24", ...props }, /* @__PURE__ */ React__namespace.createElement("path", { fill: "var(--rich-presence-text-color-secondary)", d: "M14.5 8a3 3 0 1 0-2.7-4.3c-.2.4.06.86.44 1.12a5 5 0 0 1 2.14 3.08c.01.06.06.1.12.1ZM18.44 17.27c.15.43.54.73 1 .73h1.06c.83 0 1.5-.67 1.5-1.5a7.5 7.5 0 0 0-6.5-7.43c-.55-.08-.99.38-1.1.92-.06.3-.15.6-.26.87-.23.58-.05 1.3.47 1.63a9.53 9.53 0 0 1 3.83 4.78ZM12.5 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM2 20.5a7.5 7.5 0 0 1 15 0c0 .83-.67 1.5-1.5 1.5a.2.2 0 0 1-.2-.16c-.2-.96-.56-1.87-.88-2.54-.1-.23-.42-.15-.42.1v2.1a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2.1c0-.25-.31-.33-.42-.1-.32.67-.67 1.58-.88 2.54a.2.2 0 0 1-.2.16A1.5 1.5 0 0 1 2 20.5Z" }));
  const SvgTrophy = (props) => /* @__PURE__ */ React__namespace.createElement("svg", { "aria-hidden": "true", role: "img", xmlns: "http://www.w3.org/2000/svg", width: 12, height: 12, fill: "none", viewBox: "0 0 24 24", ...props }, /* @__PURE__ */ React__namespace.createElement("path", { fill: "currentColor", fillRule: "evenodd", d: "M7 3a1 1 0 0 0-1 1v1H4a2 2 0 0 0-2 2v1.5A4.5 4.5 0 0 0 6.5 13h.17A5.52 5.52 0 0 0 11 15.92V18H8.5a1 1 0 0 0-1 1v2h9v-2a1 1 0 0 0-1-1H13v-2.08A5.52 5.52 0 0 0 17.33 13h.17A4.5 4.5 0 0 0 22 8.5V7a2 2 0 0 0-2-2h-2V4a1 1 0 0 0-1-1H7Zm-1 4H4v1.5A2.5 2.5 0 0 0 6.2 11c-.13-.48-.2-.98-.2-1.5V7Zm12 0v2.5c0 .52-.07 1.02-.2 1.5A2.5 2.5 0 0 0 20 8.5V7h-2Z", clipRule: "evenodd" }));
  const SvgWatch = (props) => /* @__PURE__ */ React__namespace.createElement("svg", { "aria-hidden": "true", role: "img", xmlns: "http://www.w3.org/2000/svg", width: 12, height: 12, fill: "none", viewBox: "0 0 24 24", ...props }, /* @__PURE__ */ React__namespace.createElement("path", { fill: "currentColor", fillRule: "evenodd", d: "M4 4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm6 4.5 6 3-6 3v-6ZM8 21a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Z", clipRule: "evenodd" }));
  const MEDIA_PROXY_PREFIXES = ["mp:external/", "mp:attachments/"];
  const MAX_SAFE_INTEGER_STR = "9007199254740991";
  const isAsciiDigit = (code) => code >= 48 && code <= 57;
  const isUnsafeLargeIntegerDigits = (digits) => digits.length > MAX_SAFE_INTEGER_STR.length || digits.length === MAX_SAFE_INTEGER_STR.length && digits > MAX_SAFE_INTEGER_STR;
  const parseRichPresenceJson = (rawJson) => {
    if (typeof rawJson !== "string") {
      throw new TypeError("Expected rawJson to be a JSON string.");
    }
    const length = rawJson.length;
    const chunks = [];
    let lastIndex = 0;
    let i = 0;
    while (i < length) {
      const code = rawJson.charCodeAt(i);
      if (code === 34) {
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
        if (i < length && (rawJson.charCodeAt(i) === 101 || rawJson.charCodeAt(i) === 69)) {
          hasFractionOrExponent = true;
          i += 1;
          if (i < length && (rawJson.charCodeAt(i) === 43 || rawJson.charCodeAt(i) === 45)) {
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
              `"${rawJson.slice(start, digitsEnd)}"`
            );
            lastIndex = digitsEnd;
          }
        }
        continue;
      }
      i += 1;
    }
    if (chunks.length === 0) {
      return JSON.parse(rawJson);
    }
    chunks.push(rawJson.slice(lastIndex));
    return JSON.parse(chunks.join(""));
  };
  const normalizeIdValue = (value) => {
    if (typeof value === "number") {
      return Number.isFinite(value) ? String(value) : "";
    }
    return typeof value === "string" ? value.trim() : "";
  };
  const getSafeExternalUrl = (url) => {
    if (typeof url !== "string") {
      return void 0;
    }
    const trimmed = url.trim();
    if (!trimmed) {
      return void 0;
    }
    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        return trimmed;
      }
    } catch {
      return void 0;
    }
    return void 0;
  };
  const getDiscordAssetUrl = (appId, asset) => {
    const trimmed = normalizeIdValue(asset);
    if (!trimmed) {
      return void 0;
    }
    if (/^\d+$/.test(trimmed)) {
      const resolvedAppId = normalizeIdValue(appId);
      return resolvedAppId ? `https://cdn.discordapp.com/app-assets/${resolvedAppId}/${trimmed}.png` : void 0;
    }
    for (const prefix of MEDIA_PROXY_PREFIXES) {
      if (trimmed.startsWith(prefix) && trimmed.length > prefix.length) {
        return `https://media.discordapp.net/${trimmed.slice(3)}`;
      }
    }
    if (trimmed.startsWith("spotify:")) {
      const id = trimmed.slice("spotify:".length).trim();
      return id ? `https://i.scdn.co/image/${id}` : void 0;
    }
    if (trimmed.startsWith("youtube:")) {
      const id = trimmed.slice("youtube:".length).trim();
      return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : void 0;
    }
    if (trimmed.startsWith("twitch:")) {
      const rawChannel = trimmed.slice("twitch:".length).trim();
      const channel = rawChannel.startsWith("live_user_") ? rawChannel.slice("live_user_".length) : rawChannel;
      return channel ? `https://static-cdn.jtvnw.net/previews-ttv/live_user_${channel}-320x180.jpg` : void 0;
    }
    if (/^data:image\//i.test(trimmed)) {
      return trimmed;
    }
    return getSafeExternalUrl(trimmed);
  };
  const getDiscordEmojiUrl = (emoji) => {
    const id = normalizeIdValue(emoji?.id);
    if (!/^\d+$/.test(id)) {
      return void 0;
    }
    const ext = emoji?.animated ? "gif" : "webp";
    return `https://cdn.discordapp.com/emojis/${id}.${ext}?size=48&quality=lossless`;
  };
  const formatDuration = (ms) => {
    if (!ms || ms <= 0) return "00:00";
    const secs = Math.floor(ms / 1e3);
    const h = Math.floor(secs / 3600);
    const m = Math.floor(secs % 3600 / 60);
    const s = secs % 60;
    if (h > 0)
      return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };
  const VALID_TYPES = new Set(Object.values(RichPresenceType));
  const ELAPSED_ICON_BY_TYPE = {
    [RichPresenceType.PLAYING]: "play",
    [RichPresenceType.STREAMING]: "stream",
    [RichPresenceType.LISTENING]: "clock",
    [RichPresenceType.WATCHING]: "watch",
    [RichPresenceType.CUSTOM]: "clock",
    [RichPresenceType.COMPETING]: "trophy",
    [RichPresenceType.UNKNOWN]: "clock"
  };
  const nonEmpty = (value) => typeof value === "string" && value.trim().length > 0 ? value : void 0;
  const dedupeTextLines = (lines) => {
    const seen = /* @__PURE__ */ new Set();
    const takeUnique = (value) => {
      if (!value) {
        return void 0;
      }
      const key = value.trim();
      if (!key || seen.has(key)) {
        return void 0;
      }
      seen.add(key);
      return value;
    };
    return {
      title: takeUnique(lines.title),
      subtitle: takeUnique(lines.subtitle),
      tertiaryText: takeUnique(lines.tertiaryText)
    };
  };
  const normalizeRichPresenceType = (type) => typeof type === "number" && VALID_TYPES.has(type) ? type : RichPresenceType.UNKNOWN;
  const pickHeaderSubject = (activity) => {
    const { name, state, details, status_display_type } = activity;
    if (status_display_type === RichPresenceStatusDisplayType.STATE) {
      return nonEmpty(state) ?? nonEmpty(name);
    }
    if (status_display_type === RichPresenceStatusDisplayType.DETAILS) {
      return nonEmpty(details) ?? nonEmpty(name);
    }
    return nonEmpty(name);
  };
  const resolveTitleSubjectLines = (activity) => {
    const name = nonEmpty(activity.name);
    const details = nonEmpty(activity.details);
    const state = nonEmpty(activity.state);
    if (activity.status_display_type === RichPresenceStatusDisplayType.STATE && state) {
      return dedupeTextLines({
        title: state,
        subtitle: details ?? name,
        tertiaryText: details ? name : void 0
      });
    }
    if (activity.status_display_type === RichPresenceStatusDisplayType.DETAILS && details) {
      return dedupeTextLines({
        title: details,
        subtitle: name,
        tertiaryText: state
      });
    }
    return dedupeTextLines({
      title: name ?? details,
      subtitle: name ? details : void 0,
      tertiaryText: state
    });
  };
  const resolveStreamingLines = (activity) => {
    const name = nonEmpty(activity.name);
    const details = nonEmpty(activity.details);
    const state = nonEmpty(activity.state);
    const largeText = nonEmpty(activity.assets?.large_text);
    if (activity.status_display_type === RichPresenceStatusDisplayType.STATE && state) {
      return dedupeTextLines({
        title: state,
        subtitle: details ?? name,
        tertiaryText: details ? largeText ?? name : largeText
      });
    }
    if (activity.status_display_type === RichPresenceStatusDisplayType.DETAILS && details) {
      return dedupeTextLines({
        title: details,
        subtitle: state ?? name,
        tertiaryText: state ? largeText ?? name : largeText
      });
    }
    return dedupeTextLines({
      title: details ?? name,
      subtitle: details ? state ?? name : state,
      tertiaryText: details && state ? largeText ?? name : largeText
    });
  };
  const resolveButtons = (activity, normalizedType, watchStreamLabel) => {
    if (normalizedType === RichPresenceType.CUSTOM) {
      return [];
    }
    const rawButtonUrls = Array.isArray(activity.metadata?.button_urls) ? activity.metadata.button_urls : [];
    const normalizedButtons = [];
    if (Array.isArray(activity.buttons)) {
      for (let i = 0; i < activity.buttons.length; i += 1) {
        const item = activity.buttons[i];
        const rawMetadataUrl = rawButtonUrls[i];
        const metadataUrl = typeof rawMetadataUrl === "string" ? getSafeExternalUrl(rawMetadataUrl) : void 0;
        if (typeof item === "string") {
          const label = nonEmpty(item);
          if (label) {
            normalizedButtons.push({
              label,
              url: metadataUrl
            });
          }
        } else if (item && typeof item === "object") {
          const label = nonEmpty(item.label);
          if (label) {
            normalizedButtons.push({
              label,
              url: item.url == null ? metadataUrl : getSafeExternalUrl(item.url)
            });
          }
        }
      }
    }
    if (normalizedType === RichPresenceType.STREAMING) {
      const streamUrl = getSafeExternalUrl(activity.url);
      if (streamUrl) {
        return [
          { label: watchStreamLabel, url: streamUrl, isPrimary: true },
          ...normalizedButtons
        ].slice(0, 2);
      }
    }
    return normalizedButtons.slice(0, 2);
  };
  const resolveActivityPresentation = (activity, locale = "zh") => {
    const normalizedType = normalizeRichPresenceType(activity.type);
    const translations = i18n[locale] ?? i18n.zh;
    const verb = translations.headerTitle[normalizedType];
    const largeImageUrl = getDiscordAssetUrl(
      activity.application_id,
      activity.assets?.large_image
    );
    const smallImageUrl = getDiscordAssetUrl(
      activity.application_id,
      activity.assets?.small_image
    );
    const isHeaderSubject = normalizedType === RichPresenceType.LISTENING || normalizedType === RichPresenceType.WATCHING;
    const headerSubject = isHeaderSubject ? pickHeaderSubject(activity) : void 0;
    const headerText = headerSubject ? `${verb} ${headerSubject}` : verb;
    const customEmojiUrl = getDiscordEmojiUrl(activity.emoji);
    const customEmojiText = !customEmojiUrl ? nonEmpty(activity.emoji?.name) : void 0;
    const customStatusText = nonEmpty(activity.state);
    const isEmojiOnlyCustom = Boolean(
      (customEmojiUrl || customEmojiText) && !customStatusText
    );
    let lines;
    if (isHeaderSubject) {
      lines = {
        title: nonEmpty(activity.details) ?? nonEmpty(activity.name),
        subtitle: nonEmpty(activity.state),
        tertiaryText: nonEmpty(activity.assets?.large_text)
      };
    } else if (normalizedType === RichPresenceType.STREAMING) {
      lines = resolveStreamingLines(activity);
    } else if (normalizedType === RichPresenceType.CUSTOM) {
      lines = {};
    } else {
      lines = resolveTitleSubjectLines(activity);
    }
    const showMediaBox = normalizedType === RichPresenceType.CUSTOM ? false : normalizedType === RichPresenceType.UNKNOWN ? Boolean(largeImageUrl || smallImageUrl) : true;
    const mediaAspect = normalizedType === RichPresenceType.STREAMING && largeImageUrl ? "16:9" : "1:1";
    return {
      normalizedType,
      headerText,
      showHeaderStreamIcon: normalizedType === RichPresenceType.STREAMING,
      ...lines,
      partyState: nonEmpty(activity.state),
      elapsedIcon: ELAPSED_ICON_BY_TYPE[normalizedType],
      mediaAspect,
      showMediaBox,
      largeImageUrl,
      smallImageUrl,
      buttons: resolveButtons(
        activity,
        normalizedType,
        translations.actions.watchStream
      ),
      customEmojiUrl,
      customEmojiText,
      customStatusText,
      isEmojiOnlyCustom
    };
  };
  const ELAPSED_ICON_MAP = {
    play: SvgPlay,
    stream: SvgStream,
    clock: SvgClock,
    watch: SvgWatch,
    trophy: SvgTrophy
  };
  const parseTimestampMs = (value) => {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      return void 0;
    }
    const ms = new Date(value).getTime();
    return Number.isFinite(ms) ? ms : void 0;
  };
  const RichPresence = (props) => {
    const {
      activity,
      theme = "dark",
      size = "normal",
      locale = "zh",
      fallbackLargeImage = `data:image/svg+xml;utf8,<svg width='100' height='100' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' fill='oklab(0.839398 0.000524133 -0.00559175)' /></svg>`,
      fallbackSmallImage = `data:image/svg+xml;utf8,<svg width='32' height='32' xmlns='http://www.w3.org/2000/svg'><circle cx='16' cy='16' r='16' fill='transparent' /></svg>`,
      className = "",
      ...rest
    } = props;
    const { timestamps, assets, party, type } = activity ?? {};
    const containerType = typeof type === "number" && Number.isFinite(type) ? type : RichPresenceType.UNKNOWN;
    const [now, setNow] = React.useState(() => Date.now());
    const [failedLargeImageUrl, setFailedLargeImageUrl] = React.useState(
      null
    );
    const [failedSmallImageUrl, setFailedSmallImageUrl] = React.useState(
      null
    );
    const [failedEmojiUrl, setFailedEmojiUrl] = React.useState(null);
    const presentation = resolveActivityPresentation(
      activity ?? { type: RichPresenceType.UNKNOWN, name: "" },
      locale
    );
    const partySize = party?.size;
    const displayPartySize = Array.isArray(partySize) && partySize.length >= 2 && typeof partySize[0] === "number" && typeof partySize[1] === "number" && Number.isFinite(partySize[0]) && Number.isFinite(partySize[1]) ? `${partySize[0]}/${partySize[1]}` : void 0;
    const timestampStart = parseTimestampMs(timestamps?.start);
    const timestampEnd = parseTimestampMs(timestamps?.end);
    const period = timestampEnd !== void 0 && timestampStart !== void 0 && timestampEnd > timestampStart ? timestampEnd - timestampStart : void 0;
    const isCountdownOnly = timestampStart === void 0 && timestampEnd !== void 0;
    const elapsedMs = timestampStart !== void 0 ? Math.max(0, now - timestampStart) : 0;
    const remainingMs = isCountdownOnly ? Math.max(0, timestampEnd - now) : 0;
    const elapsedTimeText = period ? elapsedMs > period ? formatDuration(period) : formatDuration(elapsedMs) : formatDuration(elapsedMs);
    const translations = i18n[locale] ?? i18n.zh;
    const countdownTimeText = isCountdownOnly ? translations.status.remainingTime(formatDuration(remainingMs)) : void 0;
    const periodText = formatDuration(period);
    const progressPercent = typeof elapsedMs === "number" && typeof period === "number" ? Math.round(Math.min(1, Math.max(0, elapsedMs / period)) * 1e3) / 10 : void 0;
    React.useEffect(() => {
      if (timestampStart !== void 0 || timestampEnd !== void 0) {
        const updateNowIntervalId = setInterval(() => setNow(Date.now()), 1e3);
        return () => clearInterval(updateNowIntervalId);
      }
    }, [timestampStart, timestampEnd]);
    if (!activity) {
      console.error(
        "Property `activity` is required to display component <RichPresence />."
      );
      return null;
    }
    const hasValidLargeImage = Boolean(
      presentation.largeImageUrl && failedLargeImageUrl !== presentation.largeImageUrl
    );
    const largeImageSrc = hasValidLargeImage ? presentation.largeImageUrl : fallbackLargeImage || void 0;
    const hasSmallImage = assets?.small_image != null && (typeof assets.small_image === "number" ? Number.isFinite(assets.small_image) : String(assets.small_image).trim() !== "");
    const smallImageSrc = presentation.smallImageUrl && failedSmallImageUrl !== presentation.smallImageUrl ? presentation.smallImageUrl : fallbackSmallImage || void 0;
    const hasValidEmojiImage = Boolean(
      presentation.customEmojiUrl && failedEmojiUrl !== presentation.customEmojiUrl
    );
    const fallbackEmojiName = typeof activity.emoji?.name === "string" && activity.emoji.name.trim().length > 0 ? activity.emoji.name : void 0;
    const emojiFallbackText = !hasValidEmojiImage ? presentation.customEmojiText ?? fallbackEmojiName : void 0;
    const isWideMedia = presentation.mediaAspect === "16:9" && hasValidLargeImage;
    const hasElapsedBadge = !period && timestampStart !== void 0;
    const hasCountdownBadge = !period && isCountdownOnly;
    const displayStatusBadges = hasElapsedBadge || hasCountdownBadge || displayPartySize;
    const showTertiaryLine = Boolean(
      presentation.tertiaryText && !(displayPartySize && presentation.tertiaryText === presentation.partyState)
    );
    const ElapsedIcon = ELAPSED_ICON_MAP[presentation.elapsedIcon];
    const elapsedModifier = presentation.normalizedType === RichPresenceType.STREAMING ? " rich-presence-content__status-item--streaming" : presentation.normalizedType === RichPresenceType.UNKNOWN ? " rich-presence-content__status-item--neutral" : "";
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: `rich-presence-container rich-presence-container--theme-${theme} rich-presence-container--size-${size} rich-presence-container--type-${containerType}${className ? ` ${className}` : ""}`,
        ...rest
      },
      presentation.normalizedType === RichPresenceType.CUSTOM ? (
        // Custom status content
        /* @__PURE__ */ React.createElement(
          "div",
          {
            className: `rich-presence-custom-status${presentation.isEmojiOnlyCustom ? " rich-presence-custom-status--emoji-only" : ""}`
          },
          /* @__PURE__ */ React.createElement(
            "div",
            {
              className: "rich-presence-custom-status__content",
              title: presentation.customStatusText ?? fallbackEmojiName
            },
            hasValidEmojiImage && presentation.customEmojiUrl ? /* @__PURE__ */ React.createElement(
              "img",
              {
                className: "rich-presence-custom-status__emoji-image",
                src: presentation.customEmojiUrl,
                alt: activity.emoji?.name ?? "",
                onError: () => {
                  if (presentation.customEmojiUrl && failedEmojiUrl !== presentation.customEmojiUrl) {
                    setFailedEmojiUrl(presentation.customEmojiUrl);
                  }
                }
              }
            ) : emojiFallbackText ? /* @__PURE__ */ React.createElement("span", { className: "rich-presence-custom-status__emoji" }, emojiFallbackText) : null,
            presentation.customStatusText ? /* @__PURE__ */ React.createElement("span", { className: "rich-presence-custom-status__text" }, presentation.customStatusText) : null
          )
        )
      ) : (
        // Standard rich presence card
        /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "rich-presence-header" }, presentation.showHeaderStreamIcon ? /* @__PURE__ */ React.createElement(SvgStream, { className: "rich-presence-header__icon" }) : null, /* @__PURE__ */ React.createElement("span", { className: "rich-presence-header__text" }, presentation.headerText)), /* @__PURE__ */ React.createElement("div", { className: "rich-presence-content-wrapper" }, presentation.showMediaBox ? /* @__PURE__ */ React.createElement(
          "div",
          {
            className: `rich-presence-image-wrapper${isWideMedia ? " rich-presence-image-wrapper--wide" : ""}`
          },
          /* @__PURE__ */ React.createElement(Tooltip, { text: assets?.large_text }, /* @__PURE__ */ React.createElement(
            "img",
            {
              className: `rich-presence-image${isWideMedia ? " rich-presence-image--wide" : ""}`,
              src: largeImageSrc,
              alt: assets?.large_text ?? presentation.title ?? "",
              onError: () => {
                if (presentation.largeImageUrl && failedLargeImageUrl !== presentation.largeImageUrl) {
                  setFailedLargeImageUrl(presentation.largeImageUrl);
                }
              }
            }
          )),
          hasSmallImage ? /* @__PURE__ */ React.createElement("div", { className: "rich-presence-image__overlay" }, /* @__PURE__ */ React.createElement(Tooltip, { text: assets?.small_text }, /* @__PURE__ */ React.createElement(
            "img",
            {
              className: "rich-presence-image__overlay-image",
              src: smallImageSrc,
              alt: assets?.small_text ?? "",
              onError: () => {
                if (presentation.smallImageUrl && failedSmallImageUrl !== presentation.smallImageUrl) {
                  setFailedSmallImageUrl(presentation.smallImageUrl);
                }
              }
            }
          ))) : null
        ) : null, /* @__PURE__ */ React.createElement("div", { className: "rich-presence-content" }, /* @__PURE__ */ React.createElement("div", null, presentation.title ? /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "rich-presence-content__name",
            title: presentation.title
          },
          presentation.title
        ) : null, presentation.subtitle ? /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "rich-presence-content__details",
            title: presentation.subtitle
          },
          presentation.subtitle
        ) : null, showTertiaryLine ? /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "rich-presence-content__state",
            title: presentation.tertiaryText
          },
          presentation.tertiaryText
        ) : null), period ? /* @__PURE__ */ React.createElement("div", { className: "rich-presence-content__duration-wrapper" }, /* @__PURE__ */ React.createElement("div", { className: "rich-presence-content__duration-elapsed-time" }, elapsedTimeText), /* @__PURE__ */ React.createElement("div", { className: "rich-presence-content__duration-progress-wrapper" }, /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "rich-presence-content__duration-progress",
            style: { width: `${progressPercent}%` }
          }
        )), /* @__PURE__ */ React.createElement("div", { className: "rich-presence-content__duration-period" }, periodText)) : null, displayStatusBadges ? /* @__PURE__ */ React.createElement("div", { className: "rich-presence-content__status" }, hasElapsedBadge || hasCountdownBadge ? /* @__PURE__ */ React.createElement(
          "div",
          {
            className: `rich-presence-content__status-item${elapsedModifier}`
          },
          /* @__PURE__ */ React.createElement(ElapsedIcon, { className: "rich-presence-content__status-item-icon" }),
          /* @__PURE__ */ React.createElement("div", { className: "rich-presence-content__status-item-text" }, hasCountdownBadge ? countdownTimeText : elapsedTimeText)
        ) : null, displayPartySize ? /* @__PURE__ */ React.createElement("div", { className: "rich-presence-content__status-item rich-presence-content__status-item--secondary" }, /* @__PURE__ */ React.createElement(SvgTeam, { className: "rich-presence-content__status-item-icon" }), /* @__PURE__ */ React.createElement("div", { className: "rich-presence-content__status-item-text" }, presentation.partyState ? `${presentation.partyState} ${displayPartySize}` : displayPartySize)) : null) : null)), presentation.buttons.length > 0 ? /* @__PURE__ */ React.createElement("div", { className: "rich-presence-actions" }, presentation.buttons.map((button, index) => {
          const buttonClassName = `rich-presence-action-button${button.isPrimary ? " rich-presence-action-button--primary" : ""}`;
          if (button.url) {
            return /* @__PURE__ */ React.createElement(
              "a",
              {
                key: `${button.label}-${index}`,
                className: buttonClassName,
                href: button.url,
                target: "_blank",
                rel: "noreferrer noopener",
                title: button.label
              },
              /* @__PURE__ */ React.createElement("span", { className: "rich-presence-action-button__label" }, button.label)
            );
          }
          return /* @__PURE__ */ React.createElement(
            "button",
            {
              key: `${button.label}-${index}`,
              type: "button",
              className: `${buttonClassName} rich-presence-action-button--static`,
              title: button.label
            },
            /* @__PURE__ */ React.createElement("span", { className: "rich-presence-action-button__label" }, button.label)
          );
        })) : null)
      )
    );
  };
  exports2.RichPresenceStatusDisplayType = RichPresenceStatusDisplayType;
  exports2.RichPresenceType = RichPresenceType;
  exports2.default = RichPresence;
  exports2.parseRichPresenceJson = parseRichPresenceJson;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
}));
