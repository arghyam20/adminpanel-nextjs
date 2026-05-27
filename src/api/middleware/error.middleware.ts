import { NextFunction, Request, Response } from 'express';
import { isApiError } from '../utils/api-error';
import { errorResponse } from '../utils/api-response';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (isApiError(err)) {
    return res.status(err.statusCode).json(errorResponse(err.code, err.message, err.details));
  }

  // fallback
  console.error(err);
  return res.status(500).json(errorResponse('INTERNAL_ERROR', 'Internal server error'));
};
