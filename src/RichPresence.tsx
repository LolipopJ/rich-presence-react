import "@/styles/index.scss";

import React, { type ComponentProps, useEffect, useState } from "react";

import { RichPresenceType } from "@/constants";
import i18n from "@/i18n";
import Play from "@/svgs/play.svg?react";
import Team from "@/svgs/team.svg?react";
import { formatDuration, getDiscordAssetUrl } from "@/utils";

export interface RichPresenceProps extends ComponentProps<"div"> {
  activity: RichPresenceActivity;
  theme?: "light" | "dark";
  size?: "normal" | "large";
  fallbackLargeImage?: string;
  fallbackSmallImage?: string;
}

export interface RichPresenceActivity {
  state?: string;
  details?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    small_text?: string;
    small_image?: string | number;
    large_text?: string;
    large_image?: string | number;
  };
  party?: {
    size?: [number, number];
  };
  type: RichPresenceType;
  name: string;
  application_id: string | number;
  igdb_details?: IGDBDetails;
  buttons?: string[];
}

export interface IGDBDetails {
  artworks?: string[];
  storyline?: string;
  summary?: string;
  url?: string;
}

export const RichPresence = (props: RichPresenceProps) => {
  const {
    activity,
    theme = "dark",
    size = "normal",
    fallbackLargeImage = `data:image/svg+xml;utf8,<svg width='100' height='100' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' fill='oklab(0.839398 0.000524133 -0.00559175)' /></svg>`,
    fallbackSmallImage = `data:image/svg+xml;utf8,<svg width='32' height='32' xmlns='http://www.w3.org/2000/svg'><circle cx='16' cy='16' r='16' fill='transparent' /></svg>`,
    className = "",
    ...rest
  } = props;
  const {
    state,
    details,
    timestamps,
    assets,
    party,
    type = RichPresenceType.UNKNOWN,
    name,
    application_id,
  } = activity ?? {};

  /** Current timestamp in milliseconds */
  const [now, setNow] = useState<number>(() => Date.now());

  //#region Display texts
  const displayHeaderText =
    type === RichPresenceType.LISTENING
      ? `${i18n["zh"].headerTitle[type]} ${name}`
      : i18n["zh"].headerTitle[type];
  const displayName = type === RichPresenceType.LISTENING ? details : name;
  const displayDetails = type === RichPresenceType.LISTENING ? state : details;
  const displayState =
    type === RichPresenceType.LISTENING ? assets?.large_text || "" : state;
  const displayPartySize = party?.size
    ? `${party.size[0]} / ${party.size[1]}`
    : undefined;
  //#endregion

  //#region Timestamps and duration
  const timestampStart = timestamps?.start
    ? new Date(timestamps.start).getTime()
    : undefined;
  const timestampEnd = timestamps?.end
    ? new Date(timestamps.end).getTime()
    : undefined;
  const period =
    timestampEnd && timestampStart ? timestampEnd - timestampStart : undefined;
  const elapsedMs = timestampStart ? Math.max(0, now - timestampStart) : 0;
  const elapsedTimeText = period
    ? elapsedMs > period
      ? formatDuration(period)
      : formatDuration(elapsedMs)
    : formatDuration(elapsedMs);
  const periodText = formatDuration(period);
  const progressPercent =
    typeof elapsedMs === "number" && typeof period === "number"
      ? Math.round(Math.min(1, Math.max(0, elapsedMs / period)) * 1000) / 10
      : undefined;

  useEffect(() => {
    if (timestampStart) {
      const updateNowIntervalId = setInterval(() => setNow(Date.now()), 1000);
      return () => clearInterval(updateNowIntervalId);
    }
  }, [timestampStart]);
  //#endregion

  //#region Resolve assets' urls
  const processedAssets = assets
    ? {
        ...assets,
        small_image: getDiscordAssetUrl(application_id, assets.small_image),
        large_image: getDiscordAssetUrl(application_id, assets.large_image),
      }
    : undefined;
  //#endregion

  if (!activity) {
    console.error(
      "Property `activity` is required to display component <RichPresence />.",
    );
    return null;
  }

  return (
    <div
      className={`rich-presence-container rich-presence-container--theme-${theme} rich-presence-container--size-${size} ${className}`}
      {...rest}
    >
      <div className="rich-presence-header">{displayHeaderText}</div>
      <div className="rich-presence-content-wrapper">
        <div className="rich-presence-image-wrapper">
          <img
            className="rich-presence-image"
            src={processedAssets?.large_image}
            title={processedAssets?.large_text}
            onError={(e) => {
              const img = e.currentTarget;
              img.onerror = null;
              img.src = fallbackLargeImage;
            }}
          />
          {processedAssets?.small_image ? (
            <div className="rich-presence-image__overlay">
              <img
                className="rich-presence-image__overlay-image"
                src={processedAssets.small_image}
                title={processedAssets.small_text}
                onError={(e) => {
                  const img = e.currentTarget;
                  img.onerror = null;
                  img.src = fallbackSmallImage;
                }}
              />
            </div>
          ) : null}
        </div>
        <div className="rich-presence-content">
          <div>
            <div className="rich-presence-content__name" title={displayName}>
              {displayName}
            </div>
            <div
              className="rich-presence-content__details"
              title={displayDetails}
            >
              {displayDetails}
            </div>
            <div className="rich-presence-content__state" title={displayState}>
              {displayState}
            </div>
          </div>
          {period ? (
            // With period, display progress bar only
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
          ) : (
            // Without period, display status badges
            <div className="rich-presence-content__status">
              {timestampStart ? (
                <div className="rich-presence-content__status-item">
                  <Play className="rich-presence-content__status-item-icon" />
                  <div className="rich-presence-content__status-item-text">
                    {elapsedTimeText}
                  </div>
                </div>
              ) : null}
              {displayPartySize ? (
                <div className="rich-presence-content__status-item rich-presence-content__status-item--secondary">
                  <Team className="rich-presence-content__status-item-icon" />
                  <div className="rich-presence-content__status-item-text">
                    {displayPartySize}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RichPresence;
