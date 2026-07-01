import { getAllWallpapers, getCategories } from "@/lib/wallpapers";

export default async function sitemap() {
  const baseUrl = "https://nexora.vercel.app";

  const wallpapers = await getAllWallpapers();
  const categories = await getCategories();

  const wallpaperEntries = wallpapers.map((wp) => ({
    url: `${baseUrl}/wallpaper/${wp.slug}`,
    lastModified: wp.updatedAt || wp.createdAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryEntries = categories.map((cat) => ({
    url: `${baseUrl}/category?cat=${encodeURIComponent(cat)}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/explore`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/category`, changeFrequency: "weekly", priority: 0.8 },
    ...categoryEntries,
    ...wallpaperEntries,
  ];
}
