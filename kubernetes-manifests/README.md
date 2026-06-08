# Kubernetes Manifests for Watika-Gardenia

This folder contains Kubernetes Deployment and Service manifests for each microservice in the Watika-Gardenia restaurant app.

## Services
- frontend
- menu-service
- cart-service
- order-service
- payment-service
- recommendation-service
- auth-service
- orders-db (Postgres)
- loadgenerator (optional for testing)

## Usage
Apply manifests with:
```bash
kubectl apply -k kubernetes-manifests/

