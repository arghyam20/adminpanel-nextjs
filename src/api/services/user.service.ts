import { userRepository } from "../repositories/user.repository";
import { ApiError } from "../utils/api-error";

export class UserService {
  async listUsers(filter = {}) {
    return userRepository.findAll(filter);
  }

  async getUser(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw new ApiError(404, "NOT_FOUND", "User not found");
    return user;
  }

  async createUser(payload: any) {
    // add business rules here (e.g., email uniqueness check)
    const exists = await userRepository.findByEmail(payload.email);
    if (exists) throw new ApiError(400, "DUPLICATE", "Email already exists");
    return userRepository.create(payload);
  }
}

export const userService = new UserService();
