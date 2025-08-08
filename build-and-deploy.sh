#!/bin/bash

set -e

REPO_ROOT=$(pwd)
FRONTEND_DIR="$REPO_ROOT/frontend-project"
TMP_DIST="/tmp/vite-deploy-dist"

echo "Starting deployment from frontend folder..."

# 1. Checkout main and pull latest
git checkout main
git pull origin main

# 2. Build in frontend folder
echo "Building project in frontend..."
cd "$FRONTEND_DIR"
npm install
npm run build

# 3. Copy dist folder to temporary location
echo "Copying dist folder to temp..."
rm -rf $TMP_DIST
cp -r dist $TMP_DIST

# 4. Back to repo root and checkout production
cd "$REPO_ROOT"
git checkout production

# 5. Remove all tracked files except CNAME
git ls-files | grep -v '^CNAME$' | xargs -r git rm -rf

# 6. Copy dist contents into repo root (production branch)
cp -r $TMP_DIST/* "$REPO_ROOT"

# 7. Add, commit, and push
git add .
git commit -m "Deploy build from main branch at $(date +"%Y-%m-%d %H:%M:%S")"
git push origin production

# 8. Checkout back to main and go to frontend folder
git checkout main
cd "$FRONTEND_DIR"

echo "Deployment complete!"
