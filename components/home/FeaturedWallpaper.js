import Link from "next/link";
import Image from "next/image";
import { getRandomWallpaper } from "@/lib/wallpapers";

export default async function FeaturedWallpaper() {
  const wp = await getRandomWallpaper();
  if (!wp) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 mb-16">
      <h2 className="text-3xl font-thin mb-6">FEATURED WALLPAPER</h2>
      <Link
        href={`/wallpaper/${wp.slug}`}
        className="group relative block w-full aspect-[21/9] rounded-3xl overflow-hidden bg-neutral-900"
      >
        <Image
          src={wp.image}
          alt={wp.title}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-white/70 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full mb-4">
            {wp.category}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            {wp.title}
          </h2>
        </div>
      </Link>
    </section>
  );
}
