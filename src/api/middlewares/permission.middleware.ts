import { NextRequest } from "next/server";
import { fail } from "@/lib/api-response";
import { can, getRequestSession } from "@/lib/auth";

export async function requirePermission(request: NextRequest, permission: string) {
  const session = await getRequestSession(request);
  if (!session) return fail("Unauthorized", 401);
  if (!can(session, permission)) return fail("Forbidden", 403);
  return null;
}
