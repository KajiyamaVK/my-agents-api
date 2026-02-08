#!/bin/bash
set -e

echo "Starting Postgres..."
cd ~/.config/postgres-postgis
docker compose up -d

echo "Reloading Nginx..."
cd ~/.config/infrastructure/nginx
docker compose exec nginx nginx -s reload

echo "Done."
