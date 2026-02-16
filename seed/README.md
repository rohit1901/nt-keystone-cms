# 🌱 Keystone CMS Seed & Clear CLI Guide

Complete guide for using the database seeding and clearing tools in Keystone CMS.

---

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Seed Command](#seed-command)
- [Clear Command](#clear-command)
- [Common Workflows](#common-workflows)
- [Component Reference](#component-reference)
- [Troubleshooting](#troubleshooting)

---

## Overview

The Keystone CMS seed system provides powerful tools to populate and manage your database:

- **`npm run db:seed`** - Add data to your database
- **`npm run db:clear`** - Remove seeded data from your database
- **`npm run db:reset`** - Reset the entire database schema
- **`npm run db:fresh`** - Reset and re-seed everything

### Key Features

✅ **Dependency-aware** - Components are seeded in the correct order automatically  
✅ **Selective seeding** - Seed only the components you need  
✅ **Safe clearing** - Remove specific data without affecting other components  
✅ **Help flags** - Built-in documentation with `--help`

---

## Quick Start

### Initial Database Setup

```bash
# Seed all components (recommended for first-time setup)
npm run db:seed

# Or explicitly seed everything
npm run db:seed:all
npm run db:seed --all
```

### Get Help

```bash
# Seed command help
npm run db:seed:help
npm run db:seed -- --help
npm run db:seed -- -h

# Clear command help
npm run db:clear:help
npm run db:clear -- --help
npm run db:clear -- -h
```

---

## Seed Command

### Basic Usage

```bash
npm run db:seed [OPTIONS] [COMPONENTS...]
```

### Options

| Flag | Short | Description |
|------|-------|-------------|
| `--all` | `-a` | Seed all components (default if no components specified) |
| `--help` | `-h` | Display help message |

### Examples

#### Seed All Components
```bash
npm run db:seed
npm run db:seed --all
npm run db:seed:all
```

#### Seed Specific Components
```bash
# Single component
npm run db:seed resume

# Multiple components
npm run db:seed images ctas heroes

# Images, CTAs, and their dependencies
npm run db:seed slugs languages images ctas
```

#### Common Component Combinations
```bash
# Just the resume
npm run db:seed resume

# Page content and dependencies
npm run db:seed pageContents

# Navigation and footer
npm run db:seed navigation footer

# All content sections
npm run db:seed heroes benefits testimonials features
```

### How It Works

1. **Automatic Dependencies**: When you seed a component, all required dependencies are automatically seeded first
2. **Correct Order**: Components are always seeded in dependency order
3. **No Duplicates**: Already seeded data is skipped (idempotent operations)
4. **Safe**: Existing data is preserved unless explicitly cleared

### Component Seeding Order

Components are seeded in this dependency order:

1. `slugs` - URL routes and slugs
2. `languages` - Language configurations
3. `images` - Image assets
4. `ctas` - Call-to-action buttons and sections
5. `certifications` - Certification data
6. `heroes` - Hero sections
7. `benefits` - Benefit sections
8. `approaches` - Approach workflows
9. `about` - About sections
10. `analytics` - Analytics dashboards
11. `navigation` - Navigation menus
12. `footer` - Footer sections
13. `faqs` - FAQ sections
14. `features` - Feature sections
15. `testimonials` - Testimonial sections
16. `maps` - Map sections
17. `pageContents` - Page content (requires all above)
18. `resume` - Resume/CV data
19. `legalPages` - Legal pages

---

## Clear Command

### Basic Usage

```bash
npm run db:clear [OPTIONS] [COMPONENTS...]
```

### Options

| Flag | Short | Description |
|------|-------|-------------|
| `--all` | `-a` | Clear all default components |
| `--help` | `-h` | Display help message |

### Component-Specific Flags

| Flag | Description |
|------|-------------|
| `--footer` | Clear all footer data (sections, links, keys) |
| `--page-contents` | Clear all page contents and sections |
| `--resume` | Clear all resume/CV data |
| `--navigation` | Clear all navigation menus and links |
| `--analytics` | Clear all analytics data (stats, summaries) |
| `--about` | Clear all about sections and values |
| `--approaches` | Clear all approach workflows and steps |
| `--maps` | Clear all map sections |
| `--features` | Clear all feature sections |
| `--certifications` | Clear all certification sections |
| `--faqs` | Clear all FAQ sections |
| `--benefits` | Clear all benefit sections |
| `--heroes` | Clear all hero sections |
| `--testimonials` | Clear all testimonial sections |
| `--languages` | Clear all language configurations |
| `--ctas` | Clear all CTA buttons and sections |
| `--types` | Clear all type records (slugs) |
| `--images` | Clear all image assets |
| `--pages <slug...>` | Clear specific page contents by slug |

### Examples

#### Clear All Components
```bash
npm run db:clear --all
npm run db:clear -a
```

#### Clear Specific Component by Flag
```bash
# Clear resume data
npm run db:clear:resume
npm run db:clear -- --resume

# Clear footer
npm run db:clear -- --footer

# Clear navigation
npm run db:clear -- --navigation

# Multiple using flags
npm run db:clear -- --resume --analytics --navigation
```

#### Clear Specific Component by Name
```bash
# Single component
npm run db:clear resume

# Multiple components
npm run db:clear resume analytics navigation

# Images and slugs
npm run db:clear images slugs
```

#### Clear Specific Pages by Slug
```bash
# Clear specific pages
npm run db:clear -- --pages privacy-policy terms-of-service

# Clear single page
npm run db:clear -- --pages about-us
```

### ⚠️ Important Notes

- **Permanent Deletion**: Clear operations permanently delete data from the database
- **No Undo**: Always backup your database before clearing data
- **Dependencies**: Some components have dependencies; clear in reverse order if needed
- **Production Caution**: Never run clear commands on production databases without backups

---

## Common Workflows

### Fresh Database Setup

```bash
# Complete reset and fresh seed
npm run db:fresh

# Or step by step:
npm run db:reset      # Reset schema
npm run db:seed:all   # Seed everything
```

### Update Single Component

```bash
# Clear and re-seed resume
npm run db:clear:resume
npm run db:seed:resume

# Clear and re-seed navigation
npm run db:clear -- --navigation
npm run db:seed navigation
```

### Development Workflow

```bash
# 1. Make changes to seed data in ./seed/components/resume.ts
# 2. Clear old data
npm run db:clear --resume

# 3. Re-seed with new data
npm run db:seed resume

# 4. Verify in Keystone Admin UI
npm run dev
```

### Testing Different Content

```bash
# Clear specific content sections
npm run db:clear:content
npm run db:clear -- --heroes --benefits --testimonials

# Re-seed with updated data
npm run db:seed:content
npm run db:seed heroes benefits testimonials
```

### Clean Slate (Keep Schema)

```bash
# Clear everything but keep schema
npm run db:clear --all

# Or clear specific components
npm run db:clear resume pageContents navigation footer
```

---

## Component Reference

### Core Components

#### slugs
**Description**: URL routes and slug definitions  
**Dependencies**: None  
**Seed**: `npm run db:seed slugs`  
**Clear**: `npm run db:clear slugs` or `npm run db:clear -- --types`

#### languages
**Description**: Language configurations (en-US, de-DE, etc.)  
**Dependencies**: None  
**Seed**: `npm run db:seed languages`  
**Clear**: `npm run db:clear -- --languages`

#### images
**Description**: Image assets and metadata  
**Dependencies**: `slugs`  
**Seed**: `npm run db:seed images`  
**Clear**: `npm run db:clear -- --images`

### Content Components

#### ctas
**Description**: Call-to-action buttons and sections  
**Dependencies**: `slugs`, `languages`  
**Seed**: `npm run db:seed ctas`  
**Clear**: `npm run db:clear -- --ctas`

#### heroes
**Description**: Hero banner sections  
**Dependencies**: `images`, `slugs`, `ctas`, `languages`  
**Seed**: `npm run db:seed heroes`  
**Clear**: `npm run db:clear -- --heroes`

#### benefits
**Description**: Benefit/feature sections  
**Dependencies**: `images`, `slugs`, `ctas`, `languages`  
**Seed**: `npm run db:seed benefits`  
**Clear**: `npm run db:clear -- --benefits`

#### testimonials
**Description**: Customer testimonial sections  
**Dependencies**: `images`, `slugs`, `languages`  
**Seed**: `npm run db:seed testimonials`  
**Clear**: `npm run db:clear -- --testimonials`

#### features
**Description**: Product/service feature sections  
**Dependencies**: `languages`  
**Seed**: `npm run db:seed features`  
**Clear**: `npm run db:clear -- --features`

### Navigation Components

#### navigation
**Description**: Navigation menus and links  
**Dependencies**: `images`, `ctas`, `slugs`, `languages`  
**Seed**: `npm run db:seed navigation`  
**Clear**: `npm run db:clear -- --navigation`

#### footer
**Description**: Footer sections and links  
**Dependencies**: `slugs`, `languages`  
**Seed**: `npm run db:seed footer`  
**Clear**: `npm run db:clear -- --footer`

### Page Components

#### pageContents
**Description**: Complete page content with all sections  
**Dependencies**: ALL content components  
**Seed**: `npm run db:seed:pages`  
**Clear**: `npm run db:clear -- --page-contents`

#### legalPages
**Description**: Legal pages (privacy policy, terms of service)  
**Dependencies**: None  
**Seed**: `npm run db:seed legalPages`  
**Clear**: `npm run db:clear legalPages`

### Specialized Components

#### resume
**Description**: Resume/CV data (skills, experience, education, projects)  
**Dependencies**: `languages`, `images`  
**Seed**: `npm run db:seed:resume`  
**Clear**: `npm run db:clear:resume`

#### certifications
**Description**: Certification sections and data  
**Dependencies**: `slugs`, `ctas`, `images`, `languages`  
**Seed**: `npm run db:seed certifications`  
**Clear**: `npm run db:clear -- --certifications`

#### analytics
**Description**: Analytics dashboards and statistics  
**Dependencies**: `languages`  
**Seed**: `npm run db:seed analytics`  
**Clear**: `npm run db:clear -- --analytics`

#### about
**Description**: About sections and company values  
**Dependencies**: `languages`  
**Seed**: `npm run db:seed about`  
**Clear**: `npm run db:clear -- --about`

#### approaches
**Description**: Approach/methodology workflows  
**Dependencies**: `languages`  
**Seed**: `npm run db:seed approaches`  
**Clear**: `npm run db:clear -- --approaches`

#### faqs
**Description**: FAQ sections  
**Dependencies**: `languages`  
**Seed**: `npm run db:seed faqs`  
**Clear**: `npm run db:clear -- --faqs`

#### maps
**Description**: Map/location sections  
**Dependencies**: `languages`  
**Seed**: `npm run db:seed maps`  
**Clear**: `npm run db:clear -- --maps`

---

## Troubleshooting

### Component Not Found

**Problem**: `Invalid component(s): mycomponent`

**Solution**: Check available components with:
```bash
npm run db:seed:help
```

### Prisma Client Errors

**Problem**: Type errors or "Unknown field" errors

**Solution**: Regenerate Prisma Client:
```bash
rm -rf node_modules/.prisma
npm run generate
```

Then restart your IDE/editor.

### Database Connection Errors

**Problem**: Cannot connect to database

**Solution**: 
1. Check your `.env` file has correct `DATABASE_URL`
2. Ensure database server is running
3. Verify database exists and is accessible

### Dependency Errors

**Problem**: Missing required dependencies

**Solution**: The seed command automatically handles dependencies. If you still see errors, try:
```bash
# Clear everything and start fresh
npm run db:fresh
```

### Clear Not Removing Data

**Problem**: Clear command doesn't seem to work

**Solution**: Check you're using the correct flag or component name:
```bash
# Use shortcut script
npm run db:clear:resume

# Use flag with --
npm run db:clear -- --resume

# Or component name
npm run db:clear resume

# Not both
npm run db:clear -- --resume resume  # ❌ Wrong
```

### Seeding Takes Too Long

**Problem**: Seeding is very slow

**Solution**: 
1. Seed only components you need instead of `--all`
2. Check database performance and indexes
3. Review seed data volume in component files

---

## Advanced Usage

### Custom Seed Scripts

You can create custom seed combinations in `package.json`:

```json
{
  "scripts": {
    "seed:content": "ts-node --transpile-only ./seed/index.ts heroes benefits testimonials features",
    "seed:minimal": "ts-node --transpile-only ./seed/index.ts slugs languages images",
    "clear:content": "ts-node --transpile-only ./seed/clear.ts --heroes --benefits --testimonials"
  }
}
```

### Environment-Specific Seeding

```bash
# Development
NODE_ENV=development npm run db:seed:all

# Staging
NODE_ENV=staging npm run db:seed pageContents

# Never on production!
# NODE_ENV=production npm run db:fresh  # ❌ DON'T DO THIS
```

### Backup Before Clearing

```bash
# Backup database first
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Then clear
npm run db:clear --all
```

---

## Related Documentation

- [NPM_USAGE_GUIDE.md](./NPM_USAGE_GUIDE.md) - Understanding npm `--` requirement
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Quick command reference
- [SCRIPTS.md](./SCRIPTS.md) - Detailed script documentation
- [../README.md](../README.md) - Main project documentation
- [../schema.ts](../schema.ts) - Database schema definitions
- [components/](./components/) - Seed data definitions

---

## Support

If you encounter issues:

1. Check this guide and help flags (`--help`)
2. Review error messages carefully
3. Verify database connection and schema
4. Check component dependencies
5. Try a fresh seed: `npm run db:fresh`

---

**Last Updated**: January 2025  
**Version**: 1.0.0