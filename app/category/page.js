import WallpaperCard from "@/components/ui/WallpaperCard";
import { getAllWallpapers, getCategories } from "@/lib/wallpapers";

export const metadata = {
  title: "Nexora - Category",
};

export default async function Category({ searchParams }) {
  const { cat: activeCat, q } = await searchParams;
  const searchQuery = q?.toLowerCase().trim() || "";

  const [wallpapers, categories] = await Promise.all([
    getAllWallpapers(),
    getCategories(),
  ]);

  let filtered = activeCat
    ? wallpapers.filter((w) => w.category === activeCat)
    : wallpapers;

  if (searchQuery) {
    filtered = filtered.filter(
      (w) =>
        w.title.toLowerCase().includes(searchQuery) ||
        w.category.toLowerCase().includes(searchQuery)
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-thin">CATEGORY</h1>
      </div>

      <div className="flex flex-wrap gap-3 mb-10">
        <a
          href="/category"
          className={`text-sm font-medium uppercase tracking-wider px-4 py-2 rounded-full border transition-colors ${
            !activeCat
              ? "bg-black text-white border-black"
              : "bg-white text-neutral-600 border-neutral-300 hover:border-black hover:text-black"
          }`}
        >
          All
        </a>
        {categories.map((cat) => (
          <a
            key={cat}
            href={`/category?cat=${cat}`}
            className={`text-sm font-medium uppercase tracking-wider px-4 py-2 rounded-full border transition-colors ${
              activeCat === cat
                ? "bg-black text-white border-black"
                : "bg-white text-neutral-600 border-neutral-300 hover:border-black hover:text-black"
            }`}
          >
            {cat}
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((wp) => (
          <WallpaperCard key={wp._id} wp={wp} />
        ))}
      </div>
    </section>
  );
}
