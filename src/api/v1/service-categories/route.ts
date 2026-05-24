import { serviceCategoryRepository, withSlug } from "@/repositories/modules";
import { buildCrudHandlers } from "@/services/crud-service";
import { serviceCategorySchema } from "@/validations/modules";

const handlers = buildCrudHandlers({
  resource: "serviceCategories",
  repository: serviceCategoryRepository,
  schema: serviceCategorySchema,
  beforeCreate: (data) => withSlug(data as { name: string; slug?: string }),
  beforeUpdate: (data) => withSlug(data as { name?: string; slug?: string }),
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
