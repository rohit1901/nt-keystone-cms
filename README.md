# nt-keystone-cms

Keystone 6 CMS for Nimbus Tech. It provides a PostgreSQL-backed GraphQL API and a Cognito-authenticated Admin UI for managing bilingual website content.

## Runtime

- Node.js 22.12+ (the production `Dockerfile` uses `node:22-slim`)
- pnpm 10.32.1, pinned through `packageManager`
- Keystone 8, Next.js 16, React 19, and Prisma 7
- PostgreSQL
- NextAuth with Amazon Cognito

## Access model

- GraphQL reads are public.
- GraphQL create, update, and delete operations require an authenticated user whose stored `userGroup` is `cms-admin`.
- The Admin UI requires an authenticated `cms-admin` session.
- `CMS_AUTH_GROUP` must therefore be `cms-admin`, and the Cognito user must belong to that group.

## Local setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Create your local environment configuration without committing credentials. The application requires:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection URL for the application database. |
| `SHADOW_DATABASE_URL` | Connection URL for a separate Prisma shadow database used by the `prisma migrate dev` step in `pnpm generate`. Never point this at the application database. |
| `NEXTAUTH_SECRET` | Strong random secret used to sign NextAuth sessions. |
| `COGNITO_CLIENT_ID` | Cognito app client ID. |
| `COGNITO_CLIENT_SECRET` | Cognito app client secret. |
| `COGNITO_ISSUER` | Cognito issuer URL for the user pool. |
| `CMS_AUTH_GROUP` | Cognito group allowed to write content; set this to `cms-admin`. |

For hosted environments, also set `NEXTAUTH_URL` to the public CMS base URL. `CORS_ORIGIN` is optional and accepts a comma-separated list of allowed browser origins.

The local PostgreSQL Compose service additionally reads `POSTGRES_DB`, `POSTGRES_USER`, and `POSTGRES_PASSWORD`.

### 3. Start PostgreSQL

```bash
docker compose -f docker-compose.postgres.yml up -d --build
```

PostgreSQL is published on host port **5433** (container port `5432`), so local database URLs must use `localhost:5433`. Provision a separate shadow database on the same server, or use another PostgreSQL instance, for `SHADOW_DATABASE_URL`.

To stop the database:

```bash
docker compose -f docker-compose.postgres.yml down
```

### 4. Apply a development migration and generate the Prisma client

```bash
pnpm generate
```

Despite its name, this script first runs `keystone build --no-ui` to regenerate Keystone's GraphQL/Prisma schemas and client, then runs `prisma migrate dev` and an explicit `prisma generate`. This prevents migrations from using a stale generated `schema.prisma`.

### 5. Seed content (optional)

```bash
pnpm db:seed
```

See [the seed CLI guide](seed/README.md) for supported components and arguments.

### 6. Start Keystone

```bash
pnpm dev
```

- Admin UI: <http://localhost:3000/admin>
- GraphQL API: <http://localhost:3000/api/graphql>

## Database safety

> **Destructive commands:** `pnpm db:clear`, `pnpm db:reset`, `pnpm db:reset:seed`, and `pnpm db:fresh` delete content or reset the schema. Verify the target `DATABASE_URL` and take any required backup before running them. Do not run them against production unless data loss is intentional.

Use `pnpm generate` only for development migration work and Prisma client generation. In production, run `pnpm exec prisma migrate deploy` in a dedicated deployment migration job before releasing the web service. Do not make schema migration part of application startup. See [the Northflank/Docker deployment guide](docs/deployment.md).

## Package scripts

These are the scripts currently defined in `package.json`:

| Script | What it runs |
| --- | --- |
| `pnpm dev` | Start Keystone in development mode. |
| `pnpm build` | Build Keystone for production. |
| `pnpm start` | Start the previously built Keystone application. |

| `pnpm postinstall` | Generate Keystone artifacts; normally invoked by pnpm. |
| `pnpm generate` | Regenerate Keystone schemas/client, run `prisma migrate dev`, then `prisma generate`. |
| `pnpm db:push` | Regenerate Keystone schemas/client, push with `prisma db push`, then `prisma generate`. |
| `pnpm db:seed` | Run the seed CLI. |
| `pnpm db:seed:help` | Show seed CLI help. |
| `pnpm db:clear` | Run the clear CLI. |
| `pnpm db:clear:help` | Show clear CLI help. |
| `pnpm db:reset` | Regenerate Keystone schemas/client, force-reset with `prisma db push`, then run `prisma generate`. |
| `pnpm db:reset:seed` | Force-reset the database, generate the Prisma client, then seed it. |
| `pnpm db:fresh` | Force-reset the database, generate the Prisma client, then seed all components. |
| `pnpm db:help` | Show database CLI help. |
| `pnpm schema:verify:dev` | Production build, development migration, then start. |
| `pnpm schema:verify:prod` | Build, deploy migrations, then start in one process. Prefer the dedicated migration-job workflow for deployments. |

## Repository map

- `admin/` — Admin UI customizations and NextAuth routes
- `data/` — active seed support types/icon mapping plus legacy reference data; see [`data/README.md`](data/README.md)
- `migrations/` — committed Prisma migrations
- `seed/` — seed and clear CLIs
- `keystone.ts` — Keystone server, database, CORS, and Admin UI configuration
- `schema.ts` — lists and access control
- `session.ts` — Cognito/NextAuth session integration
- `Dockerfile` — production image used by Northflank
- `docker-compose.postgres.yml` — local PostgreSQL service

## Deployment

Production deployment is documented only for Northflank using the repository Docker image: [Northflank/Docker deployment](docs/deployment.md).
