import type { z } from "zod";

export function getZodFieldErrors(error: z.ZodError) {
  return error.flatten().fieldErrors;
}

export function parseWithSchema<TSchema extends z.ZodTypeAny>(schema: TSchema, value: unknown) {
  const result = schema.safeParse(value);

  return {
    success: result.success,
    data: result.success ? (result.data as z.output<TSchema>) : undefined,
    errors: result.success ? undefined : result.error.flatten(),
  };
}
