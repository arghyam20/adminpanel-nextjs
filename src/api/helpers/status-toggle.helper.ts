type ToggleableStatus = "ACTIVE" | "INACTIVE";

interface StatusModel<T> {
  findUnique(args: Record<string, unknown>): Promise<T | null>;
  update(args: Record<string, unknown>): Promise<T>;
}

export async function toggleStatus<T extends { status: ToggleableStatus }>(
  model: StatusModel<T>,
  id: number | string
) {
  const item = await model.findUnique({ where: { id } });
  if (!item) return null;

  return model.update({
    where: { id },
    data: { status: item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" },
  });
}
