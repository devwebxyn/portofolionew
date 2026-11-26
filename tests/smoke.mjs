import assert from "node:assert/strict";

const publicSite = process.env.QA_PUBLIC_URL || "http://localhost:3100";
const admin = process.env.QA_ADMIN_URL || "http://localhost:3101";
const fixture = process.env.QA_FIXTURE_URL || "http://localhost:4100";

const json = (data) => ({ method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
const mode = (data) => fetch(fixture + "/mode", json(data));
const page = async (path) => {
  const res = await fetch(publicSite + path, { redirect: "manual" });
  return { status: res.status, headers: res.headers, html: await res.text() };
};
async function ready(url) {
  for (let i = 0; i < 40; i++) {
    if (await fetch(url).then((r) => r.ok).catch(() => false)) return;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw Error(`Service did not start: ${url}`);
}

await Promise.all([ready(fixture + "/status"), ready(publicSite + "/robots.txt"), ready(admin + "/login")]);
await mode({ projects: "normal", contact: "normal" });
for (const path of ["/", "/about", "/journey", "/projects", "/projects/uji-papan", "/electronics", "/systems", "/ai", "/contact", "/robots.txt", "/sitemap.xml", "/og.png", "/icon.svg"]) {
  assert.equal((await page(path)).status, 200, path);
}
assert.match((await page("/")).html, /Pemrograman low-level/);
assert.equal((await page("/profile")).status, 308);
assert.equal((await page("/profile")).headers.get("location"), "/about");
assert.equal((await page("/projects/hilang")).status, 404);
assert.equal((await page("/tidak-ada")).status, 404);
assert.match((await page("/sitemap.xml")).html, /projects\/uji-papan/);
const search = await page("/projects?q=Firmware");
assert.match(search.html, /Papan kendali mini/);
assert.doesNotMatch(search.html, /Penjelajah memori/);
assert.match((await page("/projects?q=abcabc")).html, /Proyek tidak ditemukan/);
const filtered = await page("/projects?tech=Rust");
assert.match(filtered.html, /Penjelajah memori/);
assert.doesNotMatch(filtered.html, /Papan kendali mini/);
const detail = await page("/projects/uji-papan");
assert.match(detail.html, /<link rel="canonical" href="[^"]+\/projects\/uji-papan"/);
assert.match(detail.html, /example.com\/demo/);
assert.doesNotMatch((await page("/projects/uji-catatan")).html, /javascript:alert/);

for (const [projects, message] of [["empty", /Belum ada proyek/], ["malformed", /Proyek belum tersedia/], ["error", /Coba lagi/]]) {
  await mode({ projects });
  assert.match((await page("/projects")).html, message);
}
assert.match((await page("/projects/uji-papan")).html, /Proyek belum tersedia/);
await mode({ projects: "pagination" });
assert.equal((await fetch(publicSite + "/api/projects").then((r) => r.json())).items.length, 28);
await mode({ projects: "normal" });

const contact = { subject: "Pesan integrasi", senderEmail: "uji@example.com", message: "Dibuat hanya di Appwrite tiruan." };
assert.equal((await fetch(publicSite + "/api/contact-messages", json({ ...contact, senderEmail: "rusak" }))).status, 400);
assert.equal((await fetch(publicSite + "/api/contact-messages", json({ ...contact, message: "x".repeat(33_000) }))).status, 400);
assert.equal((await fetch(publicSite + "/api/contact-messages", json(contact))).status, 201);
assert.equal((await fetch(fixture + "/status").then((r) => r.json())).messages.at(-1).body, contact.message);
await mode({ contact: "error" });
assert.equal((await fetch(publicSite + "/api/contact-messages", json(contact))).status, 502);
await mode({ contact: "normal" });

assert.equal((await fetch(admin + "/api/projects")).status, 401);
assert.equal((await fetch(admin + "/messages", { redirect: "manual" })).status, 307);
const login = await fetch(admin + "/api/login", json({ username: "uji", password: "portofolio-uji" }));
assert.equal(login.status, 200);
const session = login.headers.get("set-cookie");
assert.match(session, /HttpOnly/i);
assert.match(session, /Secure/i);
const headers = { Cookie: session.split(";")[0] };
assert.match(await fetch(admin + "/messages", { headers }).then((r) => r.text()), /Pesan integrasi/);

function projectForm(title) {
  const form = new FormData();
  for (const [key, value] of Object.entries({ title, description: "Proyek uji CRUD.", category: "Embedded", language: "C", tags: "PCB,Siap diuji" })) form.set(key, value);
  return form;
}
const form = projectForm("Proyek baru dari admin");
form.set("image", new Blob(["uji"], { type: "image/png" }), "uji.png");
assert.equal((await fetch(admin + "/api/projects", { method: "POST", headers, body: form })).status, 200);
const items = await fetch(publicSite + "/api/projects").then((r) => r.json());
const created = items.items.find(({ title }) => title === "Proyek baru dari admin");
assert.ok(created?.imageUrl.includes("/storage/buckets/"));
assert.match((await page("/projects/" + created.$id)).html, /Proyek baru dari admin/);
const update = projectForm("Proyek diubah dari admin");
update.set("id", created.$id);
assert.equal((await fetch(admin + "/api/projects/update", { method: "POST", headers, body: update })).status, 200);
assert.match((await page("/projects/" + created.$id)).html, /Proyek diubah dari admin/);
const request = json({ id: created.$id });
assert.equal((await fetch(admin + "/api/projects/delete", { ...request, headers: { ...headers, ...request.headers } })).status, 200);
assert.equal((await page("/projects/" + created.$id)).status, 404);

console.log("Passed: public routes, search, metadata, 404, project states and pagination, contact, admin authentication, upload and project CRUD.");
