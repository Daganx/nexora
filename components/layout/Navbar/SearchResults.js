import Image from "next/image";
import Link from "next/link";

export default function SearchResults({
  query,
  filtered,
  matchedCategories,
  onResultClick,
}) {
  if (!query.trim()) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden z-50 max-h-72 overflow-y-auto">
      {filtered.length === 0 ? (
        <p className="px-4 py-3 text-sm text-neutral-400">No results found.</p>
      ) : (
        <ul>
          {matchedCategories.map((cat) => {
            const catWallpapers = filtered.filter(
              (w) => w.category === cat
            );
            return (
              <li key={cat}>
                <Link
                  href={`/category?cat=${cat}`}
                  onClick={onResultClick}
                  className="flex items-center gap-3 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:bg-neutral-50"
                >
                  {cat}
                </Link>
                {catWallpapers.map((wp) => (
                  <Link
                    key={wp.id}
                    href={`/wallpaper/${wp.slug}`}
                    onClick={onResultClick}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="relative size-9 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                      <Image
                        src={wp.image}
                        alt={wp.title}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{wp.title}</p>
                    </div>
                  </Link>
                ))}
              </li>
            );
          })}
          <li>
            <Link
              href={`/explore?q=${encodeURIComponent(query.trim())}`}
              onClick={onResultClick}
              className="flex items-center justify-center gap-1 px-4 py-3 text-sm font-medium text-neutral-500 border-t border-neutral-100 hover:bg-neutral-50"
            >
              See all results →
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
