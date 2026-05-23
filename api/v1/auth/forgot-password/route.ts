import crypto from "node:crypto";
import { NextRequest } from "next/server";
import { fail, handleError, ok } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { forgotPasswordSchema } from "@/validations/auth";

export async function POST(request: NextRequest) {
  try {
    const parsed = forgotPasswordSchema.safeParse(await request.json());
    if (!parsed.success) return fail("Validation failed", 422, parsed.error.flatten());

    const token = crypto.randomBytes(32).toString("hex");
    await prisma.user.updateMany({
      where: { email: parsed.data.email, deletedAt: null },
      data: { passwordResetToken: token, passwordResetExpiry: new Date(Date.now() + 1000 * 60 * 30) }
    });

    return ok({ resetToken: token }, "If the account exists, a reset token has been generated");
  } catch (error) {
    return handleError(error);
  }
}
