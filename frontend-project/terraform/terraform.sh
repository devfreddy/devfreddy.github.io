#!/bin/bash
# Helper script to load environment variables and run Terraform

# Load .env file from parent directory
if [ -f "../.env" ]; then
  set -a
  source ../.env
  set +a
  echo "✓ Loaded environment variables from ../.env"
fi

# Ensure DASH0_AUTH_TOKEN is set
if [ -z "$DASH0_AUTH_TOKEN" ]; then
  echo "❌ Error: DASH0_AUTH_TOKEN is not set in .env file"
  exit 1
fi

# Run terraform with all arguments passed through
terraform "$@"
