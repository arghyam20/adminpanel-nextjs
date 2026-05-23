# Enterprise Full Stack Admin Panel Architecture

This project has been restructured toward a separated enterprise architecture:

- `app/` contains frontend UI routes and UI components.
- `api/` contains backend API route scaffolding outside the frontend app.
- `modules/` contains module-wise architecture boundaries.
- `types/`, `utils/`, `config/`, `constants/`, `validations/`, `services/`, and `repositories/` are top-level shared application layers.
- `prisma/` remains the database schema, migration, and seed boundary.

## Current Project Structure

```text
project-root/
  app/                    # Frontend UI only
  api/                    # Backend API boundary
  modules/                # Module-wise enterprise structure
  prisma/
  public/
  types/
  utils/
  config/
  middleware/
  constants/
  validations/
  services/
  repositories/
  hooks/
  store/
  styles/
  docs/
  docker/
  scripts/
```

## Frontend Structure

```text
app/
  (auth)/
  dashboard/
  users/
  roles/
  blogs/
  services/
  testimonials/
  faq/
  components/
  layout.tsx
  page.tsx
  providers.tsx
```

Frontend responsibilities:

- UI rendering.
- API calling.
- Form handling.
- Client-side validation.
- State management.
- Route protection.

Frontend must not contain:

- Database logic.
- Prisma logic.
- Backend business logic.
- JWT creation logic.

## Backend API Structure

```text
api/
  v1/
    auth/
    users/
    roles/
    blogs/
    faqs/
    services/
    testimonials/
    categories/
    service-categories/
    docs/
  middlewares/
  utils/
  config/
  helpers/
  swagger/
```

The current `api/v1/**/route.ts` files are migrated out of `app/` as the backend boundary. The next production step is to wire these into a dedicated Express API package or server entrypoint.

## Module-Wise Architecture

```text
modules/
  user/
    controller/
    service/
    repository/
    route/
    validation/
      frontend/
      backend/
    dto/
    types/
    interfaces/
    constants/
    swagger/
```

The same module boundary is scaffolded for:

- `user`
- `role`
- `blog`
- `faq`
- `service`
- `testimonial`
- `category`
- `service-category`

## Validation Architecture

Frontend validation:

```text
modules/<module>/validation/frontend/
```

Purpose:

- UI validation.
- Form validation.
- Client-side error handling.

Backend validation:

```text
modules/<module>/validation/backend/
```

Purpose:

- API payload validation.
- Security validation.
- Request sanitization.

Backend validation must never import frontend validation.

## Type Structure

```text
types/
  api/
  auth/
  common/
  database/
  response/
  modules/
```

Framework-neutral contracts live here. These types must not import React, Next.js, Prisma Client, or server-only APIs.

## Request Flow

```text
Frontend UI
    |
Frontend API Service
    |
API v1 Route
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

## JWT Authentication Target

The production authentication architecture should include:

- Access token.
- Refresh token.
- HTTP-only cookies.
- Secure cookies.
- SameSite protection.
- Token rotation.
- Auto refresh.
- Logout session destruction.

Authentication flow:

```text
Frontend Login
      |
Backend Verifies User
      |
Generate Access Token
Generate Refresh Token
      |
Store Tokens in HTTP-only Cookies
      |
Frontend Receives Authenticated Session
```

## API Standards

REST endpoints should follow versioned paths:

```text
/api/v1/users
/api/v1/roles
/api/v1/blogs
```

Success response:

```json
{
  "success": true,
  "message": "User fetched successfully",
  "data": [],
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

## Security Requirements

The separated backend should implement:

- Helmet.
- CORS.
- Rate limiter.
- CSRF protection.
- SQL injection protection through Prisma and validation.
- XSS protection.
- Secure HTTP headers.
- Password hashing with bcrypt.

## Database Rules

Use Prisma with MySQL.

Required model conventions:

- Proper relations.
- Migration system.
- Seeders.
- Soft delete.
- Audit fields where needed: `createdBy`, `updatedBy`.
- Timestamps: `createdAt`, `updatedAt`, `deletedAt`.

## Current Implementation Notes

Completed in this restructure:

- Moved frontend from `src/app` to root `app`.
- Moved UI components under `app/components`.
- Moved backend route code out of `app/api` to `api/v1`.
- Moved shared app layers to top-level folders.
- Moved global styles to `styles`.
- Moved typed config to `config`.
- Added `modules` boundaries and frontend/backend validation folders.
- Added root type folders for API, auth, common, database, response, and modules.
- Removed the obsolete `src/` and `shared/` folders.

Deferred production work:

- Dedicated Express server entrypoint.
- Package installation for Helmet, CORS, rate limiting, CSRF, and logger middleware.
- Refresh-token rotation persistence.
- Audit/activity log models.
- Queue, email, upload, and notification services.
- Full Swagger schemas per module.
