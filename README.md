# Rich Presence React

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
# 构建预览页
pnpm build:docs
# 本地预览构建后结果
pnpm preview
```
