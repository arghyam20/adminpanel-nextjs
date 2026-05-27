export interface TableColumn<T> {
  key: keyof T & string;
  label: string;
}

export function toggleSortState(
  currentSortBy: string,
  currentSortOrder: "asc" | "desc",
  nextSortBy: string
) {
  if (currentSortBy === nextSortBy) {
    return {
      sortBy: nextSortBy,
      sortOrder: currentSortOrder === "asc" ? "desc" : "asc",
    } as const;
  }

  return { sortBy: nextSortBy, sortOrder: "asc" } as const;
}

export function exportRowsToCsv<T extends Record<string, unknown>>(
  rows: T[],
  columns: TableColumn<T>[],
  fileName: string
) {
  const header = columns.map((column) => column.label).join(",");
  const body = rows
    .map((row) => columns.map((column) => JSON.stringify(row[column.key] ?? "")).join(","))
    .join("\n");

  const blob = new Blob([`${header}\n${body}`], {
    type: "text/csv;charset=utf-8",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName.endsWith(".csv") ? fileName : `${fileName}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function getSelectedRows<T extends { id: unknown }>(rows: T[], selectedIds: unknown[]) {
  return rows.filter((row) => selectedIds.includes(row.id));
}
