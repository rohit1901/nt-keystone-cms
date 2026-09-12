# Northflank deployment with Docker

This is the supported production deployment path for this repository. It uses the root `Dockerfile`, a Northflank PostgreSQL database, a long-running web service, and a separate migration job.

## Deployment layout

Create these Northflank resources in one project/environment:

1. A PostgreSQL add-on or externally managed PostgreSQL service.
2. A combined service built from this repository with `Dockerfile`.
3. A one-off job that uses the same built image/revision and runs Prisma migrations.

`DATABASE_URL` points to the application database. Production runtime and `prisma migrate deploy` do not need a Prisma shadow database; reserve `SHADOW_DATABASE_URL` for local `prisma migrate dev` workflows.

## Runtime variables

Store secrets in Northflank secrets or secret groups rather than in repository files. Attach the same runtime configuration to the web service and migration job because the Keystone CLI loads the application configuration.

| Variable | Value/role |
| --- | --- |
| `DATABASE_URL` | Internal PostgreSQL connection URL for the application database. |

| `NEXTAUTH_SECRET` | Strong random production secret. Keep the same value across replicas and releases. |
| `NEXTAUTH_URL` | Public HTTPS base URL of the CMS, without a trailing path. |
| `COGNITO_CLIENT_ID` | Cognito app client ID. |
| `COGNITO_CLIENT_SECRET` | Cognito app client secret. |
| `COGNITO_ISSUER` | Cognito user-pool issuer URL. |
| `CMS_AUTH_GROUP` | Set exactly to `cms-admin`. |
| `CORS_ORIGIN` | Optional comma-separated browser origins allowed to call GraphQL with credentials. |

Do not put production credentials in Docker build arguments. The image build uses placeholders where Keystone requires configuration at build time; real values belong in runtime secrets.

## Configure the web service

1. Connect the service to the Git repository and select Dockerfile builds.
2. Set the Dockerfile path to `Dockerfile` at the repository root.
3. Expose container port `3000` over HTTP and enable a public HTTPS domain.
4. Attach the runtime variables above.
5. Configure a health check against:

   ```text
   /api/graphql?query=%7B__typename%7D
   ```

The image starts with `pnpm start` and includes its own Docker health check. Keystone is configured to listen on port `3000`.

## Configure Cognito

For the public CMS URL `https://cms.example.com`, configure this callback URL on the Cognito app client:

```text
https://cms.example.com/api/auth/callback/cognito
```

Set `NEXTAUTH_URL=https://cms.example.com`. Ensure authorized editors belong to the Cognito group `cms-admin`; GraphQL reads are public, but create/update/delete operations require that group.

After deployment, the primary endpoints are:

- Admin UI: `https://cms.example.com/admin`
- GraphQL API: `https://cms.example.com/api/graphql`

## Create the migration job

Create a Northflank manual/one-off job from the exact image revision that will run as the web service. Override its command with:

```bash
pnpm exec prisma migrate deploy
```

Attach the same runtime variables and database network access as the web service. The job must exit successfully before the new web revision receives traffic.

Run the migration job:

- before the first application deployment; and
- once for every release containing new files under `migrations/`.

Before deploying resume migrations to an existing database, first confirm which migrations have already run in every shared environment:

- `20260122162556_resume` replaces `_Resume_languages` without copying existing relationships.
- `20260203202353_resume_highlights` drops `ResumeWork.highlights` without converting existing text into `ResumeHighlight` records.
- `20260313153406_resume_relationships` drops legacy resume relation tables without backfilling the new foreign keys.

These migrations can discard existing resume data or relationships. Do not edit applied migration history. For any environment containing resume data, prepare a reviewed forward data migration or restore plan before proceeding.

Run only one migration job at a time. Do not use `pnpm generate` in production because it invokes `prisma migrate dev`. Do not use `pnpm schema:verify:prod` for the job because that script rebuilds and then starts a long-running server instead of exiting after migration.

A typical release order is:

1. Build the new Docker image.
2. Run the migration job using that image.
3. Confirm the job completed with exit code `0`.
4. Deploy the same image revision to the web service.
5. Verify the GraphQL health endpoint and sign in at `/admin`.

## Seed data

Seeding is not part of deployment. If a production environment intentionally needs baseline content, run `pnpm db:seed` as a separate, explicitly triggered job after migrations. Never use any clear/reset/fresh script in production unless destructive data loss is intended and a suitable backup exists.

## Rollback

Application images can be rolled back to a previous revision, but database migrations are not automatically reversed. Before deploying a migration, confirm that it is backward-compatible with the previous application revision or prepare an explicit database recovery plan.
