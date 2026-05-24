export type AuditFields = {
  createdBy?: number | null;
  updatedBy?: number | null;
};

export type TimestampFields = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};
