# Spec Delta

## Purpose

Define the observable rendering behavior of the `<RichPresence />` component across all Discord user profile activity types, field mappings, interactive buttons, theme/size variants, and localization options.

## ADDED Requirements

### Requirement: Playing activity card rendering
The component SHALL render `RichPresenceType.PLAYING` (`0`) activities as a standard profile card with the Playing header (`Playing` in `en`, `正在玩` in `zh`), square (`1:1`) large artwork with optional circular small overlay badge and hover tooltips, `name` as primary title (supporting minimal name-only activities), `details`, `state` (or party badge when `party.size` is present), elapsed gamepad timer or progress bar, and optional action buttons.

#### Scenario: Standard playing activity with elapsed timestamp
- **WHEN** `activity.type` is `0` with `name`, `details`, `state`, `assets`, and `timestamps.start` (without `timestamps.end`)
- **THEN** the card renders the Playing header, `1:1` large image with small overlay image, `name`/`details`/`state` lines, and an elapsed time badge with a gamepad icon

#### Scenario: Playing activity with party size and action buttons
- **WHEN** `activity.type` is `0` with `activity.party.size` `[current, max]` and `activity.buttons` under `locale="en"`
- **THEN** the header renders `"Playing"`, the party badge renders `{state} {current}/{max}` with a team icon, and up to two action buttons render below the card body

#### Scenario: Minimal name-only playing activity
- **WHEN** `activity.type` is `0` with only `name` provided and `details`, `state`, and `assets` omitted
- **THEN** the card renders the Playing header and `name` without blank detail lines or broken empty text placeholders

### Requirement: Streaming activity card rendering
The component SHALL render `RichPresenceType.STREAMING` (`1`) activities with a purple streaming accent, streaming header indicator, stream title and game/state hierarchy, a `16:9` preview frame when streaming media artwork is displayed (falling back cleanly to square/fallback artwork when unavailable), and a Watch Stream link action when `activity.url` is a valid HTTP or HTTPS URL.

#### Scenario: Streaming activity with Twitch or YouTube URL and thumbnail
- **WHEN** `activity.type` is `1` with `details`, `name`, `assets.large_image`, and an `https://` `url`
- **THEN** the card renders the streaming header with a purple streaming icon, a `16:9` thumbnail container, stream metadata lines, and an external Watch Stream CTA linking to `activity.url`

#### Scenario: Streaming activity with non-HTTP or missing URL
- **WHEN** `activity.type` is `1` and `activity.url` is missing or uses a non-HTTP(S) scheme such as `javascript:`
- **THEN** the card still renders the streaming layout and purple accent without rendering an unsafe clickable link

### Requirement: Listening activity card rendering
The component SHALL render `RichPresenceType.LISTENING` (`2`) activities with the header combining the Listening label (`Listening to {name}` in `en`, `正在听 {name}` in `zh`), shifting `details` (falling back to `name` when `details` is omitted) to the bold title line, `state` to the second line, and `assets.large_text` to the third line, with a duration progress bar, audio elapsed timer, and optional action buttons.

#### Scenario: Listening activity with start and end timestamps in English
- **WHEN** `activity.type` is `2` with `locale="en"`, `name` `"Spotify"`, `details`, `state`, `assets.large_text`, `timestamps.start`, `timestamps.end`, and `buttons`
- **THEN** the header displays `"Listening to Spotify"`, the content lines render `details`/`state`/`large_text`, a live progress bar renders elapsed and total duration, and up to two action buttons appear below

#### Scenario: Listening activity with start timestamp only
- **WHEN** `activity.type` is `2` with `timestamps.start` and no `timestamps.end`
- **THEN** the card displays an elapsed time badge using an audio/clock icon rather than a gamepad icon

### Requirement: Watching activity card rendering
The component SHALL render `RichPresenceType.WATCHING` (`3`) activities with the Watching header combined with `name` (when `name` is non-empty), `details` (falling back to `name`) as the primary title, `state` as the secondary line, `assets.large_text` as tertiary text, and either a duration progress bar or a watching/clock elapsed timer (never a gamepad icon).

#### Scenario: Watching activity with full media duration
- **WHEN** `activity.type` is `3` with `name`, `details`, `state`, `timestamps.start`, and `timestamps.end`
- **THEN** the card renders the Watching header with `name`, `details`/`state` content lines, and a progress bar showing elapsed and total duration

#### Scenario: Watching activity without end timestamp
- **WHEN** `activity.type` is `3` with `timestamps.start` and no `timestamps.end`
- **THEN** the card renders an elapsed timer badge using a watching or clock icon instead of a gamepad icon

### Requirement: Custom status bubble rendering with emoji
The component SHALL render `RichPresenceType.CUSTOM` (`4`) activities in a thought-bubble container without a standard header, displaying optional `emoji` (Unicode character or Discord custom emoji image) inline with `state` text (clamped to two lines), and enlarging the emoji presentation when `emoji` is provided without `state`.

#### Scenario: Custom status with emoji and text
- **WHEN** `activity.type` is `4` with both `emoji` and non-empty `state`
- **THEN** the thought bubble renders the emoji inline before the `state` text with up to two lines of clamping

#### Scenario: Emoji-only custom status
- **WHEN** `activity.type` is `4` with `emoji` and empty or omitted `state`
- **THEN** the thought bubble renders the emoji in an enlarged standalone style without empty placeholder lines

### Requirement: Competing activity card rendering
The component SHALL render `RichPresenceType.COMPETING` (`5`) activities using the Competing header, `1:1` large/small artwork with tooltips, `name`, `details`, `state` (or party size badge), and either a duration progress bar or an elapsed timer with a competition/trophy icon rather than a gamepad icon.

#### Scenario: Competing activity with match timer and party size
- **WHEN** `activity.type` is `5` with `name`, `details`, `state`, `party.size`, and `timestamps.start`
- **THEN** the card renders the Competing header, `name`/`details`, the party size badge, and an elapsed timer badge with a competition/trophy icon

### Requirement: Unknown and unrecognized activity fallback rendering
The component SHALL gracefully render `RichPresenceType.UNKNOWN` (`-1`) and any unrecognized numeric activity type (such as Hang Status `6` or future Discord types) with a neutral header, neutral clock elapsed icon, and without forcing a broken blank square when `assets` are omitted.

#### Scenario: Unrecognized activity type without assets
- **WHEN** `activity.type` is `-1` or an unmapped number such as `6` and `activity.assets` is undefined
- **THEN** the card renders a neutral header, `name`/`details`/`state` text, and a clock elapsed icon if `timestamps.start` exists without rendering an empty placeholder image box

### Requirement: Status display type field prioritization
The component SHALL honor Discord's optional `status_display_type` (`0`: Name, `1`: State, `2`: Details) across non-custom cards: header-subject cards (`LISTENING` `2`, `WATCHING` `3`) SHALL prioritize the selected non-empty field in the header suffix, while title-subject cards (`PLAYING` `0`, `STREAMING` `1`, `COMPETING` `5`) SHALL prioritize the selected field in the primary title when `1` or `2` is set, falling back to each card's default mapping when omitted or `0`.

#### Scenario: Listening activity with status_display_type set to State
- **WHEN** `activity.type` is `2` and `activity.status_display_type` is `1` with `state` `"Artist Name"`
- **THEN** the header displays the Listening prefix followed by `"Artist Name"` instead of `activity.name`

#### Scenario: Playing activity with status_display_type set to Details
- **WHEN** `activity.type` is `0` and `activity.status_display_type` is `2` with `details` `"Editing RichPresence.tsx"` and `name` `"Visual Studio Code"`
- **THEN** the primary title prioritizes `"Editing RichPresence.tsx"` instead of repeating or hiding it beneath `name`

### Requirement: Activity action buttons rendering
The component SHALL render up to two Discord-style action buttons at the bottom of non-custom activity cards when `activity.buttons` is provided, supporting both `string` labels (non-navigating display buttons) and `{ label, url }` objects (opening valid HTTP(S) `url` targets safely in a new tab).

#### Scenario: Activity with two string button labels
- **WHEN** `activity.buttons` contains `["Listen", "View on GitHub"]`
- **THEN** the card renders two styled action buttons in order displaying those labels

#### Scenario: Activity with more than two buttons or link objects
- **WHEN** `activity.buttons` contains three items including `{ label: "Join", url: "https://example.com" }`
- **THEN** only the first two buttons are rendered, and the valid HTTPS button renders as a safe external link with `target="_blank"` and `rel="noreferrer noopener"`

### Requirement: Theme, size, and locale support
The component SHALL support `theme` (`"dark"` default or `"light"`), `size` (`"normal"` default or `"large"`), and `locale` (`"zh"` default or `"en"`) across all activity card types, updating header verbs, button labels, and CSS modifier classes without breaking existing consumer class names.

#### Scenario: English locale override on a Watching card
- **WHEN** `<RichPresence activity={watchingActivity} locale="en" theme="light" size="large" />` is rendered
- **THEN** the card renders English header/button copy and applies `--theme-light`, `--size-large`, and `--type-3` modifier classes
