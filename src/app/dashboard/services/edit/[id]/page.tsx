"use client";

import { RecordForm } from "@/components/forms/record-form";
import { use } from "react";

const FIELDS = [
  { key: "title", label: "Title", required: true },
  { key: "slug", label: "Slug" },
  { key: "description", label: "Description", type: "textarea" as const, required: true },
  { key: "categoryId", label: "Service Category ID", type: "number" as const, required: true },
];

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <RecordForm
      title="Service"
      endpoint="/api/v1/services"
      fields={FIELDS}
      backHref="/dashboard/services"
      recordId={id}
    />
  );
}
