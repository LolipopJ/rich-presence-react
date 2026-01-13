export const RichPresenceType = {
  UNKNOWN: -1,
  PLAYING: 0,
  STREAMING: 1,
  LISTENING: 2,
  WATCHING: 3,
  CUSTOM: 4,
  COMPETING: 5,
};

export type RichPresenceType =
  (typeof RichPresenceType)[keyof typeof RichPresenceType];
