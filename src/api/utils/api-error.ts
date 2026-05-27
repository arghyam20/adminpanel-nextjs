export class ApiError extends Error {
  statusCode: number;
  code: string;
  details?: any;

  constructor(
    statusCode = 500,
    code = "INTERNAL_ERROR",
    message = "Internal server error",
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const isApiError = (err: any): err is ApiError => err instanceof ApiError;
