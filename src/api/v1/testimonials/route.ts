import { requirePermission } from "@/api/middlewares/permission.middleware";
import { testimonialHandlers } from "@/api/modules/testimonial/route/testimonial.route";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "testimonials.read");
  if (guard) return guard;
  return testimonialHandlers.GET(request);
}
export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "testimonials.create");
  if (guard) return guard;
  return testimonialHandlers.POST(request);
}
export async function PUT(request: NextRequest) {
  const guard = await requirePermission(request, "testimonials.update");
  if (guard) return guard;
  return testimonialHandlers.PUT(request);
}
export async function DELETE(request: NextRequest) {
  const guard = await requirePermission(request, "testimonials.delete");
  if (guard) return guard;
  return testimonialHandlers.DELETE(request);
}
