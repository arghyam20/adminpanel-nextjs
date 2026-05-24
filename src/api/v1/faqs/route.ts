import { faqRepository } from "@/repositories/modules";
import { buildCrudHandlers } from "@/services/crud-service";
import { faqSchema } from "@/validations/modules";

const handlers = buildCrudHandlers({
  resource: "faqs",
  repository: faqRepository,
  schema: faqSchema,
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
