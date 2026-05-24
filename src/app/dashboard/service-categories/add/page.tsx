"use client";

import { RecordForm } from "@/components/forms/record-form";

const FIELDS = [
  { key: "name", label: "Name", required: true },
  { key: "slug", label: "Slug (auto-generated if empty)" },
];

export default function AddServiceCategoryPage() {
  return (
    <RecordForm title="Service Category" endpoint="/api/v1/service-categories" fields={FIELDS} backHref="/dashboard/service-categories" />
  );
}
