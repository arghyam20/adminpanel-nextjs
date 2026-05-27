import { prisma } from "@/config/prisma";
import { makeSlug } from "@/lib/slug";
import type { QueryOptions } from "@/types";

import type { CreateRoleDto, UpdateRoleDto } from "../dto/role.dto";
import type { RoleRepositoryContract } from "../interfaces/role.interface";

export class RoleService {
  constructor(private readonly repository: RoleRepositoryContract) {}

  paginate(options: QueryOptions) {
    return this.repository.paginate(options);
  }

  async findById(id: number) {
    const role = await this.repository.findById(id);
    if (!role) throw Object.assign(new Error("Role not found"), { statusCode: 404 });
    return role;
  }

  async create(data: CreateRoleDto) {
    const slug = data.slug || makeSlug(data.name);
    const existing = await this.repository.findBySlug(slug);
    if (existing) throw Object.assign(new Error("Role name already exists"), { statusCode: 409 });
    return this.repository.create({ ...data, slug });
  }

  async update(id: number, data: UpdateRoleDto) {
    await this.findById(id); // 404 guard
    const slug = data.name ? data.slug || makeSlug(data.name) : data.slug;
    return this.repository.update(id, slug ? { ...data, slug } : data);
  }

  async softDelete(id: number) {
    await this.findById(id); // 404 guard
    const userCount = await prisma.user.count({ where: { roleId: id, isDeleted: false } });
    if (userCount > 0)
      throw Object.assign(new Error("Cannot delete role with active users"), { statusCode: 409 });
    return this.repository.softDelete(id);
  }
}
