import WallpaperCard from "@/components/ui/WallpaperCard";
import wallpapers from "@/data/wallpapers.json";

export const metadata = {
  title: "Nexora - Explore",
};

export default async function Explore({ searchParams }) {
  const { q } = await searchParams;
  const searchQuery = q?.toLowerCase().trim() || "";

  const filtered = searchQuery
    ? wallpapers.filter(
        (w) =>
          w.title.toLowerCase().includes(searchQuery) ||
          w.category.toLowerCase().includes(searchQuery)
      )
    : wallpapers;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-thin">
          {searchQuery ? <>Results for &ldquo;{searchQuery}&rdquo;</> : "EXPLORE"}
        </h1>
        {searchQuery && (
          <p className="text-sm text-neutral-400 mt-2">
            {filtered.length} wallpaper{filtered.length !== 1 ? "s" : ""} found
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((wp) => (
            <WallpaperCard key={wp.id} wp={wp} />
          ))}
      </div>
    </section>
  );
}
