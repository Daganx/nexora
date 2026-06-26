import "server-only";
import { connectDB } from "./db";
import Wallpaper from "./models/Wallpaper";

function serialize(doc) {
  return JSON.parse(JSON.stringify(doc));
}

export async function getAllWallpapers() {
  await connectDB();
  const docs = await Wallpaper.find().sort({ createdAt: -1 }).lean();
  return docs.map(serialize);
}

export async function getWallpaperBySlug(slug) {
  await connectDB();
  const doc = await Wallpaper.findOne({ slug }).lean();
  return doc ? serialize(doc) : null;
}

export async function getCategories() {
  await connectDB();
  const result = await Wallpaper.distinct("category");
  return result;
}
