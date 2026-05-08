---
title: "Next.js 初学者前置条件清单"
date: "2026-05-08"
excerpt: "从零开始学习 Next.js 之前，你需要准备的开发环境、基础知识以及推荐工具，帮助你少走弯路。"
---

## 为什么选 Next.js？

Next.js 是目前最主流的全栈 React 框架，集成了路由、服务端渲染（SSR）、静态生成（SSG）、API 路由等能力。对个人开发者来说，一个项目就能覆盖前端和后端，不需要同时维护 Express + React 两套代码。

---

## 1. Node.js 环境

Next.js 基于 Node.js 运行，建议使用 **LTS 版本**（当前 ≥ 20.x）。

### 安装方式

推荐使用版本管理器，方便切换 Node 版本：

| 工具 | 平台 | 特点 |
|---|---|---|
| **fnm** (Fast Node Manager) | Windows / macOS / Linux | Rust 编写，速度快，跨平台 |
| **nvm** (Node Version Manager) | macOS / Linux | 最老牌，生态成熟 |
| **Volta** | Windows / macOS / Linux | Rust 编写，项目级版本固定 |

```bash
# fnm 安装（Linux/macOS）
curl -fsSL https://fnm.vercel.app/install | bash

# 安装并使用 LTS 版本
fnm install --lts
fnm use lts-latest

# 验证
node -v  # ≥ 20.x
npm -v   # ≥ 10.x
```

### 包管理器选择

| 工具 | 速度 | 磁盘占用 | 推荐场景 |
|---|---|---|---|
| **npm** | 中等 | 较大（node_modules 扁平） | 默认选择，零配置 |
| **pnpm** | 快 | 小（硬链接 + 内容寻址） | 多项目管理，节省磁盘 |
| **yarn** | 快 | 中等 | 与 npm 类似，历史遗留 |
| **bun** | 最快 | 小 | 追求极致速度，兼容性注意 |

初学者建议先用 npm，后续再考虑 pnpm。

---

## 2. Git 与 GitHub

Git 是必备技能，用于版本控制和配合 Vercel 自动部署。

```bash
# 安装 Git
# macOS: brew install git
# Ubuntu/Debian: sudo apt install git
# Windows: https://git-scm.com/

git config --global user.name "你的名字"
git config --global user.email "your@email.com"
```

关键命令：
- `git init` / `git clone` — 初始化或克隆仓库
- `git add .` / `git commit -m "message"` — 暂存和提交
- `git push` / `git pull` — 推送和拉取
- `git branch` / `git checkout -b` — 分支管理

注册 [GitHub](https://github.com) 账号，这是后续 Vercel 部署的前提。

---

## 3. 编辑器

**VS Code** 是 Node.js 生态的事实标准。推荐扩展：

| 扩展 | 用途 |
|---|---|
| **ES7+ React/Redux/React-Native snippets** | React 代码片段 |
| **Tailwind CSS IntelliSense** | Tailwind 类名自动补全和提示 |
| **Prettier - Code formatter** | 代码格式化 |
| **ESLint** | 代码规范检查 |
| **Thunder Client** | API 测试（替代 Postman） |

---

## 4. 前端基础知识

Next.js 是 React 的框架，以下知识是前提：

### 必须掌握

- **HTML/CSS** — 语义化标签、Flexbox、Grid、响应式
- **JavaScript (ES6+)** — 箭头函数、解构、async/await、模块化
- **TypeScript** — interface/type、泛型基础、类型推断（Next.js 默认使用 TS）

### React 核心概念

- **组件** — 函数组件、JSX 语法
- **Props** — 父组件向子组件传值
- **State** — `useState` 管理组件内部状态
- **Effect** — `useEffect` 处理副作用（数据请求、订阅等）
- **条件渲染** — `{condition && <Component />}`
- **列表渲染** — `{items.map(item => <Item key={item.id} />)}`

如果你对这些还不熟悉，建议先过一遍 [React 官方教程](https://react.dev/learn)（英文）或者 React 中文文档。

---

## 5. 浏览器开发工具

- **Chrome DevTools** — Console、Network、Application 标签页是调试必备
- **React Developer Tools** 浏览器扩展 — 查看组件树和 props/state

---

## 6. 命令行基础

日常开发在终端中完成，需要熟悉：

- `cd`、`ls`、`mkdir`、`rm` — 目录和文件操作
- `npm run dev` / `npm run build` — 项目脚本
- `Ctrl+C` — 终止运行中的进程
- 路径概念：相对路径 vs 绝对路径

---

## 总结

如果你已经具备以上所有条件，恭喜你，可以进入下一篇文章开始搭建 Next.js 项目了。如果有缺口也不用担心，边做边学是最快的方式——遇到不懂的搜索就是了。
