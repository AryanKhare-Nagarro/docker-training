#!/bin/bash

# Configuration
DOCKER_HUB_USERNAME="aryankharenagarro"
BACKEND_VERSION=1.0.0 || latest
FRONTEND_VERSION=1.0.0 || latest
NETWORK_NAME="todos-prod-network"
VOLUME_NAME="mongodb-prod-data"
MONGO_DB_NAME="prod-db"
BACKEND_PORT=8080
FRONTEND_PORT=5173
# Login to Docker Hub (optional - only needed if images are private)
# docker login -u $DOCKER_HUB_USERNAME

# Pull the latest images
docker pull $DOCKER_HUB_USERNAME/backend:$BACKEND_VERSION
docker pull $DOCKER_HUB_USERNAME/frontend:$FRONTEND_VERSION
docker pull mongo:latest
docker pull redis:alpine

# Stop and remove existing containers if they exist
docker stop todo_backend_container todo_frontend_container mongo redis
docker rm todo_backend_container todo_frontend_container mongo redis

# Create network if it doesn't exist
docker network inspect $NETWORK_NAME || \
    docker network create $NETWORK_NAME

# # Create volume if it doesn't exist
docker volume inspect $VOLUME_NAME || \
    docker volume create $VOLUME_NAME

# Run the containers with the new images
docker run -d \
    --name todo_backend_container \
    --network $NETWORK_NAME \
    -e BACKEND_PORT=$BACKEND_PORT \
    -e MONGO_URL=mongodb://mongo:27017/$MONGO_DB_NAME \
    $DOCKER_HUB_USERNAME/backend:$BACKEND_VERSION

docker run -d \
    --name todo_frontend_container \
    --network $NETWORK_NAME \
    -p $FRONTEND_PORT:$FRONTEND_PORT \
    -e FRONTEND_PORT=$FRONTEND_PORT \
    -e BACKEND_URL=http://todo_backend_container:$BACKEND_PORT \
    $DOCKER_HUB_USERNAME/frontend:$FRONTEND_VERSION

docker run -d \
    --name mongo \
    --network $NETWORK_NAME \
    -v $VOLUME_NAME:/data/db \
    mongo:latest

docker run -d \
    --name redis \
    --network $NETWORK_NAME \
    redis:alpine

echo "Deployment complete!"