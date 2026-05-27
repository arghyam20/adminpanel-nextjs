import bcrypt from "bcryptjs";

import type { QueryOptions } from "@/types";

import type { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import type { UserRepositoryContract } from "../interfaces/user.interface";

export class UserService {
  constructor(private readonly repository: UserRepositoryContract) {}

  paginate(options: QueryOptions) {
    return this.repository.paginate(options);
  }

  async findById(id: number) {
    const user = await this.repository.findById(id);
    if (!user) throw Object.assign(new Error("User not found"), { statusCode: 404 });
    return user;
  }

  async create(data: CreateUserDto) {
    const existing = await this.repository.findByEmail(data.email);
    if (existing) throw Object.assign(new Error("Email already in use"), { statusCode: 409 });
    const password = await bcrypt.hash(data.password ?? "ChangeMe@123", 12);
    return this.repository.create({ ...data, password });
  }

  async update(id: number, data: UpdateUserDto) {
    await this.findById(id);
    const updateData = { ...data };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 12);
    } else {
      delete updateData.password;
    }
    return this.repository.update(id, updateData);
  }

  async softDelete(id: number) {
    await this.findById(id);
    return this.repository.softDelete(id);
  }
}
