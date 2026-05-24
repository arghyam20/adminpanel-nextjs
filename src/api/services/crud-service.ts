import { z } from "zod";
import { NextRequest } from "next/server";
import { created, fail, handleError, ok } from "@/lib/api-response";
import { requirePermission } from "@/api/middlewares/permission.middleware";
import { parseQuery } from "@/lib/query";

type CrudRepository = {
  paginate(options: ReturnType<typeof parseQuery>, include?: object): Promise<{ items: unknown[]; meta: unknown }>;
  findById(id: number, include?: object): Promise<unknown | null>;
  create(data: object): Promise<unknown>;
  update(id: number, data: object): Promise<unknown>;
  softDelete(id: number): Promise<unknown>;
};

export type CrudConfig = {
  resource: string;
  repository: CrudRepository;
  schema: z.AnyZodObject;
  include?: object;
  beforeCreate?: (data: object, request: NextRequest) => Promise<object> | object;
  beforeUpdate?: (data: object, request: NextRequest) => Promise<object> | object;
};

export function buildCrudHandlers(config: CrudConfig) {
  return {
    GET: async (request: NextRequest) => {
      try {
        const forbidden = await requirePermission(request, `${config.resource}.read`);
        if (forbidden) return forbidden;
        const result = await config.repository.paginate(parseQuery(request), config.include);
        return ok(result.items, "Records fetched", result.meta as never);
      } catch (error) {
        return handleError(error);
      }
    },
    POST: async (request: NextRequest) => {
      try {
        const forbidden = await requirePermission(request, `${config.resource}.create`);
        if (forbidden) return forbidden;
        const parsed = config.schema.safeParse(await request.json());
        if (!parsed.success) return fail("Validation failed", 422, parsed.error.flatten());
        const data = config.beforeCreate ? await config.beforeCreate(parsed.data, request) : parsed.data;
        return created(await config.repository.create(data), "Record created");
      } catch (error) {
        return handleError(error);
      }
    },
    PUT: async (request: NextRequest) => {
      try {
        const forbidden = await requirePermission(request, `${config.resource}.update`);
        if (forbidden) return forbidden;
        const id = Number(request.nextUrl.searchParams.get("id"));
        if (!id) return fail("Missing id", 400);
        const parsed = config.schema.partial().safeParse(await request.json());
        if (!parsed.success) return fail("Validation failed", 422, parsed.error.flatten());
        const data = config.beforeUpdate ? await config.beforeUpdate(parsed.data, request) : parsed.data;
        return ok(await config.repository.update(id, data), "Record updated");
      } catch (error) {
        return handleError(error);
      }
    },
    DELETE: async (request: NextRequest) => {
      try {
        const forbidden = await requirePermission(request, `${config.resource}.delete`);
        if (forbidden) return forbidden;
        const id = Number(request.nextUrl.searchParams.get("id"));
        if (!id) return fail("Missing id", 400);
        return ok(await config.repository.softDelete(id), "Record deleted");
      } catch (error) {
        return handleError(error);
      }
    }
  };
}
