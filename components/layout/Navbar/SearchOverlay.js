import SearchResults from "./SearchResults";

export default function SearchOverlay({
  query,
  showResults,
  searchRef,
  filtered,
  matchedCategories,
  onSearchChange,
  onSearchKeyDown,
  onFocus,
  onResultClick,
}) {
  return (
    <div
      className="hidden lg:flex flex-1 justify-center px-6"
      ref={searchRef}
    >
      <div className="relative w-full max-w-md">
        <input
          type="search"
          placeholder="Search wallpapers or categories..."
          value={query}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={onFocus}
          onKeyDown={onSearchKeyDown}
          className="w-full bg-gray-100 rounded-2xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
        />

        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-2 max-h-96 overflow-y-auto">
            <SearchResults
              query={query}
              filtered={filtered}
              matchedCategories={matchedCategories}
              onResultClick={onResultClick}
            />
          </div>
        )}
      </div>
    </div>
  );
}
