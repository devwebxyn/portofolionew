import { authToken, json, proxy } from "@/lib/proxy";

export async function GET() {
  const token = await authToken();
  if (!token) return json({ ok: false, error: "Unauthorized" }, 401);
  const { status, body } = await proxy("/api/admin/messages");
  if (status === 401) return json({ ok: false, error: "Unauthorized" }, 401);
  return json(body, status);
}
