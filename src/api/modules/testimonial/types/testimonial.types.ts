import type { Status } from "@prisma/client";

export interface TestimonialRecord {
  id: number;
  clientName: string;
  designation: string | null;
  company: string | null;
  content: string;
  rating: number | null;
  avatar: string | null;
  status: Status;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
