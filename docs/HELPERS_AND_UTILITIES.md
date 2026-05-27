# Helpers and Utilities

This project keeps enterprise helpers split by runtime.

## Folder Structure

```txt
src/api/helpers/
  async-wrapper.helper.ts
  cookie.helper.ts
  error.helper.ts
  file-upload.helper.ts
  jwt.helper.ts
  pagination.helper.ts
  prisma-query-builder.helper.ts
  response.helper.ts
  search-filter.helper.ts
  soft-delete.helper.ts
  sorting.helper.ts
  status-toggle.helper.ts
  validation.helper.ts
  index.ts

src/utils/
  date.util.ts
  slug.util.ts
  table.util.ts
  toast.util.ts
  validation.util.ts
  index.ts
  client.ts
```

Use `src/api/helpers` only from API routes, controllers, services, and repositories. Use `src/utils` for shared UI-safe utilities. Client-only utilities such as toast are exported from `@/utils/client`.

## Usage Examples

### Route Handler

```ts
import { asyncHandler, apiResponse, validateBody } from "@/api/helpers";
import { faqSchema } from "@/validations/modules";

export const POST = asyncHandler(async (request) => {
  const body = await validateBody(request, faqSchema);
  const item = await service.create(body);

  return apiResponse(item, "FAQ created");
});
```

### Repository Pagination

```ts
import { paginatePrisma } from "@/api/helpers";

return paginatePrisma(prisma.faq, {
  ...query,
  baseWhere: { isDeleted: false },
  searchFields: ["question", "answer"],
  sortableFields: ["ordering", "createdAt", "updatedAt"],
});
```

### Status and Soft Delete

```ts
import { softDeleteById, toggleStatus } from "@/api/helpers";

await toggleStatus(prisma.category, id);
await softDeleteById(prisma.category, id, user.id);
```

### Client Utilities

```ts
import { formatDate, generateSlug, toggleSortState } from "@/utils";
import { showError, toastPromise } from "@/utils/client";

formatDate(row.createdAt);
generateSlug(title);
setSort(toggleSortState(sortBy, sortOrder, "createdAt"));
showError("Unable to load records");
await toastPromise(apiCall, {
  loading: "Saving",
  success: "Saved",
});
```

## Best Practices

- Keep API helpers server-only; never import Prisma, `next/headers`, or secrets into client components.
- Prefer one shared response shape: `{ success, message, data, meta, errors }`.
- Parse pagination and filters at the route/controller boundary.
- Keep repository query builders declarative: `baseWhere`, `searchFields`, and `sortableFields`.
- Validate every incoming body with Zod before reaching services.
- Use soft delete helpers only for models that include `isDeleted`; use `deletedAt` and `deletedBy` only when the model supports them.
- Keep toast helpers client-only through `@/utils/client`.
