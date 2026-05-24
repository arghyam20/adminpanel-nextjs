"use client";

import { RecordForm } from "@/components/forms/record-form";
import { use } from "react";

const FIELDS = [
  { key: "name", label: "Name", required: true },
  { key: "slug", label: "Slug" },
  { key: "description", label: "Description", type: "textarea" as const },
];

export default function EditRolePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <RecordForm title="Role" endpoint="/api/v1/roles" fields={FIELDS} backHref="/dashboard/roles" recordId={id} />
  );
}
