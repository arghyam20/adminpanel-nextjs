"use client";

import { DataTable, StatusChip } from "@/components/tables/data-table";

export default function BlogsPage() {
  return (
    <DataTable
      title="Blog Module"
      endpoint="/api/v1/blogs"
      columns={[
        { key: "title", label: "Title" },
        { key: "slug", label: "Slug" },
        { key: "status", label: "Status", render: (row) => <StatusChip value={row.status} /> }
      ]}
    />
  );
}
