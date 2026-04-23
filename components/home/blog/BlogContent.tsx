import { Blog } from "@/types/blog";

interface BlogContentProps {
  blog: Blog;
}

export function BlogContent({ blog }: BlogContentProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
      <div className="flex flex-col gap-1">
        <span className="text-white/70 text-xs font-medium tracking-widest uppercase">
          {blog.type}
        </span>
        <h3 className="text-white text-xl font-semibold leading-tight">
          {blog.title}
        </h3>
      </div>

      <div className="hidden md:flex items-center gap-2">
        <button className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </button>
      </div>
    </div>
  );
}
