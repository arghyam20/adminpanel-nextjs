import { NextResponse, type NextRequest } from "next/server";

import { applySecurityHeaders } from "@/api/middlewares/security-headers.middleware";
import { can, getRequestSession } from "@/lib/auth";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/login", "/forgot-password", "/reset-password"];
const routePermissions: [string, string][] = [
  ["/dashboard/roles", "roles.read"],
  ["/dashboard/users", "users.read"],
  ["/dashboard/categories", "categories.read"],
  ["/dashboard/faqs", "faqs.read"],
  ["/dashboard/testimonials", "testimonials.read"],
  ["/dashboard/blogs", "blogs.read"],
  ["/dashboard/service-categories", "serviceCategories.read"],
  ["/dashboard/services", "services.read"],
  ["/dashboard", "dashboard.read"],
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getRequestSession(request);

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const requiredPermission = routePermissions.find(([route]) => pathname.startsWith(route))?.[1];
  if (session && requiredPermission && !can(session, requiredPermission)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (authRoutes.includes(pathname) && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/forgot-password", "/reset-password"],
};
