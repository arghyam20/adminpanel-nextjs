"use client";

import { RecordForm } from "@/components/forms/record-form";

const FIELDS = [
  { key: "clientName", label: "Client Name", required: true },
  { key: "designation", label: "Designation" },
  { key: "content", label: "Content", type: "textarea" as const, required: true },
  { key: "rating", label: "Rating (1–5)", type: "number" as const, defaultValue: 5 },
];

export default function AddTestimonialPage() {
  return (
    <RecordForm title="Testimonial" endpoint="/api/v1/testimonials" fields={FIELDS} backHref="/dashboard/testimonials" />
  );
}
