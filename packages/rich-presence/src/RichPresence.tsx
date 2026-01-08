import "./index.scss";

import classnames from "classnames";
import { type ComponentProps, useEffect, useState } from "react";

import { RichPresenceType } from "./enums";
import i18n from "./i18n";
import { formatDuration, getDiscordAssetUrl } from "./utils";

export interface RichPresenceProps extends ComponentProps<"div"> {
  activity: Activity;
  theme?: "light" | "dark";
  size?: "normal" | "large";
}

export interface Activity {
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
  type?: RichPresenceType;
  name?: string;
  application_id: string | number;
}

const RichPresence = (props: RichPresenceProps) => {
  const {
    activity,
    theme = "dark",
    size = "normal",
    className = "",
    ...rest
  } = props;
  const {
    state,
    details,
    timestamps,
    assets,
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
    if (period) {
      const updateNowIntervalId = setInterval(() => setNow(Date.now()), 1000);
      return () => clearInterval(updateNowIntervalId);
    }
  }, [period]);
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
      className={classnames({
        "rich-presence-container": true,
        "rich-presence-container--theme-light": theme === "light",
        "rich-presence-container--theme-dark": theme === "dark",
        "rich-presence-container--size-normal": size === "normal",
        "rich-presence-container--size-large": size === "large",
        [className]: !!className,
      })}
      {...rest}
    >
      <div className="rich-presence-header">{displayHeaderText}</div>
      <div className="rich-presence-content-wrapper">
        <div className="rich-presence-image-wrapper">
          <img
            className="rich-presence-image"
            src={processedAssets?.large_image}
            title={processedAssets?.large_text}
          />
          {processedAssets?.small_image ? (
            <div className="rich-presence-image__overlay">
              <img
                className="rich-presence-image__overlay-image"
                src={processedAssets.small_image}
                title={processedAssets.small_text}
              />
            </div>
          ) : null}
        </div>
        <div className="rich-presence-content">
          <div className="rich-presence-content__name">{displayName}</div>
          <div className="rich-presence-content__details">{displayDetails}</div>
          <div className="rich-presence-content__state">{displayState}</div>
          {timestampStart ? (
            timestampEnd && period ? (
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
              <div className="rich-presence-content__elapsed-time">
                {elapsedTimeText}
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RichPresence;
