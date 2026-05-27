import { created, fail, handleError, ok } from "@/lib/api-response";
import { parseQuery } from "@/lib/query";
import { blogSchema } from "@/validations/modules";
import type { BlogService } from "../service/blog.service";
import type { NextRequest } from "next/server";

export class BlogController {
  constructor(private readonly service: BlogService) {}
  async list(request: NextRequest) {
    try {
      const id = Number(request.nextUrl.searchParams.get("id"));
      if (id) return ok(await this.service.findById(id), "Blog fetched");
      const r = await this.service.paginate(parseQuery(request));
      return ok(r.items, "Blogs fetched", r.meta as never);
    } catch (e) {
      return this.handleServiceError(e);
    }
  }
  async create(request: NextRequest) {
    try {
      const parsed = blogSchema.safeParse(await request.json());
      if (!parsed.success) return fail("Validation failed", 422, parsed.error.flatten());
      return created(await this.service.create(parsed.data), "Blog created");
    } catch (e) {
      return this.handleServiceError(e);
    }
  }
  async update(request: NextRequest) {
    try {
      const id = Number(request.nextUrl.searchParams.get("id"));
      if (!id) return fail("Missing id", 400);
      const parsed = blogSchema.partial().safeParse(await request.json());
      if (!parsed.success) return fail("Validation failed", 422, parsed.error.flatten());
      return ok(await this.service.update(id, parsed.data), "Blog updated");
    } catch (e) {
      return this.handleServiceError(e);
    }
  }
  async remove(request: NextRequest) {
    try {
      const id = Number(request.nextUrl.searchParams.get("id"));
      if (!id) return fail("Missing id", 400);
      return ok(await this.service.softDelete(id), "Blog deleted");
    } catch (e) {
      return this.handleServiceError(e);
    }
  }
  private handleServiceError(e: unknown) {
    const err = e as { statusCode?: number; message?: string };
    if (err.statusCode) return fail(err.message ?? "Error", err.statusCode);
    return handleError(e);
  }
}
