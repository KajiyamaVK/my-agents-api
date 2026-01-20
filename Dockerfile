# Stage 1: Build
FROM node:22-bookworm AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y openssl && apt-get clean && rm -rf /var/lib/apt/lists/*

# [FIX] Ensure /app is owned by node so npm can create node_modules
RUN chown node:node /app

# Copy package files with correct ownership
COPY --chown=node:node package*.json ./
COPY --chown=node:node prisma ./prisma/

# Install dependencies as node user
USER node
RUN npm ci
RUN npx prisma generate

# Copy source code
COPY --chown=node:node . .
RUN npm run build

# Stage 2: Production Run
FROM node:22-bookworm

WORKDIR /app

# 1. Install OS dependencies as ROOT (Required for Playwright/Chromium system libs)
RUN apt-get update && apt-get install -y \
    openssl \
    chromium \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 2. Set ownership of the working directory to the node user
RUN chown node:node /app

# 3. Switch to non-root user for all subsequent commands
USER node

# 4. Copy built artifacts from builder with correct ownership
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/prisma ./prisma

# 5. Install Playwright Browsers as NODE user
RUN npx playwright install chromium

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "start:prod"]