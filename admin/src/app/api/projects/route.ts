import { authToken, json, proxy } from "@/lib/proxy";

export async function GET() {
  const token = await authToken();
  if (!token) return json({ ok: false, error: "Unauthorized" }, 401);
  const { status, body } = await proxy("/api/admin/projects");
  if (status === 401) return json({ ok: false, error: "Unauthorized" }, 401);
  return json(body, status);
}

export async function POST(req: Request) {
  const token = await authToken();
  if (!token) return json({ ok: false, error: "Unauthorized" }, 401);
  const form = await req.formData();
  const { status, body } = await proxy("/api/admin/projects", {
    method: "POST",
    body: form,
  });
  return json(body, status);
}
