import { prisma } from "@/config/prisma";
import type { QueryOptions } from "@/types";
import type { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";
import type { CategoryRepositoryContract } from "../interfaces/category.interface";

export class CategoryRepository implements CategoryRepositoryContract {
  private get model() {
    return prisma.category;
  }
  private get baseWhere() {
    return { isDeleted: false };
  }
  private buildSearch(search?: string) {
    if (!search) return {};
    return { OR: [{ name: { contains: search } }, { slug: { contains: search } }] };
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
        orderBy: { [options.sortBy ?? "createdAt"]: options.sortOrder ?? "desc" },
      }),
      this.model.count({ where }),
    ]);
    return {
      items: items as never,
      meta: {
        page: options.page,
        pageSize: options.pageSize,
        total,
        totalPages: Math.ceil(total / options.pageSize),
      },
    };
  }
  async findById(id: number) {
    return this.model.findFirst({ where: { id, ...this.baseWhere } }) as never;
  }
  async findBySlug(slug: string) {
    return this.model.findFirst({ where: { slug, ...this.baseWhere } }) as never;
  }
  async create(data: CreateCategoryDto) {
    return this.model.create({ data: data as never }) as never;
  }
  async update(id: number, data: UpdateCategoryDto) {
    return this.model.update({ where: { id }, data: data as never }) as never;
  }
  async softDelete(id: number) {
    return this.model.update({ where: { id }, data: { isDeleted: true } }) as never;
  }
}
