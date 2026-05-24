"use client";

import { DataTable, StatusChip } from "@/components/tables/data-table";

export default function RolesPage() {
  return (
    <DataTable
      title="Role Management"
      endpoint="/api/v1/roles"
      addHref="/dashboard/roles/add"
      editHref={(id) => `/dashboard/roles/edit/${id}`}
      columns={[
        { key: "name", label: "Name" },
        { key: "slug", label: "Slug" },
        { key: "description", label: "Description" },
        { key: "status", label: "Status", render: (row) => <StatusChip value={row.status} /> },
      ]}
    />
  );
}
