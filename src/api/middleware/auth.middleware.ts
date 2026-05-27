import { RequestHandler } from 'express';
import { verifyJwt } from '../helpers/jwt.helper';
import { ApiError } from '../utils/api-error';

export const authMiddleware: RequestHandler = (req, _res, next) => {
  const auth = (req.headers && (req.headers as any).authorization) || '';
  if (!auth) return next(new ApiError(401, 'UNAUTHORIZED', 'No authorization header'));
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return next(new ApiError(401, 'UNAUTHORIZED', 'Invalid authorization header'));
  try {
    const payload: any = verifyJwt(parts[1]);
    (req as any).user = payload;
    return next();
  } catch (err) {
    return next(new ApiError(401, 'UNAUTHORIZED', 'Invalid or expired token'));
  }
};
