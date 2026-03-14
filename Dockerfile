# Multi-stage Dockerfile for Northflank deployment
# Stage 1: Dependencies
FROM node:18-alpine AS deps

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Stage 2: Builder
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy application source
COPY . .

# Build the Keystone application
RUN npm run build

# Stage 3: Production
FROM node:18-alpine AS runner

WORKDIR /app

# Add non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 keystone

# Copy production dependencies from deps stage
COPY --from=deps --chown=keystone:nodejs /app/node_modules ./node_modules

# Copy built application from builder stage
COPY --from=builder --chown=keystone:nodejs /app/.keystone ./.keystone
COPY --from=builder --chown=keystone:nodejs /app/node_modules/.prisma ./node_modules/.prisma

# Copy necessary application files
COPY --chown=keystone:nodejs package*.json ./
COPY --chown=keystone:nodejs keystone.ts ./
COPY --chown=keystone:nodejs schema.ts ./
COPY --chown=keystone:nodejs auth.ts ./
COPY --chown=keystone:nodejs session.ts ./
COPY --chown=keystone:nodejs schema.prisma ./
COPY --chown=keystone:nodejs tsconfig.json ./
COPY --chown=keystone:nodejs postcss.config.cjs ./
COPY --chown=keystone:nodejs tailwind.config.ts ./

# Copy additional directories if they exist
COPY --chown=keystone:nodejs admin ./admin
COPY --chown=keystone:nodejs migrations ./migrations

# Switch to non-root user
USER keystone

# Expose the application port
EXPOSE 3000

# Set NODE_ENV to production
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/graphql?query={__typename}', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["npm", "start"]
