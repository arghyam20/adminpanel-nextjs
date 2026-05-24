import type { CreateFaqDto, UpdateFaqDto } from "../dto/faq.dto";
import type { FaqRepositoryContract } from "../interfaces/faq.interface";

export class FaqRepository implements FaqRepositoryContract {
  async create(_data: CreateFaqDto): Promise<unknown> {
    throw new Error("FaqRepository.create is not implemented yet.");
  }

  async update(_id: number, _data: UpdateFaqDto): Promise<unknown> {
    throw new Error("FaqRepository.update is not implemented yet.");
  }

  async findById(_id: number): Promise<unknown | null> {
    throw new Error("FaqRepository.findById is not implemented yet.");
  }

  async softDelete(_id: number): Promise<unknown> {
    throw new Error("FaqRepository.softDelete is not implemented yet.");
  }
}
