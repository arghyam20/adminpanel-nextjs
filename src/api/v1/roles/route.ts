import { requirePermission } from "@/api/middlewares/permission.middleware";
import { roleHandlers } from "@/api/modules/role/route/role.route";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "roles.read");
  if (guard) return guard;
  return roleHandlers.GET(request);
}
export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "roles.create");
  if (guard) return guard;
  return roleHandlers.POST(request);
}
export async function PUT(request: NextRequest) {
  const guard = await requirePermission(request, "roles.update");
  if (guard) return guard;
  return roleHandlers.PUT(request);
}
export async function DELETE(request: NextRequest) {
  const guard = await requirePermission(request, "roles.delete");
  if (guard) return guard;
  return roleHandlers.DELETE(request);
}
