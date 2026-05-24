import type { QueryOptions } from "@/types/api";

interface Delegate {
  findMany(args: unknown): Promise<unknown[]>;
  count(args: unknown): Promise<number>;
  findUnique(args: unknown): Promise<unknown | null>;
  create(args: unknown): Promise<unknown>;
  update(args: unknown): Promise<unknown>;
}

export class BaseRepository<TCreate extends object, TUpdate extends object> {
  constructor(
    private readonly delegate: Delegate,
    private readonly searchableFields: string[] = []
  ) {}

  async paginate(options: QueryOptions, include?: object) {
    const where = this.buildWhere(options);
    const [items, total] = await Promise.all([
      this.delegate.findMany({
        where,
        include,
        skip: (options.page - 1) * options.pageSize,
        take: options.pageSize,
        orderBy: { [options.sortBy ?? "createdAt"]: options.sortOrder ?? "desc" }
      }),
      this.delegate.count({ where })
    ]);

    return {
      items,
      meta: {
        page: options.page,
        pageSize: options.pageSize,
        total,
        totalPages: Math.ceil(total / options.pageSize)
      }
    };
  }

  findById(id: number, include?: object) {
    return this.delegate.findUnique({ where: { id }, include });
  }

  create(data: TCreate) {
    return this.delegate.create({ data });
  }

  update(id: number, data: TUpdate) {
    return this.delegate.update({ where: { id }, data });
  }

  softDelete(id: number) {
    return this.delegate.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  private buildWhere(options: QueryOptions): Record<string, unknown> {
    const where: Record<string, unknown> = { deletedAt: null };

    if (options.status) {
      where.status = options.status;
    }

    if (options.search && this.searchableFields.length) {
      where.OR = this.searchableFields.map((field) => ({
        [field]: { contains: options.search }
      }));
    }

    return where;
  }
}
