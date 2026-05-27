import { created, fail, handleError, ok } from "@/lib/api-response";
import { parseQuery } from "@/lib/query";
import { serviceCategorySchema } from "@/validations/modules";
import type { ServiceCategoryService } from "../service/service-category.service";
import type { NextRequest } from "next/server";

export class ServiceCategoryController {
  constructor(private readonly service: ServiceCategoryService) {}
  async list(request: NextRequest) {
    try {
      const id = Number(request.nextUrl.searchParams.get("id"));
      if (id) return ok(await this.service.findById(id), "Service category fetched");
      const r = await this.service.paginate(parseQuery(request));
      return ok(r.items, "Service categories fetched", r.meta as never);
    } catch (e) { return this.handleServiceError(e); }
  }
  async create(request: NextRequest) {
    try {
      const parsed = serviceCategorySchema.safeParse(await request.json());
      if (!parsed.success) return fail("Validation failed", 422, parsed.error.flatten());
      return created(await this.service.create(parsed.data), "Service category created");
    } catch (e) { return this.handleServiceError(e); }
  }
  async update(request: NextRequest) {
    try {
      const id = Number(request.nextUrl.searchParams.get("id"));
      if (!id) return fail("Missing id", 400);
      const parsed = serviceCategorySchema.partial().safeParse(await request.json());
      if (!parsed.success) return fail("Validation failed", 422, parsed.error.flatten());
      return ok(await this.service.update(id, parsed.data), "Service category updated");
    } catch (e) { return this.handleServiceError(e); }
  }
  async remove(request: NextRequest) {
    try {
      const id = Number(request.nextUrl.searchParams.get("id"));
      if (!id) return fail("Missing id", 400);
      return ok(await this.service.softDelete(id), "Service category deleted");
    } catch (e) { return this.handleServiceError(e); }
  }
  private handleServiceError(e: unknown) {
    const err = e as { statusCode?: number; message?: string };
    if (err.statusCode) return fail(err.message ?? "Error", err.statusCode);
    return handleError(e);
  }
}
