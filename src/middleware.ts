import { NextResponse, type NextRequest } from "next/server";

import { authCookieName, verifyAccessToken } from "@/lib/auth";

const PUBLIC_PATHS = ["/login", "/forgot-password", "/reset-password"];
const DASHBOARD_PREFIX = "/dashboard";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API routes handle their own auth — skip
  if (pathname.startsWith("/api/")) return NextResponse.next();

  const token = request.cookies.get(authCookieName)?.value;
  const session = await verifyAccessToken(token);

  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));
  const isDashboard = pathname.startsWith(DASHBOARD_PREFIX);

  if (isDashboard && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublic && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|uploads/).*)"],
};
