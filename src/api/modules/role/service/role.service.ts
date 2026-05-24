import type { CreateRoleDto, UpdateRoleDto } from "../dto/role.dto";
import type { RoleRepositoryContract } from "../interfaces/role.interface";

export class RoleService {
  constructor(private readonly repository: RoleRepositoryContract) {}

  create(data: CreateRoleDto) {
    return this.repository.create(data);
  }

  update(id: number, data: UpdateRoleDto) {
    return this.repository.update(id, data);
  }

  findById(id: number) {
    return this.repository.findById(id);
  }

  softDelete(id: number) {
    return this.repository.softDelete(id);
  }
}
