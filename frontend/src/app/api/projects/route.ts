import { publicApi } from "@/lib/public-api";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await publicApi("/api/projects", { headers: { Accept: "application/json" } });
    if (response.ok) return Response.json(await response.json(), { status: response.status });
  } catch {
    // Sembunyikan detail internal layanan upstream.
  }

  return Response.json({ ok: false, error: "Proyek belum bisa dimuat." }, { status: 503 });
}
