"use client";

import { RecordForm } from "@/components/forms/record-form";

const FIELDS = [
  { key: "name", label: "Name", required: true },
  { key: "slug", label: "Slug (auto-generated if empty)" },
];

export default function AddCategoryPage() {
  return (
    <RecordForm title="Category" endpoint="/api/v1/categories" fields={FIELDS} backHref="/dashboard/categories" />
  );
}
