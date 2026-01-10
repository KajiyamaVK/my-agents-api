# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Instala dependências do SO necessárias para alguns pacotes nativos (opcional, mas boa prática)
RUN apk add --no-cache openssl

# Copia arquivos de dependência primeiro (Cache Layering)
COPY package*.json ./
COPY prisma ./prisma/

# Instala dependências e gera o Prisma Client
RUN npm ci
RUN npx prisma generate

# Copia o código fonte e faz o build
COPY . .
RUN npm run build

# Stage 2: Production Run
FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Define a porta e o ambiente
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "run", "start:prod"]