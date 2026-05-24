"use client";

import { DataTable, StatusChip } from "@/components/tables/data-table";

export default function CategoriesPage() {
  return (
    <DataTable
      title="Category Management"
      endpoint="/api/v1/categories"
      columns={[
        { key: "name", label: "Name" },
        { key: "slug", label: "Slug" },
        { key: "status", label: "Status", render: (row) => <StatusChip value={row.status} /> },
      ]}
    />
  );
}
