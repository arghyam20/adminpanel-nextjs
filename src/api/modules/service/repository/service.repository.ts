import { prisma } from "@/config/prisma";
import type { QueryOptions } from "@/types";
import type { CreateServiceDto, UpdateServiceDto } from "../dto/service.dto";

const INCLUDE = { category: { select: { id: true, name: true, slug: true } } } as const;

export class ServiceRepository {
  private get model() {
    return prisma.service;
  }
  private get baseWhere() {
    return { isDeleted: false };
  }
  private buildSearch(search?: string) {
    if (!search) return {};
    return {
      OR: [
        { title: { contains: search } },
        { shortDesc: { contains: search } },
        { metaTitle: { contains: search } },
      ],
    };
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
        include: INCLUDE,
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
    return this.model.findFirst({ where: { id, ...this.baseWhere }, include: INCLUDE });
  }
  async findBySlug(slug: string) {
    return this.model.findFirst({ where: { slug, ...this.baseWhere }, include: INCLUDE });
  }
  async create(data: CreateServiceDto) {
    return this.model.create({ data: data as never, include: INCLUDE });
  }
  async update(id: number, data: UpdateServiceDto) {
    return this.model.update({ where: { id }, data: data as never, include: INCLUDE });
  }
  async softDelete(id: number) {
    return this.model.update({ where: { id }, data: { isDeleted: true }, include: INCLUDE });
  }
}
