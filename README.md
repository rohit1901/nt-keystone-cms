# nt-keystone-cms

> Bilingual Keystone 6 CMS powering the Nimbus Tech marketing experience.

This repository delivers the content platform behind the Nimbus Tech website, exposing a customizable admin UI, GraphQL API, and Prisma-managed PostgreSQL database for marketing, case study, and company content.

## Table of Contents

- [Overview](#overview)
- [Core Capabilities](#core-capabilities)
- [Architecture at a Glance](#architecture-at-a-glance)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
  - [1. Clone the repository](#1-clone-the-repository)
  - [2. Install dependencies](#2-install-dependencies)
  - [3. Configure environment variables](#3-configure-environment-variables)
  - [4. Provision a PostgreSQL database](#4-provision-a-postgresql-database)
  - [5. Prepare the database schema](#5-prepare-the-database-schema)
  - [6. Seed baseline content](#6-seed-baseline-content)
  - [7. Run the Keystone development server](#7-run-the-keystone-development-server)
- [Working with Docker Compose](#working-with-docker-compose)
- [Database & Seeding](#database--seeding)
  - [Seeding System Overview](#seeding-system-overview)
  - [Seeding Commands](#seeding-commands)
  - [Clearing Data](#clearing-data)
- [Available pnpm scripts](#available-pnpm-scripts)
- [Makefile shortcuts](#makefile-shortcuts)
- [Project structure](#project-structure)
- [Content model highlights](#content-model-highlights)
- [Authentication](#authentication)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview

Nimbus Tech is a Germany-based software consultancy specialising in cloud-native platforms, enterprise architecture, and product delivery. The website showcases multilingual marketing content, solution offerings, certifications, testimonials, and lead-generation CTAs.

This project packages a bespoke Keystone 6 instance that editors use to manage all site content in a structured, type-safe manner. The CMS feeds both the public-facing Next.js application and any future integrations through Keystone's Admin UI and GraphQL API.

## Core Capabilities

- Modern Admin UI branded with Nimbus Tech navigation and theming
- Rich content modelling covering hero, benefit, feature, testimonial, certification, FAQ, analytics, approach, map, CTA, navigation, and footer sections for the marketing site
- Multi-language coverage (English and German) across key lists
- Opinionated seed scripts bundling Nimbus Tech storylines, imagery, navigation, and lead CTAs for rapid onboarding
- NextAuth session strategy wired to Amazon Cognito for secure access
- Dockerised PostgreSQL for repeatable local development environments

## Architecture at a Glance

- **Keystone 6** handles schema definitions, Admin UI, and GraphQL API exposure.
- **Prisma ORM** maps Keystone lists to PostgreSQL with generated client code.
- **Next.js Admin Customisations** (in `admin/`) brand the interface and expose profile routes.
- **Amazon Cognito + NextAuth** provide SSO-style authentication with JWT-backed sessions.
- **Seed modules** (in `seed/components`) curate Nimbus Tech-specific marketing content.
- **Docker Compose** provisions PostgreSQL locally, while scripts support alternative setups.

## Prerequisites

Ensure the following tooling is available before you begin:

- **Node.js 18.17+** (aligns with Keystone 6 and Next.js 13 requirements)
- **pnpm 8.0+** for fast, efficient package management
- **Docker Desktop** 4.x or newer (only required when using the bundled database container)
- **PostgreSQL 14+** if you prefer running your own instance instead of Docker
- **AWS Cognito user pool** with an App Client for authentication flows
- **Git** for cloning the repository

If you don't have pnpm installed, you can install it globally:

```bash
npm install -g pnpm
```

## Quick Start

Follow the numbered steps below to stand up the CMS locally. Each step builds on the previous one.

### 1. Clone the repository

Use Git to fetch the code base and navigate into it.

```bash
git clone https://github.com/rohit1901/nt-keystone-cms.git
cd nt-keystone-cms
```

### 2. Install dependencies

Install the project's JavaScript packages (this will also run Keystone's postinstall hook).

```bash
pnpm install
```

### 3. Configure environment variables

Copy the sample configuration and populate the required secrets.

```bash
cp .env.copy .env
# Open .env and fill in the values described below
```

Key variables to review:

- `DATABASE_URL`: Prisma connection string for PostgreSQL (e.g. `postgresql://user:password@localhost:5432/nimbus-tech-db`).
- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`: credentials consumed by `docker-compose.yml`.
- `NEXTAUTH_SECRET` (or `SESSION_SECRET`): cryptographic secret used by NextAuth stateless sessions.
- `COGNITO_CLIENT_ID`, `COGNITO_CLIENT_SECRET`, `COGNITO_ISSUER`: values from your Cognito user pool.
- Any additional integration keys or overrides specific to your deployment targets.

### 4. Provision a PostgreSQL database

You can run PostgreSQL through Docker (recommended) or connect to an external instance.

- **Docker:** follow the steps in [Working with Docker Compose](#working-with-docker-compose).
- **External DB:** ensure the server is reachable, create the target database, and update `DATABASE_URL`.

### 5. Prepare the database schema

Generate and apply Prisma migrations so the database matches the Keystone schema.

```bash
pnpm run generate
```

### 6. Seed baseline content

Populate the database with multilingual demo content, navigation, CTAs, and component data.

```bash
pnpm run db:seed
```

The seeding process imports data from the modules in `seed/components/` and produces a ready-to-browse Admin UI.

### 7. Run the Keystone development server

Launch the Admin UI and GraphQL API.

```bash
pnpm run dev
```

Once the server reports that Keystone is ready, open [http://localhost:3000/admin](http://localhost:3000/admin) to sign in via Cognito and begin managing content.

## Working with Docker Compose

The repository includes a minimal Docker Compose stack and Makefile to spin up PostgreSQL quickly.

1. Confirm `POSTGRES_DB`, `POSTGRES_USER`, and `POSTGRES_PASSWORD` in `.env` match the compose file expectations.
2. Start the database container in detached mode:

```bash
docker compose up -d db
```

3. Wait for the container health check to pass. You can monitor status with either of the following:

```bash
docker compose ps
make status
```

4. When you are finished developing, tear down the container with `docker compose down` or `make down`.

For log streaming, interactive psql access, and cleanup commands see the [Makefile shortcuts](#makefile-shortcuts) section.

## Database & Seeding - Complete CLI Guide

The Keystone CMS seed system provides powerful tools to populate and manage your database with comprehensive help flags and documentation.

### Quick Reference

```bash
# Get help
pnpm run db:help              # Quick overview
pnpm run db:seed:help         # Full seed documentation
pnpm run db:clear:help        # Full clear documentation

# Seed everything (recommended for initial setup)
pnpm run db:seed
pnpm run db:seed:all

# Seed specific components
pnpm run db:seed:resume
pnpm run db:seed heroes benefits testimonials

# Clear data
pnpm run db:clear:all
pnpm run db:clear:resume
pnpm run db:clear -- --footer

# Fresh database
pnpm run db:fresh             # Reset + seed all
```

### Key Features

✅ **Dependency-aware** - Components are seeded in the correct order automatically  
✅ **Selective seeding** - Seed only the components you need  
✅ **Safe clearing** - Remove specific data without affecting other components  
✅ **Help flags** - Built-in documentation with `--help`  
✅ **Idempotent** - Safe to run multiple times without creating duplicates

### Understanding pnpm `--` Requirement

When passing flags to pnpm scripts, you must use `--` separator:

```bash
# ✅ WORKS - Using shortcuts (recommended)
pnpm run db:seed:help
pnpm run db:clear:resume

# ✅ WORKS - Using -- before flags
pnpm run db:seed -- --help
pnpm run db:clear -- --resume

# ✅ WORKS - Component names (no -- needed)
pnpm run db:seed resume
pnpm run db:clear resume analytics

# ❌ DOESN'T WORK - Missing --
pnpm run db:seed --help       # ❌
pnpm run db:clear --resume    # ❌
```

**Why?** pnpm (like npm) interprets `--` as a separator between pnpm options and script arguments. Everything after `--` is passed to your script. Component names (without dashes) don't need `--`.

### Available Components

Components are seeded in dependency order:

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

### Common Workflows

**Fresh Database Setup:**
```bash
pnpm run db:fresh             # Complete reset + seed all
```

**Update Single Component:**
```bash
pnpm run db:clear:resume      # Clear resume
pnpm run db:seed:resume       # Re-seed resume
```

**Development Workflow:**
```bash
# 1. Make changes to seed data in ./seed/components/resume.ts
# 2. Clear old data
pnpm run db:clear:resume

# 3. Re-seed with new data
pnpm run db:seed:resume

# 4. Verify in Keystone Admin UI
pnpm run dev
```

**Testing Different Content:**
```bash
# Clear specific sections
pnpm run db:clear:content

# Re-seed with updated data
pnpm run db:seed:content
```

### Component-Specific Flags

The clear command supports component-specific flags:

```bash
pnpm run db:clear -- --footer       # Footer sections
pnpm run db:clear -- --navigation   # Navigation menus
pnpm run db:clear -- --resume       # Resume data
pnpm run db:clear -- --analytics    # Analytics data
pnpm run db:clear -- --about        # About sections
pnpm run db:clear -- --images       # All images
pnpm run db:clear -- --pages privacy-policy terms  # Specific pages
```

### Troubleshooting

**Component Not Found:**
```bash
pnpm run db:seed:help  # See all available components
```

**Prisma Client Errors:**
```bash
rm -rf node_modules/.prisma
pnpm run generate
# Restart your IDE
```

**Clear Not Working:**
```bash
# Use shortcut (recommended)
pnpm run db:clear:resume

# Or use -- with flags
pnpm run db:clear -- --resume

# Component names don't need --
pnpm run db:clear resume
```

**Help Not Showing:**
```bash
# Use shortcut (recommended)
pnpm run db:seed:help

# Or use -- with flag
pnpm run db:seed -- --help
```

### Documentation

📚 **Comprehensive guides available:**
- [seed/README.md](seed/README.md) - Complete CLI guide with all options
- [seed/NPM_USAGE_GUIDE.md](seed/NPM_USAGE_GUIDE.md) - Understanding `--` requirement for pnpm/npm
- [seed/QUICK_REFERENCE.md](seed/QUICK_REFERENCE.md) - Quick command reference
- [seed/SCRIPTS.md](seed/SCRIPTS.md) - Detailed script documentation

## Available pnpm scripts

The most common scripts are summarised below:

| Script | Purpose |
| --- | --- |
| **Development** | |
| `pnpm run dev` | Start Keystone in development mode with the Admin UI and GraphQL API. |
| `pnpm run build` | Produce a production build of the Keystone application. |
| `pnpm run start` | Launch the built Keystone server (after `pnpm run build`). |
| **Database Management** | |
| `pnpm run db:push` | Push schema changes to database without migrations. |
| `pnpm run db:seed` | Seed all components (idempotent, safe to re-run). |
| `pnpm run db:seed:all` | Explicitly seed all components with `--all` flag. |
| `pnpm run db:clear` | Clear seeded data (use `-- --[component]` or `-- --all`). |
| `pnpm run db:reset` | Force-reset the database schema via Prisma. |
| `pnpm run db:reset:seed` | Reset the schema and seed all components. |
| `pnpm run db:fresh` | Complete fresh database (alias for reset:seed). |
| **Schema Management** | |
| `pnpm run generate` | Run Prisma migrations and regenerate the Prisma client. |
| `pnpm run schema:verify:dev` | Verify schema, migrate, and start (development). |
| `pnpm run schema:verify:prod` | Verify schema, migrate, and start (production). |

**Seeding Examples:**
```bash
# Seed everything
pnpm run db:seed

# Seed specific components
pnpm run db:seed about analytics navigation

# Clear and re-seed
pnpm run db:clear -- --analytics
pnpm run db:seed analytics

# Complete fresh start
pnpm run db:fresh
```

For detailed seeding documentation, see [seed/README.md](seed/README.md) and [seed/SCRIPTS.md](seed/SCRIPTS.md).

## Makefile shortcuts

The Makefile wraps common Docker Compose commands for convenience:

| Target | Description |
| --- | --- |
| `make up` | Build and start the PostgreSQL container. |
| `make down` | Stop and remove the PostgreSQL container. |
| `make logs` | Tail database logs. |
| `make psql` | Open a psql shell using project credentials. |
| `make status` | Show container status and health. |
| `make clean` | Remove containers and prune dangling Docker resources. |

## Project structure

A simplified layout of notable directories:

```
admin/                  # Custom Admin UI components, pages, and theming
data/                   # Static data used by seeds (do not edit directly)
seed/                   # Modular seeders, orchestrator, and documentation
  ├── components/       # Individual component seed modules
  ├── index.ts          # Main seed orchestrator with caching
  ├── clear.ts          # Data cleanup utilities
  ├── README.md         # Comprehensive seeding guide
  └── SCRIPTS.md        # Quick reference for all commands
schema.ts               # Keystone list definitions and relationships
keystone.ts             # Keystone configuration entry point
session.ts              # NextAuth session strategy helper
docker-compose.yml      # Local PostgreSQL container definition
Makefile                # Helper targets for Docker workflows
package.json            # Scripts and dependency manifest
README.md               # Project documentation (this file)
```

## Content model highlights

Keystone lists in `schema.ts` model the marketing site and support future growth:

- **User**: stores authenticated CMS users synced from Cognito.
- **Language**: enumerates supported locales (currently English and German).
- **Hero, Benefit, Feature, Faq, Certification**: each manages a core marketing section.
- **NavigationLink, FooterSection, Footer**: drive primary and footer navigation menus.
- **TestimonialSection, AnalyticsStat, ApproachStep**: capture social proof and process visuals.
- **PageContent & Section**: compose page-level layouts by referencing other lists.

## Authentication

Authentication is delegated to Amazon Cognito via NextAuth:

1. Users authenticate with Cognito, which returns an ID token to NextAuth.
2. The NextAuth callback (in `admin/pages/api/auth/[...nextauth].ts`) upserts matching `User` records with an `authId`.
3. Keystone sessions are stateless JWTs, exposing the user ID for access checks and ownership-aware features.
4. Secrets (`NEXTAUTH_SECRET` / `SESSION_SECRET`) must be strong random strings in all environments.

## Troubleshooting

- **Prisma client errors:** delete `node_modules/.prisma`, run `pnpm run generate`, and restart the dev server.
- **Cannot sign in:** confirm Cognito credentials and callback URLs match your local host configuration.
- **Database connection refused:** ensure PostgreSQL is running (`docker compose ps`) and that `DATABASE_URL` matches your credentials.
- **Seed conflicts:** the seeding system is idempotent and handles duplicates automatically. If issues persist, use `pnpm run db:fresh` to rebuild from scratch.
- **Component not found:** ensure you're using valid component names. Run `pnpm run db:seed` without arguments to see available components.
- **Dependency errors:** the system auto-seeds dependencies. If you see "not found" errors, try `pnpm run db:seed --all` to ensure all prerequisites exist.

## Contributing

Issue reports and pull requests are welcome. For significant changes, start a discussion to align on approach and data model implications.

## License

[MIT](LICENSE)