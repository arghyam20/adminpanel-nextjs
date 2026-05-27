import crypto from "node:crypto";

import { fail, handleError, ok } from "@/lib/api-response";
import { hashToken } from "@/lib/auth";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { forgotPasswordSchema } from "@/validations/auth";

import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const parsed = forgotPasswordSchema.safeParse(await request.json());
    if (!parsed.success) return fail("Validation failed", 422, parsed.error.flatten());

    const token = crypto.randomBytes(32).toString("hex");
    await prisma.user.updateMany({
      where: { email: parsed.data.email, isDeleted: false },
      data: {
        passwordResetToken: await hashToken(token),
        passwordResetExpiry: new Date(Date.now() + 1000 * 60 * 30),
      },
    });

    return ok(
      env.NODE_ENV === "production" ? null : { resetToken: token },
      "If the account exists, a password reset email will be sent"
    );
  } catch (error) {
    return handleError(error);
  }
}
