import { RequestHandler } from "express";
import { ApiError } from "../utils/api-error";

export const validate = (schema: any): RequestHandler => {
  return (req, _res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: false });
    if (error) {
      const details = error.details.map((d: any) => ({ message: d.message, path: d.path }));
      return next(new ApiError(400, "VALIDATION_ERROR", "Validation failed", { details }));
    }
    next();
  };
};
