# AGENTS.md

rich-presence-react is a published npm package: a React component that renders a Discord rich presence card (playing, listening, watching, competing, custom status, ...) from an activity object. Activity data comes from [LolipopJ/discord-activity-sender](https://github.com/LolipopJ/discord-activity-sender); this package only renders it. [README.md](README.md) (Chinese) lists usage and which card types are implemented.

## Repository layout

```
src/
  index.ts             Public API: default `RichPresence`, `RichPresenceType`, and public types
  RichPresence.tsx     The component, `RichPresenceProps`, `RichPresenceActivity`, `IGDBDetails`
  components/Tooltip/  Hover tooltip for images
  constants/           `RichPresenceType` (Discord activity type values)
  i18n/                Card header texts (`en`, `zh`)
  utils/               Discord asset URL resolution, duration formatting
  styles/, index.scss  SCSS (compiled to `dist/rich-presence-react.css`)
  svgs/                SVG icons imported as components (`?react`, svgr)
docs/                  Demo/preview site (GitHub Pages); not part of the package
vite.base.config.ts    Shared plugins; vite.lib.config.ts → dist/, vite.docs.config.ts → dist-docs/
dist/, dist-docs/      Build outputs, Git-ignored
```

## Commands

```sh
pnpm install
pnpm run lint                         # eslint . (no --fix)
pnpm run build                        # tsc -p tsconfig.lib.json --noEmit, then vite lib build (ES/UMD/CSS/.d.ts)
pnpm run build --watch                # rebuild the library while developing
pnpm run dev                          # docs preview server (vite.docs.config.ts)
pnpm run build:docs                   # tsc -p tsconfig.docs.json --noEmit, then docs build into dist-docs/
pnpm run preview                      # serve the built docs
```

There is no test suite. `docs/` imports the package by name (`rich-presence-react`, `rich-presence-react/style.css`), which resolves to `dist/`, so run `pnpm run build` before `pnpm run dev`, `build:docs`, or type-checking `docs/`. CI deploys the docs with `pnpm run build` then `pnpm run build:docs --base=/rich-presence-react/` using Node 24 and pnpm 10 (`--frozen-lockfile`), so commit `pnpm-lock.yaml` with every dependency change. Before finishing a change, run `pnpm run lint` and `pnpm run build`, plus `pnpm run build:docs` when `docs/` or public API changed. State when a visual change was not checked in the docs preview.

## Conventions

- **Public API:** everything exported from `src/index.ts`, the `rich-presence-react/style.css` export, and the props/activity types are consumer-facing. The package is in beta (`1.0.0-beta.x`) but still keep changes additive where possible; document breaking ones in the README and release commit. `package.json` `exports` and `files` define what ships (`dist`, `package.json`, `README.md`); keep them correct when adding outputs.
- **React compatibility:** `peerDependencies` are `react >=16.8.0` and the dev version is React 16 with classic JSX. Write `import React` where JSX is used (classic runtime) and avoid React 17+ APIs; `react` and `react-dom` stay external in `vite.lib.config.ts`.
- Use the `@/` alias for imports inside `src/` (`@/constants`, `@/utils`); `vite-tsconfig-paths` resolves it. In `docs/`, import the package by its public name, not from `src/`.
- TypeScript `strict`, `isolatedModules`, `erasableSyntaxOnly`: no `enum`, namespaces, or parameter properties. Follow the existing pattern of a `const` object plus a derived union type (see `RichPresenceType`).
- Imports sorted by `simple-import-sort`, Prettier defaults enforced through ESLint, React Hooks rules from `eslint-plugin-react-hooks` (recommended preset) apply, so keep components pure: no mutation of props/state and no side effects during render.
- **Discord payload fidelity:** `RichPresenceActivity` mirrors Discord's activity JSON, including snake_case fields (`large_image`, `application_id`) and `RichPresenceType` numeric values. Do not rename or camelCase them. Asset resolution (numeric asset ids, `mp:external` proxy URLs) belongs in `getDiscordAssetUrl` (`src/utils/index.ts`); handle missing or malformed fields by rendering fallbacks (`fallbackLargeImage`, `fallbackSmallImage`) rather than throwing.
- **Card types:** adding or changing support for an activity type updates the component, `i18n` header texts for both `en` and `zh`, the demo activities (`RICH_PRESENCES` in `docs/constants/index.ts`), and the checklist in README. Do not mark a card as implemented without verifying it against a real Discord card, as the README warns.
- **Styling:** SCSS lives in `src/`; share mixins through `src/styles/mixins.scss`. Prefix new class names with `rich-presence-` (BEM-style modifiers such as `--theme-dark`) so they do not collide with consumer styles, and support both `theme` values (`light`, `dark`) and both `size` values (`normal`, `large`).
- Time-dependent output (elapsed/remaining time) updates through component state and must clean up its timers on unmount.
- Comments explain non-obvious behavior, not control flow. The README is Chinese; code identifiers and comments are English.
- Commit messages use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `ci:`); a release is a `release vX.Y.Z-beta.N` commit that bumps `package.json`.

## Docs

[README.md](README.md) is user-facing and in Chinese. Update it when props, the activity shape, supported cards, or usage change. The docs site under `docs/` is a demo and the usage reference; keep its example code in sync with the README snippet.

## Secrets

The package makes no authenticated requests and needs no credentials. Never add tokens, Discord user ids, or real presence data from a private account to `docs/` demo data or tests.
