export const getDiscordAssetUrl = (
  appId: string | number,
  asset?: string | number,
) => {
  if (
    typeof asset === "number" ||
    (typeof asset === "string" && /^\d+$/.test(asset))
  ) {
    return `https://cdn.discordapp.com/app-assets/${appId}/${asset}.png`;
  } else if (typeof asset === "string" && asset.startsWith("mp:external")) {
    return `https://media.discordapp.net/external/${asset.slice(12)}`;
  }

  return asset;
};

export const formatDuration = (ms?: number) => {
  if (!ms) return "00:00";
  const secs = Math.floor(ms / 1000);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};
