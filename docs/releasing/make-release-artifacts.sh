#!/bin/bash
# Copyright 2026 Manish
# Licensed under the Apache License, Version 2.0

set -euo pipefail

OUTPUT_DIR="release-artifacts"
CHART_DIR="helm-chart"
DOCS_DIR="docs"

# Ensure output directory exists
mkdir -p $OUTPUT_DIR

echo "📦 Collecting release artifacts..."

# Copy packaged Helm chart
helm package $CHART_DIR --destination $OUTPUT_DIR

# Copy docs
cp -r $DOCS_DIR/releasing $OUTPUT_DIR/docs-releasing

# Save Docker image list (already pushed via make-docker-images.sh)
echo "Listing pushed Docker images..." > $OUTPUT_DIR/docker-images.txt
docker images | grep "ghcr.io/yourorg" >> $OUTPUT_DIR/docker-images.txt

echo "✅ Release artifacts prepared in $OUTPUT_DIR"

