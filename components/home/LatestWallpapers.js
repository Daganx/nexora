import Link from "next/link";
import WallpaperCard from "@/components/ui/WallpaperCard";
import { getLatestWallpapers } from "@/lib/wallpapers";

export default async function LatestWallpapers() {
  const latest = await getLatestWallpapers(5);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-thin">LATEST WALLPAPERS</h2>
        <Link
          href="/explore"
          className="text-sm font-medium text-neutral-500 hover:text-black transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latest.slice(0, 3).map((wp) => (
          <WallpaperCard key={wp._id} wp={wp} />
        ))}
      </div>

      {latest.length > 3 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {latest.slice(3).map((wp) => (
            <WallpaperCard key={wp._id} wp={wp} />
          ))}
        </div>
      )}
    </section>
  );
}
