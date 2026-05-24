import { jwtVerify, SignJWT, type JWTPayload } from "jose";
import { cookies } from "next/headers";

import { env } from "@/lib/env";

import type { NextRequest } from "next/server";

const secret = new TextEncoder().encode(env.JWT_SECRET);
const refreshSecret = new TextEncoder().encode(env.JWT_REFRESH_SECRET);
export const authCookieName = "admin_access_token";
export const refreshCookieName = "admin_refresh_token";

export interface SessionUser {
  id: number;
  email: string;
  name: string;
  role: string;
  permissions: Record<string, string[]>;
}

export async function createAccessToken(user: SessionUser) {
  return new SignJWT(user as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);
}

export async function createRefreshToken(user: Pick<SessionUser, "id" | "email" | "role">) {
  return new SignJWT(user as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(refreshSecret);
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
    return payload as unknown as Pick<SessionUser, "id" | "email" | "role">;
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
  if (!user) return false;
  const [resource, action] = permission.split(".");
  return Boolean(user.permissions?.[resource]?.includes(action));
}
