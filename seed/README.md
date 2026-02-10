# Keystone CMS Database Seeding Guide

> **Comprehensive guide for seeding and managing database content for Nimbus Tech's Keystone CMS**

---

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [NPM Scripts Reference](#npm-scripts-reference)
- [Seeding Components](#seeding-components)
  - [Seed All Components](#seed-all-components)
  - [Seed Specific Components](#seed-specific-components)
  - [Component Dependencies](#component-dependencies)
- [Clearing Data](#clearing-data)
- [Available Components](#available-components)
- [Component Details](#component-details)
- [Advanced Usage](#advanced-usage)
- [Troubleshooting](#troubleshooting)
- [Architecture](#architecture)
- [Adding New Components](#adding-new-components)

---

## Overview

The Keystone CMS seeding system provides a robust, idempotent way to populate your database with initial data. Key features include:

- ✅ **Idempotent Operations**: Safe to run multiple times without creating duplicates
- 🔄 **Smart Caching**: Dependencies are seeded only once per run
- 🎯 **Automatic Dependency Resolution**: Components auto-seed their prerequisites
- 📦 **Modular Design**: Seed individual components or everything at once
- 🧹 **Clean Clear Operations**: Comprehensive data cleanup utilities
- 🛡️ **Type-Safe**: Full TypeScript support

---

## Prerequisites

Before running any seed scripts, you **MUST** ensure your Prisma Client is up-to-date:

### 1. Delete Old Client Cache

```bash
# macOS/Linux
rm -rf node_modules/.prisma

# Windows
rmdir /s /q node_modules\.prisma
```

### 2. Regenerate Prisma Client

```bash
npm run generate
```

### 3. Restart Your IDE/Editor

This ensures your IDE picks up the latest Prisma types.

### 4. Environment Setup

Ensure your `.env` file has the correct database connection:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/keystone_cms"
```

---

## Quick Start

### Seed Everything (Recommended for Fresh Database)

```bash
npm run db:seed
```

This seeds all components in the correct dependency order.

### Seed Specific Component

```bash
npm run db:seed resume
```

### Clear and Re-seed

```bash
# Clear specific component
npm run db:clear -- --resume

# Re-seed
npm run db:seed resume
```

---

## NPM Scripts Reference

### Database Management Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `db:push` | `npm run db:push` | Push schema changes to database without migrations |
| `db:seed` | `npm run db:seed` | Seed all components (default behavior) |
| `db:seed:all` | `npm run db:seed:all` | Explicitly seed all components with `--all` flag |
| `db:clear` | `npm run db:clear -- [options]` | Clear seeded data (see options below) |
| `db:reset` | `npm run db:reset` | Reset database (force push schema) |
| `db:reset:seed` | `npm run db:reset:seed` | Reset database and seed all components |
| `db:fresh` | `npm run db:fresh` | Fresh database with all seeds (alias for reset:seed) |

### Schema Management Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `generate` | `npm run generate` | Run Prisma migrations in dev mode |
| `schema:verify:dev` | `npm run schema:verify:dev` | Verify schema, migrate, and start (development) |
| `schema:verify:prod` | `npm run schema:verify:prod` | Verify schema, migrate, and start (production) |

### Quick Reference

**Fresh Start:**
```bash
npm run db:fresh
```

**Seed Specific Components:**
```bash
npm run db:seed about analytics navigation
```

**Clear Specific Component:**
```bash
npm run db:clear -- --about
```

**Reset and Re-seed:**
```bash
npm run db:reset:seed
```

---

## Seeding Components

### Seed All Components

The default behavior seeds all components in the correct dependency order:

```bash
npm run db:seed

# Or explicitly with --all flag
npm run db:seed --all
```

**Output:**
```
🌱 Starting Keystone CMS database seed (all components)...

📋 Seed order: slugs → languages → images → ctas → certifications → heroes → ...

🌱 Seeding component: slugs...
📌 Ensuring slugs are seeded...
✓ Created 15 new types
✅ Component slugs seeded successfully

🌱 Seeding component: languages...
🌍 Ensuring languages are seeded...
✓ Created 3 new languages
✅ Component languages seeded successfully

...

✅ All components seeded successfully!
```

### Seed Specific Components

Seed one or more components by name:

```bash
# Single component
npm run db:seed analytics

# Multiple components
npm run db:seed about analytics navigation

# Complex component with many dependencies
npm run db:seed pageContents
```

**Note:** Dependencies are automatically seeded. For example, seeding `pageContents` will automatically seed:
- slugs
- languages
- images
- ctas
- certifications
- heroes
- benefits
- approaches
- about
- analytics
- navigation
- footer
- faqs
- features
- testimonials
- maps

### Component Dependencies

The seeding system respects dependencies and always seeds in the correct order:

```
slugs ────────────┐
                  ├──> images ──┐
languages ────────┘              │
                                 ├──> ctas ──> heroes
                                 │            benefits
                                 │            navigation
                                 │            ...
                                 └──> certifications
                                      testimonials
                                      ...
```

Even if you request components in random order, they'll be seeded correctly:

```bash
# You type this (wrong order)
npm run db:seed heroes images slugs

# System seeds in correct order automatically
# 1. slugs
# 2. languages (dependency of images)
# 3. images
# 4. ctas (dependency of heroes)
# 5. heroes
```

---

## Clearing Data

Use the `db:clear` script to remove seeded data:

### Clear Specific Components

```bash
# Clear all about data
npm run db:clear -- --about

# Clear analytics data
npm run db:clear -- --analytics

# Clear navigation data
npm run db:clear -- --navigation

# Clear resume data
npm run db:clear -- --resume

# Clear page contents
npm run db:clear -- --page-contents
```

### Clear by Component Name

You can also use component names directly:

```bash
npm run db:clear -- about
npm run db:clear -- analytics navigation
```

### Clear Foundational Data

```bash
# Clear all images
npm run db:clear -- --images

# Clear all types (slugs)
npm run db:clear -- --types

# Clear all CTAs
npm run db:clear -- --ctas

# Clear all languages
npm run db:clear -- --languages
```

### Clear Specific Page Contents

```bash
# Clear specific pages by slug
npm run db:clear -- --pages home home-de

# Clear legal pages
npm run db:clear -- --pages terms impressum privacy-policy datenschutz
```

### Clear Component-Specific Data

```bash
# Clear testimonials
npm run db:clear -- --testimonials

# Clear heroes
npm run db:clear -- --heroes

# Clear benefits
npm run db:clear -- --benefits

# Clear FAQs
npm run db:clear -- --faqs

# Clear certifications
npm run db:clear -- --certifications

# Clear features
npm run db:clear -- --features

# Clear maps
npm run db:clear -- --maps

# Clear approaches
npm run db:clear -- --approaches
```

### Clear All Default Components

```bash
npm run db:clear -- --all
```

---

## Available Components

| Component | Description | Key Dependencies | Icon |
|-----------|-------------|------------------|------|
| `slugs` | Type/slug definitions for categorizing content | None | 📌 |
| `languages` | Language configurations (en-US, de-DE, en-IN) | None | 🌍 |
| `images` | Image assets for all sections | slugs | 🖼️ |
| `ctas` | Call-to-action buttons and sections | slugs, languages | 🔗 |
| `certifications` | Certification sections and items | slugs, ctas, images, languages | 🎓 |
| `heroes` | Hero sections for pages | images, slugs, ctas, languages | 🦸 |
| `benefits` | Benefit sections and items | images, slugs, ctas, languages | 💎 |
| `approaches` | Approach/methodology sections | languages | 🎯 |
| `about` | About sections and company values | languages | 📖 |
| `analytics` | Analytics data and statistics | languages | 📊 |
| `navigation` | Navigation menus and links | images, ctas, slugs, languages | 🧭 |
| `footer` | Footer sections and links | languages, slugs | 🦶 |
| `faqs` | FAQ sections and items | languages | ❓ |
| `features` | Feature listings | languages | ⭐ |
| `testimonials` | Testimonial sections and items | images, slugs, languages | 💬 |
| `maps` | Map sections (location data) | languages | 🗺️ |
| `pageContents` | Complete page content assemblies | ALL above components | 📄 |
| `resume` | Resume/CV data | languages | 📝 |
| `legalPages` | Legal pages (privacy, terms, etc.) | languages | ⚖️ |

---

## Component Details

### Slugs (Types)

**Purpose:** Categorizes content throughout the system

**Seeded Types:**
- `main` - Main CTAs
- `hero` - Hero sections
- `navigation` - Navigation menus
- `footer` - Footer sections
- `testimonial` - Testimonial content
- `certification` - Certifications
- `benefit` - Benefits
- `approach` - Approaches
- `feature` - Features
- `faq` - FAQs
- `map` - Maps
- `about` - About sections
- `analytics` - Analytics
- `resume` - Resume content
- `legal` - Legal pages

**Usage:**
```bash
npm run db:seed slugs
```

**Clear:**
```bash
npm run db:clear -- --types
```

---

### Languages

**Purpose:** Defines available UI languages

**Seeded Languages:**
- English (`en-US`)
- German (`de-DE`)
- Hindi (`en-IN`)

**Usage:**
```bash
npm run db:seed languages
```

**Clear:**
```bash
npm run db:clear -- --languages
```

---

### Images

**Purpose:** Image assets for various sections

**Seeded Categories:**
- Hero images
- Testimonial avatars
- Certification logos
- Navigation logos
- Footer images
- Benefit icons
- Resume images

**Usage:**
```bash
npm run db:seed images
```

**Clear:**
```bash
npm run db:clear -- --images
```

---

### About

**Purpose:** Company information and values

**Seeded Content:**
- Company heading and intro (en-US, de-DE)
- Core values with icons
- Closing statements

**Values:**
- Excellence
- Transparency
- Collaboration
- Reliability
- Innovation

**Usage:**
```bash
npm run db:seed about
```

**Clear:**
```bash
npm run db:clear -- --about
```

---

### Analytics

**Purpose:** Project performance metrics and statistics

**Seeded Content:**
- Deployment statistics
- Project summaries (Project Nimbus, Cloud Migration, Enterprise App)
- Performance metrics
- Multi-language support

**Usage:**
```bash
npm run db:seed analytics
```

**Clear:**
```bash
npm run db:clear -- --analytics
```

---

### Navigation

**Purpose:** Site navigation menus

**Seeded Links (per language):**
- Services
- About Us
- Blog
- Contact

**Usage:**
```bash
npm run db:seed navigation
```

**Clear:**
```bash
npm run db:clear -- --navigation
```

---

### Resume

**Purpose:** Personal resume/CV data

**Seeded Sections:**
- Basic Information
- Work Experience
- Education
- Volunteer Work
- Publications
- Awards
- Skills
- Languages
- Profiles (LinkedIn, GitHub, Twitter, Instagram)

**Usage:**
```bash
npm run db:seed resume
```

**Clear:**
```bash
npm run db:clear -- --resume
```

---

### Page Contents

**Purpose:** Assembles complete pages from all components

**Seeded Pages:**
- Home page (English)
- Home page (German)

**Dependencies:** Requires ALL other components to be seeded first

**Usage:**
```bash
npm run db:seed pageContents
```

**Clear:**
```bash
npm run db:clear -- --page-contents
```

---

## Advanced Usage

### Check What Will Be Seeded

Before seeding, you can check component dependencies:

```bash
# This will show the seed order
npm run db:seed pageContents
```

Output shows:
```
🌱 Seeding component: pageContents...

📌 Ensuring slugs are seeded...
🌍 Ensuring languages are seeded...
🖼️  Ensuring images are seeded...
...
```

### Selective Re-seeding

If you need to update only certain components:

```bash
# 1. Clear old data
npm run db:clear -- --analytics

# 2. Re-seed with updated data
npm run db:seed analytics
```

### Development Workflow

**Initial Setup:**
```bash
# 1. Setup database
npm run db:push

# 2. Seed everything
npm run db:seed
```

**After Schema Changes:**
```bash
# 1. Generate new Prisma client
npm run generate

# 2. Push schema changes
npm run db:push

# 3. Re-seed affected components
npm run db:seed pageContents
```

**Daily Development:**
```bash
# Just seed what you're working on
npm run db:seed about analytics
```

**Quick Database Refresh:**
```bash
# Complete fresh start
npm run db:fresh
```

---

## Troubleshooting

### Error: "Languages not found"

**Cause:** Dependencies weren't seeded

**Solution:**
```bash
# Seed all dependencies first
npm run db:seed --all
```

### Error: "Prisma Client validation errors"

**Cause:** Outdated Prisma Client

**Solution:**
```bash
# Clean and regenerate
rm -rf node_modules/.prisma
npm run generate

# Restart your IDE
```

### Error: "Unique constraint failed"

**Cause:** Attempting to create duplicate data

**Solution:** The seed functions are idempotent and should handle this. If you see this error:

1. Check if you modified seed data
2. Clear the component and re-seed:
   ```bash
   npm run db:clear -- --[component]
   npm run db:seed [component]
   ```

### Warning: "No matching ... found"

**Cause:** Missing dependency data

**Solution:**
```bash
# Seed dependencies first, then your component
npm run db:seed slugs languages images
npm run db:seed [your-component]
```

### Database Connection Errors

**Solution:**
1. Check `.env` file has correct `DATABASE_URL`
2. Ensure database server is running
3. Verify database exists:
   ```bash
   npm run db:push
   ```

---

## Architecture

### Caching System

The seeding system uses an in-memory cache to prevent re-seeding dependencies:

```typescript
const cache = {
  slugs: null,
  languages: null,
  images: null,
  // ... other components
};
```

Each `ensure*` function checks the cache before seeding:

```typescript
async function ensureSlugs(prisma) {
  if (!cache.slugs) {
    cache.slugs = await Slugs.seed(prisma);
  }
  return cache.slugs;
}
```

### Idempotent Design

Each seed function checks for existing data:

```typescript
// Example from about.ts
const existingValues = await prisma.value.findMany({
  where: { label: { in: valuesToCreate.map(v => v.label) } }
});

const newValues = valuesToCreate.filter(
  v => !existingValues.some(ev => ev.label === v.label)
);

// Only create what doesn't exist
if (newValues.length > 0) {
  await prisma.value.createMany({ data: newValues });
}
```

### Dependency Graph

```
┌─────────┐     ┌───────────┐
│  slugs  │────▶│  images   │
└─────────┘     └───────────┘
                      │
┌───────────┐         │
│ languages │─────────┼────────┐
└───────────┘         │        │
      │               │        │
      │               ▼        ▼
      │          ┌─────────┐┌──────┐
      └─────────▶│  ctas   ││heroes│
                 └─────────┘└──────┘
                      │
                      ▼
              ┌──────────────┐
              │ pageContents │
              └──────────────┘
```

---

## Adding New Components

### Step 1: Create Component File

Create `seed/components/myComponent.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const myComponentData = [
  // Your data here
];

const seed = async (prisma: PrismaClient, dependencies) => {
  console.log("Seeding myComponent...");
  
  // Check for existing
  const existing = await prisma.myComponent.findMany();
  
  // Filter and create only new items
  const toCreate = myComponentData.filter(/* ... */);
  
  if (toCreate.length > 0) {
    await prisma.myComponent.createMany({ data: toCreate });
    console.log(`✓ Created ${toCreate.length} items`);
  }
  
  return await prisma.myComponent.findMany();
};

const clear = async (prisma: PrismaClient) => {
  console.log("Clearing myComponent...");
  const result = await prisma.myComponent.deleteMany({});
  console.log(`Deleted ${result.count} item(s).`);
};

const MyComponent = { seed, clear };
export default MyComponent;
```

### Step 2: Add to Seed Order

In `seed/index.ts`:

```typescript
const SEED_ORDER = [
  // ... existing components
  "myComponent",
] as const;
```

### Step 3: Create Ensure Function

```typescript
async function ensureMyComponent(prisma: PrismaClient) {
  if (!cache.myComponent) {
    console.log("🆕 Ensuring myComponent is seeded...");
    const dependencies = await ensureDependencies(prisma);
    cache.myComponent = await MyComponent.seed(prisma, dependencies);
  }
  return cache.myComponent;
}
```

### Step 4: Add to Switch Statement

```typescript
case "myComponent":
  await ensureMyComponent(prisma);
  break;
```

### Step 5: Add Clear Function

In `seed/clear.ts`:

```typescript
async function clearMyComponent(prisma: PrismaClient): Promise<void> {
  console.log('Clearing myComponent...');
  const result = await prisma.myComponent.deleteMany({});
  console.log(`Deleted ${result.count} item(s).`);
}

// Add flag handler
const myComponentFlag = args.includes('--my-component');
if (myComponentFlag) {
  await clearMyComponent(prisma);
  return;
}
```

### Step 6: Test

```bash
# Seed
npm run db:seed myComponent

# Clear
npm run db:clear -- --my-component
```

---

## Best Practices

### 1. Always Check for Duplicates

Use composite keys when appropriate:

```typescript
const existingKeys = new Set(
  existing.map(item => `${item.field1}-${item.field2}`)
);
```

### 2. Use Descriptive Logging

```typescript
console.log(`✓ Created ${count} new items`);
console.log(`✓ Item already exists (id: ${id}), skipping`);
console.log(`✓ Total items: ${total}`);
```

### 3. Handle Foreign Keys Properly

Always delete child records before parent records:

```typescript
// Delete children first
await prisma.child.deleteMany({});
// Then delete parent
await prisma.parent.deleteMany({});
```

### 4. Cache Dependencies

Use the ensure pattern to avoid re-seeding:

```typescript
const slugs = await ensureSlugs(prisma);
const languages = await ensureLanguages(prisma);
```

### 5. Type Safety

Export and use types:

```typescript
export type SeededMyComponent = Awaited<ReturnType<typeof seed>>;
```

---

## Summary

The Keystone CMS seeding system provides:

- ✅ **Safe re-runs**: Idempotent operations prevent duplicates
- 🚀 **Fast execution**: Smart caching minimizes database queries  
- 🎯 **Precise control**: Seed exactly what you need
- 🧹 **Easy cleanup**: Comprehensive clear utilities
- 📚 **Well documented**: Clear logging and error messages
- 🔧 **Maintainable**: Modular, type-safe architecture

For questions or issues, refer to the troubleshooting section or check the component implementation files in `seed/components/`.

---

**Happy Seeding! 🌱**