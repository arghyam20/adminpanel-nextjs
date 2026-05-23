# Senior-Level Full Stack Architecture Rules

These rules define the target architecture for the admin panel as it evolves from a compact full-stack Next.js app into an enterprise-grade separated frontend and backend system.

## Non-Negotiables

- Keep frontend and backend concerns separated.
- Keep backend validation independent from frontend validation.
- Use module-wise backend folders for business features.
- Expose reusable APIs for web and mobile clients.
- Use TypeScript strictly across frontend, backend, and shared packages.
- Keep response formats consistent.
- Route all database access through repositories.
- Keep business logic in services, not route handlers or React components.
- Use centralized error handling on the backend.
- Protect routes with authentication and RBAC.

## Clean Architecture Rules

- Controllers handle HTTP input and output only.
- Services own business rules and orchestration.
- Repositories own persistence details.
- DTOs describe inbound and outbound transport shapes.
- Validation protects every external boundary.
- Shared code must be framework-neutral.
- Prisma models must not leak into frontend components.

## Frontend Rules

- Store UI code only in the frontend app.
- Use React Hook Form and Zod for form validation.
- Use Redux Toolkit or Zustand for authenticated user/session state.
- Keep API calls in frontend service files.
- Do not import backend repositories, Prisma, or server-only utilities into frontend files.
- Use reusable table, form, modal, layout, and UI components.

## Backend Rules

- Use Express with TypeScript for the separated API.
- Use route, controller, service, repository, validation, DTO, type, interface, constants, and swagger files per mature module.
- Use request validation middleware before controllers.
- Use centralized error middleware after routes.
- Use API logger middleware.
- Use versioned routes under `/api/v1`.
- Use Swagger/OpenAPI for all public API contracts.

## Security Rules

- Store JWTs in HTTP-only cookies.
- Use secure cookies in production.
- Use `sameSite: "strict"` for admin authentication cookies.
- Hash passwords with bcrypt.
- Add helmet, cors, rate limiting, xss protection, hpp protection, and cookie parsing to Express.
- Never trust frontend validation.
- Never return password hashes, reset tokens, or internal auth secrets in API responses.

## Production Rules

- Add audit logs for sensitive changes.
- Add activity logs for admin workflows.
- Add queue workers for slow jobs.
- Add email and notification services.
- Add file upload storage abstraction.
- Add Docker and deployment configs.
- Add CI/CD checks for lint, typecheck, test, migration validation, and build.

## Migration Rule

Do not rewrite the full app at once. Move one backend module at a time into the separated `api/` package while keeping frontend behavior stable.
