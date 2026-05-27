import type { QueryOptions } from "@/types";

import type { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import type { SafeUserRecord } from "../types/user.types";

export interface PaginatedResult<T> {
  items: T[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}

export interface UserRepositoryContract {
  paginate(options: QueryOptions): Promise<PaginatedResult<SafeUserRecord>>;
  findById(id: number): Promise<SafeUserRecord | null>;
  findByEmail(email: string): Promise<SafeUserRecord | null>;
  create(data: CreateUserDto): Promise<SafeUserRecord>;
  update(id: number, data: UpdateUserDto): Promise<SafeUserRecord>;
  softDelete(id: number): Promise<SafeUserRecord>;
}
