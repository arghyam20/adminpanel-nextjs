# Admin Panel Next.js

Modern full-stack admin panel using Next.js App Router, TypeScript, MySQL, Prisma, JWT authentication, HTTP-only cookies, Material UI, Tailwind CSS, React Hook Form, and Zod.

## Features

- JWT authentication with secure HTTP-only cookies
- Login, logout, forgot password, reset password
- Middleware-protected dashboard routes
- Role-based permissions stored per role
- REST APIs with validation, standard responses, soft deletes, and repository pattern
- Prisma MySQL schema with model-wise files, relations, timestamps, soft delete fields, and seed data
- Admin modules for roles, users, categories, FAQs, testimonials, blogs, service categories, and services
- Material Design admin shell with sidebar, dashboard cards, responsive tables, loading skeletons, toasts, export actions, and light/dark mode

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and update `DATABASE_URL` plus `JWT_SECRET`.

3. Create the database:

```bash
mysql -u root -p < prisma/database.sql
```

4. Run migrations and seed:

```bash
npm run prisma:migrate
npm run prisma:seed
```

5. Start development:

```bash
npm run dev
```

Default seed login:

- Email: `admin@example.com`
- Password: `Admin@12345`

## API

OpenAPI JSON is available at:

```text
/api/docs
```

Main endpoints:

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET|POST|PUT|DELETE /api/roles`
- `GET|POST|PUT|DELETE /api/users`
- `GET|POST|PUT|DELETE /api/categories`
- `GET|POST|PUT|DELETE /api/faqs`
- `GET|POST|PUT|DELETE /api/testimonials`
- `GET|POST|PUT|DELETE /api/blogs`
- `GET|POST|PUT|DELETE /api/service-categories`
- `GET|POST|PUT|DELETE /api/services`

Updates and deletes use an `id` query parameter, for example `PUT /api/users?id=1`.

## Production Notes

- Use HTTPS in production so secure cookies are enforced end to end.
- Rotate `JWT_SECRET` with a long random value.
- Replace the development forgot-password token response with an email provider.
- Store uploads in S3-compatible object storage for production deployments.
- Run `npm run build` before deployment.

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full-stack admin panel architecture map, request flow, module pattern, and implementation roadmap.

Senior-level architecture rules are documented in [docs/SENIOR_ARCHITECTURE_RULES.md](./docs/SENIOR_ARCHITECTURE_RULES.md).
