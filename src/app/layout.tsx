import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "个人开发者全栈指南",
  description: "Next.js 入门、技术选型与部署实践",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold tracking-tight hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              全栈指南
            </Link>
            <nav className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
              <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                文章
              </Link>
              <a href="/api/posts" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                API
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
          <div className="max-w-3xl mx-auto px-4 py-8 text-center text-sm text-gray-400 dark:text-gray-500">
            <p>Built with Next.js + Tailwind CSS · Deployed on Vercel</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
