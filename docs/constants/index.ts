import {
  type RichPresenceActivity,
  RichPresenceStatusDisplayType,
  RichPresenceType,
} from "rich-presence-react";

import packageJson from "../../package.json";

export type DemoCategory =
  | "playing"
  | "streaming"
  | "listening"
  | "watching"
  | "custom"
  | "competing"
  | "unknown";

export interface DemoRichPresenceItem {
  id: string;
  category: DemoCategory;
  title: string;
  activity: RichPresenceActivity;
}

const normalizeRepositoryUrl = (rawUrl: string): string => {
  if (!rawUrl) {
    return packageJson.homepage;
  }

  if (rawUrl.startsWith("git@github.com:")) {
    return rawUrl
      .replace("git@github.com:", "https://github.com/")
      .replace(/\.git$/u, "");
  }

  return rawUrl
    .replace(/^git\+/u, "")
    .replace(/^git:\/\//u, "https://")
    .replace(/\.git$/u, "");
};

const rawRepositoryUrl =
  typeof packageJson.repository === "string"
    ? packageJson.repository
    : packageJson.repository.url;

export const DOCS_PACKAGE_NAME = packageJson.name;
export const DOCS_PACKAGE_VERSION = packageJson.version;
export const DOCS_REPOSITORY_URL = normalizeRepositoryUrl(rawRepositoryUrl);

export const HIGHLIGHT_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1";
export const HIGHLIGHT_SCRIPT_ID = "hljs-script-cdn";
export const HIGHLIGHT_STYLE_ID = "hljs-style-cdn";

const svgDataUri = (svg: string): string =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

const STREAM_THUMBNAIL_ART = svgDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#381d6a"/><stop offset="55%" stop-color="#593695"/><stop offset="100%" stop-color="#9147ff"/></linearGradient></defs><rect width="320" height="180" fill="url(#g)"/><circle cx="268" cy="40" r="56" fill="#ffffff" fill-opacity="0.08"/><circle cx="52" cy="150" r="64" fill="#ffffff" fill-opacity="0.06"/><rect x="20" y="20" width="54" height="22" rx="6" fill="#eb0400"/><text x="47" y="35" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#fff">LIVE</text><text x="24" y="112" font-family="monospace" font-size="18" font-weight="700" fill="#fff">&lt;RichPresence /&gt;</text><text x="24" y="138" font-family="sans-serif" font-size="12" fill="#e6dcff">16:9 Stream Preview</text></svg>`,
);

const TWITCH_BADGE_ART = svgDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="32" fill="#9147ff"/><path d="M18 14h28v24l-8 8h-7l-6 6v-6h-7V14Zm6 5v18h6v5l5-5h7l4-4V19H24Z" fill="#fff"/><rect x="31" y="24" width="3" height="9" fill="#fff"/><rect x="39" y="24" width="3" height="9" fill="#fff"/></svg>`,
);

const SPOTIFY_ALBUM_ART = svgDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="s" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#141e30"/><stop offset="100%" stop-color="#5a189a"/></linearGradient></defs><rect width="120" height="120" fill="url(#s)"/><circle cx="60" cy="60" r="34" fill="#ff4d8d" fill-opacity="0.3"/><circle cx="60" cy="60" r="20" fill="#ff9e00" fill-opacity="0.55"/><text x="60" y="104" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#fff">M83 • SYNTH</text></svg>`,
);

const SPOTIFY_BADGE_ART = svgDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#1db954"/><path d="M18 25c10-3 22-2 30 3M20 33c8-2 18-1 25 3M22 40c6-2 14-1 20 2" stroke="#121212" stroke-width="4" stroke-linecap="round" fill="none"/></svg>`,
);

const WATCH_POSTER_ART = svgDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="w" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0f2027"/><stop offset="50%" stop-color="#203a43"/><stop offset="100%" stop-color="#2c5364"/></linearGradient></defs><rect width="120" height="120" fill="url(#w)"/><circle cx="60" cy="48" r="22" fill="#00a1d6" fill-opacity="0.85"/><polygon points="55,39 72,48 55,57" fill="#fff"/><text x="60" y="96" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#e2f1f8">4K CINEMA</text></svg>`,
);

const COMPETING_ARENA_ART = svgDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#991b1b"/><stop offset="100%" stop-color="#dc2626"/></linearGradient></defs><rect width="120" height="120" fill="url(#a)"/><path d="M60 22 88 42 78 82H42L32 42Z" fill="#fff" fill-opacity="0.18"/><path d="M60 32 76 46 70 72H50L44 46Z" fill="#fde047"/><text x="60" y="103" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#fff">FINALS</text></svg>`,
);

const COMPETING_BADGE_ART = svgDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#f59e0b"/><path d="M22 20h20v12a10 10 0 0 1-20 0V20Zm6 22h8v5h-8v-5Zm-4 5h16v4H24v-4Z" fill="#fff"/></svg>`,
);

export const DEMO_CATEGORIES: { id: DemoCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "playing", label: "Playing" },
  { id: "streaming", label: "Streaming" },
  { id: "listening", label: "Listening" },
  { id: "watching", label: "Watching" },
  { id: "custom", label: "Custom" },
  { id: "competing", label: "Competing" },
  { id: "unknown", label: "Unknown" },
];

export const RICH_PRESENCES: DemoRichPresenceItem[] = [
  // Playing (2)
  {
    id: "playing-vscode",
    category: "playing",
    title: "Playing — VS Code (Elapsed + Buttons + status_display_type)",
    activity: {
      state: "Workspace: rich-presence-react",
      details: "Editing RichPresence.tsx",
      timestamps: {
        start: Date.now() - 160000,
      },
      assets: {
        small_text: "Visual Studio Code",
        small_image: "1359299466493956258",
        large_text: "Editing a TSX file",
        large_image: "1359299426262319284",
      },
      type: RichPresenceType.PLAYING,
      name: "Visual Studio Code",
      status_display_type: RichPresenceStatusDisplayType.DETAILS,
      application_id: "383226320970055681",
      buttons: [
        "Open Workspace",
        {
          label: "View on GitHub",
          url: "https://github.com/LolipopJ/rich-presence-react",
        },
      ],
    },
  },
  {
    id: "playing-ffxiv",
    category: "playing",
    title: "Playing — FINAL FANTASY XIV (Party Size)",
    activity: {
      state: "Bahamut",
      details: "法恩娜行星",
      assets: {
        small_text: "CRP Lv 100",
        small_image: "478154717814456320",
        large_text: "法恩娜行星",
        large_image: "614058326266740737",
      },
      party: {
        size: [2, 8],
      },
      type: RichPresenceType.PLAYING,
      name: "FINAL FANTASY XIV",
      application_id: "478143453536976896",
    },
  },

  // Streaming (2)
  {
    id: "streaming-twitch",
    category: "streaming",
    title: "Streaming — Twitch 16:9 + Watch Stream CTA",
    activity: {
      type: RichPresenceType.STREAMING,
      name: "Twitch",
      details: "Building rich-presence-react v1.0",
      state: "Software and Game Development",
      url: "https://www.twitch.tv/twitch",
      timestamps: {
        start: Date.now() - 1840000,
      },
      assets: {
        large_image: STREAM_THUMBNAIL_ART,
        large_text: "Live on Twitch",
        small_image: TWITCH_BADGE_ART,
        small_text: "Twitch",
      },
      buttons: ["Follow Channel"],
    },
  },
  {
    id: "streaming-youtube",
    category: "streaming",
    title: "Streaming — YouTube Live 16:9",
    activity: {
      type: RichPresenceType.STREAMING,
      name: "YouTube",
      details: "TypeScript 组件库多卡片实战直播",
      state: "前端工程化",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      timestamps: {
        start: Date.now() - 920000,
      },
      assets: {
        large_image: "youtube:dQw4w9WgXcQ",
        large_text: "YouTube Live",
      },
    },
  },

  // Listening (2)
  {
    id: "listening-qqmusic",
    category: "listening",
    title: "Listening — QQ Music (Progress Bar + Buttons)",
    activity: {
      state: "🎤 林俊杰​",
      details: "▶️ 浪漫血液​",
      timestamps: {
        start: Date.now(),
        end: Date.now() + 272529,
      },
      assets: {
        small_text: "Tencent QQMusic",
        small_image: "1431733810025988256",
        large_text: "💿 新地球​",
        large_image:
          "mp:external/tUPBcSE-j3TBm5OhcouHYVA_njsl-495PNWbOsGYYzA/%3Fmax_age%3D2592000/https/y.gtimg.cn/music/photo_new/T002R500x500M0000033R2xQ2I0Uyf_3.jpg",
      },
      type: RichPresenceType.LISTENING,
      name: "Tencent QQ Music",
      application_id: "1431607752945434655",
      buttons: ["🎧 Listen", "🔍 View App on GitHub"],
    },
  },
  {
    id: "listening-spotify",
    category: "listening",
    title: "Listening — Spotify (status_display_type: STATE + Start-Only)",
    activity: {
      type: RichPresenceType.LISTENING,
      name: "Spotify",
      details: "Midnight City",
      state: "M83",
      status_display_type: RichPresenceStatusDisplayType.STATE,
      timestamps: {
        start: Date.now() - 135000,
      },
      assets: {
        large_image: SPOTIFY_ALBUM_ART,
        large_text: "Hurry Up, We're Dreaming",
        small_image: SPOTIFY_BADGE_ART,
        small_text: "Spotify",
      },
      buttons: [
        { label: "Listen on Spotify", url: "https://open.spotify.com" },
        "Save Track",
      ],
    },
  },

  // Watching (2)
  {
    id: "watching-youtube",
    category: "watching",
    title: "Watching — YouTube (Progress Bar)",
    activity: {
      type: RichPresenceType.WATCHING,
      name: "YouTube",
      details: "Designing Discord Activity Cards",
      state: "Frontend Craft",
      timestamps: {
        start: Date.now() - 320000,
        end: Date.now() + 900000,
      },
      assets: {
        large_image: "youtube:dQw4w9WgXcQ",
        large_text: "4K • 60fps",
      },
    },
  },
  {
    id: "watching-bilibili",
    category: "watching",
    title: "Watching — Bilibili (Elapsed Timer)",
    activity: {
      type: RichPresenceType.WATCHING,
      name: "哔哩哔哩",
      details: "宇宙探索编辑部",
      state: "电影频道 • 4K",
      timestamps: {
        start: Date.now() - 1250000,
      },
      assets: {
        large_image: WATCH_POSTER_ART,
        large_text: "正片播放中",
      },
    },
  },

  // Custom (2)
  {
    id: "custom-emoji-state",
    category: "custom",
    title: "Custom — Unicode Emoji + State",
    activity: {
      type: RichPresenceType.CUSTOM,
      name: "Custom Status",
      emoji: {
        name: "🎧",
        id: null,
      },
      state: "写代码中，戴着耳机循环播放城市民谣。",
    },
  },
  {
    id: "custom-emoji-only",
    category: "custom",
    title: "Custom — Emoji Only Enlarged",
    activity: {
      type: RichPresenceType.CUSTOM,
      name: "Custom Status",
      emoji: {
        name: "🚀",
        id: null,
      },
    },
  },

  // Competing (2)
  {
    id: "competing-valorant",
    category: "competing",
    title: "Competing — VALORANT Premier (Trophy Timer + Party)",
    activity: {
      type: RichPresenceType.COMPETING,
      name: "VALORANT Premier",
      details: "Playoff Finals • Ascent",
      state: "In Match",
      party: {
        size: [5, 5],
      },
      timestamps: {
        start: Date.now() - 780000,
      },
      assets: {
        large_image: COMPETING_ARENA_ART,
        large_text: "Ascent",
        small_image: COMPETING_BADGE_ART,
        small_text: "Premier",
      },
      buttons: ["View Bracket"],
    },
  },
  {
    id: "competing-clash",
    category: "competing",
    title: "Competing — League Clash (Progress Bar + Party)",
    activity: {
      type: RichPresenceType.COMPETING,
      name: "英雄联盟冠军杯赛",
      details: "决赛 BO3 • 召唤师峡谷",
      state: "五人组队中",
      party: {
        size: [5, 5],
      },
      timestamps: {
        start: Date.now() - 420000,
        end: Date.now() + 1380000,
      },
      assets: {
        large_image: COMPETING_ARENA_ART,
        large_text: "Summoner's Rift",
      },
    },
  },

  // Unknown (2)
  {
    id: "unknown-hang",
    category: "unknown",
    title: "Unknown — Unrecognized Type 6 (Hang Status, No Assets)",
    activity: {
      type: 6,
      name: "Hang Status",
      details: "Chilling in Voice",
      state: "AFK Lounge",
      timestamps: {
        start: Date.now() - 540000,
      },
    },
  },
  {
    id: "unknown-fallback",
    category: "unknown",
    title: "Unknown — Fallback Type -1 (No Assets)",
    activity: {
      type: RichPresenceType.UNKNOWN,
      name: "未知活动",
      details: "无图片资产降级示例",
      state: "中性时钟图标与安全兜底",
      timestamps: {
        start: Date.now() - 180000,
      },
    },
  },
];
