import { authCookieName, refreshCookieName } from "@/lib/auth";
import { env } from "@/lib/env";

import type { NextResponse } from "next/server";

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set(authCookieName, token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production" || env.APP_URL.startsWith("https://"),
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 2,
  });
}

export function setRefreshCookie(response: NextResponse, token: string) {
  response.cookies.set(refreshCookieName, token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production" || env.APP_URL.startsWith("https://"),
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.set(authCookieName, "", {
    httpOnly: true,
    secure: env.NODE_ENV === "production" || env.APP_URL.startsWith("https://"),
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  response.cookies.set(refreshCookieName, "", {
    httpOnly: true,
    secure: env.NODE_ENV === "production" || env.APP_URL.startsWith("https://"),
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}
