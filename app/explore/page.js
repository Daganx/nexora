import WallpaperCard from "@/components/ui/WallpaperCard";
import wallpapers from "@/data/wallpapers.json";

export default function Explore() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-thin">EXPLORE</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallpapers
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((wp) => (
            <WallpaperCard key={wp.id} wp={wp} />
          ))}
      </div>
    </section>
  );
}
