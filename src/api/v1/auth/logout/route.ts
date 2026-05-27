import { NextResponse, type NextRequest } from "next/server";

import { verifyRefreshToken, refreshCookieName } from "@/lib/auth";
import { clearAuthCookie } from "@/lib/cookies";
import { prisma } from "@/lib/prisma";

import { setNoStore } from "../_utils";

export async function POST(request: NextRequest) {
  const payload = await verifyRefreshToken(request.cookies.get(refreshCookieName)?.value);
  if (payload?.sessionId) {
    await prisma.authSession.updateMany({
      where: { id: payload.sessionId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  const response = NextResponse.json({ success: true, message: "Logged out" });
  clearAuthCookie(response);
  return setNoStore(response);
}
