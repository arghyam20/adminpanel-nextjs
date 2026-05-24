import type { CreateRoleDto, UpdateRoleDto } from "../dto/role.dto";

export interface RoleRepositoryContract {
  create(data: CreateRoleDto): Promise<unknown>;
  update(id: number, data: UpdateRoleDto): Promise<unknown>;
  findById(id: number): Promise<unknown | null>;
  softDelete(id: number): Promise<unknown>;
}
