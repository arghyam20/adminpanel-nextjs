import bcrypt from "bcryptjs";
import { NextResponse, type NextRequest } from "next/server";

import { fail, handleError } from "@/lib/api-response";
import { setAuthCookie, setRefreshCookie } from "@/lib/cookies";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/validations/auth";

import { issueAuthSession, setNoStore, toSafeUser } from "../_utils";

export async function POST(request: NextRequest) {
  try {
    const parsed = loginSchema.safeParse(await request.json());
    if (!parsed.success) return fail("Validation failed", 422, parsed.error.flatten());

    const user = await prisma.user.findFirst({
      where: { email: parsed.data.email, isDeleted: false },
      include: { role: true },
    });

    if (user?.status !== "ACTIVE") return fail("Invalid credentials", 401);
    const validPassword = await bcrypt.compare(parsed.data.password, user.password);
    if (!validPassword) return fail("Invalid credentials", 401);

    const { accessToken, refreshToken } = await issueAuthSession(request, user);

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      data: toSafeUser(user),
    });
    setAuthCookie(response, accessToken);
    setRefreshCookie(response, refreshToken);
    return setNoStore(response);
  } catch (error) {
    return handleError(error);
  }
}
