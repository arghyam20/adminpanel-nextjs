import { AppError } from "./error.helper";

import type { z } from "zod";

export async function validateBody<TSchema extends z.ZodTypeAny>(
  request: Request,
  schema: TSchema
): Promise<z.infer<TSchema>> {
  const result = schema.safeParse(await request.json());

  if (!result.success) {
    throw new AppError("Validation failed", 422, result.error.flatten());
  }

  return result.data as z.output<TSchema>;
}

export function validateQuery<TSchema extends z.ZodTypeAny>(
  params: URLSearchParams,
  schema: TSchema
): z.infer<TSchema> {
  const values = Object.fromEntries(params.entries());
  const result = schema.safeParse(values);

  if (!result.success) {
    throw new AppError("Validation failed", 422, result.error.flatten());
  }

  return result.data as z.output<TSchema>;
}
