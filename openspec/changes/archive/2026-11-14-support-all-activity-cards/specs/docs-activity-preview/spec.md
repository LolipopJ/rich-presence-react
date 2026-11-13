# Spec Delta

## Purpose

Ensure the documentation preview site showcases every Discord activity card type with synchronized usage snippets for visual verification while keeping README verification status truthful.

## ADDED Requirements

### Requirement: Complete activity type coverage in preview site
The `docs/` preview application SHALL include representative preview cards and synchronized React usage snippets for every activity type (`Playing` `0`, `Streaming` `1`, `Listening` `2`, `Watching` `3`, `Custom` `4`, `Competing` `5`, and `Unknown` `-1`/unrecognized), covering both Chinese (`zh`) and Official English Template (`en`) presentations, `emoji`, `buttons`, `status_display_type`, `dark`/`light` themes, and `normal`/`large` sizes.

#### Scenario: Viewing all activity card types and official English templates in docs preview
- **WHEN** a user opens the `docs/` preview application
- **THEN** both previously implemented cards (`Playing`, `Listening`, `Custom` with `{emoji} {state}`) and newly added cards (`Streaming`, `Watching`, `Competing`, `Unknown`) are rendered with `zh`/`en` official template coverage and synchronized React snippets

### Requirement: Verification-gated README checklist updates
The documentation SHALL update `README.md` usage examples and prop descriptions for newly added fields (`locale`, `url`, `emoji`, `status_display_type`, `buttons`), while keeping newly implemented card types unchecked (`[ ]`) in the feature checklist until verified against real Discord client screenshots.

#### Scenario: New card types added before real Discord verification
- **WHEN** `Streaming`, `Watching`, `Competing`, and `Unknown` card types are implemented and placed on the preview page for inspection
- **THEN** `README.md` retains `[ ]` next to unverified card types until explicit visual confirmation is completed
