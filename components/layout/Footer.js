import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="font-bold text-xl">
          NEX.
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/explore" className="text-neutral-600 hover:text-black transition-colors">
            Explore
          </Link>
          <Link href="/category" className="text-neutral-600 hover:text-black transition-colors">
            Category
          </Link>
        </nav>

        <p className="text-xs text-neutral-400">
          &copy; {new Date().getFullYear()} Nexora. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
