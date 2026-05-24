import type { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import type { UserRepositoryContract } from "../interfaces/user.interface";

export class UserService {
  constructor(private readonly repository: UserRepositoryContract) {}

  create(data: CreateUserDto) {
    return this.repository.create(data);
  }

  update(id: number, data: UpdateUserDto) {
    return this.repository.update(id, data);
  }

  findById(id: number) {
    return this.repository.findById(id);
  }

  softDelete(id: number) {
    return this.repository.softDelete(id);
  }
}
