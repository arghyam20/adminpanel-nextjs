import { created, fail, handleError, ok } from "@/lib/api-response";
import { parseQuery } from "@/lib/query";
import { faqSchema } from "@/validations/modules";
import type { FaqService } from "../service/faq.service";
import type { NextRequest } from "next/server";

export class FaqController {
  constructor(private readonly service: FaqService) {}
  async list(request: NextRequest) {
    try { const r = await this.service.paginate(parseQuery(request)); return ok(r.items, "FAQs fetched", r.meta as never); }
    catch (e) { return handleError(e); }
  }
  async create(request: NextRequest) {
    try {
      const parsed = faqSchema.safeParse(await request.json());
      if (!parsed.success) return fail("Validation failed", 422, parsed.error.flatten());
      return created(await this.service.create(parsed.data), "FAQ created");
    } catch (e) { return handleError(e); }
  }
  async update(request: NextRequest) {
    try {
      const id = Number(request.nextUrl.searchParams.get("id"));
      if (!id) return fail("Missing id", 400);
      const parsed = faqSchema.partial().safeParse(await request.json());
      if (!parsed.success) return fail("Validation failed", 422, parsed.error.flatten());
      return ok(await this.service.update(id, parsed.data), "FAQ updated");
    } catch (e) { return this.handleServiceError(e); }
  }
  async remove(request: NextRequest) {
    try {
      const id = Number(request.nextUrl.searchParams.get("id"));
      if (!id) return fail("Missing id", 400);
      return ok(await this.service.softDelete(id), "FAQ deleted");
    } catch (e) { return this.handleServiceError(e); }
  }
  private handleServiceError(e: unknown) {
    const err = e as { statusCode?: number; message?: string };
    if (err.statusCode) return fail(err.message ?? "Error", err.statusCode);
    return handleError(e);
  }
}
