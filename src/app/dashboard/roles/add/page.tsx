"use client";

import { RecordForm } from "@/components/forms/record-form";

const FIELDS = [
  { key: "name", label: "Name", required: true },
  { key: "slug", label: "Slug (auto-generated if empty)" },
  { key: "description", label: "Description", type: "textarea" as const },
];

export default function AddRolePage() {
  return (
    <RecordForm title="Role" endpoint="/api/v1/roles" fields={FIELDS} backHref="/dashboard/roles" />
  );
}
