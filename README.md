# Dockerized Todo Application

A full-stack Todo application built with React (Vite), Node.js, MongoDB, and Redis, featuring development, testing, and production environments with complete CI/CD pipeline.

## Features
- Frontend: React with Vite
- Backend: Node.js/Express
- Database: MongoDB
- Cache: Redis
- Proxy: Nginx
- CI/CD: GitHub Actions
- Containerization: Docker & Docker Compose

## Prerequisites
- Git
- Docker Engine (v20.10+)
- Docker Compose (v2.0+)
- WSL2 (for Windows users)
- GitHub Account
- Docker Hub Account
- Node.js (v16+) - for local development

## Version Management
1. **Version Updates**:
   - When making changes to either frontend or backend services:
     - Update the version number in the respective `package.json` file
     - This version number will be used to tag and push the Docker image to Docker Hub
     - Follow semantic versioning (MAJOR.MINOR.PATCH) for version numbers

2. **Version Consistency**:
   - Ensure the same version number is used across:
     - `package.json`
     - Docker image tags
     - Deployment scripts

## Initial Setup

### 1. Clone the Repository
```bash
git clone https://github.com/AryanKhare-Nagarro/docker-training
cd docker-training
```

### 2. Configure GitHub Secrets
1. Go to your GitHub repository
2. Navigate to Settings → Secrets and Variables → Actions
3. Add the following secrets:
   - `DOCKER_HUB_USERNAME`: Your Docker Hub username
   - `DOCKER_HUB_TOKEN`: Your Docker Hub access token

To get your Docker Hub access token:
1. Log in to [Docker Hub](https://hub.docker.com)
2. Go to Account Settings → Security
3. Click "New Access Token"
4. Name it (e.g., "github-actions")
5. Copy the token (store it safely, you won't see it again)

### 3. Environment Configuration
1. Copy `.env.sample` to `.env`
2. Update the following variables in `.env`:
```env
# Environment Configuration
ENV=dev

# Docker Images
BACKEND_IMAGE_NAME=
FRONTEND_IMAGE_NAME=

# Development Environment
DEV_BACKEND_PORT=
DEV_MONGO_DB_NAME=
DEV_FRONTEND_PORT=
```

### 📌 Important Notes:
- Choose PORT numbers that are not in use by other services on your local machine
- Common conflicts occur with ports: 3000, 8080, 5173, 27017
- Use netstat -tuln (Linux) or Get-NetTCPConnection (PowerShell) to check used ports

## Development Environment

### Start Development Environment
Run in detached mode:
```bash
docker compose -f docker-compose.dev.yml up -d
```

Access the application:
- Frontend: http://localhost:<FRONTENED_PORT>
- Backend API: http://localhost:<BACKEND_PORT>

### Development Features
- Hot-reloading enabled for both frontend and backend
- Volume mounts for live code changes
- Redis cache for improved performance
- MongoDB data persistence

### Stop Development Environment
```bash
docker compose -f docker-compose.dev.yml down
```

## CI/CD Pipeline

### Continuous Integration (CI)
Triggers automatically on:
- Push to main branch
- Pull requests to main branch

CI Pipeline:
1. Builds Docker images
2. Runs tests
3. Validates build integrity

### Continuous Deployment (CD)
Triggers after successful CI:
1. Builds production images
2. Pushes images to Docker Hub
3. Enables deployment to production

## Production Deployment

### Local Production Setup

1. Set Docker Hub username in your terminal:
```bash
# For PowerShell
$env:DOCKER_HUB_USERNAME="your-dockerhub-username"

# For Bash/WSL
export DOCKER_HUB_USERNAME="your-dockerhub-username"
```

2. Install dos2unix (WSL/Linux):
```bash
sudo apt install dos2unix
```

3. Convert deployment script to Unix format:
```bash
dos2unix scripts/deploy-prod.sh
```

4. Make script executable:
```bash
chmod +x scripts/deploy-prod.sh
```

5. Run deployment script:
```bash
./scripts/deploy-prod.sh
```

The script will:
- Stop existing containers
- Pull latest images from Docker Hub
- Start production containers
- Clean up unused resources

Access production deployment:
- Frontend: http://localhost:5173

# Production Deployment Guide

This document provides steps for deploying the application to production using Docker.

## Deployment Workflow

### 1️⃣ Prepare Deployment
- Open `./scripts/deploy.sh`
- Specify all required configurations at the top of the file:
  - Docker Hub username
  - Version numbers
  - Port mappings
  - Network/volume names

### 2️⃣ Run Deployment
Execute the deployment script:
```
./scripts/deploy.sh
```

### 3️⃣ Destroy Containers (when needed):

```
./scripts/down.sh
```

### 📌 Deployment Notes:

The deployment script will automatically:

- Pull the specified version images from Docker Hub
- Create necessary networks and volumes
- Start containers with proper configuration
- If a specific version isn't available, the script will prompt to use the latest version


## Monitoring & Maintenance

### View Logs
```bash
# Frontend logs
docker logs frontend -f

# Backend logs
docker logs backend -f
```

### Check Container Status
```bash
docker compose ps
```

### Database Management
MongoDB data is persisted in named volumes. To manage:
```bash
# List volumes
docker volume ls

# Backup volume
docker volume backup mongodb-data

# Clean volumes (caution!)
docker compose down -v
```

## Security Features
- Non-root user containers
- Environment variable management
- Volume permission management
- Network isolation
- Rate limiting (Nginx)
- Secrets management

## Best Practices
- Multi-stage builds for smaller images
- Layer caching optimization
- Health checks
- Resource limits
- Proper error handling
- Automated testing

## Troubleshooting

### Common Issues
1. Port conflicts
   - Solution: Modify ports in .env file

2. Permission issues
   - Solution: Check file permissions and ownership

3. WSL2 connectivity issues
   - Solution: Restart WSL with `wsl --shutdown`

4. Docker Hub authentication
   - Solution: Run `docker login` locally

### Getting Help
- Check container logs
- Verify environment variables
- Ensure Docker service is running
- Check network connectivity

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request