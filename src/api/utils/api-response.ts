export const successResponse = (data: any, meta?: any) => ({
  success: true,
  data,
  ...(meta ? { meta } : {}),
});

export const errorResponse = (code: string, message: string, details?: any) => ({
  success: false,
  error: { code, message, ...(details ? { details } : {}) },
});
