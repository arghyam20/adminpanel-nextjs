import { BaseRepository } from "./base.repository";
import prisma from "../prisma/client";

export class UserRepository extends BaseRepository {
  constructor() {
    super(prisma.user);
  }

  // Example domain-specific query
  async findByEmail(email: string) {
    return this.model.findUnique({ where: { email } });
  }
}

export const userRepository = new UserRepository();
