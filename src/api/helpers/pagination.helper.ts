import type { PaginationMeta, QueryOptions } from "@/types";

import type { NextRequest } from "next/server";

export interface PaginationResult<T> {
  items: T[];
  meta: PaginationMeta;
}

export function getPagination(page = 1, pageSize = 10) {
  const safePage = Math.max(Number(page) || 1, 1);
  const safePageSize = Math.min(Math.max(Number(pageSize) || 10, 1), 100);

  return {
    page: safePage,
    pageSize: safePageSize,
    skip: (safePage - 1) * safePageSize,
    take: safePageSize,
  };
}

export function getPaginationMeta(total: number, page: number, pageSize: number): PaginationMeta {
  return {
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
  };
}

export function parsePaginationQuery(request: NextRequest): QueryOptions {
  const params = request.nextUrl.searchParams;
  const pagination = getPagination(
    Number(params.get("page") ?? 1),
    Number(params.get("pageSize") ?? 10)
  );

  return {
    page: pagination.page,
    pageSize: pagination.pageSize,
    search: params.get("search") || undefined,
    sortBy: params.get("sortBy") || "createdAt",
    sortOrder: params.get("sortOrder") === "asc" ? "asc" : "desc",
    status: params.get("status") || undefined,
  };
}
