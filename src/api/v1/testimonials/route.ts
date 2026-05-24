import { testimonialRepository } from "@/repositories/modules";
import { buildCrudHandlers } from "@/services/crud-service";
import { testimonialSchema } from "@/validations/modules";

const handlers = buildCrudHandlers({
  resource: "testimonials",
  repository: testimonialRepository,
  schema: testimonialSchema,
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
