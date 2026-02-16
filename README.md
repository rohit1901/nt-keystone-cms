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
- [Available npm scripts](#available-npm-scripts)
- [Makefile shortcuts](#makefile-shortcuts)
- [Project structure](#project-structure)
- [Content model highlights](#content-model-highlights)
- [Authentication](#authentication)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview

Nimbus Tech is a Germany-based software consultancy specialising in cloud-native platforms, enterprise architecture, and product delivery. The website showcases multilingual marketing content, solution offerings, certifications, testimonials, and lead-generation CTAs.

This project packages a bespoke Keystone 6 instance that editors use to manage all site content in a structured, type-safe manner. The CMS feeds both the public-facing Next.js application and any future integrations through Keystone’s Admin UI and GraphQL API.

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
- **npm** (bundled with Node) or **Yarn** for package management
- **Docker Desktop** 4.x or newer (only required when using the bundled database container)
- **PostgreSQL 14+** if you prefer running your own instance instead of Docker
- **AWS Cognito user pool** with an App Client for authentication flows
- **Git** for cloning the repository

## Quick Start

Follow the numbered steps below to stand up the CMS locally. Each step builds on the previous one.

### 1. Clone the repository

Use Git to fetch the code base and navigate into it.

```/dev/null/setup.sh#L1-2
git clone https://github.com/rohit1901/nt-keystone-cms.git
cd nt-keystone-cms
```

### 2. Install dependencies

Install the project’s JavaScript packages (this will also run Keystone’s postinstall hook).

```/dev/null/setup.sh#L1-2
npm install
# or: yarn install
```

### 3. Configure environment variables

Copy the sample configuration and populate the required secrets.

```/dev/null/setup.sh#L1-2
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

```/dev/null/setup.sh#L1-1
npm run generate
```

### 6. Seed baseline content

Populate the database with multilingual demo content, navigation, CTAs, and component data.

```/dev/null/setup.sh#L1-1
npm run db:seed
```

The seeding process imports data from the modules in `seed/components/` and produces a ready-to-browse Admin UI.

### 7. Run the Keystone development server

Launch the Admin UI and GraphQL API.

```/dev/null/setup.sh#L1-1
npm run dev
```

Once the server reports that Keystone is ready, open [http://localhost:3000/admin](http://localhost:3000/admin) to sign in via Cognito and begin managing content.

## Working with Docker Compose

The repository includes a minimal Docker Compose stack and Makefile to spin up PostgreSQL quickly.

1. Confirm `POSTGRES_DB`, `POSTGRES_USER`, and `POSTGRES_PASSWORD` in `.env` match the compose file expectations.
2. Start the database container in detached mode:

```/dev/null/docker.sh#L1-1
docker compose up -d db
```

3. Wait for the container health check to pass. You can monitor status with either of the following:

```/dev/null/docker.sh#L1-2
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
npm run db:help              # Quick overview
npm run db:seed:help         # Full seed documentation
npm run db:clear:help        # Full clear documentation

# Seed everything (recommended for initial setup)
npm run db:seed
npm run db:seed:all

# Seed specific components
npm run db:seed:resume
npm run db:seed heroes benefits testimonials

# Clear data
npm run db:clear:all
npm run db:clear:resume
npm run db:clear -- --footer

# Fresh database
npm run db:fresh             # Reset + seed all
```

### Key Features

✅ **Dependency-aware** - Components are seeded in the correct order automatically  
✅ **Selective seeding** - Seed only the components you need  
✅ **Safe clearing** - Remove specific data without affecting other components  
✅ **Help flags** - Built-in documentation with `--help`  
✅ **Idempotent** - Safe to run multiple times without creating duplicates

### Understanding npm `--` Requirement

When passing flags to npm scripts, you must use `--` separator:

```bash
# ✅ WORKS - Using shortcuts (recommended)
npm run db:seed:help
npm run db:clear:resume

# ✅ WORKS - Using -- before flags
npm run db:seed -- --help
npm run db:clear -- --resume

# ✅ WORKS - Component names (no -- needed)
npm run db:seed resume
npm run db:clear resume analytics

# ❌ DOESN'T WORK - Missing --
npm run db:seed --help       # ❌
npm run db:clear --resume    # ❌
```

**Why?** npm interprets `--` as a separator between npm options and script arguments. Everything after `--` is passed to your script. Component names (without dashes) don't need `--`.

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
npm run db:fresh             # Complete reset + seed all
```

**Update Single Component:**
```bash
npm run db:clear:resume      # Clear resume
npm run db:seed:resume       # Re-seed resume
```

**Development Workflow:**
```bash
# 1. Make changes to seed data in ./seed/components/resume.ts
# 2. Clear old data
npm run db:clear:resume

# 3. Re-seed with new data
npm run db:seed:resume

# 4. Verify in Keystone Admin UI
npm run dev
```

**Testing Different Content:**
```bash
# Clear specific sections
npm run db:clear:content

# Re-seed with updated data
npm run db:seed:content
```

### Component-Specific Flags

The clear command supports component-specific flags:

```bash
npm run db:clear -- --footer       # Footer sections
npm run db:clear -- --navigation   # Navigation menus
npm run db:clear -- --resume       # Resume data
npm run db:clear -- --analytics    # Analytics data
npm run db:clear -- --about        # About sections
npm run db:clear -- --images       # All images
npm run db:clear -- --pages privacy-policy terms  # Specific pages
```

### Troubleshooting

**Component Not Found:**
```bash
npm run db:seed:help  # See all available components
```

**Prisma Client Errors:**
```bash
rm -rf node_modules/.prisma
npm run generate
# Restart your IDE
```

**Clear Not Working:**
```bash
# Use shortcut (recommended)
npm run db:clear:resume

# Or use -- with flags
npm run db:clear -- --resume

# Component names don't need --
npm run db:clear resume
```

**Help Not Showing:**
```bash
# Use shortcut (recommended)
npm run db:seed:help

# Or use -- with flag
npm run db:seed -- --help
```

### Documentation

📚 **Comprehensive guides available:**
- [seed/README.md](seed/README.md) - Complete CLI guide with all options
- [seed/NPM_USAGE_GUIDE.md](seed/NPM_USAGE_GUIDE.md) - Understanding npm `--` requirement
- [seed/QUICK_REFERENCE.md](seed/QUICK_REFERENCE.md) - Quick command reference
- [seed/SCRIPTS.md](seed/SCRIPTS.md) - Detailed script documentation

## Available npm scripts

The most common scripts are summarised below:

| Script | Purpose |
| --- | --- |
| **Development** | |
| `npm run dev` | Start Keystone in development mode with the Admin UI and GraphQL API. |
| `npm run build` | Produce a production build of the Keystone application. |
| `npm run start` | Launch the built Keystone server (after `npm run build`). |
| **Database Management** | |
| `npm run db:push` | Push schema changes to database without migrations. |
| `npm run db:seed` | Seed all components (idempotent, safe to re-run). |
| `npm run db:seed:all` | Explicitly seed all components with `--all` flag. |
| `npm run db:clear` | Clear seeded data (use `-- --[component]` or `-- --all`). |
| `npm run db:reset` | Force-reset the database schema via Prisma. |
| `npm run db:reset:seed` | Reset the schema and seed all components. |
| `npm run db:fresh` | Complete fresh database (alias for reset:seed). |
| **Schema Management** | |
| `npm run generate` | Run Prisma migrations and regenerate the Prisma client. |
| `npm run schema:verify:dev` | Verify schema, migrate, and start (development). |
| `npm run schema:verify:prod` | Verify schema, migrate, and start (production). |

**Seeding Examples:**
```bash
# Seed everything
npm run db:seed

# Seed specific components
npm run db:seed about analytics navigation

# Clear and re-seed
npm run db:clear -- --analytics
npm run db:seed analytics

# Complete fresh start
npm run db:fresh
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

```/dev/null/project-structure.txt#L1-10
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

- **Prisma client errors:** delete `node_modules/.prisma`, run `npm run generate`, and restart the dev server.
- **Cannot sign in:** confirm Cognito credentials and callback URLs match your local host configuration.
- **Database connection refused:** ensure PostgreSQL is running (`docker compose ps`) and that `DATABASE_URL` matches your credentials.
- **Seed conflicts:** the new seeding system is idempotent and handles duplicates automatically. If issues persist, use `npm run db:fresh` to rebuild from scratch.
- **Component not found:** ensure you're using valid component names. Run `npm run db:seed` without arguments to see available components.
- **Dependency errors:** the system auto-seeds dependencies. If you see "not found" errors, try `npm run db:seed --all` to ensure all prerequisites exist.

## Contributing

Issue reports and pull requests are welcome. For significant changes, start a discussion to align on approach and data model implications.

## License

[MIT](LICENSE)
