import { requirePermission } from "@/api/middlewares/permission.middleware";
import { serviceHandlers } from "@/api/modules/service/route/service.route";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "services.read");
  if (guard) return guard;
  return serviceHandlers.GET(request);
}
export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "services.create");
  if (guard) return guard;
  return serviceHandlers.POST(request);
}
export async function PUT(request: NextRequest) {
  const guard = await requirePermission(request, "services.update");
  if (guard) return guard;
  return serviceHandlers.PUT(request);
}
export async function DELETE(request: NextRequest) {
  const guard = await requirePermission(request, "services.delete");
  if (guard) return guard;
  return serviceHandlers.DELETE(request);
}
