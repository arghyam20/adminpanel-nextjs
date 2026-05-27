import type { Status } from "@prisma/client";

export interface FaqRecord {
  id: number;
  question: string;
  answer: string;
  ordering: number;
  status: Status;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
