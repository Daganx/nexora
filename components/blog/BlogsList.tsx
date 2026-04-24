import { Blog } from "@/types/blog";
import { BlogCard } from "../home/blog/BlogCard";

interface BlogsListProps {
  blogs: Blog[];
}

export function BlogsList({ blogs }: BlogsListProps) {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-500">
        No blogs match your current filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog, index) => (
        <BlogCard key={index} blog={blog} />
      ))}
    </div>
  );
}