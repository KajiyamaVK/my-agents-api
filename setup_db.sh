#!/bin/bash
set -e

echo "Running Prisma Migration..."
npx prisma migrate dev --name init_postgres

echo "Restarting API Container..."
docker compose up -d --build

echo "Setup Complete!"
