import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center text-center">
      <h1 className="text-8xl font-black tracking-tighter">404</h1>
      <p className="text-lg text-neutral-500 mt-6 max-w-md">
        This page doesn&apos;t exist. It might have been moved or deleted.
      </p>
      <div className="flex items-center gap-4 mt-10">
        <Link
          href="/"
          className="bg-black text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/explore"
          className="text-sm font-medium text-neutral-500 hover:text-black transition-colors"
        >
          Explore wallpapers
        </Link>
      </div>
    </section>
  );
}
