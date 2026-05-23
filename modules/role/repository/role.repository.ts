import type { CreateRoleDto, UpdateRoleDto } from "../dto/role.dto";
import type { RoleRepositoryContract } from "../interfaces/role.interface";

export class RoleRepository implements RoleRepositoryContract {
  async create(_data: CreateRoleDto): Promise<unknown> {
    throw new Error("RoleRepository.create is not implemented yet.");
  }

  async update(_id: number, _data: UpdateRoleDto): Promise<unknown> {
    throw new Error("RoleRepository.update is not implemented yet.");
  }

  async findById(_id: number): Promise<unknown | null> {
    throw new Error("RoleRepository.findById is not implemented yet.");
  }

  async softDelete(_id: number): Promise<unknown> {
    throw new Error("RoleRepository.softDelete is not implemented yet.");
  }
}
