---
title: "Next.js 项目初始化与配置全流程"
date: "2026-05-08"
excerpt: "从 create-next-app 到目录结构、配置文件详解，手把手搭建你的第一个 Next.js 全栈项目。"
---

## 创建项目

```bash
npx create-next-app@latest my-app
```

交互式选项的建议：

| 选项 | 建议 | 理由 |
|---|---|---|
| TypeScript | **Yes** | 类型安全，提升开发体验 |
| ESLint | **Yes** | 代码规范，发现问题 |
| Tailwind CSS | **Yes** | 原子化 CSS，快速写样式 |
| src/ directory | **Yes** | 源码和配置分离，目录更清晰 |
| App Router | **Yes** | 最新路由系统，支持 Server Component |
| Turbopack | 可选 | 更快的开发构建，但部分场景不兼容 |

---

## 目录结构详解

```
my-app/
├── public/              # 静态资源（图片、字体等）
│   └── favicon.ico
├── src/
│   └── app/             # App Router 入口
│       ├── layout.tsx   # 根布局（所有页面共享）
│       ├── page.tsx     # 首页 (/)
│       ├── globals.css  # 全局样式
│       └── blog/
│           └── [slug]/
│               └── page.tsx  # 动态路由 (/blog/xxx)
├── content/             # Markdown 博客内容（自定义）
├── lib/                 # 工具函数（自定义）
├── next.config.ts       # Next.js 配置
├── tsconfig.json        # TypeScript 配置
├── package.json         # 依赖和脚本
├── postcss.config.mjs   # PostCSS 配置（Tailwind 依赖）
└── eslint.config.mjs    # ESLint 配置
```

### App Router 核心约定

| 文件 | 作用 |
|---|---|
| `page.tsx` | 页面组件，对应一个路由 |
| `layout.tsx` | 布局组件，包裹子页面，导航切换时不重新渲染 |
| `loading.tsx` | 路由加载中的骨架屏 |
| `error.tsx` | 错误边界，捕获渲染错误 |
| `not-found.tsx` | 自定义 404 页面 |
| `route.ts` | API 路由（替代 pages 时代的 API Routes） |

---

## 关键配置文件

### next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 开发模式配置（可选）
};

export default nextConfig;
```

常用配置：
- `images.remotePatterns` — 允许加载外部图片域名
- `headers()` — 自定义 HTTP 响应头
- `rewrites()` — URL 重写（反向代理）

### tsconfig.json

Next.js 已预设好 TypeScript 配置，一般不需要修改。关键项：

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]  // 路径别名，用 @/ 代替 ../../../
    }
  }
}
```

### Tailwind CSS 配置 (v4)

Tailwind v4 使用 CSS 文件配置，不再需要 `tailwind.config.ts`：

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
}
```

如果需要 Typography 插件（用于美化 markdown 渲染）：

```bash
npm install @tailwindcss/typography
```

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

---

## 环境变量

Next.js 支持 `.env` 文件：

```bash
# .env.local（不提交到 git）
DATABASE_URL="postgresql://..."
API_KEY="sk-xxx"

# 客户端可访问的变量需加 NEXT_PUBLIC_ 前缀
NEXT_PUBLIC_SITE_URL="https://example.com"
```

读取方式：
- 服务端：`process.env.DATABASE_URL`
- 客户端：`process.env.NEXT_PUBLIC_SITE_URL`

---

## 开发工作流

```bash
# 开发模式（热更新）
npm run dev        # → http://localhost:3000

# 生产构建
npm run build      # 生成优化后的静态/服务端代码

# 启动生产服务器
npm run start      # 需先 build

# 代码检查
npm run lint       # ESLint 检查所有文件
```

---

## 部署前检查清单

- [ ] `npm run build` 成功无报错
- [ ] `npm run lint` 通过
- [ ] `.env.local` 中的密钥已添加到 `.gitignore`
- [ ] 代码已推送到 GitHub

下一篇文章会对比个人开发者的后端、数据库和部署选型，帮你在众多技术选项中做出选择。
