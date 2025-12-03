# Seed Script - Quick Reference

🚀 **Quick Start Guide for Seeding Keystone CMS Database**

## TL;DR - Just Run This

```bash
# On macOS/Linux
chmod +x setup-and-seed.sh
./setup-and-seed.sh

# On Windows
setup-and-seed.bat
```

That's it! The script handles everything automatically.

---

## Manual Setup (3 Steps)

If you prefer to run commands manually:

### 1️⃣ Regenerate Prisma Client

```bash
# Remove old cache
rm -rf node_modules/.prisma
# Windows: rmdir /s /q node_modules\.prisma

# Generate new client
npx prisma generate --schema=./schema.prisma

# Restart your IDE (VS Code: Ctrl+Shift+P → "Reload Window")
```

### 2️⃣ Prepare Database

```bash
# Start Keystone to create database tables
npm run keystone dev

# Wait for it to finish, then press Ctrl+C
```

### 3️⃣ Run Seed

```bash
npm run seed
# or
npx ts-node seed.ts
```

---

## What Gets Seeded?

✅ **13 Content Sections:**
- Hero section with banner
- 3 Benefits
- 3 Features  
- 6 Certifications
- 8 FAQs
- 5 Approach Steps
- 1 Testimonial (fallback)
- 3 Analytics items
- 5 About values
- 4 Navigation links
- 4 Footer sections
- 1 CTA section
- 1 Map section

✅ **Supporting Data:**
- 5 Images
- 4 Backgrounds
- 2 Languages
- Multiple CTAs

✅ **1 Complete Homepage**
- Slug: "home"
- All sections connected

---

## Common Issues & Fixes

### ❌ TypeScript Errors

```
Property 'benefitSection' does not exist...
```

**Fix:**
```bash
rm -rf node_modules/.prisma
npx prisma generate --schema=./schema.prisma
# Restart IDE
```

### ❌ Database Errors

```
Table does not exist...
```

**Fix:**
```bash
rm keystone.db
npm run keystone dev
# Let it create tables, then Ctrl+C
npm run seed
```

### ❌ Seed Fails Midway

**Fix:**
```bash
# Fresh start
./setup-and-seed.sh --fresh
# or
setup-and-seed.bat --fresh
```

---

## Script Options

### Bash (macOS/Linux)

```bash
./setup-and-seed.sh           # Full setup
./setup-and-seed.sh --quick   # Skip Prisma regeneration
./setup-and-seed.sh --fresh   # Delete DB and start fresh
./setup-and-seed.sh --help    # Show help
```

### Batch (Windows)

```batch
setup-and-seed.bat           # Full setup
setup-and-seed.bat --quick   # Skip Prisma regeneration
setup-and-seed.bat --fresh   # Delete DB and start fresh
setup-and-seed.bat --help    # Show help
```

---

## Verifying Success

After seeding, start Keystone:

```bash
npm run keystone dev
```

Open browser to: **http://localhost:3000**

Check these lists have data:
- ✅ Benefits (3)
- ✅ Features (3)
- ✅ Certifications (6)
- ✅ FAQs (8)
- ✅ Approach Steps (5)
- ✅ Navigation (4 links)
- ✅ Footer Sections (4)
- ✅ Page Content (1 page: "home")

---

## Customizing Seed Data

Edit the constants at the top of `seed.ts`:

```typescript
// Around line 55
const benefitsData = {
  title: "Your Benefits",
  benefits: [
    { icon: "...", title: "...", description: "..." },
    // Add more...
  ]
};

// Modify other sections similarly
```

Then re-run:
```bash
rm keystone.db
npm run keystone dev  # Ctrl+C after ready
npm run seed
```

---

## Package.json Scripts

Add these to your `package.json`:

```json
{
  "scripts": {
    "seed": "ts-node seed.ts",
    "db:reset": "rm -rf keystone.db && npm run keystone dev",
    "db:seed": "npx prisma generate --schema=./schema.prisma && npm run seed",
    "prisma:generate": "prisma generate --schema=./schema.prisma"
  }
}
```

Then use:
```bash
npm run seed           # Just seed
npm run db:seed        # Regenerate + seed
npm run db:reset       # Fresh database
```

---

## Files Reference

| File | Purpose |
|------|---------|
| `seed.ts` | Main seed script |
| `setup-and-seed.sh` | Automated setup (Linux/Mac) |
| `setup-and-seed.bat` | Automated setup (Windows) |
| `schema.ts` | Keystone schema definition |
| `schema.prisma` | Generated Prisma schema |
| `SEED_README.md` | This file (quick reference) |
| `SEED_REFACTORING_SUMMARY.md` | Detailed documentation |
| `SEED_MIGRATION_GUIDE.md` | Migration instructions |
| `PRISMA_REGENERATE.md` | Prisma troubleshooting |

---

## Workflow Summary

```
┌─────────────────────────────────────────┐
│  1. Update schema.ts                    │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  2. Run: npm run keystone dev           │
│     (generates schema.prisma)           │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  3. Regenerate Prisma Client            │
│     rm -rf node_modules/.prisma         │
│     npx prisma generate                 │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  4. Run: npm run seed                   │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  5. Verify in Admin UI                  │
│     http://localhost:3000               │
└─────────────────────────────────────────┘
```

---

## Need More Help?

📚 **Detailed Documentation:**
- `SEED_REFACTORING_SUMMARY.md` - Complete overview
- `SEED_MIGRATION_GUIDE.md` - Step-by-step guide
- `PRISMA_REGENERATE.md` - Prisma client issues

🌐 **Official Docs:**
- [Keystone Documentation](https://keystonejs.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

---

**Version:** 2.0  
**Last Updated:** 2024  
**Status:** ✅ Production Ready

Happy seeding! 🌱