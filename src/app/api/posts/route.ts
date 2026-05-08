import { getAllPosts } from "@/lib/posts";

export async function GET() {
  const posts = getAllPosts();
  return Response.json({ posts });
}
