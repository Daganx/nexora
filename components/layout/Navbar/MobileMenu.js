import Link from "next/link";
import SearchResults from "./SearchResults";

export default function MobileMenu({
  isOpen,
  isAdmin,
  query,
  showResults,
  mobileSearchRef,
  filtered,
  matchedCategories,
  onSearchChange,
  onSearchKeyDown,
  onFocus,
  onResultClick,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-sm font-medium">
      <Link href="/explore" onClick={onClose}>
        Explore
      </Link>
      <Link href="/category" onClick={onClose}>
        Category
      </Link>
      {isAdmin && (
        <Link href="/admin" onClick={onClose} className="text-neutral-500">
          Dashboard
        </Link>
      )}

      <div ref={mobileSearchRef}>
        <input
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={onFocus}
          onKeyDown={onSearchKeyDown}
          className="w-full bg-gray-100 rounded-full px-4 py-2 outline-none"
        />

        {showResults && (
          <div className="mt-2">
            <SearchResults
              query={query}
              filtered={filtered}
              matchedCategories={matchedCategories}
              onResultClick={onResultClick}
            />
          </div>
        )}
      </div>

      <button className="bg-black text-white px-4 py-2 rounded-lg">
        <Link href="https://buymeacoffee.com/" target="new_blank">
          Support
        </Link>
      </button>
    </div>
  );
}
