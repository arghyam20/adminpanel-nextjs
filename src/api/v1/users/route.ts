import { requirePermission } from "@/api/middlewares/permission.middleware";
import { userHandlers } from "@/api/modules/user/route/user.route";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "users.read");
  if (guard) return guard;
  return userHandlers.GET(request);
}
export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "users.create");
  if (guard) return guard;
  return userHandlers.POST(request);
}
export async function PUT(request: NextRequest) {
  const guard = await requirePermission(request, "users.update");
  if (guard) return guard;
  return userHandlers.PUT(request);
}
export async function DELETE(request: NextRequest) {
  const guard = await requirePermission(request, "users.delete");
  if (guard) return guard;
  return userHandlers.DELETE(request);
}
