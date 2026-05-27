import type { QueryOptions } from "@/types/api";

import { getPagination, getPaginationMeta, type PaginationResult } from "./pagination.helper";
import { buildSearchFilter, buildStatusFilter } from "./search-filter.helper";
import { buildSort } from "./sorting.helper";

interface BuildListQueryOptions extends QueryOptions {
  searchFields?: string[];
  sortableFields?: string[];
  baseWhere?: Record<string, unknown>;
}

interface PrismaListModel<T> {
  findMany(args: Record<string, unknown>): Promise<T[]>;
  count(args: Record<string, unknown>): Promise<number>;
}

export function buildPrismaListArgs(options: BuildListQueryOptions) {
  const pagination = getPagination(options.page, options.pageSize);
  const where = {
    ...(options.baseWhere ?? {}),
    ...buildStatusFilter(options.status),
    ...buildSearchFilter(options.search, options.searchFields ?? []),
  };

  return {
    where,
    skip: pagination.skip,
    take: pagination.take,
    orderBy: buildSort(options.sortBy, options.sortOrder, options.sortableFields),
    page: pagination.page,
    pageSize: pagination.pageSize,
  };
}

export async function paginatePrisma<T>(
  model: PrismaListModel<T>,
  options: BuildListQueryOptions
): Promise<PaginationResult<T>> {
  const { page, pageSize, ...args } = buildPrismaListArgs(options);
  const [items, total] = await Promise.all([
    model.findMany(args),
    model.count({ where: args.where }),
  ]);

  return {
    items,
    meta: getPaginationMeta(total, page, pageSize),
  };
}
