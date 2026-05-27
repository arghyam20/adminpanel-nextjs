import bcrypt from "bcryptjs";
import { type NextRequest } from "next/server";

import { requirePermission } from "@/api/middlewares/permission.middleware";
import { created, fail, handleError } from "@/lib/api-response";
import { setAuthCookie, setRefreshCookie } from "@/lib/cookies";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/validations/auth";

import { issueAuthSession, setNoStore, toSafeUser } from "../_utils";

export async function POST(request: NextRequest) {
  try {
    const hasUsers = await prisma.user.count({ where: { isDeleted: false } });
    if (hasUsers > 0) {
      const guard = await requirePermission(request, "users.create");
      if (guard) return guard;
    }

    const parsed = registerSchema.safeParse(await request.json());
    if (!parsed.success) return fail("Validation failed", 422, parsed.error.flatten());

    const role = await prisma.role.findFirst({
      where: { id: parsed.data.roleId, status: "ACTIVE", isDeleted: false },
    });
    if (!role) return fail("Role not found", 404);

    const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (existing && !existing.isDeleted) return fail("Email already registered", 409);

    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        roleId: parsed.data.roleId,
        password: await bcrypt.hash(parsed.data.password, 12),
        status: "ACTIVE",
      },
      include: { role: true },
    });

    const { accessToken, refreshToken } = await issueAuthSession(request, user);
    const response = created(toSafeUser(user), "Registration successful");
    setAuthCookie(response, accessToken);
    setRefreshCookie(response, refreshToken);
    return setNoStore(response);
  } catch (error) {
    return handleError(error);
  }
}
