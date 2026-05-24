import type { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import type { UserService } from "../service/user.service";

export class UserController {
  constructor(private readonly service: UserService) {}

  create(data: CreateUserDto) {
    return this.service.create(data);
  }

  update(id: number, data: UpdateUserDto) {
    return this.service.update(id, data);
  }

  findById(id: number) {
    return this.service.findById(id);
  }

  softDelete(id: number) {
    return this.service.softDelete(id);
  }
}
