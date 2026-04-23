import blogData from "@/data/blog.json";
import { BlogCard } from "./blog/BlogCard";

// Function for the LatestBlog Article on HomePage

export async function LatestBlog() {
  const latestBlog = blogData.slice(0, 1);

  return (
    <section className="">
      <div className="relative flex flex-col items-center justify-center gap-7">
        <h3 className="text-base">Latest</h3>
        <h2 className="text-[7vw] leading-none font-bold">BLOG</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 m-10">
        {latestBlog.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </section>
  );
}
