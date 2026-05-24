import { serviceRepository, withSlug } from "@/repositories/modules";
import { buildCrudHandlers } from "@/services/crud-service";
import { serviceSchema } from "@/validations/modules";

const handlers = buildCrudHandlers({
  resource: "services",
  repository: serviceRepository,
  schema: serviceSchema,
  include: { category: true },
  beforeCreate: (data) => withSlug(data as { title: string; slug?: string }),
  beforeUpdate: (data) => withSlug(data as { title?: string; slug?: string }),
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
