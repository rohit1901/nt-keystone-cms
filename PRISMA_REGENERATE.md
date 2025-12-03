# Prisma Client Regeneration Guide

This guide explains how to regenerate the Prisma Client after schema changes to resolve TypeScript errors in the seed file.

## Why Regenerate?

After updating `schema.ts`, Keystone generates a new `schema.prisma` file, but the TypeScript Prisma Client code in `node_modules/.prisma` may be out of sync. This causes TypeScript errors about missing models or properties.

## Quick Fix

Run these commands in order:

```bash
# Step 1: Delete the old Prisma client cache
rm -rf node_modules/.prisma
# or on Windows:
rmdir /s /q node_modules\.prisma

# Step 2: Stop any running Keystone server
# Press Ctrl+C if server is running

# Step 3: Generate Prisma Client from the current schema
npx prisma generate --schema=./schema.prisma
# or
yarn prisma generate --schema=./schema.prisma

# Step 4: Restart your IDE/Editor to pick up new types
# For VS Code: Reload Window (Ctrl+Shift+P -> "Reload Window")
```

## Full Reset (if Quick Fix doesn't work)

```bash
# 1. Clean everything
rm -rf node_modules/.prisma
rm -rf .keystone
rm keystone.db

# 2. Start Keystone in dev mode
npm run keystone dev
# or
yarn keystone dev

# 3. Keystone will:
#    - Generate schema.prisma from schema.ts
#    - Create database migrations
#    - Generate Prisma Client
#    - Start the server

# 4. Press Ctrl+C to stop the server

# 5. Run the seed script
npm run seed
# or
ts-node seed.ts
```

## Verifying the Fix

After regenerating, check that these types are available:

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// These should all be available without TypeScript errors:
prisma.benefitSection.create({ /* ... */ });
prisma.testimonialSection.create({ /* ... */ });
prisma.certificationSection.create({ /* ... */ });
prisma.footerSection.create({ /* ... */ });
prisma.ctaSection.create({ /* ... */ });
```

## Common Issues

### Issue: "Property 'benefitSection' does not exist"

**Cause:** Prisma Client not regenerated after schema changes.

**Solution:**
```bash
rm -rf node_modules/.prisma
npx prisma generate --schema=./schema.prisma
```

### Issue: TypeScript still shows errors after regeneration

**Cause:** IDE/Editor hasn't reloaded the new types.

**Solution:**
- VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
- Or: `Ctrl+Shift+P` → "Reload Window"
- Or: Close and reopen your editor

### Issue: "Cannot find module '@prisma/client'"

**Cause:** Prisma client not installed.

**Solution:**
```bash
npm install @prisma/client
# or
yarn add @prisma/client
```

### Issue: Database schema out of sync

**Cause:** Migration not applied.

**Solution:**
```bash
# For development (SQLite)
npx prisma migrate dev --name sync-schema
# or
yarn prisma migrate dev --name sync-schema

# For production
npx prisma migrate deploy
# or
yarn prisma migrate deploy
```

## Package.json Scripts

Add these helpful scripts to your `package.json`:

```json
{
  "scripts": {
    "keystone": "keystone",
    "keystone:dev": "keystone dev",
    "keystone:start": "keystone start",
    "keystone:build": "keystone build",
    "prisma:generate": "prisma generate --schema=./schema.prisma",
    "prisma:studio": "prisma studio --schema=./schema.prisma",
    "seed": "ts-node seed.ts",
    "db:reset": "rm -rf .keystone && rm keystone.db && npm run keystone:dev",
    "db:seed": "npm run prisma:generate && npm run seed"
  }
}
```

Then you can run:
```bash
npm run prisma:generate
npm run db:seed
```

## Workflow for Schema Changes

Follow this workflow when you modify `schema.ts`:

1. **Modify** `schema.ts` with your changes
2. **Generate** Prisma schema: `npm run keystone dev` (let it start)
3. **Stop** the server: `Ctrl+C`
4. **Regenerate** Prisma client: `npx prisma generate --schema=./schema.prisma`
5. **Reload** your IDE/Editor
6. **Run** seed script: `npm run seed`
7. **Verify** in Keystone Admin UI: `npm run keystone dev`

## Keystone's Schema Generation

Keystone automatically generates `schema.prisma` from `schema.ts` when you run:
- `keystone dev`
- `keystone build`
- `keystone start`

The generated file is in the project root as `schema.prisma`.

## Checking Current Schema

To view the current Prisma schema:

```bash
cat schema.prisma
# or on Windows:
type schema.prisma
```

To view it in a GUI:

```bash
npx prisma studio --schema=./schema.prisma
# or
yarn prisma studio --schema=./schema.prisma
```

## Database Migrations

When Keystone detects schema changes, it prompts you to create migrations:

```
✨ There are changes to your database schema.

? Name of migration › your-migration-name

? Would you like to create this migration? › (Y/n)
```

Always answer **Yes** to keep your database in sync.

## Troubleshooting Checklist

- [ ] `schema.prisma` exists in project root
- [ ] `node_modules/.prisma` directory exists
- [ ] `node_modules/@prisma/client` is installed
- [ ] Ran `npx prisma generate --schema=./schema.prisma`
- [ ] Restarted TypeScript server in IDE
- [ ] No TypeScript errors in `seed.ts`
- [ ] Can import `PrismaClient` successfully

## Advanced: Manual Schema Generation

If you need to manually generate the Prisma schema from Keystone:

```typescript
// generate-schema.ts
import { config } from './keystone';
import { generatePrismaSchema } from '@keystone-6/core/scripts/utils/generatePrismaSchema';

async function generate() {
  const schema = await generatePrismaSchema(config);
  console.log(schema);
}

generate();
```

Run: `ts-node generate-schema.ts > schema.prisma`

## References

- [Keystone Migrations Guide](https://keystonejs.com/docs/guides/migrations)
- [Prisma Client Documentation](https://www.prisma.io/docs/concepts/components/prisma-client)
- [Prisma Generate Command](https://www.prisma.io/docs/reference/api-reference/command-reference#generate)

---

**Last Updated:** 2024
**Keystone Version:** 6.x
**Prisma Version:** 5.x