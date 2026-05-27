import bcrypt from "bcryptjs";

import { fail, handleError, ok } from "@/lib/api-response";
import { getRequestSession } from "@/lib/auth";
import { clearAuthCookie } from "@/lib/cookies";
import { prisma } from "@/lib/prisma";
import { changePasswordSchema } from "@/validations/auth";

import { setNoStore } from "../_utils";

import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getRequestSession(request);
    if (!session) return fail("Unauthorized", 401);

    const parsed = changePasswordSchema.safeParse(await request.json());
    if (!parsed.success) return fail("Validation failed", 422, parsed.error.flatten());

    const user = await prisma.user.findFirst({
      where: { id: session.id, isDeleted: false, status: "ACTIVE" },
    });
    if (!user) return fail("Unauthorized", 401);

    const validPassword = await bcrypt.compare(parsed.data.currentPassword, user.password);
    if (!validPassword) return fail("Current password is incorrect", 400);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: await bcrypt.hash(parsed.data.newPassword, 12),
        sessions: {
          updateMany: {
            where: { revokedAt: null },
            data: { revokedAt: new Date() },
          },
        },
      },
    });

    const response = ok(null, "Password changed. Please sign in again.");
    clearAuthCookie(response);
    return setNoStore(response);
  } catch (error) {
    return handleError(error);
  }
}
