import "server-only";
import mongoose from "mongoose";

const WallpaperSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Wallpaper ||
  mongoose.model("Wallpaper", WallpaperSchema);
