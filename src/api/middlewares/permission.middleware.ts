
import { fail } from "@/lib/api-response";
import { can, getRequestSession } from "@/lib/auth";

import type { NextRequest } from "next/server";

export async function requirePermission(request: NextRequest, permission: string) {
  const session = await getRequestSession(request);
  if (!session) return fail("Unauthorized", 401);
  if (!can(session, permission)) return fail("Forbidden", 403);
  return null;
}
