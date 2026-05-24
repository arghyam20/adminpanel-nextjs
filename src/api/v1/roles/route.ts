import { buildCrudHandlers } from "@/services/crud-service";
import { roleRepository, withSlug } from "@/repositories/modules";
import { roleSchema } from "@/validations/modules";

const handlers = buildCrudHandlers({
  resource: "roles",
  repository: roleRepository,
  schema: roleSchema,
  beforeCreate: (data) => withSlug(data as { name: string; slug?: string }),
  beforeUpdate: (data) => withSlug(data as { name?: string; slug?: string })
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
