export const RichPresenceType = {
  UNKNOWN: -1,
  PLAYING: 0,
  STREAMING: 1,
  LISTENING: 2,
  WATCHING: 3,
  CUSTOM: 4,
  COMPETING: 5,
} as const;

export type RichPresenceType =
  (typeof RichPresenceType)[keyof typeof RichPresenceType];

export const RichPresenceStatusDisplayType = {
  NAME: 0,
  STATE: 1,
  DETAILS: 2,
} as const;

export type RichPresenceStatusDisplayType =
  (typeof RichPresenceStatusDisplayType)[keyof typeof RichPresenceStatusDisplayType];

export type RichPresenceLocale = "zh" | "en";
