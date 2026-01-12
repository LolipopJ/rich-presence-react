import type { RichPresenceProps } from "rich-presence-react";

export const TEST_RICH_PRESENCES: RichPresenceProps[] = [
  {
    activity: {
      state: "Workspace: rich-presence-react",
      details: "Editing index.scss",
      timestamps: {
        start: Date.now() - 200000,
      },
      assets: {
        small_text: "Visual Studio Code",
        small_image: "1359299466493956258",
        large_text: "Editing a SCSS file",
        large_image: "1359299338932584549",
      },
      type: 0,
      name: "Visual Studio Code",
      application_id: "383226320970055681",
    },
    theme: "dark",
    size: "normal",
  },
  {
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
      type: 2,
      name: "Tencent QQ Music",
      application_id: "1431607752945434655",
      buttons: ["🎧 Listen", "🔍 View App on GitHub"],
    },
    theme: "dark",
    size: "normal",
  },
  {
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
        size: [2, 8] as [number, number],
      },
      type: 0,
      name: "FINAL FANTASY XIV",
      application_id: "478143453536976896",
      igdb_details: {
        artworks: [
          "https://images.igdb.com/igdb/image/upload/t_1080p/arr7a.jpg",
        ],
        storyline:
          "Eorzea. A land embraced by Gods and forged by Heroes.\n\nSeeking control of this realm and its abundant crystal resources, the Garlean Empire sends forth a massive host on a campaign to conquer its southern neighbour. Driven by madness, the commander of the invading forces silently plots to tear the moon from the heavens and hurl it down upon the land. The people of the realm soon learn of this foul scheme and join their hands in prayer in an eleventh-hour attempt to entreat the aid of the gods, only to see their endeavours fail. From within the moon emerges Bahamut, an ancient terror seething with rage fuelled by countless generations of imprisonment. Sensing the tug of fate, a powerful magus channels the last of his strength to send Eorzea’s heroes in to a temporal rift. There they wait, untouched by the flames of destruction, until they are needed again. Those heroes are you, and the hour of awakening is now. Come and witness… A Realm Reborn.",
        summary:
          "Take part in an epic and ever-changing Final Fantasy as you adventure and explore with friends from around the world. Final Fantasy XIV Online is the 2013 relaunch of the massively multiplayer online role-playing game that takes the wonder of the FF legacy and expands it, allowing you to explore the realm of Eorzea like never before in a Final Fantasy game.\n\nForge friendships, mount chocobos, and board airships as you and your companions create your own unique stories in Eorzea. Adventure alone or join up with friends to undertake epic quests, battle familiar Final Fantasy monsters, and acquire unique abilities and equipment. All the classic elements from the series that you have come to know and love are waiting! Embark of the adventure of a lifetime to help reforge the fate of Eorzea!",
        url: "https://www.igdb.com/games/final-fantasy-xiv-online--1",
      },
    },
    theme: "dark",
    size: "large",
  },
  {
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
      type: 0,
      name: "Visual Studio Code",
      application_id: "383226320970055681",
      buttons: ["View Repository"],
    },
    theme: "light",
    size: "normal",
  },
  {
    activity: {
      state: "🎤 陈奕迅​",
      details: "▶️ 当这地球没有花​",
      timestamps: {
        start: Date.now(),
        end: Date.now() + 224160,
      },
      assets: {
        small_text: "Tencent QQMusic",
        small_image: "1431733810025988256",
        large_text: "💿 Nothing Really Matters​",
        large_image:
          "mp:external/cr2NKiwcKtxzGDfDYq0dxCiE5IAsgjBOdgBq4WIqLbg/%3Fmax_age%3D2592000/https/y.gtimg.cn/music/photo_new/T002R500x500M000004IY1d83FTu2t_3.jpg",
      },
      type: 2,
      name: "Tencent QQ Music",
      application_id: "1431607752945434655",
      buttons: ["🎧 Listen", "🔍 View App on GitHub"],
    },
    theme: "light",
    size: "large",
  },
];
