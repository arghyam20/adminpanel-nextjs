import { NextResponse, type NextRequest } from "next/server";

import { fail, handleError } from "@/lib/api-response";
import {
  createAccessToken,
  createRefreshToken,
  hashToken,
  refreshCookieName,
  verifyRefreshToken,
} from "@/lib/auth";
import { clearAuthCookie, setAuthCookie, setRefreshCookie } from "@/lib/cookies";
import { prisma } from "@/lib/prisma";

import { buildSessionUser, getRequestIp, getSessionExpiry, setNoStore } from "../_utils";

export async function POST(request: NextRequest) {
  try {
    const presentedToken = request.cookies.get(refreshCookieName)?.value;
    const payload = await verifyRefreshToken(presentedToken);
    if (!payload) return fail("Invalid refresh token", 401);

    const user = await prisma.user.findFirst({
      where: { id: payload.id, isDeleted: false },
      include: { role: true },
    });

    if (user?.status !== "ACTIVE") return fail("Invalid session", 401);

    const session = await prisma.authSession.findFirst({
      where: {
        id: payload.sessionId,
        userId: user.id,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
    });

    if (
      !session ||
      !presentedToken ||
      session.refreshTokenHash !== (await hashToken(presentedToken))
    ) {
      if (payload.sessionId) {
        await prisma.authSession.updateMany({
          where: { id: payload.sessionId, revokedAt: null },
          data: { revokedAt: new Date() },
        });
      }
      const response = fail("Invalid session", 401);
      clearAuthCookie(response);
      return setNoStore(response);
    }

    const refreshToken = await createRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role.slug,
      sessionId: session.id,
    });
    const token = await createAccessToken(buildSessionUser(user, session.id));

    await prisma.authSession.update({
      where: { id: session.id },
      data: {
        refreshTokenHash: await hashToken(refreshToken),
        userAgent: request.headers.get("user-agent"),
        ipAddress: getRequestIp(request),
        expiresAt: getSessionExpiry(),
      },
    });

    const response = NextResponse.json({
      success: true,
      message: "Session refreshed",
      data: null,
    });
    setAuthCookie(response, token);
    setRefreshCookie(response, refreshToken);
    return setNoStore(response);
  } catch (error) {
    return handleError(error);
  }
}
