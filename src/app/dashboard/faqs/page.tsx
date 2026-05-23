"use client";

import { DataTable, StatusChip } from "@/components/tables/data-table";

export default function FaqsPage() {
  return (
    <DataTable
      title="FAQ Module"
      endpoint="/api/faqs"
      columns={[
        { key: "question", label: "Question" },
        { key: "ordering", label: "Order" },
        { key: "status", label: "Status", render: (row) => <StatusChip value={row.status} /> }
      ]}
    />
  );
}
