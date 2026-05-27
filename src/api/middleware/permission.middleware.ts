import { RequestHandler } from "express";
import { ApiError } from "../utils/api-error";

export const requirePermissions = (...permissions: string[]): RequestHandler => {
  return (req, _res, next) => {
    const user = (req as any).user;
    if (!user) return next(new ApiError(401, "UNAUTHORIZED", "Not authenticated"));
    const userPerms: string[] = user.permissions || [];
    const hasAll = permissions.every((p) => userPerms.includes(p));
    if (!hasAll) return next(new ApiError(403, "FORBIDDEN", "Insufficient permissions"));
    next();
  };
};
