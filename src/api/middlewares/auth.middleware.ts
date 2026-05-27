import { fail } from "@/lib/api-response";
import { getRequestSession } from "@/lib/auth";

import type { NextRequest } from "next/server";

type RouteHandler = (request: NextRequest) => Promise<Response>;

/**
 * Higher-order function that guards a route handler behind JWT auth.
 * Attaches the serialised session to `x-session` header for downstream use.
 */
export function withAuth(handler: RouteHandler): RouteHandler {
  return async (request: NextRequest) => {
    const session = await getRequestSession(request);
    if (!session) return fail("Unauthorized", 401);

    // Clone headers so downstream handlers can read the session without
    // re-verifying the JWT on every call.
    const headers = new Headers(request.headers);
    headers.set("x-session", JSON.stringify(session));

    const patched = new Request(request.url, {
      method: request.method,
      headers,
      body: request.body,
      // @ts-expect-error — duplex is required for streaming bodies in Node
      duplex: "half",
    });

    return handler(patched as NextRequest);
  };
}
