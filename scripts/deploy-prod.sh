#!/bin/bash

# Stop and remove existing containers
docker-compose down --rmi local --remove-orphans

# Pull latest images
docker pull $DOCKER_HUB_USERNAME/backend:latest
docker pull $DOCKER_HUB_USERNAME/frontend:latest

# Start new containers
TAG=latest docker-compose up -d

# Cleanup old images (keep last 2 versions)
docker image prune -f