import { Blog } from "@/types/blog";
import { BlogImage } from "./BlogImage";
import { BlogOverlay } from "./BlogOverlay";
import { BlogContent } from "./BlogContent";

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl min-h-[440px] relative overflow-hidden border border-neutral-200 group cursor-pointer">
        <BlogImage blog={blog} />
        <BlogOverlay />
        <BlogContent blog={blog} />
      </div>
    </div>
  );
}
