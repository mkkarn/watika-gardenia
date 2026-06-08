# Adding a New Microservice

This guide explains how to integrate a new microservice into the Restaurant App project, including Docker image builds, Helm chart templates, and release automation.

---

Steps

1. Create Service Directory
- Add a new folder under `src/` for your service (e.g. `src/reviews-service`).
- Include a `Dockerfile` and application code.

2. Update Docker Build Script
- Edit `docs/releasing/make-docker-images.sh`.
- Add the new service name to the `SERVICES` array:

  ```bash
  SERVICES=("frontend" "menu-service" "cart-service" "order-service" "payment-service" "recommendation-service" "auth-service" "reviews-service")
  ```

3. Add Helm Template

    Create a new YAML file under helm-chart/templates/ (e.g. reviews-service.yaml).

    Follow the pattern used in other services (Deployment + Service).

    Reference values in values.yaml for image, resources, and environment variables.

4. Update Values.yaml

    Add configuration for the new service:
bash
```
reviewsService:
  name: reviews-service
  resources:
    requests:
      cpu: "100m"
      memory: "128Mi"
    limits:
      cpu: "200m"
      memory: "256Mi"
images:
  reviewsService:
    repository: ghcr.io/yourorg/reviews-service
    tag: latest
```

5. Update Release Scripts

    No changes needed in make-helm-chart.sh or make-release-artifacts.sh (they package all templates automatically).

    Ensure make-docker-images.sh includes the new service.

6. Test Locally

    Run helm lint helm-chart/ to validate templates.

    Run helm install --dry-run --debug restaurant-app helm-chart/ to simulate deployment.

7. Commit and Push

    Commit changes to Git.

    Run ./docs/releasing/make-release.sh to perform a full release.

