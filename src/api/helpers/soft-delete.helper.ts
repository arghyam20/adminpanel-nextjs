interface SoftDeleteModel<T> {
  update(args: Record<string, unknown>): Promise<T>;
  updateMany(args: Record<string, unknown>): Promise<unknown>;
}

export function softDeleteData(userId?: number | string) {
  return {
    isDeleted: true,
    deletedAt: new Date(),
    ...(userId ? { deletedBy: userId } : {}),
  };
}

export async function softDeleteById<T>(
  model: SoftDeleteModel<T>,
  id: number | string,
  userId?: number | string
) {
  return model.update({
    where: { id },
    data: softDeleteData(userId),
  });
}

export async function softDeleteMany<T>(
  model: SoftDeleteModel<T>,
  ids: (number | string)[],
  userId?: number | string
) {
  return model.updateMany({
    where: { id: { in: ids } },
    data: softDeleteData(userId),
  });
}
