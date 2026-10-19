# Deploy ke Vercel — 3 app

| App | Folder | Framework | Vercel project root |
|-----|--------|-----------|---------------------|
| Portofolio (web publik) | `frontend/` | Next.js | `frontend/` |
| Web admin | `admin/` | Next.js | `admin/` |
| Backend API | `backend/` | Go (Framework Preset `go`) | `backend/` |

## 1. Backend Go (`backend/`)
- Import ke Vercel, root = `backend/`. Framework `go` (sudah di `backend/vercel.json`).
- Vercel deteksi `go.mod` + `cmd/server/main.go` → jalan sebagai satu server function (listen `PORT`).
- Set env (lihat `backend/.env.example`): `APPWRITE_*`, `JWT_SECRET`, `SMTP_*`, `ALLOWED_ORIGINS`.
- Dapat URL, misal `https://portfolio-backend.vercel.app`.

## 2. Web admin (`admin/`)
- Import ke Vercel, root = `admin/` (Next.js otomatis).
- Set env: `API_URL` = URL backend Go.
- Login pakai kredensial admin yang ada di Appwrite collection `admins` (hash bcrypt, field `username` + `passwordHash`).

## 3. Portofolio (`frontend/`)
- Sudah jalan di Vercel. Set env: `NEXT_PUBLIC_BACKEND_URL` = URL backend Go.
- Public endpoint yang dipakai: `GET /api/projects`, `POST /api/contact-messages`.

## Alur data
```
Browser → frontend/ (Vercel) ──server-side──▶ backend Go (Vercel) ──▶ Appwrite (DB+storage)
Browser → admin/ (Vercel)   ──server-side──▶ backend Go (Vercel) ──▶ SMTP + Appwrite
```

## Env ringkas
- `frontend`: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_BACKEND_URL`
- `admin`: `API_URL`
- `backend`: `APPWRITE_ENDPOINT`, `APPWRITE_PROJECT_ID`, `APPWRITE_API_KEY`, `APPWRITE_DATABASE_ID`, `APPWRITE_COLLECTION_PROJECTS`, `JWT_SECRET`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `ALLOWED_ORIGINS`

## Lokal
- Backend: `cd backend && go run ./cmd/server` (port 4000).
- Frontend/admin: `cd frontend && pnpm dev`, `cd admin && pnpm dev` (set env dulu).
