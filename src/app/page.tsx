import { getAllPosts, type PostData } from "@/lib/posts";
import Link from "next/link";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-3">个人开发者全栈指南</h1>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
          从 Next.js 入门到技术选型，帮助个人开发者搭建自己的全栈项目。包含前置知识、项目配置流程、以及后端 / 数据库 / 部署方案对比。
        </p>
      </section>

      <section>
        <div className="grid gap-6">
          {posts.map((post: PostData) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm transition-all"
            >
              <article>
                <div className="flex items-center gap-3 mb-2">
                  <time className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                    {post.date}
                  </time>
                </div>
                <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
