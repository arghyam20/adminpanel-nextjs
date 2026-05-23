import { NextResponse } from "next/server";
import { authCookieName } from "@/lib/auth";
import { env } from "@/lib/env";

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set(authCookieName, token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production" || env.APP_URL.startsWith("https://"),
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 2
  });
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.set(authCookieName, "", {
    httpOnly: true,
    secure: env.NODE_ENV === "production" || env.APP_URL.startsWith("https://"),
    sameSite: "strict",
    path: "/",
    maxAge: 0
  });
}
