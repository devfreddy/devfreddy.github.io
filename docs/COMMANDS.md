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

In Claude Code, use the `/start` slash command:
```
/start
```

**What it does:**
1. Reviews recent session work and next steps
2. Checks active features and sprint priorities
3. Identifies any blockers
4. Suggests starting point for today

### Wrap Up a Session
Complete session documentation and commit changes:

In Claude Code, use the `/wrap` slash command:
```
/wrap
```

**What it does:**
1. Updates session wrap-up documentation
2. Updates COMMANDS.md, TROUBLESHOOTING.md if needed
3. Updates ROADMAP.md and feature docs
4. Commits all documentation changes
5. Provides session summary

### Create New Feature
Set up documentation structure for a new feature:

In Claude Code, use the `/new-feature` slash command:
```
/new-feature
```

**What it does:**
1. Creates feature directory with all documentation files
2. Updates feature index
3. Provides template structure for documentation

## Documentation

### View Session History
```bash
ls -lt docs/sessions/
```

### View Feature Documentation
```bash
ls -la docs/features/
```
