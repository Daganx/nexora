import Link from "next/link";
import WallpaperCard from "@/components/ui/WallpaperCard";
import { getAllWallpapers, getWallpapersPaginated } from "@/lib/wallpapers";

export const metadata = {
  title: "Nexora - Explore",
};

export default async function Explore({ searchParams }) {
  const { q, page: rawPage } = await searchParams;
  const searchQuery = q?.toLowerCase().trim() || "";
  const page = Math.max(1, parseInt(rawPage) || 1);
  const limit = 12;

  if (searchQuery) {
    const all = await getAllWallpapers();
    const filtered = all.filter(
      (w) =>
        w.title.toLowerCase().includes(searchQuery) ||
        w.category.toLowerCase().includes(searchQuery)
    );

    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-3xl font-thin">
            Results for &ldquo;{searchQuery}&rdquo;
          </h1>
          <p className="text-sm text-neutral-400 mt-2">
            {filtered.length} wallpaper{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((wp) => (
            <WallpaperCard key={wp._id} wp={wp} />
          ))}
        </div>
      </section>
    );
  }

  const { wallpapers, total, totalPages } = await getWallpapersPaginated(page, limit);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-thin">EXPLORE</h1>
        <p className="text-sm text-neutral-400 mt-2">{total} wallpapers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallpapers.map((wp) => (
          <WallpaperCard key={wp._id} wp={wp} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-16">
          {page > 1 ? (
            <Link
              href={`/explore?page=${page - 1}`}
              className="text-sm font-medium text-neutral-600 hover:text-black transition-colors"
            >
              ← Previous
            </Link>
          ) : (
            <span className="text-sm text-neutral-300">← Previous</span>
          )}
          <span className="text-sm text-neutral-400">
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? (
            <Link
              href={`/explore?page=${page + 1}`}
              className="text-sm font-medium text-neutral-600 hover:text-black transition-colors"
            >
              Next →
            </Link>
          ) : (
            <span className="text-sm text-neutral-300">Next →</span>
          )}
        </div>
      )}
    </section>
  );
}
