"use client";

import { DataTable, StatusChip } from "@/components/tables/data-table";

export default function RolesPage() {
  return (
    <DataTable
      title="Role Management"
      endpoint="/api/v1/roles"
      columns={[
        { key: "name", label: "Role" },
        { key: "slug", label: "Slug" },
        { key: "status", label: "Status", render: (row) => <StatusChip value={row.status} /> }
      ]}
    />
  );
}
