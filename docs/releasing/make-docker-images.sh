#!/bin/bash
# Copyright 2026 Manish
# Licensed under the Apache License, Version 2.0

set -euo pipefail

# Docker registry (update with your GHCR/DockerHub path)
REGISTRY="ghcr.io/yourorg"

# Microservices list
SERVICES=("frontend" "menu-service" "cart-service" "order-service" "payment-service" "recommendation-service" "auth-service")

# Build and push images
for svc in "${SERVICES[@]}"; do
  echo "Building image for $svc..."
  docker build -t $REGISTRY/$svc:latest ./src/$svc
  echo "Pushing image for $svc..."
  docker push $REGISTRY/$svc:latest
done

echo "✅ All microservice images built and pushed successfully."

