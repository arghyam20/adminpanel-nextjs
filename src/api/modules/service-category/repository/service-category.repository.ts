import { prisma } from "@/config/prisma";
import type { QueryOptions } from "@/types";
import type {
  CreateServiceCategoryDto,
  UpdateServiceCategoryDto,
} from "../dto/service-category.dto";

export class ServiceCategoryRepository {
  private get model() {
    return prisma.serviceCategory;
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
  async findBySlug(slug: string) {
    return this.model.findFirst({ where: { slug, ...this.baseWhere } });
  }
  async create(data: CreateServiceCategoryDto) {
    return this.model.create({ data: data as never });
  }
  async update(id: number, data: UpdateServiceCategoryDto) {
    return this.model.update({ where: { id }, data: data as never });
  }
  async softDelete(id: number) {
    return this.model.update({ where: { id }, data: { isDeleted: true } });
  }
}
