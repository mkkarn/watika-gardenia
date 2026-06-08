# Restaurant App Release Documentation

This folder contains scripts and guides for building, packaging, and releasing the Restaurant App microservices and Helm chart.

## Contents
- **make-docker-images.sh** → Builds Docker images for all microservices.
- **make-helm-chart.sh** → Packages the Helm chart for deployment.
- **make-release-artifacts.sh** → Generates release bundles (YAML, Helm chart, docs).
- **make-release.sh** → End-to-end release workflow.
- **adding-new-microservice.md** → Guide for integrating a new microservice.
- **development-guide.md** → Best practices for local development.
- **cloudshell-tutorial.md** → Quickstart using Google Cloud Shell.
- **deploystack.md** → Deployment stack overview.
- **product-requirements.md** → Functional and non-functional requirements.
- **purpose.md** → Project purpose and vision.

## Release Workflow
1. Update microservice code and Dockerfiles.
2. Run `make-docker-images.sh` to build and push images.
3. Update Helm chart values and templates.
4. Run `make-helm-chart.sh` to package chart.
5. Run `make-release-artifacts.sh` to generate release bundle.
6. Run `make-release.sh` to publish release.

## License
All files include the Apache 2.0 license header.

