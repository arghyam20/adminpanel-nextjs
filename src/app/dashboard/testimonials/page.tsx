"use client";

import { DataTable, StatusChip } from "@/components/tables/data-table";

export default function TestimonialsPage() {
  return (
    <DataTable
      title="Testimonial Module"
      endpoint="/api/testimonials"
      columns={[
        { key: "clientName", label: "Client" },
        { key: "designation", label: "Designation" },
        { key: "rating", label: "Rating" },
        { key: "status", label: "Status", render: (row) => <StatusChip value={row.status} /> }
      ]}
    />
  );
}
