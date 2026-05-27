import type { SortOrder } from "@/types";

export function buildSort(
  sortBy = "createdAt",
  sortOrder: SortOrder = "desc",
  allowedFields: string[] = []
) {
  const safeSortBy =
    allowedFields.length > 0 && !allowedFields.includes(sortBy) ? allowedFields[0] : sortBy;
  const safeSortOrder = sortOrder === "asc" ? "asc" : "desc";

  return { [safeSortBy]: safeSortOrder };
}
