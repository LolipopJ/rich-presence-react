# discord-asset-resolution Specification

## Purpose

Define URL resolution, external media prefix mapping, custom emoji CDN lookup, and safe fallback rules for Discord Rich Presence artwork and status emojis.

## Requirements

### Requirement: Discord application asset resolution
The asset resolver SHALL map numeric Discord asset IDs (number or digit-only string) to `https://cdn.discordapp.com/app-assets/{application_id}/{asset}.png` when `application_id` is non-empty, and return `undefined` when `application_id` is missing.

#### Scenario: Numeric asset ID with application_id
- **WHEN** `application_id` is `"383226320970055681"` and `asset` is `"1359299338932584549"`
- **THEN** the resolver returns `https://cdn.discordapp.com/app-assets/383226320970055681/1359299338932584549.png`

#### Scenario: Numeric asset ID without application_id
- **WHEN** `application_id` is undefined and `asset` is `"1359299338932584549"`
- **THEN** the resolver returns `undefined` instead of a malformed URL containing `undefined`

### Requirement: Discord media proxy prefix resolution
The asset resolver SHALL translate `mp:external/...` and `mp:attachments/...` asset pointers to `https://media.discordapp.net/external/...` and `https://media.discordapp.net/attachments/...` respectively.

#### Scenario: External media proxy asset
- **WHEN** `asset` starts with `"mp:external/"`
- **THEN** the resolver strips `"mp:"` and prepends `"https://media.discordapp.net/"`

#### Scenario: Attachment media proxy asset
- **WHEN** `asset` starts with `"mp:attachments/"`
- **THEN** the resolver strips `"mp:"` and prepends `"https://media.discordapp.net/"`

### Requirement: Platform media prefix resolution
The asset resolver SHALL resolve `spotify:`, `youtube:`, and `twitch:` asset prefixes to their corresponding CDN thumbnail URLs (`i.scdn.co/image/`, `i.ytimg.com/vi/{id}/hqdefault.jpg`, and `static-cdn.jtvnw.net/previews-ttv/live_user_{channel}-320x180.jpg`).

#### Scenario: Spotify album artwork prefix
- **WHEN** `asset` is `"spotify:ab67616d0000b27312345"`
- **THEN** the resolver returns `https://i.scdn.co/image/ab67616d0000b27312345`

#### Scenario: YouTube video thumbnail prefix
- **WHEN** `asset` is `"youtube:dQw4w9WgXcQ"`
- **THEN** the resolver returns `https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg`

#### Scenario: Twitch live preview prefix
- **WHEN** `asset` is `"twitch:streamer"` or `"twitch:live_user_streamer"`
- **THEN** the resolver returns `https://static-cdn.jtvnw.net/previews-ttv/live_user_streamer-320x180.jpg`

### Requirement: Safe direct URL pass-through and fallback handling
The asset resolver SHALL preserve valid `http://`, `https://`, and `data:image/` URLs unchanged, reject unsafe schemes such as `javascript:`, and let failed or missing artwork fall back to `fallbackLargeImage` or `fallbackSmallImage`.

#### Scenario: Unsafe image URL scheme rejected
- **WHEN** an asset string uses `javascript:alert(1)`
- **THEN** the resolver returns `undefined` so the component uses the fallback image rather than rendering an unsafe `src`

### Requirement: Custom status emoji resolution
The emoji resolver SHALL map custom Discord emojis carrying a numeric `id` to `https://cdn.discordapp.com/emojis/{id}.gif` when `animated` is true or `.webp` when static, and render standard Unicode emojis directly using `emoji.name`.

#### Scenario: Animated custom Discord emoji
- **WHEN** `activity.emoji` has `{ id: "123456789012345678", name: "wave", animated: true }`
- **THEN** the component renders an `<img>` element pointing to `https://cdn.discordapp.com/emojis/123456789012345678.gif?size=48&quality=lossless`

#### Scenario: Standard Unicode emoji
- **WHEN** `activity.emoji` has `{ name: "🎧", id: null }`
- **THEN** the component renders `"🎧"` inline as text
