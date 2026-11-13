# Rich Presence React

基于 React 实现的 Discord 动态卡片。

为了实时获取您的 Discord 动态信息，可以考虑自行部署 [LolipopJ/discord-activity-sender](https://github.com/LolipopJ/discord-activity-sender) 服务。

## 功能

目前实现的动态卡片类型如下：

- [x] “正在玩”卡片
- [ ] “正在直播”卡片
- [x] “正在听”卡片
- [ ] “正在看”卡片
- [x] 自定义状态卡片
- [ ] “正在比赛”卡片
- [ ] 未知状态卡片

未实现或尚未对照真实 Discord 客户端完成核验的卡片标记为 `[ ]`，实际展示效果可在 [在线预览页](https://lolipopj.github.io/rich-presence-react/) 对照查看。

## 使用

```bash
npm install rich-presence-react
```

在项目中使用：

```tsx
import RichPresence from "rich-presence-react";
import "rich-presence-react/style.css";

const Page = ({ activity }) => {
  return (
    <RichPresence
      className="my-rich-presence"
      activity={activity}
      theme="light"
      size="normal"
      locale="zh"
    />
  );
};
```

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `activity` | `RichPresenceActivity` | 必填 | Discord Activity 原始数据对象 |
| `theme` | `"light" \| "dark"` | `"dark"` | 卡片主题风格 |
| `size` | `"normal" \| "large"` | `"normal"` | 卡片尺寸 |
| `locale` | `"zh" \| "en"` | `"zh"` | 卡片头部动词与行动按钮文案语言 |
| `fallbackLargeImage` | `string` | 内置 SVG | 大图缺失或加载失败时的兜底图片 |
| `fallbackSmallImage` | `string` | 内置 SVG | 小角标缺失或加载失败时的兜底图片 |

### 新增 / 扩展的 Activity 字段

- `url?: string`：直播卡片（`RichPresenceType.STREAMING`）的目标链接，仅在为合法 `http://` 或 `https://` 地址时渲染“观看直播 / Watch Stream”外链按钮。
- `emoji?: RichPresenceEmoji`：自定义状态（`RichPresenceType.CUSTOM`）的表情配置（`{ id?, name?, animated? }`），支持标准 Unicode 表情以及 Discord 自定义表情 CDN（动图 `.gif` / 静态 `.webp`）；仅有 `emoji` 无 `state` 时自动放大展示。
- `status_display_type?: RichPresenceStatusDisplayType`：可选 `0`（`NAME`）、`1`（`STATE`）、`2`（`DETAILS`），用于控制“正在听 / 正在看”卡片头部后缀或“正在玩 / 正在播 / 正在竞赛”卡片主标题的字段优先级。
- `buttons?: RichPresenceButton[]`：支持纯文本标签 `string` 或带链接对象 `{ label: string; url?: string }`（最多渲染 2 个）；含有效 `http(s)` `url` 的按钮渲染为新窗口打开的安全外链。
- 资源前缀解析：`assets.large_image` / `assets.small_image` 支持数字 `app-assets`、`mp:external/`、`mp:attachments/`、`spotify:`、`youtube:`、`twitch:`（`twitch:<channel>` / `twitch:live_user_<channel>`）以及 `http(s)` / `data:image/` URL，非安全协议将被过滤并回退到兜底图片。

## 开发

安装依赖：

```bash
pnpm install
```

开发组件库：

```bash
# 构建组件库并监听变更
pnpm build --watch
# 本地预览
pnpm dev
```

构建预览页：

```bash
# 构建组件库
pnpm build
# 构建预览页
pnpm build:docs
# 本地预览构建后结果
pnpm preview
```
