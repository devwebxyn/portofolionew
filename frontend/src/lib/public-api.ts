export function publicApi(path: "/api/projects" | "/api/contact-messages", options?: RequestInit) {
  const base = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000").replace(/\/+$/, "");
  return fetch(base + path, {
    ...options,
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(6500),
  });
}
