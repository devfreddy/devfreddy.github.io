#!/bin/bash

set -e

REPO_ROOT=$(pwd)
FRONTEND_DIR="$REPO_ROOT/frontend-project"
TMP_DIST="/tmp/vite-deploy-dist"

echo "Starting deployment from frontend folder..."

# Configure git if in CI environment
if [ -n "$CI" ]; then
    git config user.name "${GIT_USER_NAME:-github-actions[bot]}"
    git config user.email "${GIT_USER_EMAIL:-github-actions[bot]@users.noreply.github.com}"
fi

# 1. Ensure we're on main branch
git checkout main
# Only pull if not in CI (CI already has the correct commit)
if [ -z "$CI" ]; then
    git pull origin main
fi

# 2. Build in frontend folder
echo "Building project in frontend..."
cd "$FRONTEND_DIR"
npm install
npm run build

# 3. Copy dist folder to temporary location
echo "Copying dist folder to temp..."
rm -rf $TMP_DIST
if [ ! -d "dist" ]; then
    echo "Error: dist folder not found after build!"
    exit 1
fi
cp -r dist $TMP_DIST

# 4. Back to repo root and checkout production
cd "$REPO_ROOT"
git checkout production

# 5. Remove all tracked files except CNAME
echo "Cleaning production branch (preserving CNAME)..."
FILES_TO_REMOVE=$(git ls-files | grep -v '^CNAME$')
if [ -n "$FILES_TO_REMOVE" ]; then
    echo "$FILES_TO_REMOVE" | xargs git rm -rf --quiet
fi

# 6. Copy dist contents into repo root (production branch)
cp -r $TMP_DIST/* "$REPO_ROOT"

# 7. Add, commit, and push
git add .
# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "No changes to deploy"
else
    git commit -m "Deploy build from main branch at $(date +"%Y-%m-%d %H:%M:%S")"
    git push origin production
    echo "Changes deployed successfully!"
fi

# 8. Checkout back to main and go to frontend folder
git checkout main
cd "$FRONTEND_DIR"

echo "Deployment complete!"
