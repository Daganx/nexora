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

export async function getWallpapersPaginated(page = 1, limit = 12) {
  try {
    await connectDB();
    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      Wallpaper.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Wallpaper.countDocuments(),
    ]);
    return { wallpapers: docs.map(serialize), total, page, totalPages: Math.ceil(total / limit) };
  } catch {
    return { wallpapers: [], total: 0, page, totalPages: 0 };
  }
}

export async function getLatestWallpapers(limit = 5) {
  try {
    await connectDB();
    const docs = await Wallpaper.find().sort({ createdAt: -1 }).limit(limit).lean();
    return docs.map(serialize);
  } catch {
    return [];
  }
}

export async function getWallpaperById(id) {
  try {
    await connectDB();
    const doc = await Wallpaper.findById(id).lean();
    return doc ? serialize(doc) : null;
  } catch {
    return null;
  }
}

export async function getWallpapersByCategory(category, excludeSlug, limit = 6) {
  try {
    await connectDB();
    const query = { category };
    if (excludeSlug) query.slug = { $ne: excludeSlug };
    const docs = await Wallpaper.find(query).sort({ createdAt: -1 }).limit(limit).lean();
    return docs.map(serialize);
  } catch {
    return [];
  }
}

export async function searchWallpapers(query) {
  try {
    await connectDB();
    if (!query.trim()) return [];
    const filter = {
      $or: [
        { title: { $regex: query.trim(), $options: "i" } },
        { category: { $regex: query.trim(), $options: "i" } },
      ],
    };
    const docs = await Wallpaper.find(filter).sort({ createdAt: -1 }).lean();
    return docs.map(serialize);
  } catch {
    return [];
  }
}

export async function getRandomWallpaper() {
  try {
    await connectDB();
    const docs = await Wallpaper.aggregate([{ $sample: { size: 1 } }]).exec();
    return docs.length > 0 ? serialize(docs[0]) : null;
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
