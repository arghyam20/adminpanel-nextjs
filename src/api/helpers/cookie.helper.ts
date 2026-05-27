import { env } from "@/lib/env";

import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import type { NextRequest, NextResponse } from "next/server";

export function secureCookieOptions(
  maxAge: number,
  overrides: Partial<ResponseCookie> = {}
): Partial<ResponseCookie> {
  return {
    httpOnly: true,
    secure: env.NODE_ENV === "production" || env.APP_URL.startsWith("https://"),
    sameSite: "strict",
    path: "/",
    maxAge,
    ...overrides,
  };
}

export function setCookie(
  response: NextResponse,
  name: string,
  value: string,
  maxAge: number,
  options?: Partial<ResponseCookie>
) {
  response.cookies.set(name, value, secureCookieOptions(maxAge, options));
  return response;
}

export function clearCookie(response: NextResponse, name: string) {
  response.cookies.set(name, "", secureCookieOptions(0));
  return response;
}

export function getRequestCookie(request: NextRequest, name: string) {
  return request.cookies.get(name)?.value;
}
