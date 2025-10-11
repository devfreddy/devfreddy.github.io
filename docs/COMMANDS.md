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

### Deploy to GitHub Pages
```bash
./build-and-deploy.sh
```

**What it does:**
1. Builds the frontend project
2. Copies build output to root directory
3. Ensures 404.html is in place for client-side routing
4. Commits and pushes changes

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
