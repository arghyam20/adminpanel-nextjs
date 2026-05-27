import { created, fail, handleError, ok } from "@/lib/api-response";
import { parseQuery } from "@/lib/query";
import { roleSchema } from "@/validations/modules";

import type { RoleService } from "../service/role.service";

import type { NextRequest } from "next/server";

export class RoleController {
  constructor(private readonly service: RoleService) {}

  async list(request: NextRequest) {
    try {
      const result = await this.service.paginate(parseQuery(request));
      return ok(result.items, "Roles fetched", result.meta as never);
    } catch (e) {
      return handleError(e);
    }
  }

  async show(request: NextRequest) {
    try {
      const id = Number(request.nextUrl.searchParams.get("id"));
      if (!id) return fail("Missing id", 400);
      const role = await this.service.findById(id);
      if (!role) return fail("Role not found", 404);
      return ok(role, "Role fetched");
    } catch (e) {
      return this.handleServiceError(e);
    }
  }

  async create(request: NextRequest) {
    try {
      const parsed = roleSchema.safeParse(await request.json());
      if (!parsed.success) return fail("Validation failed", 422, parsed.error.flatten());
      return created(await this.service.create(parsed.data), "Role created");
    } catch (e) {
      return this.handleServiceError(e);
    }
  }

  async update(request: NextRequest) {
    try {
      const id = Number(request.nextUrl.searchParams.get("id"));
      if (!id) return fail("Missing id", 400);
      const parsed = roleSchema.partial().safeParse(await request.json());
      if (!parsed.success) return fail("Validation failed", 422, parsed.error.flatten());
      return ok(await this.service.update(id, parsed.data), "Role updated");
    } catch (e) {
      return this.handleServiceError(e);
    }
  }

  async remove(request: NextRequest) {
    try {
      const id = Number(request.nextUrl.searchParams.get("id"));
      if (!id) return fail("Missing id", 400);
      return ok(await this.service.softDelete(id), "Role deleted");
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
