# Multi-stage Dockerfile for Keystone CMS deployment on Northflank
# Optimized for production use with external PostgreSQL database

# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app

# Install dependencies only when needed
COPY package.json package-lock.json ./
RUN npm ci --only=production && \
    cp -R node_modules /tmp/node_modules && \
    npm ci

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
ENV NODE_ENV=production
RUN npx prisma generate

# Build Keystone application
RUN npm run build

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app

# Install production dependencies only
COPY --from=deps /tmp/node_modules ./node_modules

# Copy built application
COPY --from=builder /app/.keystone ./.keystone
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/schema.prisma ./schema.prisma
COPY --from=builder /app/keystone.ts ./keystone.ts
COPY --from=builder /app/auth.ts ./auth.ts
COPY --from=builder /app/session.ts ./session.ts
COPY --from=builder /app/schema.ts ./schema.ts
COPY --from=builder /app/package.json ./package.json

# Copy additional required files
COPY --from=builder /app/admin ./admin
COPY --from=builder /app/data ./data
COPY --from=builder /app/legal ./legal

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/graphql', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Run database migrations and start the application
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
