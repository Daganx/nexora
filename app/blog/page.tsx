import { Blogs } from "@/components/blog/Blogs";

export default async function Blog() {
  return (
    <main>
      <div className="relative flex flex-col items-center justify-center gap-7 mt-10 mb-10">
        <h1>Explore</h1>
        <h2 className="text-[7vw] leading-none font-bold">BLOG</h2>
      </div>
      <Blogs />
    </main>
  );
}
