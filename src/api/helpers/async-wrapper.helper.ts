import { handleApiError } from "./error.helper";

import type { NextRequest } from "next/server";

type RouteHandler = (request: NextRequest, context?: unknown) => Response | Promise<Response>;

export function asyncHandler(handler: RouteHandler): RouteHandler {
  return async (request, context) => {
    try {
      return await handler(request, context);
    } catch (error) {
      return handleApiError(error);
    }
  };
}
