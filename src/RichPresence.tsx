import "@/index.scss";

import React, { type ComponentProps, useEffect, useState } from "react";

import Tooltip from "@/components/Tooltip";
import {
  type RichPresenceLocale,
  type RichPresenceStatusDisplayType,
  RichPresenceType,
} from "@/constants";
import i18n from "@/i18n";
import Clock from "@/svgs/clock.svg?react";
import Play from "@/svgs/play.svg?react";
import Stream from "@/svgs/stream.svg?react";
import Team from "@/svgs/team.svg?react";
import Trophy from "@/svgs/trophy.svg?react";
import Watch from "@/svgs/watch.svg?react";
import { formatDuration } from "@/utils";
import {
  type ElapsedIconKind,
  resolveActivityPresentation,
} from "@/utils/presentation";

export interface RichPresenceEmoji {
  id?: string | number | null;
  name?: string | null;
  animated?: boolean | null;
}

export type RichPresenceButton =
  | string
  | {
      label: string;
      url?: string | null;
    };

export interface RichPresenceProps extends ComponentProps<"div"> {
  activity: RichPresenceActivity;
  theme?: "light" | "dark";
  size?: "normal" | "large";
  locale?: RichPresenceLocale;
  fallbackLargeImage?: string | null;
  fallbackSmallImage?: string | null;
}

export interface RichPresenceActivity {
  id?: string | null;
  state?: string | null;
  state_url?: string | null;
  details?: string | null;
  details_url?: string | null;
  timestamps?: {
    start?: number | null;
    end?: number | null;
  } | null;
  assets?: {
    small_text?: string | null;
    small_image?: string | number | null;
    small_url?: string | null;
    large_text?: string | null;
    large_image?: string | number | null;
    large_url?: string | null;
    invite_cover_image?: string | number | null;
  } | null;
  party?: {
    id?: string | null;
    size?: [number, number] | number[] | null;
  } | null;
  type: RichPresenceType | (number & {});
  flags?: number | null;
  name?: string | null;
  url?: string | null;
  sync_id?: string | null;
  platform?: string | null;
  supported_platforms?: string[] | null;
  emoji?: RichPresenceEmoji | null;
  status_display_type?: RichPresenceStatusDisplayType | (number & {}) | null;
  application_id?: string | number | null;
  parent_application_id?: string | number | null;
  igdb_details?: IGDBDetails | null;
  buttons?: RichPresenceButton[] | null;
  secrets?: {
    join?: string | null;
    spectate?: string | null;
  } | null;
  metadata?:
    | {
        button_urls?: (string | null)[] | null;
        [key: string]: unknown;
      }
    | Record<string, unknown>
    | null;
}

export interface IGDBDetails {
  artworks?: string[] | null;
  storyline?: string | null;
  summary?: string | null;
  url?: string | null;
}

const ELAPSED_ICON_MAP: Record<
  ElapsedIconKind,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  play: Play,
  stream: Stream,
  clock: Clock,
  watch: Watch,
  trophy: Trophy,
};

const parseTimestampMs = (value?: number | null): number | undefined => {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return undefined;
  }
  const ms = new Date(value).getTime();
  return Number.isFinite(ms) ? ms : undefined;
};

export const RichPresence = (props: RichPresenceProps) => {
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
  const containerType =
    typeof type === "number" && Number.isFinite(type)
      ? type
      : RichPresenceType.UNKNOWN;

  /** Current timestamp in milliseconds */
  const [now, setNow] = useState<number>(() => Date.now());
  const [failedLargeImageUrl, setFailedLargeImageUrl] = useState<string | null>(
    null,
  );
  const [failedSmallImageUrl, setFailedSmallImageUrl] = useState<string | null>(
    null,
  );
  const [failedEmojiUrl, setFailedEmojiUrl] = useState<string | null>(null);

  const presentation = resolveActivityPresentation(
    activity ?? { type: RichPresenceType.UNKNOWN, name: "" },
    locale,
  );

  const partySize = party?.size;
  const displayPartySize =
    Array.isArray(partySize) &&
    partySize.length >= 2 &&
    typeof partySize[0] === "number" &&
    typeof partySize[1] === "number" &&
    Number.isFinite(partySize[0]) &&
    Number.isFinite(partySize[1])
      ? `${partySize[0]}/${partySize[1]}`
      : undefined;

  //#region Timestamps and duration
  const timestampStart = parseTimestampMs(timestamps?.start);
  const timestampEnd = parseTimestampMs(timestamps?.end);
  const period =
    timestampEnd !== undefined &&
    timestampStart !== undefined &&
    timestampEnd > timestampStart
      ? timestampEnd - timestampStart
      : undefined;
  const isCountdownOnly =
    timestampStart === undefined && timestampEnd !== undefined;
  const elapsedMs =
    timestampStart !== undefined ? Math.max(0, now - timestampStart) : 0;
  const remainingMs = isCountdownOnly ? Math.max(0, timestampEnd - now) : 0;
  const elapsedTimeText = period
    ? elapsedMs > period
      ? formatDuration(period)
      : formatDuration(elapsedMs)
    : formatDuration(elapsedMs);
  const translations = i18n[locale] ?? i18n.zh;
  const countdownTimeText = isCountdownOnly
    ? translations.status.remainingTime(formatDuration(remainingMs))
    : undefined;
  const periodText = formatDuration(period);
  const progressPercent =
    typeof elapsedMs === "number" && typeof period === "number"
      ? Math.round(Math.min(1, Math.max(0, elapsedMs / period)) * 1000) / 10
      : undefined;

  useEffect(() => {
    if (timestampStart !== undefined || timestampEnd !== undefined) {
      const updateNowIntervalId = setInterval(() => setNow(Date.now()), 1000);
      return () => clearInterval(updateNowIntervalId);
    }
  }, [timestampStart, timestampEnd]);
  //#endregion

  if (!activity) {
    console.error(
      "Property `activity` is required to display component <RichPresence />.",
    );
    return null;
  }

  const hasValidLargeImage = Boolean(
    presentation.largeImageUrl &&
    failedLargeImageUrl !== presentation.largeImageUrl,
  );
  const largeImageSrc = hasValidLargeImage
    ? presentation.largeImageUrl
    : fallbackLargeImage || undefined;
  const hasSmallImage =
    assets?.small_image != null &&
    (typeof assets.small_image === "number"
      ? Number.isFinite(assets.small_image)
      : String(assets.small_image).trim() !== "");
  const smallImageSrc =
    presentation.smallImageUrl &&
    failedSmallImageUrl !== presentation.smallImageUrl
      ? presentation.smallImageUrl
      : fallbackSmallImage || undefined;
  const hasValidEmojiImage = Boolean(
    presentation.customEmojiUrl &&
    failedEmojiUrl !== presentation.customEmojiUrl,
  );
  const fallbackEmojiName =
    typeof activity.emoji?.name === "string" &&
    activity.emoji.name.trim().length > 0
      ? activity.emoji.name
      : undefined;
  const emojiFallbackText = !hasValidEmojiImage
    ? (presentation.customEmojiText ?? fallbackEmojiName)
    : undefined;

  const isWideMedia = presentation.mediaAspect === "16:9" && hasValidLargeImage;
  const hasElapsedBadge = !period && timestampStart !== undefined;
  const hasCountdownBadge = !period && isCountdownOnly;
  const displayStatusBadges =
    hasElapsedBadge || hasCountdownBadge || displayPartySize;
  const showTertiaryLine = Boolean(
    presentation.tertiaryText &&
    !(
      displayPartySize && presentation.tertiaryText === presentation.partyState
    ),
  );
  const ElapsedIcon = ELAPSED_ICON_MAP[presentation.elapsedIcon];
  const elapsedModifier =
    presentation.normalizedType === RichPresenceType.STREAMING
      ? " rich-presence-content__status-item--streaming"
      : presentation.normalizedType === RichPresenceType.UNKNOWN
        ? " rich-presence-content__status-item--neutral"
        : "";

  return (
    <div
      className={`rich-presence-container rich-presence-container--theme-${theme} rich-presence-container--size-${size} rich-presence-container--type-${containerType}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {presentation.normalizedType === RichPresenceType.CUSTOM ? (
        // Custom status content
        <div
          className={`rich-presence-custom-status${
            presentation.isEmojiOnlyCustom
              ? " rich-presence-custom-status--emoji-only"
              : ""
          }`}
        >
          <div
            className="rich-presence-custom-status__content"
            title={presentation.customStatusText ?? fallbackEmojiName}
          >
            {hasValidEmojiImage && presentation.customEmojiUrl ? (
              <img
                className="rich-presence-custom-status__emoji-image"
                src={presentation.customEmojiUrl}
                alt={activity.emoji?.name ?? ""}
                onError={() => {
                  if (
                    presentation.customEmojiUrl &&
                    failedEmojiUrl !== presentation.customEmojiUrl
                  ) {
                    setFailedEmojiUrl(presentation.customEmojiUrl);
                  }
                }}
              />
            ) : emojiFallbackText ? (
              <span className="rich-presence-custom-status__emoji">
                {emojiFallbackText}
              </span>
            ) : null}
            {presentation.customStatusText ? (
              <span className="rich-presence-custom-status__text">
                {presentation.customStatusText}
              </span>
            ) : null}
          </div>
        </div>
      ) : (
        // Standard rich presence card
        <>
          <div className="rich-presence-header">
            {presentation.showHeaderStreamIcon ? (
              <Stream className="rich-presence-header__icon" />
            ) : null}
            <span className="rich-presence-header__text">
              {presentation.headerText}
            </span>
          </div>
          <div className="rich-presence-content-wrapper">
            {presentation.showMediaBox ? (
              <div
                className={`rich-presence-image-wrapper${
                  isWideMedia ? " rich-presence-image-wrapper--wide" : ""
                }`}
              >
                <Tooltip text={assets?.large_text}>
                  <img
                    className={`rich-presence-image${
                      isWideMedia ? " rich-presence-image--wide" : ""
                    }`}
                    src={largeImageSrc}
                    alt={assets?.large_text ?? presentation.title ?? ""}
                    onError={() => {
                      if (
                        presentation.largeImageUrl &&
                        failedLargeImageUrl !== presentation.largeImageUrl
                      ) {
                        setFailedLargeImageUrl(presentation.largeImageUrl);
                      }
                    }}
                  />
                </Tooltip>
                {hasSmallImage ? (
                  <div className="rich-presence-image__overlay">
                    <Tooltip text={assets?.small_text}>
                      <img
                        className="rich-presence-image__overlay-image"
                        src={smallImageSrc}
                        alt={assets?.small_text ?? ""}
                        onError={() => {
                          if (
                            presentation.smallImageUrl &&
                            failedSmallImageUrl !== presentation.smallImageUrl
                          ) {
                            setFailedSmallImageUrl(presentation.smallImageUrl);
                          }
                        }}
                      />
                    </Tooltip>
                  </div>
                ) : null}
              </div>
            ) : null}
            <div className="rich-presence-content">
              <div>
                {presentation.title ? (
                  <div
                    className="rich-presence-content__name"
                    title={presentation.title}
                  >
                    {presentation.title}
                  </div>
                ) : null}
                {presentation.subtitle ? (
                  <div
                    className="rich-presence-content__details"
                    title={presentation.subtitle}
                  >
                    {presentation.subtitle}
                  </div>
                ) : null}
                {showTertiaryLine ? (
                  <div
                    className="rich-presence-content__state"
                    title={presentation.tertiaryText}
                  >
                    {presentation.tertiaryText}
                  </div>
                ) : null}
              </div>
              {period ? (
                <div className="rich-presence-content__duration-wrapper">
                  <div className="rich-presence-content__duration-elapsed-time">
                    {elapsedTimeText}
                  </div>
                  <div className="rich-presence-content__duration-progress-wrapper">
                    <div
                      className="rich-presence-content__duration-progress"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="rich-presence-content__duration-period">
                    {periodText}
                  </div>
                </div>
              ) : null}
              {displayStatusBadges ? (
                <div className="rich-presence-content__status">
                  {hasElapsedBadge || hasCountdownBadge ? (
                    <div
                      className={`rich-presence-content__status-item${elapsedModifier}`}
                    >
                      <ElapsedIcon className="rich-presence-content__status-item-icon" />
                      <div className="rich-presence-content__status-item-text">
                        {hasCountdownBadge
                          ? countdownTimeText
                          : elapsedTimeText}
                      </div>
                    </div>
                  ) : null}
                  {displayPartySize ? (
                    <div className="rich-presence-content__status-item rich-presence-content__status-item--secondary">
                      <Team className="rich-presence-content__status-item-icon" />
                      <div className="rich-presence-content__status-item-text">
                        {presentation.partyState
                          ? `${presentation.partyState} ${displayPartySize}`
                          : displayPartySize}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
          {presentation.buttons.length > 0 ? (
            <div className="rich-presence-actions">
              {presentation.buttons.map((button, index) => {
                const buttonClassName = `rich-presence-action-button${
                  button.isPrimary
                    ? " rich-presence-action-button--primary"
                    : ""
                }`;

                if (button.url) {
                  return (
                    <a
                      key={`${button.label}-${index}`}
                      className={buttonClassName}
                      href={button.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      title={button.label}
                    >
                      <span className="rich-presence-action-button__label">
                        {button.label}
                      </span>
                    </a>
                  );
                }

                return (
                  <button
                    key={`${button.label}-${index}`}
                    type="button"
                    className={`${buttonClassName} rich-presence-action-button--static`}
                    title={button.label}
                  >
                    <span className="rich-presence-action-button__label">
                      {button.label}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default RichPresence;
