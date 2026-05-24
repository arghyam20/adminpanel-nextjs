export interface AuditFields {
  createdBy?: number | null;
  updatedBy?: number | null;
}

export interface TimestampFields {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  isDeleted?: boolean;
}
