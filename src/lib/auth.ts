import { jwtVerify, SignJWT, type JWTPayload } from "jose";
import { cookies } from "next/headers";

import { env } from "@/lib/env";
import { hasPermission } from "@/lib/rbac";

import type { NextRequest } from "next/server";

const secret = new TextEncoder().encode(env.JWT_SECRET);
const refreshSecret = new TextEncoder().encode(env.JWT_REFRESH_SECRET);
const tokenPepper = new TextEncoder().encode(env.COOKIE_SECRET);
export const authCookieName = "admin_access_token";
export const refreshCookieName = "admin_refresh_token";

export interface SessionUser {
  id: number;
  email: string;
  name: string;
  role: string;
  permissions: Record<string, string[]>;
  sessionId: string;
}

export async function createAccessToken(user: SessionUser) {
  return new SignJWT(user as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secret);
}

export interface RefreshTokenPayload {
  id: number;
  email: string;
  role: string;
  sessionId: string;
}

export async function createRefreshToken(user: RefreshTokenPayload) {
  return new SignJWT(user as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setJti(globalThis.crypto.randomUUID())
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(refreshSecret);
}

export async function hashToken(token: string) {
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    tokenPepper,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(token)
  );
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyAccessToken(token?: string) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as SessionUser;
  } catch {
    return null;
  }
}

export async function verifyRefreshToken(token?: string) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, refreshSecret);
    return payload as unknown as RefreshTokenPayload;
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  return verifyAccessToken(cookieStore.get(authCookieName)?.value);
}

export async function getRequestSession(request: NextRequest) {
  return verifyAccessToken(request.cookies.get(authCookieName)?.value);
}

export function can(user: SessionUser | null, permission: string) {
  return hasPermission(user, permission);
}
