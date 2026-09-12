# AGENTS.md - NT Keystone CMS

## Project Overview

KeystoneJS headless CMS for managing website content (hero sections, testimonials, FAQs, resumes, etc.). Uses PostgreSQL, Prisma ORM, NextAuth with Amazon Cognito for authentication.

**Critical**: Schema changes require `pnpm generate` → `prisma db push` → restart dev server. Never modify `generated/` files directly.

## Tech Stack

| Component | Version | Notes |
|-----------|---------|-------|
| Node.js | >=22.12 | Required |
| pnpm | 10.32.1 | Package manager |
| Keystone | 8.1.0 | CMS framework |
| Next.js | 16.3.5 | Admin UI |
| React | 19.2.4 | |
| Prisma | 7.10.0 | ORM |
| PostgreSQL | - | Database |
| TypeScript | 5.9.3 | |

## Project Structure

```
├── keystone.ts          # Main config, DB, auth, server
├── schema.ts            # All Keystone lists (1200+ lines)
├── session.ts           # NextAuth/Cognito auth logic
├── seed/
│   ├── index.ts         # Seed orchestrator with dependency ordering
│   ├── clear.ts         # Destructive clear CLI
│   ├── prisma.ts        # Prisma client factory
│   ├── types.ts         # Shared types (WithId, Maybe)
│   └── components/      # 19 seed modules
├── admin/               # Custom Admin UI overrides
├── data/                # Static data/types
├── generated/           # Auto-generated (NEVER edit)
├── migrations/          # Prisma migrations
├── docs/                # Deployment docs
└── Dockerfile           # Production deployment
```

## Key Commands

```bash
# Development
pnpm dev                    # Start dev server (port 3000)
pnpm build                  # Production build
pnpm start                  # Start production server

# Database
pnpm generate               # Generate Prisma client + migrations
pnpm db:push                # Push schema without migrations
pnpm db:seed                # Seed all components
pnpm db:seed <component>    # Seed specific component
pnpm db:seed:all            # Explicitly seed all
pnpm db:clear -- --all      # Clear all seeded data
pnpm db:fresh               # Reset + seed (fresh start)
pnpm db:reset               # Reset database (DESTRUCTIVE)

# Schema Verification
pnpm schema:verify:dev      # Development verification
pnpm schema:verify:prod     # Production verification
```

## Schema Lists (Access Control)

All lists use `crud` access control:
- **query**: `allowAll` (public read)
- **create/update/delete**: Requires `session.userGroup === "cms-admin"`

### Core Content Types
- `User` - Authentication users
- `Type` - Content type labels (certification, cta, hero, navigation, testimonial, footer, main, resume)
- `Language` - Language options (English/German/Hindi)
- `Image` - Image metadata
- `Cta` - Call-to-action links

### Page Sections
- `Hero`, `HeroBanner`, `HeroBannerAdditional`
- `Benefit`, `BenefitSection`
- `Faq`, `FaqSection`
- `Feature`
- `Approach`, `ApproachStep`
- `Certification`, `CertificationSection`
- `TestimonialBadge`, `TestimonialItem`, `TestimonialSection`
- `Navigation`, `NavigationLink`
- `Footer`, `FooterSection`, `FooterSectionKey`
- `About`, `Value`
- `Map`
- `CtaSection`
- `AnalyticsStat`, `AnalyticsSummaryItem`, `Analytic`

### Page Composition
- `Section` - Dynamic section type selector
- `PageContent` - Page with slug, title, sections

### Resume Module
- `Resume` - Top-level resume record
- `ResumeBasicInformation`, `ResumeLocation`, `ResumeProfile`
- `ResumeWork`, `ResumeHighlight`
- `ResumeVolunteer`, `ResumeEducation`
- `ResumeAward`, `ResumePublication`
- `ResumeSkill`, `ResumeLanguage`, `ResumeInterest`, `ResumeReference`
- `ResumeProject`, `ResumeCertification`

## Authentication Flow

1. **Provider**: Amazon Cognito via NextAuth
2. **Session Strategy**: JWT (1 hour expiry)
3. **Group Validation**: User must be in `cms-admin` Cognito group
4. **Session Shape**: `{ id, userGroup }` (userGroup is "cms-admin" or null)
5. **Access Control**: GraphQL CUD operations require `userGroup === "cms-admin"`

**Key**: `decodeJwtPayload()` in `session.ts` reads JWT claims without signature verification (NextAuth handles that). Use it for debugging token contents.

## Seed System

### Dependency Order (CRITICAL)
```typescript
const SEED_ORDER = [
  "slugs",        // Type records
  "languages",    // Language records
  "images",       // Image records
  "ctas",         // CTA links + sections
  "certifications",
  "heroes",
  "benefits",
  "approaches",
  "about",
  "analytics",
  "navigation",
  "footer",
  "faqs",
  "features",
  "testimonials",
  "maps",
  "pageContents", // Depends on ALL above
  "resume",
  "legalPages",
];
```

### Adding New Seed Component
1. Create `seed/components/<name>.ts`
2. Export `seed(prisma, dependencies)` function
3. Export `clear(prisma)` function (optional but recommended)
4. Add to `SEED_ORDER` in `seed/index.ts`
5. Add to `clear.ts` CLEAR_ACTIONS
6. Add cache type to `SeedCache` in `seed/index.ts`

### Seed Module Pattern
```typescript
export default async function seed(
  prisma: PrismaClient,
  deps: { languages: Language[]; /* other deps */ }
): Promise<ReturnType[]> {
  const results = [];
  for (const item of seedData) {
    const record = await prisma.<model>.upsert({
      where: { /* unique field */ },
      update: { /* fields */ },
      create: { /* fields */ },
    });
    results.push(record);
  }
  return results;
}

export async function clear(prisma: PrismaClient): Promise<void> {
  await prisma.<model>.deleteMany({});
}
```

## Common Patterns

### Upsert for Idempotent Seeds
```typescript
await prisma.hero.upsert({
  where: { id: existingId },
  update: { title: "New Title" },
  create: { title: "New Title", /* other fields */ },
});
```

### Cascade Deletes
Schema uses `cascadeOwnedForeignKey` helper for owned relationships (e.g., `Resume.work` → `ResumeWork.resume`). This adds `onDelete: Cascade` to Prisma schema.

### Virtual Fields
Some lists use `virtual()` for computed display values (e.g., `Image.preview`, `FooterSection.displayLabel`). These don't persist to DB.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Yes | NextAuth JWT secret |
| `NEXTAUTH_URL` | Yes | Public CMS URL (e.g., https://cms.example.com) |
| `COGNITO_CLIENT_ID` | Yes | Cognito app client ID |
| `COGNITO_CLIENT_SECRET` | Yes | Cognito app client secret |
| `COGNITO_ISSUER` | Yes | Cognito user pool issuer URL |
| `CMS_AUTH_GROUP` | Yes | Must be "cms-admin" |
| `CORS_ORIGIN` | No | Comma-separated allowed origins |

**Never commit `.env` files.** Use `.env.copy` as template.

## Security Considerations

1. **Access Control**: All CUD operations require CMS admin group membership
2. **JWT Validation**: NextAuth handles Cognito token verification
3. **CORS**: Configurable via `CORS_ORIGIN` env var
4. **Build-Time Safety**: `requireEnv()` returns placeholder during `postinstall`/`build`
5. **Production Clear**: Requires explicit `--confirm-production-clear` flag or `ALLOW_PRODUCTION_DB_CLEAR=true`

## Debugging Tips

1. **Seed Issues**: Check `SEED_ORDER` dependencies. Run specific component: `pnpm db:seed <component>`
2. **Auth Issues**: Verify Cognito group membership, check JWT payload with `decodeJwtPayload()`
3. **Schema Issues**: Run `pnpm generate` → `prisma db push` → restart dev
4. **Database Issues**: Check `DATABASE_URL`, verify PostgreSQL connection
5. **Build Failures**: Ensure all env vars set (except at build time where placeholders allowed)

## Deployment (Northflank)

1. Build Docker image
2. Run migration job: `pnpm exec prisma migrate deploy`
3. Deploy web service (port 3000)
4. Health check: `/api/graphql?query=%7B__typename%7D`

**Never run `pnpm db:reset` or `pnpm db:fresh` in production.**

## Available Skills

Use these skills to minimize token consumption:

| Skill | Purpose | Trigger |
|-------|---------|---------|
| `caveman` | Ultra-compressed communication | "caveman mode", `/caveman` |
| `caveman-commit` | Compressed commit messages | "write commit", `/commit` |
| `caveman-review` | Compressed code review | "review PR", `/review` |
| `pragmatic-development` | Conservative, minimal-change approach | Always applicable |
| `vercel-react-best-practices` | React/Next.js performance | React/Next.js code |
| `nextjs-typescript` | Next.js TypeScript patterns | Next.js code |
| `shadcn` | shadcn component management | shadcn components |
| `find-skills` | Discover installable skills | "find skill for X" |

## Code Style

- **TypeScript**: Strict mode
- **Formatting**: Prettier (if configured)
- **Imports**: Use `@/` path aliases where configured
- **Components**: Functional components only
- **State**: Hooks-based state management
- **Database**: Always use Prisma client, never raw SQL
