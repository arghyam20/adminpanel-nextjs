type SearchMode = "insensitive" | "default";

export function buildSearchFilter(
  search: string | undefined,
  fields: string[],
  mode: SearchMode = "insensitive"
) {
  const value = search?.trim();
  if (!value || fields.length === 0) return {};

  return {
    OR: fields.map((field) => ({
      [field]: {
        contains: value,
        ...(mode === "insensitive" ? { mode } : {}),
      },
    })),
  };
}

export function buildStatusFilter(status?: string) {
  return status ? { status } : {};
}
