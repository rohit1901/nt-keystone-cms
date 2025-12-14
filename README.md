# nt-keystone-cms

A **KeystoneJS** CMS for the Nimbus Tech Website.

## Table of Contents

- **Overview**
- **Features**
- **Getting Started**
  - Prerequisites
  - Installation
  - Configuration
  - Running the Project
- **Project Structure**
- **Database & Seeding**
- **Development**
- **Contributing**
- **License**

***

## Overview

This repository provides a headless CMS built using [KeystoneJS](https://keystonejs.com), designed for managing the content and data for the Nimbus Tech Website. It's fully open source, uses TypeScript, Prisma ORM, and is ready to extend for custom requirements.

## Features

- Modern **Keystone 6** Admin UI and GraphQL API
- Modular content schemas with TypeScript support
- Relational data with Prisma ORM
- Example authentication (see `auth.ts`)
- Seed scripts for initializing demo data
- Easily extensible for other web projects

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (See `.nvmrc` for recommended version)
- [Yarn](https://yarnpkg.com/) or `npm`

### Installation

```bash
git clone https://github.com/rohit1901/nt-keystone-cms.git
cd nt-keystone-cms
cp .env.copy .env     # Edit .env as needed
npm install          # or yarn install
```

### Configuration

- Configure environment-specific values in the `.env` file (database, auth secrets, etc.)

### Running the Project

```bash
# Run Prisma migrations (regenerates client)
npm run generate

# Seed the database with demo content
npm run db:seed

# Start the KeystoneJS dev server
npm run dev
```

The Admin UI will be available at `http://localhost:3000/admin` by default.

## Project Structure

- `keystone.ts` - KeystoneJS config and schema imports
- `schema.ts`   - Content and data schemas/lists
- `data/`       - Reference data files. Not to be edited directly and used as a source of truth for data.
- `auth.ts`     - Auth logic (optional)
- `seed/`       - Modular seed components and helpers
- `seed/index.ts` - Main seed runner invoked by `npm run db:seed`
- `seed/components/` - Modular seed data used by `seed/index.ts`
- `schema.prisma` - Prisma database schema
- `.env.copy`   - Example environment config

## Database & Seeding

This project uses Prisma with a relational DB (SQLite, PostgreSQL, etc.; see `.env`). Update the data in `seed/` as needed, then execute the TypeScript seed script:

```bash
npm run db:seed      # Runs ts-node --transpile-only ./seed/index.ts
```

## Development

- TypeScript-first development with full typings
- Modular schemas for flexible content models
- Easy extension for new lists and relationships

## Contributing

Pull requests are welcome! For major changes, please open an issue first or discuss your ideas.

## License

[MIT](LICENSE)
