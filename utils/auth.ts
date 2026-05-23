import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { env } from "@/lib/env";

const secret = new TextEncoder().encode(env.JWT_SECRET);
export const authCookieName = "admin_access_token";

export type SessionUser = {
  id: number;
  email: string;
  name: string;
  role: string;
  permissions: Record<string, string[]>;
};

export async function createAccessToken(user: SessionUser) {
  return new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);
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
