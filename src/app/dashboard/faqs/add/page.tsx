"use client";

import { RecordForm } from "@/components/forms/record-form";

const FIELDS = [
  { key: "question", label: "Question", required: true },
  { key: "answer", label: "Answer", type: "textarea" as const, required: true },
  { key: "ordering", label: "Order", type: "number" as const, defaultValue: 0 },
];

export default function AddFaqPage() {
  return (
    <RecordForm title="FAQ" endpoint="/api/v1/faqs" fields={FIELDS} backHref="/dashboard/faqs" />
  );
}
