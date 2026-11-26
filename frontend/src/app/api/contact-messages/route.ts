import { contactInput, validateContact } from "@/lib/contact";
import { publicApi } from "@/lib/public-api";

const MAX_BODY_BYTES = 32_768;
const unavailable = "Pengiriman belum bisa dikonfirmasi. Kamu juga bisa menghubungi saya lewat email.";

async function readBody(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytes = 0;
  let body = "";
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) return JSON.parse(body + decoder.decode());
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      body += decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  const type = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (type !== "application/json") return Response.json({ ok: false, error: "Format pesan tidak didukung." }, { status: 415 });

  let data: unknown;
  try {
    data = await readBody(request);
  } catch {
    data = null;
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) return Response.json({ ok: false, error: "Isian pesan tidak valid." }, { status: 400 });

  const input = contactInput(data);
  if (Object.keys(validateContact(input)).length) return Response.json({ ok: false, error: "Periksa kembali isian pesan." }, { status: 400 });

  try {
    const upstream = await publicApi("/api/contact-messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(input),
    });
    if (upstream.status === 201 && (await upstream.json())?.ok === true) return Response.json({ ok: true }, { status: 201 });
    if (upstream.status === 429) return Response.json({ ok: false, error: "Terlalu banyak percobaan. Tunggu sebentar sebelum mengirim lagi." }, { status: 429 });
  } catch {
    // Permintaan tulis tidak diulang karena pesan mungkin sudah tersimpan.
  }
  return Response.json({ ok: false, error: unavailable }, { status: 502 });
}
