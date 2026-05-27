import { requirePermission } from "@/api/middlewares/permission.middleware";
import { blogHandlers } from "@/api/modules/blog/route/blog.route";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "blogs.read");
  if (guard) return guard;
  return blogHandlers.GET(request);
}
export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "blogs.create");
  if (guard) return guard;
  return blogHandlers.POST(request);
}
export async function PUT(request: NextRequest) {
  const guard = await requirePermission(request, "blogs.update");
  if (guard) return guard;
  return blogHandlers.PUT(request);
}
export async function DELETE(request: NextRequest) {
  const guard = await requirePermission(request, "blogs.delete");
  if (guard) return guard;
  return blogHandlers.DELETE(request);
}
