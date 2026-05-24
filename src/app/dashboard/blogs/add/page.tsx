"use client";

import { RecordForm } from "@/components/forms/record-form";

const FIELDS = [
  { key: "title", label: "Title", required: true },
  { key: "slug", label: "Slug (auto-generated if empty)" },
  { key: "excerpt", label: "Excerpt", type: "textarea" as const },
  { key: "content", label: "Content", type: "textarea" as const, required: true },
  { key: "categoryId", label: "Category ID", type: "number" as const, required: true },
  { key: "authorId", label: "Author ID", type: "number" as const, required: true },
];

export default function AddBlogPage() {
  return (
    <RecordForm title="Blog" endpoint="/api/v1/blogs" fields={FIELDS} backHref="/dashboard/blogs" />
  );
}
