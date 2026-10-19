import { cookies } from "next/headers";

export const API_URL = process.env.API_URL?.replace(/\/+$/, "") || "";
export const AUTH_COOKIE = process.env.AUTH_COOKIE || "auth";

/** Respons JSON dari backend — objek datar (bukan array). */
export type Body = Record<string, unknown> | null;

export function apiMissingError() {
  return {
    status: 500 as const,
    body: { ok: false as const, error: "API_URL belum dikonfigurasi di server." },
  };
}

export async function authToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(AUTH_COOKIE)?.value ?? null;
}

/** Server-side proxy ke backend Go. Baca cookie, forward sebagai Authorization Bearer. */
export async function proxy(
  path: string,
  init?: RequestInit
): Promise<{ status: number; body: Body }> {
  if (!API_URL) return apiMissingError();
  const headers = new Headers(init?.headers);
  const token = await authToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers,
      cache: "no-store",
    });
    let body: Body = null;
    try {
      body = (await res.json()) as Body;
    } catch {
      /* respons non-JSON */
    }
    return { status: res.status, body };
  } catch {
    return { status: 502, body: { ok: false, error: "Gagal terhubung ke backend." } };
  }
}

export function json(body: unknown, status = 200) {
  return Response.json(body, { status });
}
