import { requirePermission } from "@/api/middlewares/permission.middleware";
import { serviceCategoryHandlers } from "@/api/modules/service-category/route/service-category.route";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "service-categories.read");
  if (guard) return guard;
  return serviceCategoryHandlers.GET(request);
}
export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "service-categories.create");
  if (guard) return guard;
  return serviceCategoryHandlers.POST(request);
}
export async function PUT(request: NextRequest) {
  const guard = await requirePermission(request, "service-categories.update");
  if (guard) return guard;
  return serviceCategoryHandlers.PUT(request);
}
export async function DELETE(request: NextRequest) {
  const guard = await requirePermission(request, "service-categories.delete");
  if (guard) return guard;
  return serviceCategoryHandlers.DELETE(request);
}
