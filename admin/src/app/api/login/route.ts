import { cookies } from "next/headers";
import { AUTH_COOKIE, json, proxy } from "@/lib/proxy";

export async function POST(req: Request) {
  let input: { username?: string; password?: string } = {};
  try {
    input = await req.json();
  } catch {
    /* body kosong/rusak */
  }
  const { status, body } = await proxy("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (status === 200 && body?.ok && typeof body.token === "string") {
    const store = await cookies();
    store.set(AUTH_COOKIE, body.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 2,
    });
    return json({ ok: true, username: body.username ?? null });
  }
  return json(body ?? { ok: false, error: "Login gagal." }, status);
}
