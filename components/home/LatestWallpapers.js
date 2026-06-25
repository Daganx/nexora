import WallpaperCard from "@/components/ui/WallpaperCard";
import wallpapers from "@/data/wallpapers.json";

const latest = [...wallpapers]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 5);

export default function LatestWallpapers() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-thin">LATEST WALLPAPERS</h2>
        <a
          href="/explore"
          className="text-sm font-medium text-neutral-500 hover:text-black transition-colors"
        >
          View all →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latest.slice(0, 3).map((wp) => (
          <WallpaperCard key={wp.id} wp={wp} />
        ))}
      </div>

      {latest.length > 3 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {latest.slice(3).map((wp) => (
            <WallpaperCard key={wp.id} wp={wp} />
          ))}
        </div>
      )}
    </section>
  );
}
