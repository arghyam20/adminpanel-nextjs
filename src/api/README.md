# API Module (src/api)

Overview

This folder contains a modular backend for the Next.js AdminPanel application. It's intentionally placed outside `app/` so the API can run as a separate process (Express-based) or be adapted to Next.js route handlers.

Quick start (development)

Install dev dependencies (if not already present):

```bash
npm install -D ts-node-dev
npm install express swagger-jsdoc swagger-ui-express joi jsonwebtoken @prisma/client prisma
```

Run the API server (with `ts-node-dev`):

```bash
npx ts-node-dev --respawn --transpile-only src/api/server.ts
```

Notes
- The API follows Controller → Service → Repository layers.
- Prisma client is exposed at `src/api/prisma/client.ts`.
- Swagger UI is available at `http://localhost:4000/api/docs` when running the server.
- To integrate with Next.js route handlers, call service functions directly from route handlers under `app/api/...` and reuse the same services/repositories.
