import type { CreateUserDto, UpdateUserDto } from "../dto/user.dto";

export interface UserRepositoryContract {
  create(data: CreateUserDto): Promise<unknown>;
  update(id: number, data: UpdateUserDto): Promise<unknown>;
  findById(id: number): Promise<unknown | null>;
  softDelete(id: number): Promise<unknown>;
}
