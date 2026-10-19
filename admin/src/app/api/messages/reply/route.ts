import { authToken, json, proxy } from "@/lib/proxy";

export async function POST(req: Request) {
  const token = await authToken();
  if (!token) return json({ ok: false, error: "Unauthorized" }, 401);
  let input: { originalMessageId?: string; replyContent?: string } = {};
  try {
    input = await req.json();
  } catch {
    /* body rusak */
  }
  const { status, body } = await proxy("/api/admin/messages/reply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return json(body, status);
}
