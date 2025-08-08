#!/bin/bash

set -e  # Exit on error

REPO_ROOT=$(pwd)
TMP_DIST="/tmp/vite-deploy-dist"

echo "Starting deployment process..."

# 1. Checkout main and pull latest changes
echo "Checking out main branch and pulling latest..."
git checkout main
git pull origin main

# 2. Build the project
echo "Building the project..."
npm run build

# 3. Copy dist folder to temporary location
echo "Copying dist folder to temporary location..."
rm -rf $TMP_DIST
cp -r dist $TMP_DIST

# 4. Checkout production branch
echo "Checking out production branch..."
git checkout production

# 5. Remove all files in production branch except .git
echo "Cleaning production branch..."
git rm -rf . > /dev/null 2>&1 || true  # Ignore error if no files tracked

# 6. Copy dist contents into production root
echo "Copying dist files into production branch..."
cp -r $TMP_DIST/* $REPO_ROOT/

# 7. Add, commit, and push changes
echo "Adding and committing changes..."
git add .
git commit -m "Deploy build from main branch at $(date +"%Y-%m-%d %H:%M:%S")"
git push origin production

# 8. Switch back to main branch
echo "Switching back to main branch..."
git checkout main

echo "Deployment complete!"
