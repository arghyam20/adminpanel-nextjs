import type { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import type { UserRepositoryContract } from "../interfaces/user.interface";

export class UserRepository implements UserRepositoryContract {
  async create(_data: CreateUserDto): Promise<unknown> {
    throw new Error("UserRepository.create is not implemented yet.");
  }

  async update(_id: number, _data: UpdateUserDto): Promise<unknown> {
    throw new Error("UserRepository.update is not implemented yet.");
  }

  async findById(_id: number): Promise<unknown | null> {
    throw new Error("UserRepository.findById is not implemented yet.");
  }

  async softDelete(_id: number): Promise<unknown> {
    throw new Error("UserRepository.softDelete is not implemented yet.");
  }
}
