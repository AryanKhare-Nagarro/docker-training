#!/bin/bash

cd "$(dirname "$0")/.." || exit

docker compose down --rmi local --remove-orphans

docker pull aryankharenagarro/backend:latest
docker pull aryankharenagarro/frontend:latest

docker compose up -d

echo "Deployment complete."