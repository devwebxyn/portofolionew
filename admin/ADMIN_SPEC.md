# Web Admin — SPEC

Dashboard admin untuk portfolio. App Next.js **terpisah** di folder `admin/`, deploy ke Vercel. Backend = Go (`backend/`), akses via **server-side proxy** (admin app jangan panggil Go dari browser langsung).

## Stack
- Next.js 16 (App Router), TypeScript, Tailwind. Pakai pnpm (sama kayak `frontend/`).
- Runtime Node (server-side fetch). Font: Space Grotesk (display) + Inter (body) + JetBrains Mono (opsional, untuk data). Sama seperti frontend.
- Dark theme, token warna VOID (salin subset dari `../frontend/src/app/globals.css`):
  - bg dasar `#030304`, panel `#0b0b0e`, garis `rgba(255,255,255,0.08)`
  - accent lime `#c8ff2e` (CTA/aksi utama), cyan `#22e0ff`, violet `#a78bfa`
  - teks cream `#f2f1ec`, teks redup `rgba(242,241,236,0.55)`
  - aksen bahaya merah `#ff5d5d`
- `prefers-reduced-motion` → matikan animasi.

## Env (server-side only, TIDAK ada NEXT_PUBLIC)
- `API_URL` = base URL backend Go (contoh `https://portfolio-backend.vercel.app`), tanpa trailing slash.
- `AUTH_COOKIE` = nama cookie sesi, default `auth` (jangan wajib set).

## Auth (proxy pattern — WAJIB)
Browser hanya bicara ke admin app (same-origin). Cookie httpOnly sesi di-set di origin admin app.
1. Route handler `app/api/login/route.ts` (POST): terima `{username, password}` → server-side `fetch(API_URL + "/api/admin/login", ...)` → respons `{ok, username, token}` → set cookie `auth` (httpOnly, sameSite lax, secure di prod) di admin app → redirect/ok.
2. Route handler `app/api/logout/route.ts` (POST): hapus cookie.
3. Route handler `app/api/me/route.ts` (GET): baca cookie `auth` → forward ke Go `GET /api/admin/me` via header `Authorization: Bearer <token>` → `{ok, username}` atau 401.
4. `middleware.ts`: lindungi semua halaman kecuali `/login` — cek cookie `auth` ada; kalau tidak → redirect `/login`.
5. Semua operasi admin: route handler baca cookie → forward ke Go sebagai `Authorization: Bearer <token>`. CORS tidak masalah (semua server-side).

## Route handler proxy (semua POST/GET JSON, kecuali upload multipart)
| Route handler | Metode | Forward ke Go | Body |
|---|---|---|---|
| `/api/projects` | GET | `GET /api/admin/projects` | - |
| `/api/projects` | POST | `POST /api/admin/projects` (multipart) | FormData: title, description, tags, liveUrl, githubUrl, category, language, image(opsional) |
| `/api/projects/update` | POST | `POST /api/admin/projects/update` (multipart) | FormData + `id` |
| `/api/projects/delete` | POST | `POST /api/admin/projects/delete` | `{id}` |
| `/api/messages` | GET | `GET /api/admin/messages` | - |
| `/api/messages/read` | POST | `POST /api/admin/messages/read` | `{id}` |
| `/api/messages/reply` | POST | `POST /api/admin/messages/reply` | `{originalMessageId, replyContent}` |

Semua route handler server-side: `cookies()` dari `next/headers` untuk baca token; `fetch` ke `API_URL`. Jika Go balas 401 → kembalikan 401 (frontend redirect ke /login). Jika balas `{ok:false, error}` → pass-through status + pesan.

## Halaman & UI (desktop-first, admin tool — tetap rapi & premium tapi fungsional)
Layout: sidebar kiri (logo "Admin", nav: Dashboard, Pesan; bawah: Logout) + konten. Dark, border tipis, spacing nyaman.

1. **`/login`** — kartu centered: logo + input username/password + tombol lime "Masuk". Error message dari API. Tanpa sidebar.

2. **`/` (Dashboard)** — 
   - Stat cards: total project, total pesan, pesan belum dibaca (hitung dari list pesan).
   - Tabel project: thumbnail (imageUrl, fallback placeholder), title, category, language, tags (badge kecil), aksi Edit / Hapus (konfirmasi).
   - Tombol "Tambah Project" → `/projects/new`.

3. **`/projects/new`** & **`/projects/[id]/edit`** — form: title, description (textarea), tags (input dipisah koma), liveUrl, githubUrl, category, language, upload image (preview). Submit → POST ke route handler → redirect `/`. Mode edit: prefilled (fetch `GET /api/admin/projects`, cari id).

4. **`/messages`** — daftar pesan (subject, senderEmail, createdAt, status badge unread/read/replied). Klik → buka detail (body lengkap) + textarea balas + tombol "Kirim Balasan" → `POST /api/messages/reply`. Setelah dibuka/dibalas, refresh list.

## Struktur minimal
```
admin/
  package.json, tsconfig.json, next.config.ts, postcss.config.mjs, tailwind.config.ts
  middleware.ts
  .env.example          # API_URL
  src/app/
    layout.tsx          # font + dark bg
    globals.css         # token VOID (subset)
    login/page.tsx
    page.tsx            # dashboard
    projects/new/page.tsx
    projects/[id]/edit/page.tsx
    messages/page.tsx
    api/login/route.ts, api/logout/route.ts, api/me/route.ts
    api/projects/route.ts, api/projects/update/route.ts, api/projects/delete/route.ts
    api/messages/route.ts, api/messages/read/route.ts, api/messages/reply/route.ts
```
Client components boleh (form), tapi SEMUA data lewat route handler di atas (server-side). Jangan fetch Go langsung dari client.

## Verifikasi subagent
1. `pnpm build` exit 0.
2. `pnpm dev` jalan, halaman render.
3. Route handler: login salah → error; dengan token dummy → forward benar ke Go.
4. Kalau `API_URL` kosong → route handler balas error jelas (bukan crash).
