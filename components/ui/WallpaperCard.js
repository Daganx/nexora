import Image from "next/image";
import Link from "next/link";

export default function WallpaperCard({ wp }) {
  return (
    <Link
      href={`/wallpaper/${wp.slug}`}
      className="group relative block w-full aspect-4/3 rounded-2xl overflow-hidden bg-neutral-100"
    >
      <Image
        src={wp.image}
        alt={wp.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

      <div className="absolute top-3 left-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-white/80 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full">
          {wp.category}
        </span>
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-white text-lg font-semibold leading-tight">
          {wp.title}
        </h3>
      </div>
    </Link>
  );
}
