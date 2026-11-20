import { ComponentProps } from 'react';
import { default as default_2 } from 'react';

export declare interface IGDBDetails {
    artworks?: string[] | null;
    storyline?: string | null;
    summary?: string | null;
    url?: string | null;
}

/**
 * Parses a raw JSON string while preserving integer values exceeding
 * `Number.MAX_SAFE_INTEGER` (such as 64-bit Discord Snowflakes like `emoji.id`)
 * as strings so precision is not lost.
 */
export declare const parseRichPresenceJson: <T = unknown>(rawJson: string) => T;

declare const RichPresence: (props: RichPresenceProps) => default_2.JSX.Element | null;
export default RichPresence;

export declare interface RichPresenceActivity {
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
    metadata?: {
        button_urls?: (string | null)[] | null;
        [key: string]: unknown;
    } | Record<string, unknown> | null;
}

export declare type RichPresenceButton = string | {
    label: string;
    url?: string | null;
};

export declare interface RichPresenceEmoji {
    id?: string | number | null;
    name?: string | null;
    animated?: boolean | null;
}

export declare type RichPresenceLocale = "zh" | "en";

export declare interface RichPresenceProps extends ComponentProps<"div"> {
    activity: RichPresenceActivity;
    theme?: "light" | "dark";
    size?: "normal" | "large";
    locale?: RichPresenceLocale;
    fallbackLargeImage?: string | null;
    fallbackSmallImage?: string | null;
}

export declare const RichPresenceStatusDisplayType: {
    readonly NAME: 0;
    readonly STATE: 1;
    readonly DETAILS: 2;
};

export declare type RichPresenceStatusDisplayType = (typeof RichPresenceStatusDisplayType)[keyof typeof RichPresenceStatusDisplayType];

export declare const RichPresenceType: {
    readonly UNKNOWN: -1;
    readonly PLAYING: 0;
    readonly STREAMING: 1;
    readonly LISTENING: 2;
    readonly WATCHING: 3;
    readonly CUSTOM: 4;
    readonly COMPETING: 5;
};

export declare type RichPresenceType = (typeof RichPresenceType)[keyof typeof RichPresenceType];

export { }
