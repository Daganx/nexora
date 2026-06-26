import { createSession } from "@/lib/auth";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return Response.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    await createSession();
    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
