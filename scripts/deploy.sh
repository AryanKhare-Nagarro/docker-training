#!/bin/bash

# Configuration
DOCKER_HUB_USERNAME="aryankharenagarro"
BACKEND_VERSION=1.2.0 
FRONTEND_VERSION=1.0.0
NETWORK_NAME="todos-prod-network"
VOLUME_NAME="mongodb-prod-data"
MONGO_DB_NAME="prod-db"
BACKEND_PORT=8080
FRONTEND_PORT=5173

# Login to Docker Hub (optional - only needed if images are private)
# docker login -u $DOCKER_HUB_USERNAME

pull_image_with_fallback() {
    local image=$1
    local version=$2
    local service_name=$3
    
    echo "Attempting to pull $image:$version"
    if docker pull "$image:$version" >/dev/null 2>&1; then
        echo "Successfully pulled $image:$version"
        return 0
    else
        echo "WARNING: Version $version for $service_name not available!"
        read -rp "Do you want to use the latest version instead? (Y/n) " response
        response=${response,,} # convert to lowercase
        if [[ "$response" =~ ^(yes|y| ) ]] || [[ -z "$response" ]]; then
            echo "Pulling latest version of $service_name"
            docker pull "$image:latest"
            # Update the version variable for this service
            if [ "$service_name" == "backend" ]; then
                BACKEND_VERSION="latest"
            else
                FRONTEND_VERSION="latest"
            fi
            return 0
        else
            echo "Aborting deployment for $service_name"
            return 1
        fi
    fi
}

# Pull the latest images
echo "Pulling latest images..."
if ! pull_image_with_fallback "$DOCKER_HUB_USERNAME/backend" "$BACKEND_VERSION" "backend"; then
    exit 1
fi

if ! pull_image_with_fallback "$DOCKER_HUB_USERNAME/frontend" "$FRONTEND_VERSION" "frontend"; then
    exit 1
fi

docker pull mongo:latest
docker pull redis:alpine

# Stop and remove existing containers if they exist
containers=("todo_backend_container" "todo_frontend_container" "mongo" "redis")
for container in "${containers[@]}"; do
    if [ "$(docker ps -aq -f name=$container)" ]; then
        echo "Stopping and removing $container"
        docker stop "$container" 
        docker rm "$container"
    else
        echo "$container does not exist, skipping removal"
    fi
done

# Create network if it doesn't exist
if [ ! "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
    echo "Creating network: $NETWORK_NAME"
    docker network create $NETWORK_NAME
else
    echo "Network $NETWORK_NAME already exists"
fi

# Create volume if it doesn't exist
if [ ! "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
    echo "Creating volume: $VOLUME_NAME"
    docker volume create $VOLUME_NAME
else
    echo "Volume $VOLUME_NAME already exists"
fi

# Run the containers with the new images
echo "Starting containers..."
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