import "server-only";
import { connectDB } from "./db";
import Wallpaper from "./models/Wallpaper";

function serialize(doc) {
  return JSON.parse(JSON.stringify(doc));
}

export async function getAllWallpapers() {
  try {
    await connectDB();
    const docs = await Wallpaper.find().sort({ createdAt: -1 }).lean();
    return docs.map(serialize);
  } catch {
    return [];
  }
}

export async function getWallpaperBySlug(slug) {
  try {
    await connectDB();
    const doc = await Wallpaper.findOne({ slug }).lean();
    return doc ? serialize(doc) : null;
  } catch {
    return null;
  }
}

export async function getCategories() {
  try {
    await connectDB();
    const result = await Wallpaper.distinct("category");
    return result;
  } catch {
    return [];
  }
}
