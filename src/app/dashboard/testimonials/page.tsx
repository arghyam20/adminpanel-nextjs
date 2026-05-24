"use client";

import { DataTable, StatusChip } from "@/components/tables/data-table";

export default function TestimonialsPage() {
  return (
    <DataTable
      title="Testimonial Module"
      endpoint="/api/v1/testimonials"
      addHref="/dashboard/testimonials/add"
      editHref={(id) => `/dashboard/testimonials/edit/${id}`}
      columns={[
        { key: "clientName", label: "Client" },
        { key: "designation", label: "Designation" },
        { key: "rating", label: "Rating" },
        { key: "status", label: "Status", render: (row) => <StatusChip value={row.status} /> },
      ]}
    />
  );
}
