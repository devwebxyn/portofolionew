#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
tmp="$(mktemp -d)"
pids=()
cleanup() {
  for pid in "${pids[@]}"; do kill "$pid" 2>/dev/null || true; done
  rm -rf "$tmp"
}
trap cleanup EXIT
(cd backend && go build -o "$tmp/go-api" ./cmd/server)
node tests/appwrite-fixture.mjs & pids+=("$!")
APPWRITE_ENDPOINT=http://localhost:4100/v1 APPWRITE_PROJECT_ID=local APPWRITE_API_KEY=fixture-key \
  APPWRITE_DATABASE_ID=local APPWRITE_COLLECTION_PROJECTS=projects JWT_SECRET=local-fixture-not-a-secret \
  PORT=4101 "$tmp/go-api" & pids+=("$!")
(cd frontend && NEXT_PUBLIC_BACKEND_URL=http://localhost:4101 exec node node_modules/next/dist/bin/next start -H localhost -p 3100) & pids+=("$!")
(cd admin && API_URL=http://localhost:4101 exec node node_modules/next/dist/bin/next start -H localhost -p 3101) & pids+=("$!")
node tests/smoke.mjs
