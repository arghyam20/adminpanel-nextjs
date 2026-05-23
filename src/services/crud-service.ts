import { z } from "zod";
import { NextRequest } from "next/server";
import { created, fail, handleError, ok } from "@/lib/api-response";
import { can, getRequestSession } from "@/lib/auth";
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

async function authorize(request: NextRequest, permission: string) {
  const session = await getRequestSession(request);
  return can(session, permission);
}

export function buildCrudHandlers(config: CrudConfig) {
  return {
    GET: async (request: NextRequest) => {
      try {
        if (!(await authorize(request, `${config.resource}.read`))) return fail("Forbidden", 403);
        const result = await config.repository.paginate(parseQuery(request), config.include);
        return ok(result.items, "Records fetched", result.meta as never);
      } catch (error) {
        return handleError(error);
      }
    },
    POST: async (request: NextRequest) => {
      try {
        if (!(await authorize(request, `${config.resource}.create`))) return fail("Forbidden", 403);
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
        if (!(await authorize(request, `${config.resource}.update`))) return fail("Forbidden", 403);
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
        if (!(await authorize(request, `${config.resource}.delete`))) return fail("Forbidden", 403);
        const id = Number(request.nextUrl.searchParams.get("id"));
        if (!id) return fail("Missing id", 400);
        return ok(await config.repository.softDelete(id), "Record deleted");
      } catch (error) {
        return handleError(error);
      }
    }
  };
}
