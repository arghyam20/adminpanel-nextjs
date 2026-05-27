"use client";

import { RecordForm } from "@/components/forms/record-form";
import { use } from "react";

const FIELDS = [
  { key: "name", label: "Name", required: true },
  { key: "slug", label: "Slug" },
];

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <RecordForm
      title="Category"
      endpoint="/api/v1/categories"
      fields={FIELDS}
      backHref="/dashboard/categories"
      recordId={id}
    />
  );
}
