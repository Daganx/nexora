import { connectDB } from "@/lib/db";
import Wallpaper from "@/lib/models/Wallpaper";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return Response.json({ error: "Invalid wallpaper ID" }, { status: 400 });
    }

    await connectDB();
    const wp = await Wallpaper.findById(id).lean();

    if (!wp) {
      return Response.json({ error: "Wallpaper not found" }, { status: 404 });
    }

    return Response.json(JSON.parse(JSON.stringify(wp)));
  } catch {
    return Response.json(
      { error: "Failed to fetch wallpaper" },
      { status: 500 }
    );
  }
}
