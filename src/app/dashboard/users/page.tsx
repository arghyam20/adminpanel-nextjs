"use client";

import { DataTable, StatusChip } from "@/components/tables/data-table";

export default function UsersPage() {
  return (
    <DataTable
      title="User Management"
      endpoint="/api/users"
      columns={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "status", label: "Status", render: (row) => <StatusChip value={row.status} /> }
      ]}
    />
  );
}
