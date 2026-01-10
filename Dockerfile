# Stage 1: Build
# BEST PRACTICE: Use 'bookworm' (Debian) instead of Alpine for Playwright compatibility
FROM node:22-bookworm AS builder

WORKDIR /app

# (Optional) OpenSSL is usually included in bookworm, but keeping if you have specific needs
RUN apt-get update && apt-get install -y openssl

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci
RUN npx prisma generate

COPY . .
RUN npm run build

# Stage 2: Production Run
# BEST PRACTICE: Use the same Debian base to ensure glibc compatibility
FROM node:22-bookworm

WORKDIR /app

# Install production dependencies only (if needed for clean slate)
# or rely on the copy from builder. 
# NOTE: Playwright requires system libraries (libraries, fonts, etc.)
# We install them using the Playwright CLI in the next step.

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# KEY FIX: Install Playwright browsers and system dependencies
# This command installs the OS packages (apt-get) AND the browser binaries
RUN npx playwright install --with-deps

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["npm", "run", "start:prod"]