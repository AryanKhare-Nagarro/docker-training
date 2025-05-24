#!/bin/bash

echo "Stopping and removing existing containers..."

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

echo "Done."