import { requirePermission } from "@/api/middlewares/permission.middleware";
import { faqHandlers } from "@/api/modules/faq/route/faq.route";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "faqs.read");
  if (guard) return guard;
  return faqHandlers.GET(request);
}
export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "faqs.create");
  if (guard) return guard;
  return faqHandlers.POST(request);
}
export async function PUT(request: NextRequest) {
  const guard = await requirePermission(request, "faqs.update");
  if (guard) return guard;
  return faqHandlers.PUT(request);
}
export async function DELETE(request: NextRequest) {
  const guard = await requirePermission(request, "faqs.delete");
  if (guard) return guard;
  return faqHandlers.DELETE(request);
}
