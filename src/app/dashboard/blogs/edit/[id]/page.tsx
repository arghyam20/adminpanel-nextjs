"use client";

import { RecordForm } from "@/components/forms/record-form";
import { use } from "react";

const FIELDS = [
  { key: "title", label: "Title", required: true },
  { key: "slug", label: "Slug" },
  { key: "excerpt", label: "Excerpt", type: "textarea" as const },
  { key: "content", label: "Content", type: "textarea" as const, required: true },
  { key: "categoryId", label: "Category ID", type: "number" as const, required: true },
  { key: "authorId", label: "Author ID", type: "number" as const, required: true },
];

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <RecordForm
      title="Blog"
      endpoint="/api/v1/blogs"
      fields={FIELDS}
      backHref="/dashboard/blogs"
      recordId={id}
    />
  );
}
