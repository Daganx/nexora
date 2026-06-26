import { decrypt } from "@/lib/auth";

export async function GET() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return Response.json({ authenticated: false });
  }

  const payload = await decrypt(session);
  return Response.json({ authenticated: !!payload });
}
