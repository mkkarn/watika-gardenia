#!/bin/bash
# Copyright 2026 Manish
# Licensed under the Apache License, Version 2.0

set -euo pipefail

CHART_DIR="helm-chart"
OUTPUT_DIR="release-artifacts"

# Ensure output directory exists
mkdir -p $OUTPUT_DIR

echo "📦 Packaging Helm chart..."
helm lint $CHART_DIR
helm package $CHART_DIR --destination $OUTPUT_DIR

echo "✅ Helm chart packaged successfully."
echo "Artifacts are available in: $OUTPUT_DIR"

