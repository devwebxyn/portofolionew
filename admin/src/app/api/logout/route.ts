import { cookies } from "next/headers";
import { AUTH_COOKIE, json } from "@/lib/proxy";

export async function POST() {
  const store = await cookies();
  store.delete(AUTH_COOKIE);
  return json({ ok: true });
}
