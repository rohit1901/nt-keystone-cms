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
npm install          # or npm install
```

### Configuration

- Configure environment-specific values in the `.env` file (database, auth secrets, etc.)

### Running the Project

```bash
# Generate Prisma client
npm prisma generate

# Run migrations or set up DB
npm prisma migrate dev

# Start the KeystoneJS server
npm dev
```

The Admin UI will be available at `http://localhost:3000/admin` by default.

## Project Structure

- `keystone.ts` - KeystoneJS config and schema imports
- `schema.ts`   - Content and data schemas/lists
- `data/`       - Modular content and seed data
- `auth.ts`     - Auth logic (optional)
- `seed.ts`     - Script for database seeding
- `schema.prisma` - Prisma database schema
- `.env.copy`   - Example environment config

## Database & Seeding

This project uses Prisma with a relational DB (SQLite, PostgreSQL, etc.; see `.env`). To add seed data, update `seed.ts` and run:

```bash
npm ts-node seed.ts
```

## Development

- TypeScript-first development with full typings
- Modular schemas for flexible content models
- Easy extension for new lists and relationships

## Contributing

Pull requests are welcome! For major changes, please open an issue first or discuss your ideas.

## License

[MIT](LICENSE)
