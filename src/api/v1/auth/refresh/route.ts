import { NextResponse, type NextRequest } from "next/server";

import { fail, handleError } from "@/lib/api-response";
import { createAccessToken, refreshCookieName, verifyRefreshToken } from "@/lib/auth";
import { setAuthCookie } from "@/lib/cookies";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const payload = await verifyRefreshToken(request.cookies.get(refreshCookieName)?.value);
    if (!payload) return fail("Invalid refresh token", 401);

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      include: { role: true }
    });

    if (!user || user.deletedAt || user.status !== "ACTIVE") return fail("Invalid session", 401);

    const token = await createAccessToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role.slug,
      permissions: user.role.permissions as Record<string, string[]>
    });

    const response = NextResponse.json({
      success: true,
      message: "Session refreshed",
      data: null
    });
    setAuthCookie(response, token);
    return response;
  } catch (error) {
    return handleError(error);
  }
}
