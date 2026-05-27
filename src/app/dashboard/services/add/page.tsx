"use client";

import { RecordForm } from "@/components/forms/record-form";

const FIELDS = [
  { key: "title", label: "Title", required: true },
  { key: "slug", label: "Slug (auto-generated if empty)" },
  { key: "description", label: "Description", type: "textarea" as const, required: true },
  { key: "categoryId", label: "Service Category ID", type: "number" as const, required: true },
];

export default function AddServicePage() {
  return (
    <RecordForm
      title="Service"
      endpoint="/api/v1/services"
      fields={FIELDS}
      backHref="/dashboard/services"
    />
  );
}
