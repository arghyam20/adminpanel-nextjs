import type { CreateRoleDto, UpdateRoleDto } from "../dto/role.dto";
import type { RoleService } from "../service/role.service";

export class RoleController {
  constructor(private readonly service: RoleService) {}

  create(data: CreateRoleDto) {
    return this.service.create(data);
  }

  update(id: number, data: UpdateRoleDto) {
    return this.service.update(id, data);
  }

  findById(id: number) {
    return this.service.findById(id);
  }

  softDelete(id: number) {
    return this.service.softDelete(id);
  }
}
