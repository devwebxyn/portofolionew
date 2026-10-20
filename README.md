<div align="center">

# Samuel Indra Bastian — Portfolio Monorepo

**Fullstack & IoT Developer portfolio** — a three-app production system running on Vercel: a public portfolio site, a protected admin dashboard, and a Go API backend backed by Appwrite.

<!--- badges: keep minimal and honest --->
![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=nextdotjs&logoColor=white)
![Go](https://img.shields.io/badge/Go-1.23-00ADD8?logo=go&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-Cloud-FB4D9B?logo=appwrite&logoColor=white)

</div>

---

## 📦 On this page
- [Overview](#overview)
- [Architecture](#architecture)
- [Repository layout](#repository-layout)
- [Apps](#apps)
  - [Frontend — public portfolio](#1-frontend--public-portfolio)
  - [Admin — dashboard](#2-admin--dashboard)
  - [Backend — Go API](#3-backend--go-api)
- [Environment variables](#environment-variables)
- [Local development](#local-development)
- [Deployment to Vercel](#deployment-to-vercel)
- [Data flow & security](#data-flow--security)
- [License](#license)

---

## Overview

This repository contains the complete source for three independently deployable applications that compose a full-stack portfolio:

| # | App | Folder | Framework | Purpose |
|---|-----|--------|-----------|---------|
| 1 | **Portfolio (public)** | `frontend/` | Next.js 16 (App Router) | Public site — projects, about, profile, contact |
| 2 | **Admin dashboard** | `admin/` | Next.js 16 (App Router) | Authenticated content management |
| 3 | **Backend API** | `backend/` | Go 1.23 (`net/http`) | REST API + Appwrite integration, image upload |

Each app builds independently and deploys to its own Vercel project. They communicate server-side only — the browser never talks to the Go backend directly.

> A legacy Express implementation is preserved under `backend-legacy/` for reference only. It is **not** deployed.

---

## Architecture

```
Browser ──▶ frontend (Vercel) ──server-side proxy──▶ backend Go (Vercel) ──▶ Appwrite (DB + Storage)
Browser ──▶ admin   (Vercel) ──server-side proxy──▶ backend Go (Vercel) ──▶ Appwrite (DB + Storage)
```

- **Frontend** fetches `/api/projects` relative to itself; a Next.js **route handler** on the frontend proxies that request to the Go backend using `NEXT_PUBLIC_BACKEND_URL`.
- **Admin** never exposes the Go URL: every mutation goes through server-side route handlers (`/api/...`) that read the signed session cookie and forward it to the backend as `Authorization: Bearer <token>`. A **middleware** guards all pages except `/login`.
- **Backend** validates JWT, enforces a CORS allow-list, and talks to Appwrite with a minimal typed REST client.

This design keeps API keys and admin credentials entirely server-side and allows each app to scale independently on Vercel.

---

## Repository layout

```
├── frontend/          # Public portfolio (Next.js 16)
│   ├── src/app/       # pages: /, /about, /projects, /profile, /contact
│   ├── src/app/api/projects/route.ts   # server-side proxy → Go backend
│   ├── src/components/
│   └── src/lib/
├── admin/             # Admin dashboard (Next.js 16)
│   ├── src/proxy.ts   # auth middleware (redirects → /login)
│   ├── src/app/api/   # /login /logout /me /projects[/update|/delete]
│   └── src/lib/proxy.ts  # shared server-side proxy helper
├── backend/           # Go API (Vercel Go Framework Preset)
│   ├── cmd/server/    # main entrypoint
│   ├── internal/server/    # HTTP handlers, auth, CORS, routing
│   └── internal/appwrite/  # minimal Appwrite REST client
├── backend-legacy/    # Legacy Express version (not deployed)
└── DEPLOY.md          # Vercel deployment runbook
```

---

## Apps

### 1. Frontend — public portfolio
Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS v4, Framer Motion.

- Pages: home, about, projects, profile, contact.
- SEO: `metadata`, `sitemap.xml`, `robots.txt`, JSON-LD.
- Data: projects fetched server-side by a `/api/projects` proxy route, rendered client-side with loading / empty / error states.

### 2. Admin — dashboard
Next.js 16, TypeScript, Tailwind v4.

- Login with Appwrite-stored admins (bcrypt), session via httpOnly cookie.
- Performant CRUD: create / edit / delete projects, with optional image upload.
- Auth protected by middleware + server-side JWT forwarding.

### 3. Backend — Go API
Go 1.23, single `net/http` server, runs as one Vercel function.

- Public: `GET /api/projects`, `POST /api/contact-messages`.
- Admin (JWT): login/logout/me, projects CRUD (multipart + image upload to Appwrite Storage), messages list/read/reply.
- Health: `GET /api/health` and `GET /`.

---

## Environment variables

| App | Variable | Description | Scope |
|-----|----------|-------------|-------|
| `frontend` | `NEXT_PUBLIC_BACKEND_URL` | Base URL of the Go backend (no trailing slash) | server + client |
| `frontend` | `NEXT_PUBLIC_SITE_URL` | Public site URL (metadata, sitemap, robots) | server + client |
| `admin` | `API_URL` | Base URL of the Go backend | server-only |
| `admin` | `AUTH_COOKIE` | Session cookie name (optional, default `auth`) | server-only |
| `backend` | `APPWRITE_ENDPOINT` | Appwrite REST endpoint (e.g. `https://fra.cloud.appwrite.io/v1`) | server-only |
| `backend` | `APPWRITE_PROJECT_ID` | Appwrite project ID | server-only |
| `backend` | `APPWRITE_API_KEY` | Appwrite API key | **secret** |
| `backend` | `APPWRITE_DATABASE_ID` | Appwrite database ID | server-only |
| `backend` | `APPWRITE_COLLECTION_PROJECTS` | Projects collection ID | server-only |
| `backend` | `JWT_SECRET` | Secret used to sign admin JWTs | **secret** |
| `backend` | `ALLOWED_ORIGINS` | Comma-separated CORS origin regexes | server-only |
| `backend` | `PORT` | HTTP port for standalone runs (default `4000`) | server-only |

> ⚠️ **Secrets** (`APPWRITE_API_KEY`, `JWT_SECRET`) must never be committed. `.env` files are git-ignored throughout; only `.env.example` files are tracked.

---

## Local development

Prerequisites: **Node 18+ / pnpm 9+**, **Go 1.22+**, and an Appwrite project.

```bash
# 1) Backend
cd backend
cp .env.example .env          # fill in Appwrite + JWT_SECRET
go run ./cmd/server           # → http://localhost:4000

# 2) Frontend (new terminal)
cd frontend
pnpm install
cp .env.example .env.local
pnpm dev                      # → http://localhost:3000

# 3) Admin (new terminal)
cd admin
pnpm install
cp .env.example .env.local
pnpm dev                      # → http://localhost:3001
```

- Frontend reachable at `http://localhost:3000`, admin at `http://localhost:3001` — remember to point `API_URL` / `NEXT_PUBLIC_BACKEND_URL` at the local Go server on port `4000`.

---

## Deployment to Vercel

Deploy each folder as its **own** Vercel project. The full runbook with per-project settings is in [`DEPLOY.md`](./DEPLOY.md).

| App | Vercel **Root Directory** | Framework preset |
|-----|---------------------------|------------------|
| Backend | `backend/` | **Go** |
| Admin | `admin/` | Next.js (auto) |
| Frontend | `frontend/` | Next.js (auto) |

```
Frontend URL  https://samuelindrabastian.me  → NEXT_PUBLIC_BACKEND_URL = backend URL
Admin URL     https://admin.vercel.app      → API_URL                = backend URL
Backend URL   https://backend.vercel.app    → Appwrite + JWT + CORS  = configured
```

Set `NEXT_PUBLIC_SITE_URL` on the frontend to the final public domain so sitemap, robots, and canonical URLs point to production.

---

## Data flow & security

- **JWT auth**: admin logs in → Go verifies bcrypt hash from Appwrite `admins` collection → returns signed JWT (2h). The Next.js admin stores it in an httpOnly, `SameSite=Lax` cookie (`Secure` in production) and forwards it to the backend on every request.
- **CORS**: the Go backend only responds to origins matching `ALLOWED_ORIGINS` (plus any localhost, for dev), so admin/frontend fetch calls are strictly scoped.
- **Server-side only**: API keys never reach the browser; all cross-origin calls originate from Next.js server runtimes.
- **Image upload**: projects images are uploaded to Appwrite Storage via the backend; storage URLs are rendered by the frontend with `next/image`.

---

## License

Closed source — personal portfolio of **Samuel Indra Bastian**. All rights reserved.