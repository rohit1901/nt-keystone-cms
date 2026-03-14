# Multi-stage Dockerfile for Northflank deployment
# Stage 1: Builder - Build the Keystone application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy source files needed for build
COPY keystone.ts ./
COPY schema.ts ./
COPY auth.ts ./
COPY session.ts ./
COPY schema.prisma ./
COPY tsconfig.json ./
COPY postcss.config.cjs ./
COPY tailwind.config.ts ./
COPY admin ./admin
COPY migrations ./migrations

# Build the Keystone application
RUN npm run build

# Stage 2: Production Runner
FROM node:18-alpine AS runner

WORKDIR /app

# Add non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 keystone

# Copy package files first
COPY --chown=keystone:nodejs package*.json ./

# Install all dependencies (Keystone needs dev dependencies at runtime for TS compilation)
RUN npm ci && \
    npm cache clean --force && \
    chown -R keystone:nodejs /app/node_modules

# Copy the entire built .keystone directory from builder
COPY --from=builder --chown=keystone:nodejs /app/.keystone ./.keystone

# Copy all source files (required by Keystone at runtime)
COPY --chown=keystone:nodejs keystone.ts ./
COPY --chown=keystone:nodejs schema.ts ./
COPY --chown=keystone:nodejs auth.ts ./
COPY --chown=keystone:nodejs session.ts ./
COPY --chown=keystone:nodejs schema.prisma ./
COPY --chown=keystone:nodejs schema.graphql ./
COPY --chown=keystone:nodejs tsconfig.json ./
COPY --chown=keystone:nodejs postcss.config.cjs ./
COPY --chown=keystone:nodejs tailwind.config.ts ./

# Copy directories
COPY --chown=keystone:nodejs admin ./admin
COPY --chown=keystone:nodejs migrations ./migrations
COPY --chown=keystone:nodejs scripts ./scripts
COPY --chown=keystone:nodejs legal ./legal

# Switch to non-root user
USER keystone

# Expose the application port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/graphql?query={__typename}', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["npm", "start"]
