import type { QueryOptions } from "@/types/api";

import type { NextRequest } from "next/server";


export function parseQuery(request: NextRequest): QueryOptions {
  const params = request.nextUrl.searchParams;
  const page = Math.max(Number(params.get("page") ?? 1), 1);
  const pageSize = Math.min(Math.max(Number(params.get("pageSize") ?? 10), 1), 100);
  const sortOrder = params.get("sortOrder") === "asc" ? "asc" : "desc";

  return {
    page,
    pageSize,
    search: params.get("search") ?? undefined,
    sortBy: params.get("sortBy") ?? "createdAt",
    sortOrder,
    status: params.get("status") ?? undefined
  };
}
