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
- [Database & Seeding Details](#database--seeding-details)
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

## Database & Seeding Details

- The seed runner (`seed/index.ts`) orchestrates modular seeders from `seed/components` to insert hero sections, testimonials, features, maps, and more.
- The script regenerates relationships such as CTAs, languages, and navigation to ensure referential integrity.
- Before re-running seeds on an existing dataset, consider wiping the database with `npm run db:reset` or `npm run db:reset:seed`.
- Use the seed modules as a blueprint for adding new content domains; each module exports reusable data and a `seed` function.

## Available npm scripts

The most common scripts are summarised below:

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start Keystone in development mode with the Admin UI and GraphQL API. |
| `npm run build` | Produce a production build of the Keystone application. |
| `npm run start` | Launch the built Keystone server (after `npm run build`). |
| `npm run generate` | Run Prisma migrations and regenerate the Prisma client. |
| `npm run db:seed` | Execute the TypeScript seed runner to populate demo data. |
| `npm run db:reset` | Force-reset the database schema via Prisma. |
| `npm run db:reset:seed` | Reset the schema and immediately seed fresh demo content. |

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
seed/                   # Modular seeders and seed orchestrator
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
- **Seed conflicts:** use `npm run db:reset:seed` to rebuild the schema from scratch when experimenting.

## Contributing

Issue reports and pull requests are welcome. For significant changes, start a discussion to align on approach and data model implications.

## License

[MIT](LICENSE)
