import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { createAccessToken, createRefreshToken } from "@/lib/auth";
import { setAuthCookie, setRefreshCookie } from "@/lib/cookies";
import { prisma } from "@/lib/prisma";
import { fail, handleError } from "@/lib/api-response";
import { loginSchema } from "@/validations/auth";

export async function POST(request: NextRequest) {
  try {
    const parsed = loginSchema.safeParse(await request.json());
    if (!parsed.success) return fail("Validation failed", 422, parsed.error.flatten());

    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
      include: { role: true }
    });

    if (!user || user.deletedAt || user.status !== "ACTIVE") return fail("Invalid credentials", 401);
    const validPassword = await bcrypt.compare(parsed.data.password, user.password);
    if (!validPassword) return fail("Invalid credentials", 401);

    const sessionUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role.slug,
      permissions: user.role.permissions as Record<string, string[]>
    };
    const token = await createAccessToken(sessionUser);
    const refreshToken = await createRefreshToken(sessionUser);

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      data: { id: user.id, name: user.name, email: user.email, role: user.role.name }
    });
    setAuthCookie(response, token);
    setRefreshCookie(response, refreshToken);
    return response;
  } catch (error) {
    return handleError(error);
  }
}
