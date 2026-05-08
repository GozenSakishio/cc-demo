import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors mb-8"
      >
        ← 返回文章列表
      </Link>

      <article>
        <header className="mb-10">
          <time className="text-sm text-gray-400 dark:text-gray-500 font-mono">
            {post.date}
          </time>
          <h1 className="text-3xl font-bold tracking-tight mt-2 mb-3">
            {post.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        <div
          className="prose prose-gray dark:prose-invert max-w-none
            prose-headings:font-semibold prose-headings:tracking-tight
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
            prose-p:leading-relaxed prose-p:my-4
            prose-li:leading-relaxed
            prose-pre:bg-gray-950 prose-pre:text-gray-100
            prose-code:text-sm prose-code:font-mono
            prose-code:before:content-none prose-code:after:content-none
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </div>
  );
}
