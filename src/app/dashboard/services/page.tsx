"use client";

import { DataTable, StatusChip } from "@/components/tables/data-table";

export default function ServicesPage() {
  return (
    <DataTable
      title="Service Module"
      endpoint="/api/v1/services"
      addHref="/dashboard/services/add"
      editHref={(id) => `/dashboard/services/edit/${id}`}
      columns={[
        { key: "title", label: "Title" },
        { key: "slug", label: "Slug" },
        { key: "status", label: "Status", render: (row) => <StatusChip value={row.status} /> },
      ]}
    />
  );
}
