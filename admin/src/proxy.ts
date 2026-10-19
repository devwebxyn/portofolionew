import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = process.env.AUTH_COOKIE || "auth";

export function proxy(request: NextRequest) {
  const hasToken = Boolean(request.cookies.get(AUTH_COOKIE)?.value);
  if (!hasToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login|api|_next/static|_next/image|.*\\..*).*)"],
};
