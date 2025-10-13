# Useful Commands

## Development

### Start Development Server
```bash
cd frontend-project
npm run dev
```
Access at: http://localhost:5173

### Build for Production
```bash
cd frontend-project
npm run build
```
Output: `frontend-project/dist/`

### Preview Production Build
```bash
cd frontend-project
npm run preview
```

### Lint Code
```bash
cd frontend-project
npm run lint
```

## Deployment

### Automatic Deployment (Recommended)
Deployment happens automatically via GitHub Actions when you push to `main`:

```bash
git push origin main
```

**What happens:**
1. GitHub Actions workflow triggers on push to main
2. Builds the frontend project (`npm ci && npm run build`)
3. Uploads build artifact to GitHub Pages
4. Deploys to production automatically

Monitor deployment: https://github.com/devfreddy/devfreddy.github.io/actions

### Manual Deployment (Legacy)
The manual build-and-deploy script still exists but is no longer needed:

```bash
./build-and-deploy.sh
```

**Note:** This script is deprecated. Use the automatic GitHub Actions deployment instead.

## Git Workflows

### Check Repository Status
```bash
git status
```

### View Recent Commits
```bash
git log --oneline -10
```

### Create Feature Branch
```bash
git checkout -b feature/feature-name
```

### Stage and Commit Changes
```bash
git add .
git commit -m "Description of changes"
```

### Push to Remote
```bash
git push origin main
```

## Project Management

### View Project Structure
```bash
tree -I 'node_modules|dist|.git' -L 3
```

### Find Files by Pattern
```bash
find . -name "*.jsx" -not -path "./node_modules/*"
```

### Search Code
```bash
grep -r "searchTerm" --include="*.jsx" --include="*.js"
```

## Node/NPM

### Install Dependencies
```bash
cd frontend-project
npm install
```

### Check for Outdated Packages
```bash
npm outdated
```

### Update Package
```bash
npm update package-name
```

### Check Node Version (Volta)
```bash
node --version
# Should show 24.4.1 (from volta config in package.json)
```

## Troubleshooting

### Clear Node Modules and Reinstall
```bash
cd frontend-project
rm -rf node_modules package-lock.json
npm install
```

### Clear Vite Cache
```bash
cd frontend-project
rm -rf node_modules/.vite
npm run dev
```

### Check Build Output
```bash
cd frontend-project
npm run build
ls -la dist/
```

## SDLC Workflow

### Start a Session
Initialize context for a new work session:

```bash
./scripts/startup.sh
```

**What it does:**
1. Checks project configuration
2. Generates session context from recent work
3. Provides suggested starting points

### Wrap Up a Session
Complete session documentation and commit changes:

In Claude Code, use the `/wrap` slash command:
```
/wrap
```

Or manually run the script:
```bash
./scripts/wrap-up.sh
```

**The /wrap command:**
1. Updates session wrap-up documentation
2. Updates COMMANDS.md, TROUBLESHOOTING.md if needed
3. Updates ROADMAP.md and feature docs
4. Commits all documentation changes
5. Provides session summary

## Documentation

### Generate Feature Documentation Template
```bash
mkdir -p docs/features/feature-name
touch docs/features/feature-name/{README.md,implementation.md,testing.md,decisions.md}
```

### Create Session Notes
```bash
mkdir -p docs/sessions/$(date +%Y-%m-%d)
touch docs/sessions/$(date +%Y-%m-%d)/notes.md
```

### View Session History
```bash
ls -lt docs/sessions/
```
