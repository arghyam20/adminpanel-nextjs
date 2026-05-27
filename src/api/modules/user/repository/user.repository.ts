import { prisma } from "@/config/prisma";
import type { QueryOptions } from "@/types";

import type { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import type { UserRepositoryContract } from "../interfaces/user.interface";

const INCLUDE = { role: { select: { id: true, name: true, slug: true } } } as const;
const SELECT_SAFE = {
  id: true,
  name: true,
  email: true,
  phone: true,
  profileImage: true,
  status: true,
  roleId: true,
  isDeleted: true,
  createdAt: true,
  updatedAt: true,
  role: { select: { id: true, name: true, slug: true } },
} as const;

export class UserRepository implements UserRepositoryContract {
  private get model() {
    return prisma.user;
  }
  private get baseWhere() {
    return { isDeleted: false };
  }

  private buildSearch(search?: string) {
    if (!search) return {};
    return { OR: [{ name: { contains: search } }, { email: { contains: search } }] };
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
        select: SELECT_SAFE,
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
    return this.model.findFirst({ where: { id, ...this.baseWhere }, select: SELECT_SAFE }) as never;
  }

  async findByEmail(email: string) {
    return this.model.findFirst({
      where: { email, ...this.baseWhere },
      select: SELECT_SAFE,
    }) as never;
  }

  async create(data: CreateUserDto) {
    return this.model.create({ data: data as never, include: INCLUDE }) as never;
  }

  async update(id: number, data: UpdateUserDto) {
    return this.model.update({ where: { id }, data: data as never, include: INCLUDE }) as never;
  }

  async softDelete(id: number) {
    return this.model.update({
      where: { id },
      data: { isDeleted: true },
      include: INCLUDE,
    }) as never;
  }
}
