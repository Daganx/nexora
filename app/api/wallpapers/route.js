import { connectDB } from "@/lib/db";
import Wallpaper from "@/lib/models/Wallpaper";
import { decrypt } from "@/lib/auth";

async function verifyAdmin() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) return false;

  const payload = await decrypt(session);
  return !!payload;
}

export async function GET() {
  try {
    await connectDB();
    const wallpapers = await Wallpaper.find().sort({ createdAt: -1 });
    return Response.json(wallpapers);
  } catch (err) {
    console.error("GET /api/wallpapers error:", err);
    return Response.json(
      { error: err.message || "Failed to fetch wallpapers" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    if (!(await verifyAdmin())) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, slug, category, image } = await request.json();

    if (!title || !slug || !category || !image) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await Wallpaper.findOne({ slug });
    if (existing) {
      return Response.json(
        { error: "A wallpaper with this slug already exists" },
        { status: 409 }
      );
    }

    const wallpaper = await Wallpaper.create({ title, slug, category, image });

    return Response.json(wallpaper, { status: 201 });
  } catch {
    return Response.json(
      { error: "Failed to create wallpaper" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    if (!(await verifyAdmin())) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, title, slug, category, image } = await request.json();

    if (!id) {
      return Response.json({ error: "Missing wallpaper ID" }, { status: 400 });
    }

    await connectDB();

    if (slug) {
      const existing = await Wallpaper.findOne({ slug, _id: { $ne: id } });
      if (existing) {
        return Response.json(
          { error: "A wallpaper with this slug already exists" },
          { status: 409 }
        );
      }
    }

    const updated = await Wallpaper.findByIdAndUpdate(
      id,
      { ...(title && { title }), ...(slug && { slug }), ...(category && { category }), ...(image && { image }) },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return Response.json(
        { error: "Wallpaper not found" },
        { status: 404 }
      );
    }

    return Response.json(updated);
  } catch {
    return Response.json(
      { error: "Failed to update wallpaper" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    if (!(await verifyAdmin())) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();

    if (!id) {
      return Response.json({ error: "Missing wallpaper ID" }, { status: 400 });
    }

    await connectDB();
    const deleted = await Wallpaper.findByIdAndDelete(id);

    if (!deleted) {
      return Response.json(
        { error: "Wallpaper not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "Failed to delete wallpaper" },
      { status: 500 }
    );
  }
}
