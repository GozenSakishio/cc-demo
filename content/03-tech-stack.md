---
title: "个人开发者技术选型指南：后端、数据库、部署"
date: "2026-05-08"
excerpt: "对比 Next.js API Routes、主流数据库托管服务、部署平台，为个人项目选择最适合的技术栈。"
---

## 选型原则

个人开发者的核心诉求不同于企业团队：

1. **低成本** — 最好有慷慨的免费额度
2. **低运维** — 不想管服务器、备份、扩容
3. **快启动** — 配置越少越好，别花一天调环境
4. **可扩展** — 项目长大后不用推倒重来

---

## 后端：API 层选型

### Next.js API Routes（推荐）

Next.js 自带 API 路由，在 `src/app/api/` 下写 `route.ts` 即可：

```typescript
// src/app/api/hello/route.ts
export async function GET() {
  return Response.json({ message: "Hello from Next.js" });
}
```

| 优点 | 缺点 |
|---|---|
| 零额外配置，同仓库管理 | 无持久化进程（Serverless 冷启动） |
| 自动按路由拆分 bundle | 不支持 WebSocket |
| Vercel 上按需缩放 | 长时间任务需外部队列 |

**适合**：博客、CRUD 应用、SaaS MVP、表单处理。

### Express.js

传统 Node.js 后端框架，生态最丰富。

| 优点 | 缺点 |
|---|---|
| 中间件生态成熟 | 需要独立部署和运维 |
| 灵活度高 | 没有文件路由，需手动组织 |
| 支持 WebSocket | TypeScript 支持需额外配置 |

**适合**：需要 WebSocket、复杂中间件逻辑、或者你想单独部署后端。

### Hono

新兴的轻量级 Web 框架，支持多运行时（Node.js、Deno、Bun、Cloudflare Workers、Vercel Edge）。

| 优点 | 缺点 |
|---|---|
| 极快、极小（~13KB） | 生态不如 Express 丰富 |
| 多运行时，一处写多处跑 | 社区较小 |
| TypeScript 一等公民 | 部分 middleware 需适配 |

**适合**：追求性能，或者想部署到 Edge/Cloudflare Workers。

### 建议

- **刚开始**：直接用 Next.js API Routes，一个项目搞定前后端
- **需要分离后端**：选 Hono，比 Express 更现代
- **已有 Express 经验**：继续用 Express 也没问题

---

## 数据库选型

### 数据库类型

| 类型 | 代表 | 特点 |
|---|---|---|
| **关系型 (SQL)** | PostgreSQL、MySQL、SQLite | 结构化数据、ACID 事务、JOIN 查询 |
| **文档型 (NoSQL)** | MongoDB | Schema 灵活、JSON 文档 |
| **Edge 数据库** | Turso (SQLite)、Neon (PG) | 全球分布、低延迟 |

### 个人开发者推荐路径

#### 方案 A：零成本起步 — SQLite + Turso

SQLite 是单文件数据库，不需要服务端进程。**Turso** 是基于 SQLite 的托管服务，提供 HTTP 协议访问。

- **Turso 免费额度**：9 GB 存储、10 个数据库、5 个 location
- 无需安装数据库服务，连接即用
- 适合小型项目和个人工具

#### 方案 B：最成熟 — PostgreSQL + Supabase / Neon

PostgreSQL 是功能最强大的开源关系型数据库。

| 服务 | 免费额度 | 亮点 |
|---|---|---|
| **Supabase** | 500 MB 数据库 + 50 MB 文件存储 + 2 GB 带宽 | 自带 Auth、Storage、Realtime |
| **Neon** | 0.5 GB 存储、100 小时计算 | Serverless PG，分支功能（类似 Git） |
| **Railway** | $5 额度/月 | 一体化平台，可跑 DB + 后端 |

**Supabase 尤其推荐给初学者**：它不只是数据库，还内置认证、文件存储、实时订阅，相当于 Firebase 的开源替代。

#### 方案 C：极简 — 不用数据库

如果你的项目是博客、文档站、作品集，**markdown 文件就是最好的数据库**：
- 零成本、零运维
- 版本管理（Git 追踪内容变更）
- 部署即静态文件

### ORM：如何操作数据库

| ORM | 特点 |
|---|---|
| **Prisma** | 声明式 Schema、自动迁移、类型安全、VS Code 插件。学习曲线低，推荐初学者 |
| **Drizzle** | 更接近 SQL 的写法、轻量、无代码生成。适合喜欢手写 SQL 思维的开发者 |

```prisma
// Prisma Schema 示例
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  createdAt DateTime @default(now())
}
```

---

## 认证 (Auth)

如果你的项目需要用户登录：

| 方案 | 特点 |
|---|---|
| **Auth.js (NextAuth v5)** | Next.js 生态标配，支持 GitHub/Google 等 OAuth + 数据库 session |
| **Clerk** | 托管服务，免费 10,000 MAU，UI 组件开箱即用，开发最快 |
| **Supabase Auth** | 如果你已用 Supabase 做数据库，自带认证最省事 |

---

## 部署平台

| 平台 | 免费额度 | 适合场景 |
|---|---|---|
| **Vercel** | 100 GB 带宽、1M 函数调用/月 | Next.js 首选，零配置，自动 CI/CD |
| **Cloudflare Pages** | 无限带宽、10 万次函数调用/天 | 静态页面 + 轻量 Workers |
| **Railway** | $5/月额度 | 跑数据库、后端服务等需要长时进程的场景 |
| **Fly.io** | 3 个共享实例 | 需要 Docker 部署的应用 |
| **Netlify** | 100 GB 带宽、125K 函数调用/月 | 与 Vercel 类似，Next.js 支持不如 Vercel |

### 推荐组合

| 项目规模 | 推荐方案 |
|---|---|
| 个人博客/作品集 | Next.js + Markdown + Vercel |
| SaaS MVP | Next.js + Supabase (DB + Auth) + Vercel |
| 小程序后端 | Hono + Turso + Cloudflare Workers |
| 有经验的个人项目 | Next.js + Neon + Drizzle + Vercel |

---

## 总结

如果你是刚开始的全栈初学者，这里是最省力的起步方案：

```
Next.js (App Router)
├── 样式: Tailwind CSS
├── 内容: Markdown 文件（或对接 Supabase）
├── 后端: Next.js API Routes
├── 部署: Vercel（GitHub 推送即部署）
└── 域名: Vercel 赠送 .vercel.app 域名（或自购域名绑定）
```

等你把这个方案跑通，再根据实际需求引入数据库和认证。**不要过早优化——先用最简单的工具把东西做出来。**
