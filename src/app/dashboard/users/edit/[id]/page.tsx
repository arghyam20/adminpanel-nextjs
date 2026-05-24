"use client";

import { RecordForm } from "@/components/forms/record-form";
import { use } from "react";

const FIELDS = [
  { key: "name", label: "Name", required: true },
  { key: "email", label: "Email", type: "email" as const, required: true },
  { key: "password", label: "Password (leave blank to keep current)", type: "password" as const },
  { key: "phone", label: "Phone" },
  { key: "roleId", label: "Role ID", type: "number" as const, required: true },
];

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <RecordForm title="User" endpoint="/api/v1/users" fields={FIELDS} backHref="/dashboard/users" recordId={id} />
  );
}
