import prisma from "../prisma/client";

export class BaseRepository {
  protected model: any;

  constructor(model: any) {
    this.model = model;
  }

  async findAll(filter = {}, include = {}) {
    return this.model.findMany({ where: filter, include });
  }

  async findById(id: string, include = {}) {
    return this.model.findUnique({ where: { id }, include });
  }

  async create(data: any) {
    return this.model.create({ data });
  }

  async update(id: string, data: any) {
    return this.model.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.model.delete({ where: { id } });
  }
}
