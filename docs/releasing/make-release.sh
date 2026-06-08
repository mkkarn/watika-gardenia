#!/bin/bash
# Copyright 2026 Manish
# Licensed under the Apache License, Version 2.0

set -euo pipefail

echo "🚀 Starting full release workflow..."

# Step 1: Build and push Docker images
./docs/releasing/make-docker-images.sh

# Step 2: Package Helm chart
./docs/releasing/make-helm-chart.sh

# Step 3: Bundle release artifacts
./docs/releasing/make-release-artifacts.sh

echo "🎉 Release workflow completed successfully."
echo "Check the release-artifacts/ directory for packaged chart and docs."

