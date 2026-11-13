# Proposal

## Why

当前 `rich-presence-react` 仅实现了 Discord 的“正在玩 (`0`)”、“正在听 (`2`)”与纯文本“自定义状态 (`4`)”卡片，而“正在直播 (`1`)”、“正在看 (`3`)”、“正在比赛 (`5`)”与“未知状态 (`-1` / 未识别类型)”尚未实现。同时，现有组件存在状态图标耦合游戏手柄（`play.svg`）、`Custom` 缺少 `emoji` 渲染、未支持 Discord 新版 `status_display_type` 与 `buttons`、`getDiscordAssetUrl` 未覆盖 `spotify:` / `twitch:` / `youtube:` / `mp:attachments` 等资源前缀，以及 `i18n` 硬编码中文等问题。本次变更旨在按照 Discord 最新个人资料（User Profile）动态卡片样式补全所有活动类型与数据字段，并在 `docs/` 预览页中完整展示，供用户对照真实 Discord 客户端逐个核验。

## What Changes

- 扩展公开数据结构（保持向后兼容与 Discord snake_case 字段约定）：
  - 在 `RichPresenceActivity` 中补充 `url`、`emoji`、`status_display_type`，以及兼容 `string | RichPresenceButton` 的 `buttons` 类型；导出 `RichPresenceStatusDisplayType`、`RichPresenceEmoji`、`RichPresenceButton` 等类型定义。
  - 在 `RichPresenceProps` 中新增可选 `locale?: "zh" | "en"`（默认 `"zh"`），激活现有的 `en`/`zh` 双语配置。
- 实现并完善全部 Discord 个人动态卡片类型（含已实现类型对照官方英文模板的补全）与最新样式：
  - **Playing (`0`)**：保留现有布局并补全官方英文模板（`locale="en"` 下 `Playing` 头部、完整 `buttons` 最多 2 个按钮渲染、以及 `status_display_type` 字段优先级支持）。
  - **Streaming (`1`)**：新增直播卡片样式，包含 Discord 直播紫色标识、`16:9` 直播画面缩略图容器、主播/分区信息映射，以及带 `url` 跳转的“观看直播 / Watch Stream”行动按钮。
  - **Listening (`2`)**：保留并完善 `Listening to {name}` / `正在听 {name}` 布局与进度条，补全 `spotify:` 专辑图解析、`buttons` 渲染、仅含 `start` 时的音频计时图标、`status_display_type` 及官方英文模板展示。
  - **Watching (`3`)**：新增观影/观看卡片样式，适配 `Watching {name}` / `正在看 {name}` 头部与媒体标题/频道映射、进度条或观看/时钟状态图标（不再误用游戏手柄图标）。
  - **Custom (`4`)**：保留思绪气泡形态，严格按官方模板 `{emoji} {state}` 补全标准 Unicode Emoji 与 Discord 自定义表情（`cdn.discordapp.com/emojis/...`，含动图）渲染及纯 Emoji 放大样式。
  - **Competing (`5`)**：新增竞赛卡片样式，使用 `Competing in` / `正在竞赛` 头部、奖杯/竞赛计时图标、`party` 队伍徽章与进度条支持。
  - **Unknown (`-1` 及未识别类型如 `6` Hang Status)**：实现安全降级卡片，使用中性 header（`Doing` / `正在`）与通用计时图标，且在无图片资产时不强制渲染空白大图占位框。
- 扩展 Discord 媒体资源解析能力：支持 `spotify:`、`youtube:`、`twitch:`、`mp:attachments/`、`mp:external/`、数字 `app-assets`、自定义 Emoji CDN 以及原始 URL，并保持缺失/加载失败时的安全兜底。
- 补全 `docs/` 预览页示例：在 `docs/constants/index.ts` 与 `docs/App.tsx` 中既保留/补全已实现卡片（`Playing`、`Listening`、`Custom`）对照官方英文模板的演示（`locale="en"`、`buttons`、`emoji`、`status_display_type`），也增加未实现卡片类型（`Streaming`、`Watching`、`Competing`、`Unknown`）覆盖 `dark`/`light` 主题与 `normal`/`large` 尺寸的演示案例与对应 React 代码片段，用于后续真机核验。
- 按 `AGENTS.md` 规范：在用户对照真实 Discord 客户端卡片完成逐项核验前，不提前将 `README.md` 功能清单中新类型标记为 `[x]`，但同步更新组件 Props/字段使用说明。

## Capabilities

### New Capabilities

- `activity-card-rendering`: 定义 `<RichPresence />` 组件对 Discord 全量 Activity 类型（`0`–`5`、`-1` 及未识别类型）的个人动态卡片布局、字段映射（含 `status_display_type`）、图标/主题/尺寸修饰符、`emoji`、`buttons` 与 `locale` 渲染行为。
- `discord-asset-resolution`: 定义 Discord 活动图片资产（`app-assets`、`mp:external`、`mp:attachments`、`spotify:`、`youtube:`、`twitch:`、HTTP URL）与 Custom Status `emoji` CDN 的 URL 解析规则及降级兜底策略。
- `docs-activity-preview`: 定义 `docs/` 预览站对所有活动卡片类型的演示数据覆盖、主题/尺寸/语言预览能力以及示例代码同步要求。

### Modified Capabilities

<!-- 当前为首次初始化 OpenSpec，无既有规格发生修改。 -->

## Impact

- **核心库源码**：`src/RichPresence.tsx`、`src/constants/index.ts`、`src/i18n/index.ts`、`src/utils/index.ts`、`src/index.ts`、`src/index.scss`、新增类型专用 SVG 图标（`src/svgs/`）。
- **预览站与文档**：`docs/constants/index.ts`、`docs/App.tsx`、`docs/App.css`、`README.md`。
- **公共 API 契约**：`RichPresenceProps`、`RichPresenceActivity` 及新增导出常量/类型均保持增量式扩展，不破坏既有 `theme`、`size`、`fallbackLargeImage`、`fallbackSmallImage` 与 `RichPresenceType` 契约。
- **构建与技术约束**：遵循 React `>=16.8.0` classic JSX 运行时、TypeScript `strict` / `isolatedModules` / `erasableSyntaxOnly`（禁止 `enum`）、ESLint `simple-import-sort` / Prettier 与 `rich-presence-` BEM 类名前缀约定。
