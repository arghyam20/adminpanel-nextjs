import type { Status } from "@prisma/client";

export interface UserRecord {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  profileImage: string | null;
  status: Status;
  roleId: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  role?: { id: number; name: string; slug: string };
}

export interface SafeUserRecord extends Omit<UserRecord, "password"> {}
