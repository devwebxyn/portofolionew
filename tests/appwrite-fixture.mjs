// Local Appwrite double used by the Go API in the integration test. Binds to loopback only.
import { createServer } from "node:http";
import { randomUUID } from "node:crypto";

const port = Number(process.env.FIXTURE_PORT || 4100);
const base = `http://localhost:${port}`;
const image = `${base}/v1/storage/buckets/project-images/files/demo/view?project=local`;
const projects = [
  { $id: "uji-papan", title: "Papan kendali mini", description: "Data uji galeri. Papan kecil untuk mengeksplorasi hubungan antara firmware dan komponen yang terpasang di PCB.", category: "Embedded", language: "C", tags: ["PCB", "Firmware"], imageUrl: image, githubUrl: "https://example.com/repositori", liveUrl: "https://example.com/demo", createdAt: "2025-02-01T03:00:00Z" },
  { $id: "uji-memori", title: "Penjelajah memori", description: "Data uji untuk menampilkan proyek tanpa gambar dan daftar teknologi yang singkat.", language: "Rust", tags: null, createdAt: "2025-01-15T03:00:00Z" },
  { $id: "uji-catatan", title: "Catatan eksperimen", description: "Data uji untuk memeriksa tautan, gambar yang gagal dimuat, dan proyek lama.", tags: ["Next.js"], imageUrl: image.replace("/demo/", "/hilang/"), liveUrl: "javascript:alert(1)", $createdAt: "2024-12-12T03:00:00Z" },
];
const messages = [];
let mode = "normal";
let contactMode = "normal";
const art = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><defs><pattern id="g" width="27" height="27" patternUnits="userSpaceOnUse"><path d="M0 27V0h27" stroke="#ccd5bd" fill="none"/></pattern></defs><rect width="800" height="450" fill="#e9e9db"/><rect x="25" y="25" width="750" height="400" fill="url(#g)"/><path d="m154 226 231-129 260 123-226 135z" fill="#416153" stroke="#172c23" stroke-width="3"/><path d="m154 226 265 129 226-135v20L419 379l-265-130z" fill="#293e32"/><g stroke="#daea94" fill="none" stroke-width="3"><path d="m196 229 74-41h63l103 49h89l47-26m-318 39h61l68 37h105l76-43m-280 21h62l64 37h59m-110-145h61l69 36h67"/><circle cx="196" cy="229" r="6"/><circle cx="564" cy="244" r="6"/><circle cx="354" cy="157" r="6"/></g><path d="m348 192 63-35 69 35-62 37z" fill="#152d23" stroke="#d2e49d" stroke-width="2"/><path d="m373 192 40-23 44 22-40 23z" fill="#8da786"/><text x="42" y="58" font-family="monospace" font-size="15" fill="#364d3e">ILUSTRASI DATA UJI / RANGKAIAN MINI</text></svg>`;

const server = createServer(async (req, res) => {
  const url = new URL(req.url, base);
  const reply = (status, body) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(body));
  };
  const body = async () => JSON.parse(await Array.fromAsync(req).then((chunks) => Buffer.concat(chunks).toString()));
  if (url.pathname === "/status") return reply(200, { ready: true, messages });
  if (url.pathname === "/mode" && req.method === "POST") {
    const input = await body();
    mode = input.projects ?? mode;
    contactMode = input.contact ?? contactMode;
    return reply(200, { mode, contactMode });
  }
  if (url.pathname.startsWith("/v1/storage/")) {
    if (req.method === "POST" && req.headers["content-type"]?.startsWith("multipart/form-data")) {
      for await (const chunk of req) void chunk;
      return reply(201, { $id: "demo" });
    }
    if (url.pathname.includes("/hilang/")) return reply(404, { message: "Fixture image missing" });
    res.writeHead(200, { "Content-Type": "image/svg+xml" });
    return res.end(art);
  }
  const match = /^\/v1\/databases\/local\/collections\/(projects|messages|admins)\/documents(?:\/([^/]+))?$/.exec(url.pathname);
  if (!match) return reply(404, { message: "Unknown fixture route" });
  const [, collection, id] = match;
  const records = collection === "projects" ? projects : messages;

  if (req.method === "GET" && collection === "admins") {
    return reply(200, { documents: [{ $id: "admin-uji", username: "uji", passwordHash: "$2b$10$Us54CLE7i1n41Cr2UeE45uPSsHQff5Eec/g.K5Fe.l8XrmQQjqflm" }] });
  }
  if (req.method === "GET" && id) {
    const record = records.find((item) => item.$id === id);
    return record ? reply(200, record) : reply(404, { message: "Fixture record missing" });
  }
  if (req.method === "GET") {
    if (collection === "projects") {
      if (mode === "error") return reply(503, { message: "Fixture outage" });
      if (mode === "empty") return reply(200, { documents: [] });
      if (mode === "malformed") return reply(200, { documents: [{ title: 17 }] });
      if (mode === "delay") await new Promise((resolve) => setTimeout(resolve, 1400));
    }
    const extra = mode === "pagination" && collection === "projects" ? Array.from({ length: 25 }, (_, i) => ({ $id: `arsip-${i}`, title: `Arsip uji ${i}` })) : [];
    const all = [...records, ...extra];
    const queries = url.searchParams.getAll("queries[]").map(JSON.parse);
    const limit = queries.find(({ method }) => method === "limit")?.values[0] ?? 25;
    const cursor = queries.find(({ method }) => method === "cursorAfter")?.values[0];
    const offset = cursor ? all.findIndex((item) => item.$id === cursor) + 1 : 0;
    return reply(200, { documents: all.slice(offset, offset + limit) });
  }
  if (req.method === "POST") {
    if (collection === "messages" && contactMode === "error") return reply(503, { message: "Fixture outage" });
    const { data } = await body();
    const record = { ...data, $id: randomUUID().replaceAll("-", "") };
    records.push(record);
    return reply(201, record);
  }
  const index = records.findIndex((item) => item.$id === id);
  if (index < 0) return reply(404, { message: "Fixture record missing" });
  if (req.method === "PATCH") {
    Object.assign(records[index], (await body()).data);
    return reply(200, records[index]);
  }
  if (req.method === "DELETE") {
    records.splice(index, 1);
    res.writeHead(204);
    return res.end();
  }
  return reply(405, { message: "Unsupported fixture operation" });
});

server.listen(port, "::1", () => console.log(`Appwrite fixture ready on ${base}`));
