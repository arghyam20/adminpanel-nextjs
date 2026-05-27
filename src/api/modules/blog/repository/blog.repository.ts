import { prisma } from "@/config/prisma";
import type { QueryOptions } from "@/types";
import type { CreateBlogDto, UpdateBlogDto } from "../dto/blog.dto";

const INCLUDE = {
  category: { select: { id: true, name: true, slug: true } },
  author: { select: { id: true, name: true, email: true } },
} as const;

export class BlogRepository {
  private get model() { return prisma.blog; }
  private get baseWhere() { return { isDeleted: false }; }
  private buildSearch(search?: string) {
    if (!search) return {};
    return { OR: [{ title: { contains: search } }, { excerpt: { contains: search } }, { metaTitle: { contains: search } }] };
  }
  async paginate(options: QueryOptions) {
    const where = { ...this.baseWhere, ...(options.status ? { status: options.status as never } : {}), ...this.buildSearch(options.search) };
    const [items, total] = await Promise.all([
      this.model.findMany({ where, include: INCLUDE, skip: (options.page - 1) * options.pageSize, take: options.pageSize, orderBy: { [options.sortBy ?? "createdAt"]: options.sortOrder ?? "desc" } }),
      this.model.count({ where }),
    ]);
    return { items, meta: { page: options.page, pageSize: options.pageSize, total, totalPages: Math.ceil(total / options.pageSize) } };
  }
  async findById(id: number) { return this.model.findFirst({ where: { id, ...this.baseWhere }, include: INCLUDE }); }
  async findBySlug(slug: string) { return this.model.findFirst({ where: { slug, ...this.baseWhere }, include: INCLUDE }); }
  async create(data: CreateBlogDto) { return this.model.create({ data: data as never, include: INCLUDE }); }
  async update(id: number, data: UpdateBlogDto) { return this.model.update({ where: { id }, data: data as never, include: INCLUDE }); }
  async softDelete(id: number) { return this.model.update({ where: { id }, data: { isDeleted: true }, include: INCLUDE }); }
}
