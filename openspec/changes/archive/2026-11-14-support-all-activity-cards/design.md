# Design

## Context

`rich-presence-react` is a zero-runtime-dependency React 16+ component library (classic JSX, TypeScript `strict` + `isolatedModules` + `erasableSyntaxOnly`, SCSS with `rich-presence-` BEM classes). Motivation and scope are defined in [proposal.md](./proposal.md) and the three capability specs under [specs/](./specs/).

Today:
- [src/RichPresence.tsx](../../../src/RichPresence.tsx) special-cases `CUSTOM` (`4`) and `LISTENING` (`2`) via inline ternaries, renders all other types identically to `PLAYING` (`0`), hardcodes `i18n["zh"]`, always renders the image wrapper, and uses the gamepad SVG (`play.svg`) for all non-period elapsed timers.
- [src/utils/index.ts](../../../src/utils/index.ts) resolves only numeric `app-assets` (without checking `appId`) and `mp:external`.
- `RichPresenceActivity` already declares `buttons` and `igdb_details` (unused in rendering), and lacks `url`, `emoji`, and `status_display_type`.

## Goals / Non-Goals

**Goals:**
- Render every Discord Activity type (`0`–`5`, `-1`, and unrecognized numbers such as `6`) via a clean, data-driven presentation resolver rather than growing inline conditionals.
- Match Discord's modern user profile card layout for each activity type (purple streaming styling + `16:9` thumbnail + Watch Stream CTA, Watching media hierarchy, Competing match/trophy timer, Custom Status Unicode/CDN emoji, neutral Unknown fallback, `status_display_type`, and up to 2 action buttons).
- Keep all public API changes additive and backward-compatible with `RichPresenceProps`, `RichPresenceActivity`, `RichPresenceType`, and existing CSS class names.
- Provide comprehensive live examples in `docs/` (including `locale` toggle or dual-language visibility) for visual verification against real Discord cards.

**Non-Goals:**
- Multi-activity profile stack wrapper or full Discord user profile header (avatar/banner/badges); `<RichPresence />` remains a single activity card component.
- Fetching Discord or IGDB APIs at runtime (payloads come from `discord-activity-sender` or caller state; `igdb_details` display remains outside the activity card layout unless separately scoped later).
- Marking unverified card types `[x]` in `README.md` prior to user visual verification (per `AGENTS.md`).

## Decisions

### 1. Data-Driven Presentation Resolver (`src/utils/presentation.ts` or helper module)
- **Decision**: Extract activity field mapping, header construction, icon selection, and media layout flags into a pure function `resolveActivityPresentation(activity, locale)` returning a typed presentation view model (`headerText`, `title`, `subtitle`, `tertiaryText`, `elapsedIcon`, `mediaAspect`, `showMediaBox`, `streamUrl`, `buttons`, `emoji`).
- **Rationale**: Keeps `RichPresence.tsx` focused on JSX and timer state, eliminates duplicated `type === ...` ternaries, and handles `status_display_type` (`0=Name`, `1=State`, `2=Details`) + empty-`details`/minimal `name`-only fallbacks uniformly across both newly added cards and already-implemented cards (`PLAYING`, `LISTENING`). Specifically:
  - Header-subject types (`LISTENING` `2`, `WATCHING` `3`) format the header as `{verb} {subject}` (`Listening to {subject}` / `Watching {subject}`), where `status_display_type` picks `subject` (`Name` / `State` / `Details`) and falls back to `name`.
  - Title-subject types (`PLAYING` `0`, `STREAMING` `1`, `COMPETING` `5`) keep `{verb}` in the header (`Playing` / `Streaming` / `Competing in`) and let `status_display_type` (`1=State`, `2=Details`) promote the selected field to the primary highlight line without duplicating `name` in both header and title.
- **Alternative Considered**: Adding nested `if`/`switch` blocks inside `RichPresence.tsx`. Rejected due to readability and repeated fallback logic across `LISTENING`, `WATCHING`, and `STREAMING`.

### 2. Additive Public Type Extensions (`src/constants/index.ts`, `src/RichPresence.tsx`, `src/index.ts`)
- **Decision**:
  - Keep `RichPresenceType` (`UNKNOWN: -1`, `PLAYING: 0`, `STREAMING: 1`, `LISTENING: 2`, `WATCHING: 3`, `CUSTOM: 4`, `COMPETING: 5`) intact and allow runtime unmapped integers to resolve to the `UNKNOWN` layout.
  - Add `RichPresenceStatusDisplayType = { NAME: 0, STATE: 1, DETAILS: 2 } as const` and derived union type (no TypeScript `enum`, respecting `erasableSyntaxOnly`).
  - Add optional `locale?: RichPresenceLocale` (`"zh" | "en"`, default `"zh"`) to `RichPresenceProps`.
  - Extend `RichPresenceActivity` with optional `url?: string`, `emoji?: RichPresenceEmoji`, `status_display_type?: RichPresenceStatusDisplayType`, and widen `buttons?: RichPresenceButton[]` where `RichPresenceButton = string | { label: string; url?: string }`.
- **Rationale**: Preserves 100% compatibility with existing `string[]` payloads from Discord Gateway / `discord-activity-sender` while enabling clickable URL buttons when link metadata is available.
- **Alternative Considered**: Breaking `buttons` into `{ label, url }[]` only. Rejected because existing `docs/constants/index.ts` and Discord Gateway payloads pass `string[]`.

### 3. Type-Specific Visual Styling & SVG Assets (`src/index.scss`, `src/svgs/`)
- **Decision**:
  - Add lightweight SVG icon components (`stream.svg`, `watch.svg`, `trophy.svg`, `clock.svg`, plus keeping `play.svg` and `team.svg`) styled via CSS variables so light/dark themes work without duplicated markup.
  - Style `--type-1` (`STREAMING`) with Discord streaming purple tokens (`--rich-presence-streaming-color`), a `16:9` thumbnail modifier (`.rich-presence-image--wide`), and a full-width "Watch Stream" / "观看直播" CTA button when `url` is a valid HTTP(S) URL.
  - Style `--type-4` (`CUSTOM`) emoji inline with `state`, and apply an enlarged emoji modifier (`.rich-presence-custom-status--emoji-only`) when `emoji` exists without `state`.
  - Render `.rich-presence-actions` (up to 2 full-width buttons) below `.rich-presence-content-wrapper` on non-custom cards; for `STREAMING` with valid `url`, prioritize the Watch Stream button (or render `buttons` if no `url` is present).
  - For `UNKNOWN` (`-1` or unrecognized types), omit `.rich-presence-image-wrapper` when neither `large_image` nor `small_image` is provided.
- **Rationale**: Preserves the `300px`-friendly compact profile popout width used in Discord and `docs/App.css`, while cleanly separating visual differences into BEM modifiers.
- **Alternative Considered**: Rendering a large top hero banner for `STREAMING` in `size="large"`. Kept compact left `16:9` thumbnail + right text to maintain consistent card height and visual rhythm across `normal` and `large` sizes.

### 4. Asset & URL Sanitization (`src/utils/index.ts`)
- **Decision**: Extend `getDiscordAssetUrl(appId, asset)` to handle `mp:external/`, `mp:attachments/`, `spotify:`, `youtube:`, `twitch:` (`twitch:<channel>` and `twitch:live_user_<channel>`), numeric `app-assets` (only when `appId` is truthy), and safe `http:`/`https:`/`data:image/` URLs. Add `getDiscordEmojiUrl(emoji)` and `getSafeExternalUrl(url)` to guard against unsafe URI schemes (`javascript:`, etc.).
- **Rationale**: Centralizes all Discord asset conventions in one pure module and prevents malformed URLs (`.../undefined/...`) or XSS vectors from untrusted activity data.

### 5. Preview Coverage & Verification Workflow (`docs/`, `README.md`)
- **Decision**: Add showcase items in `docs/constants/index.ts` covering both previously implemented cards brought to Official English Template parity (`Playing` with `buttons`/`status_display_type`/`locale="en"`, `Listening` Spotify-style in English + `buttons`, `Custom` `{emoji} {state}` & `{emoji}`-only) and newly implemented cards (`Streaming`, `Watching`, `Competing`, `Unknown`/`Hang` fallback) across `dark`/`light` and `normal`/`large`, plus a top-level `zh`/`en` locale switcher in `docs/App.tsx` (reflected in the generated React snippet when non-default). Leave newly added types unchecked (`[ ]`) in `README.md` until user verification.
- **Rationale**: Lets the author inspect every single card side-by-side against real Discord screenshots before flipping README status badges.

## Risks / Trade-offs

- **Discord ZH copy differences** → Discord's Simplified Chinese client wording varies slightly across client versions (e.g., `"正在直播"` vs `"正在播"`, `"正在观看"` vs `"正在看"`, `"正在比赛"` vs `"正在竞赛"`). Mitigation: Centralize copy in `src/i18n/index.ts` and confirm exact wording during the preview verification step before checking off `README.md`.
- **Live Twitch thumbnail volatility in docs** → `twitch:<channel>` preview URLs return 404 when a streamer is offline. Mitigation: In `docs/constants/index.ts`, showcase `Streaming` using reliable static/`mp:external` or fallback-safe preview artwork so the docs page always renders cleanly, while unit/manual verification covers `twitch:` prefix resolution.
- **Component CSS bundle size** → Adding new SVG icons and button/streaming/emoji rules slightly expands `dist/rich-presence-react.css` and JS bundle. Mitigation: Keep SVGs minimal and share styling tokens through SCSS variables.

## Open Questions

- None blocking implementation; exact Chinese verb preferences (`正在播`/`正在直播`, `正在看`/`正在观看`, `正在竞赛`/`正在比赛`) and any minor pixel tweaks will be confirmed when the user inspects the `docs/` preview against real Discord screenshots.
