# API Workspace

This folder is reserved for the separated backend API.

Target stack:

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- MySQL
- JWT authentication
- HTTP-only cookies
- Swagger/OpenAPI

Target entrypoint:

```text
api/src/server.ts
```

Do not move runtime API code here until the Express package is introduced. The current API still runs through Next.js route handlers in `src/app/api`.
