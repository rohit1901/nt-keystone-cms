# Seed Migration Guide

This guide explains how to update your database schema and run the refactored seed script after the schema.ts refactoring.

## Prerequisites

- Node.js installed
- Database connection configured in `.env`
- Keystone project set up

## Step 1: Backup Your Database

Before making any changes, backup your existing database:

```bash
# For SQLite (if using keystone.db)
cp keystone.db keystone.db.backup

# For PostgreSQL
pg_dump your_database > backup.sql

# For MySQL
mysqldump your_database > backup.sql
```

## Step 2: Update Prisma Schema

The Keystone schema changes need to be reflected in the Prisma schema. Run:

```bash
# This regenerates the Prisma schema from Keystone's schema.ts
npm run keystone dev
# or
yarn keystone dev
```

Keystone will automatically detect schema changes and prompt you to:
1. Create a migration
2. Apply the migration

Answer "yes" to both prompts.

Alternatively, you can manually generate and apply migrations:

```bash
# Generate Prisma schema from Keystone schema
npm run keystone prisma migrate dev --name refactor-schema

# or with yarn
yarn keystone prisma migrate dev --name refactor-schema
```

## Step 3: Key Schema Changes to Note

The refactored schema includes these major changes:

### Renamed Lists
- `FooterPart` → `FooterSection` (in Prisma, use `footerSection`)
- `Testimonial` → `TestimonialSection` (in Prisma, use `testimonialSection`)

### Field Name Changes
- `ApproachStep.aid` → `ApproachStep.stepId` (but keep `aid` for backward compatibility)
- `Feature.fid` → `Feature.featureId` (keep both)
- `Certification` now has `certId`, `width`, `height` fields
- `HeroBanner` now has `icon` field
- `TestimonialItem` now has `rating` field (float, optional)

### New Lists
- `BenefitSection` - groups benefits with a title
- `CertificationSection` - groups certifications with description and CTA

### Field Type Changes
- Images stored as text paths instead of relationships in most places
- `PageContent.imageAlt` added
- `Navigation.imageAlt` added
- `CtaSection.title` and `CtaSection.description` added
- `Footer.title` added

## Step 4: Clear Existing Data (Optional)

If you want to start fresh:

```bash
# For SQLite
rm keystone.db
npm run keystone dev
# This will create a new database with the updated schema

# For PostgreSQL/MySQL
# Drop and recreate the database, then run migrations
```

## Step 5: Run the Seed Script

```bash
# Install dependencies if needed
npm install
# or
yarn install

# Run the seed script
npm run seed
# or
yarn seed
# or directly
node seed.ts
# or
ts-node seed.ts
```

## Expected Output

You should see output like:

```
🌱 Starting Keystone CMS database seed...

Seeding images...
✓ Seeded 5 images
Seeding backgrounds...
✓ Seeded 4 backgrounds
Seeding hero section...
✓ Seeded hero section
Seeding benefits...
✓ Seeded benefits section with 3 benefits
...
✓ Created 13 page sections
Seeding page content...
✓ Seeded page content: home

✅ Seeding completed successfully!
```

## Step 6: Verify the Data

Start Keystone Admin UI to verify the seeded data:

```bash
npm run keystone dev
# or
yarn keystone dev
```

Navigate to `http://localhost:3000` (or your configured port) and check:

1. **Benefits** - Should have 3 benefit items
2. **Certifications** - Should have 6 certifications
3. **Features** - Should have 3 features
4. **FAQs** - Should have 8 FAQ items
5. **Testimonials** - Should have 1 fallback testimonial
6. **Hero** - Should have hero with banner and additional content
7. **Navigation** - Should have navigation with 4 links
8. **Footer** - Should have 4 footer sections (Services, Company, Resources, Social)
9. **Analytics** - Should have stats and 3 summary items
10. **About** - Should have 5 company values
11. **Approach** - Should have 5 approach steps
12. **Page Content** - Should have 1 page with slug "home"

## Troubleshooting

### Error: "Table does not exist"

**Solution:** Run Keystone migrations:
```bash
npm run keystone prisma migrate dev
```

### Error: "Unknown field" in seed script

**Cause:** Prisma schema not regenerated.

**Solution:** 
1. Delete `node_modules/.prisma` folder
2. Run `npm run keystone prisma generate`
3. Restart your terminal/IDE
4. Run seed script again

### Error: "Relation does not exist"

**Cause:** Keystone lists renamed but Prisma hasn't updated.

**Solution:**
1. Stop Keystone server
2. Delete `.keystone` folder
3. Run `npm run keystone dev` to regenerate
4. Apply migrations when prompted

### Seed Script Fails Midway

**Solution:**
1. Clear the database (see Step 4)
2. Check for any required fields that might be missing
3. Run seed script again

### Foreign Key Constraint Errors

**Cause:** Data being seeded references IDs that don't exist yet.

**Solution:** The seed script is designed to create dependencies in order. If you see this error:
1. Clear the database
2. Ensure all seed functions are called in the correct order (see `main()` function)
3. Run seed again

## Advanced: Custom Seed Data

To customize the seed data:

1. Edit the data constants at the top of `seed.ts`:
   - `benefitsData`
   - `heroData`
   - `certificationsData`
   - etc.

2. Add or modify fields as needed

3. Ensure all required fields from the schema are included

4. Run the seed script

## Schema Migration Strategy

If you have existing production data:

### Option 1: Gradual Migration (Recommended)

1. Create a data export script to backup existing data
2. Run migrations to add new fields
3. Write a data transformation script to:
   - Rename fields (e.g., `aid` → `stepId`)
   - Add new required fields with default values
   - Transform image relationships to paths
4. Verify data integrity
5. Deploy

### Option 2: Fresh Start

1. Export critical data (users, content drafts)
2. Drop and recreate database
3. Apply new schema
4. Run seed script
5. Manually re-enter or import critical data

## Post-Migration Checklist

- [ ] All Keystone lists load in Admin UI
- [ ] All required fields have values
- [ ] Relationships work correctly
- [ ] Images display properly
- [ ] Navigation and footer render correctly
- [ ] No console errors in Admin UI
- [ ] GraphQL queries work for frontend
- [ ] Test CRUD operations on each list

## Next Steps

After successful seeding:

1. **Test the Admin UI** - Navigate through all lists and verify data
2. **Test the GraphQL API** - Query the data via GraphQL playground
3. **Update Frontend** - Ensure frontend queries match new schema
4. **Add Authentication** - Create admin users if needed
5. **Configure Permissions** - Set up access control for production

## Rollback Procedure

If you need to rollback:

1. Stop Keystone server
2. Restore database from backup
3. Checkout previous git commit
4. Run `npm install` to restore dependencies
5. Start Keystone server

```bash
# SQLite
cp keystone.db.backup keystone.db

# PostgreSQL
psql your_database < backup.sql

# MySQL
mysql your_database < backup.sql

# Then
git checkout <previous-commit-hash>
npm install
npm run keystone dev
```

## Support

If you encounter issues not covered in this guide:

1. Check Keystone documentation: https://keystonejs.com/docs
2. Review Prisma migration docs: https://www.prisma.io/docs/concepts/components/prisma-migrate
3. Check the `REFACTORING_NOTES.md` for detailed schema changes
4. Review seed.ts comments for data structure examples

## Additional Resources

- [Keystone Migration Guide](https://keystonejs.com/docs/guides/migrations)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [GraphQL Schema Changes](https://keystonejs.com/docs/guides/schema-changes)

---

**Last Updated:** 2024  
**Schema Version:** 2.0  
**Keystone Version:** 6.x