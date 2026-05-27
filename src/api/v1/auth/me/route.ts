import { fail, ok } from "@/lib/api-response";
import { getRequestSession } from "@/lib/auth";

import { setNoStore } from "../_utils";

import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getRequestSession(request);
  if (!session) return fail("Unauthorized", 401);

  return setNoStore(
    ok(
      {
        id: session.id,
        name: session.name,
        email: session.email,
        role: session.role,
        permissions: session.permissions,
      },
      "Session fetched"
    )
  );
}
