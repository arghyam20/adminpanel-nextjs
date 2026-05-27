import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import { errorResponse } from "./response.helper";

export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode = 500,
    public readonly errors?: unknown
  ) {
    super(message);
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function normalizeError(error: unknown) {
  if (isAppError(error)) {
    return {
      message: error.message,
      statusCode: error.statusCode,
      errors: error.errors,
    };
  }

  if (error instanceof ZodError) {
    return {
      message: "Validation failed",
      statusCode: 422,
      errors: error.flatten(),
    };
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      return { message: "Record not found", statusCode: 404 };
    }

    if (error.code === "P2002") {
      return {
        message: "Record already exists",
        statusCode: 409,
        errors: error.meta,
      };
    }
  }

  return { message: "Something went wrong", statusCode: 500 };
}

export function handleApiError(error: unknown) {
  const normalized = normalizeError(error);

  if (normalized.statusCode >= 500) {
    console.error(error);
  }

  return errorResponse(normalized.message, normalized.statusCode, normalized.errors);
}
