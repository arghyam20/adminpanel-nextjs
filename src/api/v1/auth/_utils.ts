import { createAccessToken, createRefreshToken, hashToken, type SessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import type { Role, User } from "@prisma/client";
import type { NextRequest, NextResponse } from "next/server";

const REFRESH_TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 7;

export function getSessionExpiry() {
  return new Date(Date.now() + REFRESH_TOKEN_TTL_MS);
}

export function getRequestIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    null
  );
}

export function buildSessionUser(user: User & { role: Role }, sessionId: string): SessionUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role.slug,
    permissions: user.role.permissions as Record<string, string[]>,
    sessionId,
  };
}

export async function issueAuthSession(request: NextRequest, user: User & { role: Role }) {
  const sessionId = globalThis.crypto.randomUUID();
  const refreshToken = await createRefreshToken({
    id: user.id,
    email: user.email,
    role: user.role.slug,
    sessionId,
  });

  await prisma.authSession.create({
    data: {
      id: sessionId,
      userId: user.id,
      refreshTokenHash: await hashToken(refreshToken),
      userAgent: request.headers.get("user-agent"),
      ipAddress: getRequestIp(request),
      expiresAt: getSessionExpiry(),
    },
  });

  return {
    accessToken: await createAccessToken(buildSessionUser(user, sessionId)),
    refreshToken,
  };
}

export function toSafeUser(user: User & { role: Role }) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role.name,
    roleSlug: user.role.slug,
    permissions: user.role.permissions,
  };
}

export function setNoStore(response: NextResponse) {
  response.headers.set("Cache-Control", "no-store");
  return response;
}
