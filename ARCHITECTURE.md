# Full Stack Admin Panel Architecture

This project currently runs as a full-stack Next.js application. The senior-level target architecture is a separated frontend and backend workspace so the API can be reused by web, Android, iOS, Flutter, React Native, and future services.

## Main Goal

Build a scalable enterprise-grade application with:

- Frontend and backend fully separated.
- API reusable for web and mobile clients.
- Secure JWT authentication using HTTP-only cookies.
- Module-wise backend architecture.
- Frontend and backend validation separated.
- Strong TypeScript typing.
- Clean architecture patterns suitable for senior development teams.

## Current Implementation

```text
api/
  README.md
  src/
    modules/
    routes/
    middlewares/
    configs/
    utils/
    types/
    validations/
    services/
    repositories/
    prisma/
    swagger/

shared/
  types/

docker/
scripts/

src/
  app/
    (auth)/
    api/
    dashboard/
  components/
  constants/
  lib/
  repositories/
  services/
  types/
  utils/
  validations/

prisma/
  schema/
    models/
    enums/
  database.sql
  seed.ts
```

The existing project already includes:

- Enterprise folder scaffolding for the future separated API.
- Framework-neutral shared types under `shared/types`.
- Next.js App Router frontend and API routes.
- Prisma repositories.
- Shared CRUD service helpers.
- Zod validation.
- JWT authentication with HTTP-only cookies.
- RBAC permissions stored per role.
- Common API response structure.
- MySQL schema, seed data, and soft-delete fields.

The root `app/` folder from the target structure is intentionally deferred because this codebase currently uses `src/app`. Creating both `app/` and `src/app/` can confuse Next.js project resolution.

## Target Workspace Structure

```text
project-root/
  app/                  # Frontend only: Next.js App Router
  api/                  # Backend only: Express API
  shared/               # Shared types and utilities
  prisma/
  public/
  docs/
  docker/
  scripts/
  .env
  package.json
  tsconfig.json
```

## Frontend Structure

Frontend folders should contain UI, browser state, client-side validation, and API client code only.

```text
app/
  (auth)/
  dashboard/
  users/
  roles/
  blogs/
  components/
    ui/
    forms/
    tables/
    modals/
    layouts/
  hooks/
  store/
  services/
  middleware/
  utils/
  constants/
  types/
  validations/
  styles/
```

Frontend responsibilities:

- Route protection.
- Session checking.
- Token refresh handling.
- User state management with Redux Toolkit or Zustand.
- React Hook Form integration.
- Frontend-only Zod schemas.

## Backend Structure

Backend folders should contain API transport, business rules, persistence, backend validation, auth, logging, and API documentation.

```text
api/
  src/
    modules/
    routes/
    middlewares/
    configs/
    utils/
    types/
    validations/
    services/
    repositories/
    prisma/
    swagger/
    server.ts
  package.json
  tsconfig.json
```

Backend responsibilities:

- JWT generation and verification.
- Refresh tokens.
- Cookie management.
- Role-based access control.
- Backend-only validation.
- Centralized error handling.
- API logging.
- Request validation middleware.
- Swagger/OpenAPI docs.

## Module Pattern

```text
api/src/modules/user/
  controller/
    user.controller.ts
  routes/
    user.routes.ts
  service/
    user.service.ts
  repository/
    user.repository.ts
  validation/
    create-user.validation.ts
    update-user.validation.ts
    login.validation.ts
  dto/
    create-user.dto.ts
    update-user.dto.ts
  types/
    user.types.ts
  interfaces/
    user.interface.ts
  constants/
    user.constants.ts
  swagger/
    user.swagger.ts
```

Use this same shape for roles, categories, blogs, FAQs, testimonials, service categories, and services as each module grows beyond generic CRUD.

## Request Flow

```text
Frontend: Next.js App Router
        |
API Client / Services
        |
Backend: Express Routes
        |
Controller
        |
Service
        |
Repository
        |
Prisma ORM
        |
MySQL Database
```

## Validation Architecture

Frontend validation lives in the frontend app and is optimized for forms and user feedback.

```text
app/validations/
  auth/
  user/
  role/
  blog/
```

Backend validation lives in the API package and protects the server boundary.

```text
api/src/validations/
  auth/
  user/
  role/
  common/
```

Rules:

- Backend validation must never depend on frontend validation.
- Frontend and backend may use the same schema library, but the schema files must remain separate.
- Shared request and response types can live in `shared/types`.

## Shared Types

```text
shared/
  types/
    api-response.types.ts
    auth.types.ts
    pagination.types.ts
    common.types.ts
```

Shared types must be framework-neutral. Do not import React, Next.js, Express, Prisma Client, or browser-only APIs into shared files.

## Authentication Flow

```text
Frontend Login
      |
Backend API
      |
JWT Access Token Generated
      |
Stored in HTTP-only Cookie
      |
Frontend Sends Cookie Automatically
      |
Middleware Validates Token
      |
RBAC Checks Module Permission
```

Required cookie settings:

```ts
httpOnly: true
secure: true
sameSite: "strict"
```

## API Standards

Use versioned endpoints:

```text
/api/v1/auth/login
/api/v1/users
/api/v1/roles
```

Success response:

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {},
  "meta": {}
}
```

Error response:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

## Permission Keys

RBAC permission keys follow the shape `resource.action`.

```text
dashboard.read
roles.create | roles.read | roles.update | roles.delete
users.create | users.read | users.update | users.delete
categories.create | categories.read | categories.update | categories.delete
faqs.create | faqs.read | faqs.update | faqs.delete
testimonials.create | testimonials.read | testimonials.update | testimonials.delete
blogs.create | blogs.read | blogs.update | blogs.delete
serviceCategories.create | serviceCategories.read | serviceCategories.update | serviceCategories.delete
services.create | services.read | services.update | services.delete
```

## Required Production Capabilities

- Swagger documentation.
- Audit logs.
- Activity logs.
- Queue system.
- Email service.
- File upload service.
- Notification service.
- Docker setup.
- CI/CD ready.
- Nginx ready.

## Security Packages For Express API

```text
helmet
cors
bcrypt
jsonwebtoken
cookie-parser
express-rate-limit
xss-clean
hpp
```

Use `bcryptjs` or native `bcrypt` consistently across the backend. Prefer native `bcrypt` for production Node.js APIs when deployment supports native dependencies.

## Migration Roadmap

1. Create `docs/`, `shared/`, and `api/` folders without moving runtime code. Done.
2. Move framework-neutral response, auth, pagination, and common types into `shared/types`. Started.
3. Add Express API package under `api/` with TypeScript, Prisma, auth middleware, validation middleware, and centralized error handling.
4. Move one backend module at a time from Next.js route handlers to `api/src/modules`.
5. Version all backend routes under `/api/v1`.
6. Update the Next.js frontend services to call the Express API.
7. Split frontend and backend validation files.
8. Add refresh tokens, token rotation, API logger, rate limiting, and audit logs.
9. Add Docker, Nginx, PM2 or process manager, and CI/CD workflows.
10. Keep the Next.js app focused on UI, routing, browser state, and frontend concerns.

## Future Scalability

This architecture must support:

- Mobile apps.
- Microservices.
- GraphQL.
- WebSockets.
- Multi-tenant systems.
- Queue workers.
- Background jobs.
