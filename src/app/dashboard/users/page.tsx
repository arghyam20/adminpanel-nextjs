"use client";

import { DataTable, StatusChip } from "@/components/tables/data-table";

export default function UsersPage() {
  return (
    <DataTable
      title="User Management"
      endpoint="/api/v1/users"
      addHref="/dashboard/users/add"
      editHref={(id) => `/dashboard/users/edit/${id}`}
      columns={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "status", label: "Status", render: (row) => <StatusChip value={row.status} /> },
      ]}
    />
  );
}
