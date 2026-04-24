import { Blog } from "@/types/blog";
import { BlogCardUI } from "@/components/ui/BlogCard";

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  return <BlogCardUI blog={blog} />;
}
