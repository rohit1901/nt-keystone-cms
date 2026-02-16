# Database Scripts Quick Reference

> **Quick reference guide for all database and seeding commands**
>
> **💡 TIP:** Run `npm run db:help` anytime to see this guide in your terminal!

---

## 📋 Table of Contents

- [Quick Help](#quick-help)
- [Seeding Commands](#seeding-commands)
- [Clearing Commands](#clearing-commands)
- [Database Management](#database-management)
- [Schema Management](#schema-management)
- [Common Workflows](#common-workflows)

---

## Quick Help

### Get Help Anytime

```bash
# Show comprehensive database commands reference
npm run db:help

# Show detailed seeding help
npm run db:seed:help

# Show detailed clearing help
npm run db:clear:help
```

---

## Seeding Commands

### Seed Everything

```bash
# Default: Seed all components
npm run db:seed

# Explicit: Seed all components
npm run db:seed:all
```

### Seed Specific Components

```bash
# Single component
npm run db:seed slugs
npm run db:seed languages
npm run db:seed about
npm run db:seed analytics
npm run db:seed navigation
npm run db:seed resume
npm run db:seed pageContents

# Multiple components
npm run db:seed about analytics navigation
npm run db:seed slugs languages images ctas
```

### Available Components

- `slugs` - Type/category definitions
- `languages` - Language configurations
- `images` - Image assets
- `ctas` - Call-to-action buttons
- `certifications` - Certification sections
- `heroes` - Hero sections
- `benefits` - Benefit sections
- `approaches` - Approach/methodology
- `about` - Company information
- `analytics` - Analytics data
- `navigation` - Navigation menus
- `footer` - Footer sections
- `faqs` - FAQ sections
- `features` - Feature listings
- `testimonials` - Testimonial sections
- `maps` - Map sections
- `pageContents` - Complete pages
- `resume` - Resume/CV data
- `legalPages` - Legal pages

---

## Clearing Commands

### Clear by Component Name

```bash
npm run db:clear -- about
npm run db:clear -- analytics
npm run db:clear -- navigation
npm run db:clear -- resume
npm run db:clear -- pageContents
```

### Clear by Flag

```bash
# Individual components
npm run db:clear -- --about
npm run db:clear -- --analytics
npm run db:clear -- --navigation
npm run db:clear -- --resume
npm run db:clear -- --page-contents

# Foundation data
npm run db:clear -- --images
npm run db:clear -- --types
npm run db:clear -- --ctas
npm run db:clear -- --languages

# Specific sections
npm run db:clear -- --testimonials
npm run db:clear -- --heroes
npm run db:clear -- --benefits
npm run db:clear -- --faqs
npm run db:clear -- --certifications
npm run db:clear -- --features
npm run db:clear -- --maps
npm run db:clear -- --approaches

# Specific pages by slug
npm run db:clear -- --pages home home-de
npm run db:clear -- --pages terms privacy-policy

# Clear all default components
npm run db:clear -- --all
```

---

## Database Management

### Push Schema

```bash
# Push schema without migrations
npm run db:push
```

### Reset Database

```bash
# Force reset (WARNING: Deletes all data)
npm run db:reset
```

### Reset and Seed

```bash
# Reset and seed all components
npm run db:reset:seed

# Or use the fresh alias
npm run db:fresh
```

---

## Schema Management

### Generate Migrations

```bash
# Generate and run migrations (development)
npm run generate
```

### Verify and Update

```bash
# Development environment
npm run schema:verify:dev

# Production environment
npm run schema:verify:prod
```

---

## Common Workflows

### 🚀 Initial Project Setup

```bash
# 1. Setup environment
cp .env.copy .env

# 2. Install dependencies
npm install

# 3. Push schema to database
npm run db:push

# 4. Seed all data
npm run db:seed
```

### 🔄 After Schema Changes

```bash
# 1. Clean Prisma cache
rm -rf node_modules/.prisma

# 2. Regenerate Prisma Client
npm run generate

# 3. Push schema changes
npm run db:push

# 4. Re-seed affected components
npm run db:seed pageContents
```

### 🧪 Testing with Fresh Data

```bash
# Quick reset and seed
npm run db:fresh
```

### 🛠️ Working on Specific Feature

```bash
# 1. Clear old data
npm run db:clear -- --analytics

# 2. Seed updated data
npm run db:seed analytics
```

### 🔍 Troubleshooting Seed Issues

```bash
# 1. Clear the problematic component
npm run db:clear -- --[component]

# 2. Clear its dependencies if needed
npm run db:clear -- --images --ctas

# 3. Re-seed from scratch
npm run db:seed [component]
```

### 📦 Complete Fresh Start

```bash
# Nuclear option: Complete reset
npm run db:reset
npm run db:seed:all

# Or in one command
npm run db:fresh
```

### 🌍 Multi-language Content Update

```bash
# Re-seed language-specific components
npm run db:seed languages about navigation footer
```

### 📄 Page Content Updates

```bash
# Clear and re-seed pages
npm run db:clear -- --page-contents
npm run db:seed pageContents
```

### 🎨 Frontend Asset Updates

```bash
# Re-seed images and related components
npm run db:clear -- --images
npm run db:seed images navigation heroes testimonials
```

---

## Tips & Tricks

### Check Seeding Order

When you run a seed command, the console output shows you what's being seeded:

```bash
npm run db:seed pageContents

# Output shows:
# 📌 Ensuring slugs are seeded...
# 🌍 Ensuring languages are seeded...
# 🖼️  Ensuring images are seeded...
# ... etc
```

### Batch Operations

You can clear and re-seed in a single workflow:

```bash
# Clear multiple components
npm run db:clear -- --about --analytics --navigation

# Re-seed them all
npm run db:seed about analytics navigation
```

### Selective Updates

Only seed what you need. Dependencies are handled automatically:

```bash
# This will ensure slugs, languages, etc. are seeded first
npm run db:seed resume
```

---

## Script Aliases

| Full Command | Shorthand | Description |
|--------------|-----------|-------------|
| `npm run db:reset:seed` | `npm run db:fresh` | Reset + seed all |
| `npm run db:seed` | `npm run db:seed:all` | Seed all (same thing) |

---

## Environment-Specific Commands

### Development

```bash
# Dev server
npm run dev

# Schema verification (dev)
npm run schema:verify:dev
```

### Production

```bash
# Build
npm run build

# Start
npm run start

# Schema verification (prod)
npm run schema:verify:prod
```

---

## Troubleshooting Commands

### Prisma Client Issues

```bash
# 1. Clean cache
rm -rf node_modules/.prisma

# 2. Regenerate
npm run generate

# 3. Restart IDE
```

### Database Connection Issues

```bash
# Verify database connection
npm run db:push
```

### Seed Failures

```bash
# Start fresh
npm run db:fresh
```

---

## Advanced Usage

### Component Dependencies

Understanding dependencies helps with targeted re-seeding:

```
slugs → images → heroes
      → ctas → navigation
languages → about
         → analytics
         → features
```

### Custom Seed Order

Components are always seeded in dependency order, regardless of how you specify them:

```bash
# You type: heroes images slugs
# System seeds: slugs → languages → images → ctas → heroes
```

---

## Summary

| Task | Command |
|------|---------|
| Show help | `npm run db:help` |
| Fresh database | `npm run db:fresh` |
| Seed all | `npm run db:seed` |
| Seed one | `npm run db:seed [component]` |
| Seed multiple | `npm run db:seed [c1] [c2] [c3]` |
| Clear one | `npm run db:clear -- --[component]` |
| Clear all | `npm run db:clear -- --all` |
| Push schema | `npm run db:push` |
| Generate migrations | `npm run generate` |

---

**For detailed documentation, see [README.md](./README.md)**