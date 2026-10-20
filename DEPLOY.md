# Deploy to Vercel — 3 apps

This monorepo ships **three independent Vercel projects**. Deploy each folder
with **its own** Vercel project — do not import the repo root.

| App | Folder | Framework | Vercel **Root Directory** | Framework preset |
|-----|--------|-----------|---------------------------|------------------|
| Backend API | `backend/` | Go 1.23 | `backend/` | `go` (already in `backend/vercel.json`) |
| Web admin | `admin/` | Next.js 16 | `admin/` | Next.js (auto) |
| Portfolio (public) | `frontend/` | Next.js 16 | `frontend/` | Next.js (auto) |

> Vercel detects the backend automatically from `go.mod` + `cmd/server/main.go`
> and runs it as a single server function that listens on `PORT`. No extra config.

---

## 1. Backend Go (`backend/`)

1. Import the repo into Vercel → set **Root Directory** = `backend/`.
2. Framework preset `go` should be auto-selected (it is pinned in `backend/vercel.json`).
3. Add the env vars below in the Vercel dashboard (Project → Settings → Environment Variables), for **Production** (and Preview).
4. Note the deployed URL, e.g. `https://portfolio-backend.vercel.app`.

**Env (see `backend/.env.example`):**

| Variable | Example | Notes |
|----------|---------|-------|
| `APPWRITE_ENDPOINT` | `https://fra.cloud.appwrite.io/v1` | no trailing slash |
| `APPWRITE_PROJECT_ID` | — | from Appwrite project |
| `APPWRITE_API_KEY` | — | **secret** |
| `APPWRITE_DATABASE_ID` | `portfolio` | |
| `APPWRITE_COLLECTION_PROJECTS` | `projects` | |
| `JWT_SECRET` | long random string | **secret**; signs admin JWTs |
| `ALLOWED_ORIGINS` | see below | comma-separated CORS regexes |

`ALLOWED_ORIGINS` example (order matters — broader patterns last):

```
https://samuelindrabastian\.me,https://www\.samuelindrabastian\.me,https://.*\.vercel\.app
```

## 2. Web admin (`admin/`)

1. Import → **Root Directory** = `admin/`. Next.js is auto-detected.
2. Env:
   - `API_URL` = the backend URL from step 1 (e.g. `https://portfolio-backend.vercel.app`), **no trailing slash**.
   - `AUTH_COOKIE` (optional, default `auth`).
3. Deploy. The dashboard login uses credentials stored in the Appwrite `admins`
   collection (`username` + bcrypt `passwordHash`), **not** a Vercel password.

## 3. Portfolio (`frontend/`)

1. Import → **Root Directory** = `frontend/`. Next.js auto-detected.
2. Env:
   - `NEXT_PUBLIC_BACKEND_URL` = the backend URL from step 1 (no trailing slash).
   - `NEXT_PUBLIC_SITE_URL` = the **final public domain**, e.g. `https://samuelindrabastian.me`
     (used by `sitemap.xml`, `robots.txt`, and canonical/OG metadata).
3. Deploy.

---

## Data flow

```
Browser → frontend/ (Vercel) ──server-side──▶ backend Go (Vercel) ──▶ Appwrite (DB + storage)
Browser → admin/   (Vercel) ──server-side──▶ backend Go (Vercel) ──▶ Appwrite
```

The browser only ever talks to its own Vercel app. Every cross-app request is
made **server-side** by the Next.js runtime, so `API_URL`,
`NEXT_PUBLIC_BACKEND_URL`, and `APPWRITE_API_KEY` never leak to the client.

Public endpoints used by the frontend:

| Method | Path | Auth |
|--------|------|------|
| GET | `/api/projects` | public |
| POST | `/api/contact-messages` | public |
| GET | `/api/health` | public |

---

## Post-deploy verification checklist

- [ ] `https://<backend>.vercel.app/api/health` → `{"ok":true,"service":"portfolio-backend"}`
- [ ] `https://<backend>.vercel.app/api/projects` → HTTP 200, non-empty `items`
      (proves Appwrite env + network are correct).
- [ ] Frontend `/api/projects` (same-origin) returns the same items (proxy works).
- [ ] Frontend `/projects` renders project cards; `/contact` submits successfully.
- [ ] Admin `/` unauthenticated → redirects to `/login`; login + dashboard CRUD works,
      including an image upload round-trip to Appwrite Storage.

## Env ringkas

- **frontend**: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_BACKEND_URL`
- **admin**: `API_URL` (`AUTH_COOKIE` opsional)
- **backend**: `APPWRITE_ENDPOINT`, `APPWRITE_PROJECT_ID`, `APPWRITE_API_KEY`,
  `APPWRITE_DATABASE_ID`, `APPWRITE_COLLECTION_PROJECTS`, `JWT_SECRET`, `ALLOWED_ORIGINS`

## Lokal

- Backend: `cd backend && go run ./cmd/server` → port 4000.
- Frontend / admin: `cd frontend && pnpm dev`, `cd admin && pnpm dev` (set env dulu).

---

## Analytics & Google Search Console (post-deploy)

Google Analytics (GitHub tag) is already wired into the **frontend** root layout
(`frontend/src/app/layout.tsx`) using `next/script afterInteractive`, so it fires
once on every public page without touching server-side rendering. ID: `G-DKBEH96EBY`.

Structured data (JSON-LD) is rendered server-side into the initial HTML for Google:
Person (name, birthDate, sameAs, jobTitle, knowsLanguage) and WebSite. A real OG
image (`og.png`, 1200x630) is served for social shares.

After deploying each Vercel project, do these once in [Google Search Console](https://search.google.com/search-console):

1. **Verify ownership** of the public domain (e.g. `https://samuelindrabastian.me`).
   Add a property via the *HTML tag* method: the `<meta name="google-site-verification"
   content="...">` tag belongs in `frontend/app/layout.tsx` `<head>`; or use the
   *DNS TXT* method (no code change). Domain verification also covers the `www` host.
2. **Submit the sitemap**: `https://<domain>/sitemap.xml` (generated by
   `frontend/src/app/sitemap.ts`). This tells Google every page: `/`, `/about`,
   `/projects`, `/profile`, `/contact`.
3. **Check coverage** after a few days: inspect URL inspection for the homepage,
   and re-request indexing for any page flagged as soft-404 / duplicate.
4. **Set the site language & country** in the property settings (`id`, Indonesia)
   to firm up local search.
5. **Monitor Analytics**: pages that receive traffic will surface queries; use the
   "Queries" report to find the search terms people use for your name.
6. (Optional, EEA) Under *Data controls* > Consent mode, you can turn on consent
   mode. It requires a consent management platform (CMP) to set `gtag('consent',
   ...)`; the plain tag above works without it.

> GA, JSON-LD, sitemap, and robots all read the public domain from the frontend env
> var `NEXT_PUBLIC_SITE_URL`. Set it to the final production domain (not
> localhost) or sitemap/OG/canonical URLs will point at the wrong host.