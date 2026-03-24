# Multi-stage Dockerfile for Northflank deployment
FROM node:18-slim AS builder

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

ARG DATABASE_URL
ARG SESSION_SECRET

ENV DATABASE_URL=${DATABASE_URL}
ENV SESSION_SECRET=${SESSION_SECRET}

COPY package.json pnpm-lock.yaml ./
COPY . .

RUN pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm run build


FROM node:18-slim AS runner

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 keystone

COPY --chown=keystone:nodejs package.json pnpm-lock.yaml ./
COPY --chown=keystone:nodejs keystone.ts ./
COPY --chown=keystone:nodejs schema.ts ./
COPY --chown=keystone:nodejs auth.ts ./
COPY --chown=keystone:nodejs session.ts ./
COPY --chown=keystone:nodejs schema.prisma ./
COPY --chown=keystone:nodejs schema.graphql ./
COPY --chown=keystone:nodejs tsconfig.json ./
COPY --chown=keystone:nodejs postcss.config.cjs ./
COPY --chown=keystone:nodejs tailwind.config.ts ./
COPY --chown=keystone:nodejs admin ./admin
COPY --chown=keystone:nodejs migrations ./migrations
COPY --chown=keystone:nodejs legal ./legal

RUN pnpm install --frozen-lockfile --ignore-scripts --prod && \
    pnpm exec prisma generate

COPY --from=builder --chown=keystone:nodejs /app/.keystone ./.keystone

USER keystone

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/graphql?query={__typename}', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["pnpm", "start"]
