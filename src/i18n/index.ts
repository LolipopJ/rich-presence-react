import { RichPresenceType } from "@/constants";

const HEADER_TITLE_EN: Record<RichPresenceType, string> = {
  [RichPresenceType.UNKNOWN]: "Doing",
  [RichPresenceType.PLAYING]: "Playing",
  [RichPresenceType.STREAMING]: "Streaming",
  [RichPresenceType.LISTENING]: "Listening to",
  [RichPresenceType.WATCHING]: "Watching",
  [RichPresenceType.CUSTOM]: "Doing",
  [RichPresenceType.COMPETING]: "Competing in",
};

const HEADER_TITLE_ZH: Record<RichPresenceType, string> = {
  [RichPresenceType.UNKNOWN]: "正在",
  [RichPresenceType.PLAYING]: "正在玩",
  [RichPresenceType.STREAMING]: "正在播",
  [RichPresenceType.LISTENING]: "正在听",
  [RichPresenceType.WATCHING]: "正在看",
  [RichPresenceType.CUSTOM]: "正在",
  [RichPresenceType.COMPETING]: "正在竞赛",
};

export const i18n = {
  en: {
    headerTitle: HEADER_TITLE_EN,
  },
  zh: {
    headerTitle: HEADER_TITLE_ZH,
  },
};

export default i18n;
