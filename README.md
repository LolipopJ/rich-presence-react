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

### 消费 `discord-activity-sender` 接口响应

[discord-activity-sender](https://github.com/LolipopJ/discord-activity-sender) 返回的原始 JSON 中，部分 64 位雪花 ID（例如自定义状态的 `emoji.id`）可能以整数形式出现；若直接调用 `res.json()` 或 `JSON.parse()` 会超出 JavaScript 安全整数范围（`Number.MAX_SAFE_INTEGER`）导致末尾精度丢失，使自定义表情 CDN 地址失效。建议先读取响应文本，再使用本包导出的 `parseRichPresenceJson` 解析：

```tsx
import RichPresence, {
  parseRichPresenceJson,
  type RichPresenceActivity,
} from "rich-presence-react";
import "rich-presence-react/style.css";

interface ActivityResponse {
  data: RichPresenceActivity[];
  last_updated_at: number;
}

const res = await fetch("https://your-sender-host/activities");
const payload = parseRichPresenceJson<ActivityResponse>(await res.text());
```

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `activity` | `RichPresenceActivity` | 必填 | Discord Activity 原始数据对象 |
| `theme` | `"light" \| "dark"` | `"dark"` | 卡片主题风格 |
| `size` | `"normal" \| "large"` | `"normal"` | 卡片尺寸 |
| `locale` | `"zh" \| "en"` | `"zh"` | 卡片头部动词、倒计时与行动按钮文案语言 |
| `fallbackLargeImage` | `string \| null` | 内置 SVG | 大图缺失或加载失败时的兜底图片 |
| `fallbackSmallImage` | `string \| null` | 内置 SVG | 小角标缺失或加载失败时的兜底图片 |

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
