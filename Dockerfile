# syntax=docker/dockerfile:1
FROM node:22-slim AS base

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV NEXT_TELEMETRY_DISABLED=1

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/* \
    && corepack enable \
    && corepack prepare pnpm@10.32.1 --activate

WORKDIR /app

FROM base AS fetched

COPY package.json pnpm-lock.yaml ./
RUN pnpm fetch --frozen-lockfile

FROM fetched AS production-dependencies

ENV NODE_ENV=production

RUN pnpm install --prod --frozen-lockfile --offline --ignore-scripts

FROM fetched AS dependencies

RUN pnpm install --frozen-lockfile --offline --ignore-scripts

FROM dependencies AS builder

COPY . .
RUN pnpm run build

FROM base AS runner

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=production-dependencies --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/.keystone ./.keystone
COPY --from=builder --chown=node:node /app/generated ./generated
COPY --chown=node:node package.json pnpm-lock.yaml prisma.config.ts ./
COPY --from=builder --chown=node:node /app/schema.prisma ./schema.prisma
COPY --chown=node:node migrations ./migrations
COPY --chown=node:node seed ./seed
COPY --chown=node:node data ./data
COPY --chown=node:node legal ./legal

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/graphql?query={__typename}', response => process.exit(response.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["pnpm", "start"]
