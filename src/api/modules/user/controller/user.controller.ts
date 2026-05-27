import { created, fail, handleError, ok } from "@/lib/api-response";
import { parseQuery } from "@/lib/query";
import { userSchema } from "@/validations/modules";

import type { UserService } from "../service/user.service";

import type { NextRequest } from "next/server";

export class UserController {
  constructor(private readonly service: UserService) {}

  async list(request: NextRequest) {
    try {
      const result = await this.service.paginate(parseQuery(request));
      return ok(result.items, "Users fetched", result.meta as never);
    } catch (e) { return handleError(e); }
  }

  async show(request: NextRequest) {
    try {
      const id = Number(request.nextUrl.searchParams.get("id"));
      if (!id) return fail("Missing id", 400);
      const user = await this.service.findById(id);
      if (!user) return fail("User not found", 404);
      return ok(user, "User fetched");
    } catch (e) { return this.handleServiceError(e); }
  }

  async create(request: NextRequest) {
    try {
      const parsed = userSchema.safeParse(await request.json());
      if (!parsed.success) return fail("Validation failed", 422, parsed.error.flatten());
      return created(await this.service.create(parsed.data), "User created");
    } catch (e) { return this.handleServiceError(e); }
  }

  async update(request: NextRequest) {
    try {
      const id = Number(request.nextUrl.searchParams.get("id"));
      if (!id) return fail("Missing id", 400);
      const parsed = userSchema.partial().safeParse(await request.json());
      if (!parsed.success) return fail("Validation failed", 422, parsed.error.flatten());
      return ok(await this.service.update(id, parsed.data), "User updated");
    } catch (e) { return this.handleServiceError(e); }
  }

  async remove(request: NextRequest) {
    try {
      const id = Number(request.nextUrl.searchParams.get("id"));
      if (!id) return fail("Missing id", 400);
      return ok(await this.service.softDelete(id), "User deleted");
    } catch (e) { return this.handleServiceError(e); }
  }

  private handleServiceError(e: unknown) {
    const err = e as { statusCode?: number; message?: string };
    if (err.statusCode) return fail(err.message ?? "Error", err.statusCode);
    return handleError(e);
  }
}
