# Rich Presence React

基于 React 实现的 Discord 动态卡片。

为了实时获取您的 Discord 动态信息，可以考虑自行部署 [LolipopJ/discord-activity-sender](https://github.com/LolipopJ/discord-activity-sender) 服务。

## 功能

目前实现的动态卡片类型如下：

- [x] “正在玩”卡片
- [ ] “正在直播”卡片
- [x] “正在听”卡片
- [ ] “正在看”卡片
- [ ] 自定义状态卡片
- [ ] “正在比赛”卡片
- [ ] 未知状态卡牌呢

未实现卡片的实际展示效果可能会与 Discord 里的卡片有较大差异。

## 使用

```bash
npm install rich-presence-react
```

在项目中使用：

```tsx
import RichPresence from 'rich-presence-react'
import 'rich-presence-react/style.css'

const Page = ({ activity }) => {
  return (
    <RichPresence
      className="my-rich-presence"
      activity={activity}
      theme="light"
      size="normal"
    />
  )
}
```

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
