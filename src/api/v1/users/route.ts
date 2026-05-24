import { userRepository } from "@/repositories/modules";
import { buildCrudHandlers } from "@/services/crud-service";
import { userSchema } from "@/validations/modules";

const handlers = buildCrudHandlers({
  resource: "users",
  repository: userRepository,
  schema: userSchema,
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
