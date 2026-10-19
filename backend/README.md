# Portfolio Backend (Go)

Rewrite of the legacy Express backend in Go. Single `net/http` server, one
binary. Deploys to Vercel via the Go Framework Preset (reads `go.mod` +
`cmd/server/main.go`, listens on `PORT`).

## Local dev

```sh
cp .env.example .env   # isi Appwrite
go run ./cmd/server    # → http://localhost:4000
```

## Deploy ke Vercel

1. Project root = folder ini (`backend/`), framework `go` (sudah di `vercel.json`).
2. Set env vars (lihat `.env.example`) di Vercel dashboard.
3. Deploy. Output URL jadi `BACKEND_URL`.

## API

| Method | Path | Auth | Keterangan |
|--------|------|------|-----------|
| GET | `/api/projects` | - | Daftar project (publik) |
| POST | `/api/contact-messages` | - | Kirim pesan kontak |
| POST | `/api/admin/login` | - | Login → `{ token }` |
| POST | `/api/admin/logout` | - | Logout |
| GET | `/api/admin/me` | JWT | Cek sesi |
| GET/POST | `/api/admin/projects` | JWT | List / create (multipart, image opsional) |
| POST | `/api/admin/projects/update` | JWT | Update (multipart, `id` wajib) |
| POST | `/api/admin/projects/delete` | JWT | Delete `{ id }` |
| GET | `/api/admin/messages` | JWT | List pesan |
| POST | `/api/admin/messages/read` | JWT | Tandai `{ id }` dibaca |
| POST | `/api/admin/messages/reply` | JWT | Catat balasan `{ originalMessageId, replyContent }` (tanpa kirim email) |

Auth token dikirim via header `Authorization: Bearer <token>` atau cookie `auth`.

Legacy Express backend disimpan di `backend-legacy/`.
