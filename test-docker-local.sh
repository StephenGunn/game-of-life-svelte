#!/bin/bash

# Build the Docker image locally
echo "Building Docker image..."
docker build -t app-test:latest .

# Run the container
echo "Running container..."
docker run -d \
  --name app-test \
  -p 3001:3000 \
  -e NODE_ENV=production \
  app-test:latest

echo "Container is running on http://localhost:3001"
echo "Check logs with: docker logs app-test"
echo "Stop with: docker stop app-test && docker rm app-test"