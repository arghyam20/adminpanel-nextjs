import type { QueryOptions } from "@/types";

import type { CreateRoleDto, UpdateRoleDto } from "../dto/role.dto";
import type { RoleRecord } from "../types/role.types";

export interface PaginatedResult<T> {
  items: T[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}

export interface RoleRepositoryContract {
  paginate(options: QueryOptions): Promise<PaginatedResult<RoleRecord>>;
  findById(id: number): Promise<RoleRecord | null>;
  findBySlug(slug: string): Promise<RoleRecord | null>;
  create(data: CreateRoleDto): Promise<RoleRecord>;
  update(id: number, data: UpdateRoleDto): Promise<RoleRecord>;
  softDelete(id: number): Promise<RoleRecord>;
}
