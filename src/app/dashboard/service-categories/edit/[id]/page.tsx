"use client";

import { RecordForm } from "@/components/forms/record-form";
import { use } from "react";

const FIELDS = [
  { key: "name", label: "Name", required: true },
  { key: "slug", label: "Slug" },
];

export default function EditServiceCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <RecordForm
      title="Service Category"
      endpoint="/api/v1/service-categories"
      fields={FIELDS}
      backHref="/dashboard/service-categories"
      recordId={id}
    />
  );
}
