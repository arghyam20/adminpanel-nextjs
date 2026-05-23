import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { fail, handleError, ok } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { resetPasswordSchema } from "@/validations/auth";

export async function POST(request: NextRequest) {
  try {
    const parsed = resetPasswordSchema.safeParse(await request.json());
    if (!parsed.success) return fail("Validation failed", 422, parsed.error.flatten());

    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: parsed.data.token,
        passwordResetExpiry: { gt: new Date() },
        deletedAt: null
      }
    });
    if (!user) return fail("Invalid or expired token", 400);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: await bcrypt.hash(parsed.data.password, 12),
        passwordResetToken: null,
        passwordResetExpiry: null
      }
    });

    return ok(null, "Password reset successful");
  } catch (error) {
    return handleError(error);
  }
}
