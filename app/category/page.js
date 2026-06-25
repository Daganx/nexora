import WallpaperCard from "@/components/ui/WallpaperCard";
import wallpapers from "@/data/wallpapers.json";

const categories = [...new Set(wallpapers.map((w) => w.category))];

export default async function Category({ searchParams }) {
  const { cat: activeCat } = await searchParams;

  const filtered = activeCat
    ? wallpapers.filter((w) => w.category === activeCat)
    : wallpapers;

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
          <WallpaperCard key={wp.id} wp={wp} />
        ))}
      </div>
    </section>
  );
}
