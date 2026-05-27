import { requirePermission } from "@/api/middlewares/permission.middleware";
import { categoryHandlers } from "@/api/modules/category/route/category.route";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "categories.read");
  if (guard) return guard;
  return categoryHandlers.GET(request);
}
export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "categories.create");
  if (guard) return guard;
  return categoryHandlers.POST(request);
}
export async function PUT(request: NextRequest) {
  const guard = await requirePermission(request, "categories.update");
  if (guard) return guard;
  return categoryHandlers.PUT(request);
}
export async function DELETE(request: NextRequest) {
  const guard = await requirePermission(request, "categories.delete");
  if (guard) return guard;
  return categoryHandlers.DELETE(request);
}
