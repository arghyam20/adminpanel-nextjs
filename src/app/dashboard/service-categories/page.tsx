"use client";

import { DataTable, StatusChip } from "@/components/tables/data-table";

export default function ServiceCategoriesPage() {
  return (
    <DataTable
      title="Service Category Module"
      endpoint="/api/v1/service-categories"
      addHref="/dashboard/service-categories/add"
      editHref={(id) => `/dashboard/service-categories/edit/${id}`}
      columns={[
        { key: "name", label: "Name" },
        { key: "slug", label: "Slug" },
        { key: "status", label: "Status", render: (row) => <StatusChip value={row.status} /> },
      ]}
    />
  );
}
