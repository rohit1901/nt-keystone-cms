# Multi-stage Dockerfile for Northflank deployment
# Stage 1: Builder - Build the Keystone application
FROM node:18-alpine AS builder

WORKDIR /app

# Declare build-time arguments (scoped to this stage only)
ARG DATABASE_URL
ARG SESSION_SECRET

# Expose them as ENV so RUN steps (Prisma/Keystone build) can read them
ENV DATABASE_URL=${DATABASE_URL}
ENV SESSION_SECRET=${SESSION_SECRET}

# Copy all source files (.dockerignore handles exclusions)
COPY . .

# Install all dependencies, skip postinstall (build handles schema generation)
RUN npm ci --ignore-scripts

# Build the Keystone application (DATABASE_URL is available here)
RUN npm run build

# Stage 2: Production Runner
FROM node:18-alpine AS runner

WORKDIR /app

# Add non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 keystone

# Copy all source files (.dockerignore handles exclusions)
COPY --chown=keystone:nodejs . .

# Install all dependencies, skip postinstall (schema already built)
RUN npm ci --ignore-scripts && \
    npm cache clean --force

# Copy the entire built .keystone directory from builder AFTER npm ci
COPY --from=builder --chown=keystone:nodejs /app/.keystone ./.keystone

# Fix permissions
RUN chown -R keystone:nodejs /app

# Switch to non-root user
USER keystone

# Expose the application port
EXPOSE 3000

# Static build-time values only — secrets injected at runtime by Northflank
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/graphql?query={__typename}', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["npm", "start"]
