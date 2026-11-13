# Tasks

## 1. Public Types, Constants & Localization

- [x] 1.1 Extend `src/constants/index.ts`, `src/RichPresence.tsx` type exports, and `src/index.ts` with `RichPresenceStatusDisplayType` (`NAME: 0`, `STATE: 1`, `DETAILS: 2`), `RichPresenceLocale`, `RichPresenceEmoji`, `RichPresenceButton`, plus optional `locale` on `RichPresenceProps` and `url` / `emoji` / `status_display_type` / widened `buttons` on `RichPresenceActivity`; verify `pnpm run build` type-checking passes cleanly under `strict` and `erasableSyntaxOnly`.
- [x] 1.2 Update `src/i18n/index.ts` with complete `"zh"` and `"en"` copy for all `RichPresenceType` header verbs and action labels (such as Watch Stream / 观看直播); verify TypeScript record completeness across all `RichPresenceType` keys.

## 2. Discord Asset, Emoji & URL Sanitization

- [x] 2.1 Extend `src/utils/index.ts` (`getDiscordAssetUrl`, plus `getDiscordEmojiUrl` and `getSafeExternalUrl`) to resolve numeric `app-assets` (guarding missing `application_id`), `mp:external/`, `mp:attachments/`, `spotify:`, `youtube:`, `twitch:` (`twitch:<channel>` and `twitch:live_user_<channel>`), Discord custom emojis (`.gif` animated / `.webp` static), and filter out non-HTTP(S)/`data:image/` URLs; verify build succeeds and resolved asset URLs render properly in preview examples.

## 3. Card Presentation Logic & Type-Specific UI

- [x] 3.1 Implement a pure presentation resolver (`src/utils/presentation.ts`) that maps `activity` and `locale` to header text, title/subtitle/tertiary lines (including `status_display_type` across `Playing`, `Streaming`, `Listening`, `Watching`, and `Competing`, plus minimal `name`-only and missing-`details` fallbacks), elapsed icon kind, media aspect ratio (`16:9` vs `1:1`), media visibility on unknown types, normalized buttons (max 2), and stream CTA link; verify `tsc -p tsconfig.lib.json --noEmit` passes.
- [x] 3.2 Add dedicated SVG status icons (`stream.svg`, `watch.svg`, `trophy.svg`, `clock.svg` under `src/svgs/`) and update `src/RichPresence.tsx` to render `Playing` (`0`, including `buttons`, `locale`, and `status_display_type`), `Streaming` (`1`), `Listening` (`2`, including `buttons`, `locale`, `status_display_type`, and audio elapsed icon), `Watching` (`3`), `Custom` (`4` with Unicode/CDN `{emoji} {state}` and `{emoji}`-only enlarged layout), `Competing` (`5`), and `Unknown` (`-1` and unrecognized types like `6` without forcing empty artwork boxes).
- [x] 3.3 Update `src/index.scss` with `rich-presence-`-prefixed BEM styles and theme variables for streaming purple accent, `16:9` stream thumbnails (`normal` and `large`), custom status emoji inline/enlarged layouts, action buttons, and light/dark theme contrast; verify `pnpm run lint` and `pnpm run build` succeed without errors.

## 4. Preview Page Coverage & Documentation

- [x] 4.1 Update `docs/constants/index.ts`, `docs/App.tsx`, and `docs/App.css` to display preview cards and synchronized React usage snippets for both upgraded existing cards (`Playing` with `buttons`/`en`, `Listening` Spotify-style `en`, `Custom` `{emoji} {state}`) and all newly added cards (`Streaming`, `Watching`, `Competing`, and `Unknown`/`6`) across `dark`/`light` themes, `normal`/`large` sizes, and a `zh`/`en` locale switcher; verify by running `pnpm run build`, `pnpm run build:docs`, and inspecting all cards in the live preview.
- [x] 4.2 Update `README.md` with documentation for `locale`, `url`, `emoji`, `status_display_type`, and `buttons`, keeping newly implemented card types unchecked (`[ ]`) until real Discord verification; run final `pnpm run lint`, `pnpm run build`, and `pnpm run build:docs` to confirm a clean repository build.

## Workflow follow-up

- Compare each rendered preview card in `docs/` against real Discord user profile screenshots provided or checked by the user, refine any wording or spacing deltas, and then check off `[x]` in `README.md`.
- Run `openspec archive support-all-activity-cards` once visual verification is accepted.
