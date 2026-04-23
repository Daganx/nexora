import Image from "next/image";
import { Blog } from "@/types/blog";

interface BlogImageProps {
  blog: Blog;
}

export function BlogImage({ blog }: BlogImageProps) {
  return (
    <Image
      src={blog.image}
      alt={blog.title}
      fill
      className="object-contain object-center"
      unoptimized
    />
  );
}
