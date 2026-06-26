import Link from "next/link";
import { notFound } from "next/navigation";
import WallpaperViewer from "@/components/wallpapers/WallpaperViewer";
import WallpaperCard from "@/components/ui/WallpaperCard";
import wallpapers from "@/data/wallpapers.json";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const wp = wallpapers.find((w) => w.slug === slug);

  if (!wp) return { title: "Nexora - Not Found" };

  return { title: `Nexora - ${wp.title}` };
}

export default async function WallpaperPage({ params }) {
  const { slug } = await params;
  const wp = wallpapers.find((w) => w.slug === slug);

  if (!wp) notFound();

  const sameCategory = wallpapers.filter(
    (w) => w.category === wp.category && w.slug !== slug
  );

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <Link
        href="/explore"
        className="inline-flex text-sm text-neutral-500 hover:text-black transition-colors mb-8"
      >
        ← Back to explore
      </Link>

      <div className="flex flex-col lg:flex-row gap-10 mb-20">
        <WallpaperViewer wp={wp} />

        <div className="flex-1 flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
            {wp.category}
          </span>
          <h1 className="text-4xl font-bold mb-4">{wp.title}</h1>
          <p className="text-sm text-neutral-500">
            Added on{" "}
            {new Date(wp.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="mt-8">
            <a
              href={wp.image}
              download
              className="inline-flex items-center gap-2 bg-black text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10v6m0 0-3-3m3 3 3-3m2 8H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z"
                />
              </svg>
              Download
            </a>
          </div>
        </div>
      </div>

      {sameCategory.length > 0 && (
        <section>
          <h2 className="text-2xl font-thin mb-8">
            More in{" "}
            <span className="font-semibold uppercase">{wp.category}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sameCategory.map((w) => (
              <WallpaperCard key={w.id} wp={w} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
