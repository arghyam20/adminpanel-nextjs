import { prisma } from "@/config/prisma";
import type { QueryOptions } from "@/types";
import type { CreateFaqDto, UpdateFaqDto } from "../dto/faq.dto";

export class FaqRepository {
  private get model() {
    return prisma.faq;
  }
  private get baseWhere() {
    return { isDeleted: false };
  }
  private buildSearch(search?: string) {
    if (!search) return {};
    return { OR: [{ question: { contains: search } }, { answer: { contains: search } }] };
  }
  async paginate(options: QueryOptions) {
    const where = {
      ...this.baseWhere,
      ...(options.status ? { status: options.status as never } : {}),
      ...this.buildSearch(options.search),
    };
    const [items, total] = await Promise.all([
      this.model.findMany({
        where,
        skip: (options.page - 1) * options.pageSize,
        take: options.pageSize,
        orderBy: { [options.sortBy ?? "ordering"]: options.sortOrder ?? "asc" },
      }),
      this.model.count({ where }),
    ]);
    return {
      items,
      meta: {
        page: options.page,
        pageSize: options.pageSize,
        total,
        totalPages: Math.ceil(total / options.pageSize),
      },
    };
  }
  async findById(id: number) {
    return this.model.findFirst({ where: { id, ...this.baseWhere } });
  }
  async create(data: CreateFaqDto) {
    return this.model.create({ data: data as never });
  }
  async update(id: number, data: UpdateFaqDto) {
    return this.model.update({ where: { id }, data: data as never });
  }
  async softDelete(id: number) {
    return this.model.update({ where: { id }, data: { isDeleted: true } });
  }
}
