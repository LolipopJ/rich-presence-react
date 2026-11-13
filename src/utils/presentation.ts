import {
  type RichPresenceLocale,
  RichPresenceStatusDisplayType,
  RichPresenceType,
} from "@/constants";
import i18n from "@/i18n";
import type { RichPresenceActivity } from "@/RichPresence";
import {
  getDiscordAssetUrl,
  getDiscordEmojiUrl,
  getSafeExternalUrl,
} from "@/utils";

export type ElapsedIconKind = "play" | "stream" | "clock" | "watch" | "trophy";
export type MediaAspectRatio = "16:9" | "1:1";

export interface ResolvedActionButton {
  label: string;
  url?: string;
  isPrimary?: boolean;
}

export interface ActivityPresentation {
  normalizedType: RichPresenceType;
  headerText: string;
  showHeaderStreamIcon: boolean;
  title?: string;
  subtitle?: string;
  tertiaryText?: string;
  partyState?: string;
  elapsedIcon: ElapsedIconKind;
  mediaAspect: MediaAspectRatio;
  showMediaBox: boolean;
  largeImageUrl?: string;
  smallImageUrl?: string;
  buttons: ResolvedActionButton[];
  customEmojiUrl?: string;
  customEmojiText?: string;
  customStatusText?: string;
  isEmojiOnlyCustom: boolean;
}

const VALID_TYPES = new Set<number>(Object.values(RichPresenceType));

const ELAPSED_ICON_BY_TYPE: Record<RichPresenceType, ElapsedIconKind> = {
  [RichPresenceType.PLAYING]: "play",
  [RichPresenceType.STREAMING]: "stream",
  [RichPresenceType.LISTENING]: "clock",
  [RichPresenceType.WATCHING]: "watch",
  [RichPresenceType.CUSTOM]: "clock",
  [RichPresenceType.COMPETING]: "trophy",
  [RichPresenceType.UNKNOWN]: "clock",
};

const nonEmpty = (value?: string): string | undefined =>
  typeof value === "string" && value.trim().length > 0 ? value : undefined;

export const normalizeRichPresenceType = (type?: number): RichPresenceType =>
  typeof type === "number" && VALID_TYPES.has(type)
    ? (type as RichPresenceType)
    : RichPresenceType.UNKNOWN;

const pickHeaderSubject = (
  activity: RichPresenceActivity,
): string | undefined => {
  const { name, state, details, status_display_type } = activity;

  if (status_display_type === RichPresenceStatusDisplayType.STATE) {
    return nonEmpty(state) ?? nonEmpty(name);
  }

  if (status_display_type === RichPresenceStatusDisplayType.DETAILS) {
    return nonEmpty(details) ?? nonEmpty(name);
  }

  return nonEmpty(name);
};

const resolveTitleSubjectLines = (activity: RichPresenceActivity) => {
  const name = nonEmpty(activity.name);
  const details = nonEmpty(activity.details);
  const state = nonEmpty(activity.state);

  if (
    activity.status_display_type === RichPresenceStatusDisplayType.STATE &&
    state
  ) {
    return {
      title: state,
      subtitle: details ?? name,
      tertiaryText: details ? name : undefined,
    };
  }

  if (
    activity.status_display_type === RichPresenceStatusDisplayType.DETAILS &&
    details
  ) {
    return {
      title: details,
      subtitle: name,
      tertiaryText: state,
    };
  }

  return {
    title: name ?? details,
    subtitle: name ? details : undefined,
    tertiaryText: state,
  };
};

const resolveStreamingLines = (activity: RichPresenceActivity) => {
  const name = nonEmpty(activity.name);
  const details = nonEmpty(activity.details);
  const state = nonEmpty(activity.state);
  const largeText = nonEmpty(activity.assets?.large_text);

  if (
    activity.status_display_type === RichPresenceStatusDisplayType.STATE &&
    state
  ) {
    return {
      title: state,
      subtitle: details ?? name,
      tertiaryText: details ? (largeText ?? name) : largeText,
    };
  }

  if (
    activity.status_display_type === RichPresenceStatusDisplayType.DETAILS &&
    details
  ) {
    return {
      title: details,
      subtitle: state ?? name,
      tertiaryText: state ? (largeText ?? name) : largeText,
    };
  }

  return {
    title: details ?? name,
    subtitle: details ? (state ?? name) : state,
    tertiaryText: details && state ? (largeText ?? name) : largeText,
  };
};

const resolveButtons = (
  activity: RichPresenceActivity,
  normalizedType: RichPresenceType,
  watchStreamLabel: string,
): ResolvedActionButton[] => {
  if (normalizedType === RichPresenceType.CUSTOM) {
    return [];
  }

  const normalizedButtons: ResolvedActionButton[] = [];
  for (const item of activity.buttons ?? []) {
    if (typeof item === "string") {
      const label = nonEmpty(item);
      if (label) {
        normalizedButtons.push({ label });
      }
    } else if (item && typeof item === "object") {
      const label = nonEmpty(item.label);
      if (label) {
        normalizedButtons.push({
          label,
          url: getSafeExternalUrl(item.url),
        });
      }
    }
  }

  if (normalizedType === RichPresenceType.STREAMING) {
    const streamUrl = getSafeExternalUrl(activity.url);
    if (streamUrl) {
      return [
        { label: watchStreamLabel, url: streamUrl, isPrimary: true },
        ...normalizedButtons,
      ].slice(0, 2);
    }
  }

  return normalizedButtons.slice(0, 2);
};

/**
 * Maps a Discord activity payload and locale to a pure card presentation model.
 */
export const resolveActivityPresentation = (
  activity: RichPresenceActivity,
  locale: RichPresenceLocale = "zh",
): ActivityPresentation => {
  const normalizedType = normalizeRichPresenceType(activity.type);
  const translations = i18n[locale] ?? i18n.zh;
  const verb = translations.headerTitle[normalizedType];

  const largeImageUrl = getDiscordAssetUrl(
    activity.application_id,
    activity.assets?.large_image,
  );
  const smallImageUrl = getDiscordAssetUrl(
    activity.application_id,
    activity.assets?.small_image,
  );

  const isHeaderSubject =
    normalizedType === RichPresenceType.LISTENING ||
    normalizedType === RichPresenceType.WATCHING;
  const headerSubject = isHeaderSubject
    ? pickHeaderSubject(activity)
    : undefined;
  const headerText = headerSubject ? `${verb} ${headerSubject}` : verb;

  const customEmojiUrl = getDiscordEmojiUrl(activity.emoji);
  const customEmojiText = !customEmojiUrl
    ? nonEmpty(activity.emoji?.name)
    : undefined;
  const customStatusText = nonEmpty(activity.state);
  const isEmojiOnlyCustom = Boolean(
    (customEmojiUrl || customEmojiText) && !customStatusText,
  );

  let lines: {
    title?: string;
    subtitle?: string;
    tertiaryText?: string;
  };

  if (isHeaderSubject) {
    lines = {
      title: nonEmpty(activity.details) ?? nonEmpty(activity.name),
      subtitle: nonEmpty(activity.state),
      tertiaryText: nonEmpty(activity.assets?.large_text),
    };
  } else if (normalizedType === RichPresenceType.STREAMING) {
    lines = resolveStreamingLines(activity);
  } else if (normalizedType === RichPresenceType.CUSTOM) {
    lines = {};
  } else {
    lines = resolveTitleSubjectLines(activity);
  }

  const showMediaBox =
    normalizedType === RichPresenceType.CUSTOM
      ? false
      : normalizedType === RichPresenceType.UNKNOWN
        ? Boolean(largeImageUrl || smallImageUrl)
        : true;

  const mediaAspect: MediaAspectRatio =
    normalizedType === RichPresenceType.STREAMING && largeImageUrl
      ? "16:9"
      : "1:1";

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
      translations.actions.watchStream,
    ),
    customEmojiUrl,
    customEmojiText,
    customStatusText,
    isEmojiOnlyCustom,
  };
};
