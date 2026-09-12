# Seed and clear CLI

Seed scripts populate Nimbus Tech baseline content. Clear scripts are destructive maintenance tools.

## Commands

```bash
pnpm db:help
pnpm db:seed:help
pnpm db:clear:help

pnpm db:seed
pnpm db:seed resume
pnpm db:seed navigation footer

pnpm db:clear -- --resume
pnpm db:clear -- --resume --analytics --navigation
pnpm db:clear resume analytics navigation
pnpm db:clear -- --pages privacy-policy terms
pnpm db:clear:all
```

Arguments after `--` are passed to the script. Plain component names can also be passed directly.

## Seed behavior

Running `pnpm db:seed` without component names seeds everything in dependency order:

1. `slugs`
2. `languages`
3. `images`
4. `ctas`
5. `certifications`
6. `heroes`
7. `benefits`
8. `approaches`
9. `about`
10. `analytics`
11. `navigation`
12. `footer`
13. `faqs`
14. `features`
15. `testimonials`
16. `maps`
17. `pageContents`
18. `resume`
19. `legalPages`

Selective `resume` seeding ensures languages, images, and certifications first. Selective `legalPages` seeding ensures languages first. Other components use their orchestrated dependencies where implemented.

Seed operations are intended to be repeatable. Existing records are reused when their stable seed identity matches, and incomplete resume records are reconciled on rerun.

## Clear behavior

> **Warning:** Component clears delete every record from their target tables, including manually authored CMS content. Back up the target database and verify `DATABASE_URL` before running them.

Supported component flags:

- `--footer`
- `--page-contents`
- `--legal-pages`
- `--resume`
- `--navigation`
- `--analytics`
- `--about`
- `--approaches`
- `--maps`
- `--features`
- `--certifications`
- `--faqs`
- `--benefits`
- `--heroes`
- `--testimonials`
- `--languages`
- `--ctas`
- `--types`
- `--images`
- `--pages <slug...>` (must be last; all following non-flag arguments are page slugs)

Component flags and names execute in argument order. Requested page slugs are deleted after component clears. Related multi-table clears run transactionally.

### Production guard

When `NODE_ENV=production`, clear commands refuse to run unless explicitly confirmed:

```bash
NODE_ENV=production pnpm db:clear -- --resume --confirm-production-clear
```

Automation may instead set `ALLOW_PRODUCTION_DB_CLEAR=true`. Use either mechanism only when permanent deletion is intended.

## Common workflows

### Initial content

```bash
pnpm db:seed
```

### Refresh resume content

```bash
pnpm db:clear -- --resume
pnpm db:seed resume
```

### Refresh selected sections

```bash
pnpm db:clear -- --heroes --benefits --testimonials
pnpm db:seed heroes benefits testimonials
```

### Reset local database

```bash
pnpm db:fresh
```

`db:fresh`, `db:reset`, and `db:reset:seed` reset the schema and permanently delete data.

## Component reference

| Component | Main dependencies |
| --- | --- |
| `slugs` | None |
| `languages` | None |
| `images` | Slugs |
| `ctas` | Slugs, languages |
| `certifications` | Slugs, CTAs, images, languages |
| `heroes` | Images, slugs, CTAs, languages |
| `benefits` | Images, slugs, CTAs, languages |
| `approaches` | Languages |
| `about` | Languages |
| `analytics` | Languages |
| `navigation` | Images, CTAs, slugs, languages |
| `footer` | Slugs, languages |
| `faqs` | Languages |
| `features` | Languages |
| `testimonials` | Images, slugs, languages |
| `maps` | Languages |
| `pageContents` | Content sections above |
| `resume` | Languages, images, certifications |
| `legalPages` | Languages |

## Troubleshooting

List accepted arguments without connecting to the database:

```bash
pnpm db:seed:help
pnpm db:clear:help
```

After schema changes, regenerate Keystone artifacts and apply a development migration:

```bash
pnpm generate
```

`pnpm generate` runs `keystone build --no-ui` before Prisma Migrate so `schema.prisma` reflects `schema.ts`. For connection errors, verify the database exists, is reachable, and matches `DATABASE_URL`. Development migrations also require a distinct `SHADOW_DATABASE_URL`.
