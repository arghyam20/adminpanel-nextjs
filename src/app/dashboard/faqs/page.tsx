"use client";

import { DataTable, StatusChip } from "@/components/tables/data-table";

export default function FaqsPage() {
  return (
    <DataTable
      title="FAQ Module"
      endpoint="/api/v1/faqs"
      addHref="/dashboard/faqs/add"
      editHref={(id) => `/dashboard/faqs/edit/${id}`}
      columns={[
        { key: "question", label: "Question" },
        { key: "ordering", label: "Order" },
        { key: "status", label: "Status", render: (row) => <StatusChip value={row.status} /> },
      ]}
    />
  );
}
