# DevFreddy Portfolio - Documentation

> Modern, performant, and accessible personal portfolio showcasing professional experience, technical skills, and creative projects.

**Live Site**: https://devfreddy.github.io
**Last Updated**: 2025-10-16

---

## Quick Start

### Development
```bash
cd frontend-project
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Build for production
npm run preview    # Preview production build
```

### Deployment
Push to `main` branch - GitHub Actions automatically builds and deploys:
```bash
git push origin main
```

Monitor: https://github.com/devfreddy/devfreddy.github.io/actions

---

## Current Priorities

### This Week
1. ✅ **Write Real Musings** - Replaced all placeholders with authentic LLM-focused content
2. **Clean Up Debug Code** - Remove console.log statements from MusingsPage.jsx
3. **Projects Section** - Uncomment and enhance existing code
4. **Contact Form** - Add contact section or form

### Next Sprint (November 2025)
- WCAG AA compliance
- Performance optimization (Lighthouse 95+)
- Mobile responsive improvements
- Prefers-reduced-motion support

### Backlog
- TypeScript migration
- Test coverage
- Blog enhancements (RSS, search, related posts)
- Case studies
- Enhanced cocktails page (images, favorites)

---

## Project Status

### Completed Features ✅
- Hero section with animations
- About & Experience sections
- Navigation system with routing
- Musings blog section (markdown-based, enhanced design)
  - Enhanced blog post cards with reading time
  - Cross-page navigation with hash-based scrolling
  - Empty state handling
  - Three authentic posts about LLMs and AI technology
  - Transparency note about collaborative writing process
- Cocktails page (search/filter, hidden from nav)
- Construction banner
- Particle background (D3.js)
- Floating tech icons
- Dark mode toggle
- GitHub Pages deployment
- Client-side routing (BrowserRouter)

### In Progress 🚧
- Documentation consolidation
- Accessibility improvements

### Planned 📋
- Projects section
- Contact form
- Mobile navigation improvements
- Performance optimization
- SEO optimization

---

## Technology Stack

**Frontend**
- React 19.1.0
- React Router DOM 7.8.0
- Chakra UI 3.23.0
- Framer Motion 12.23.11

**Data & State**
- D3.js 7.9.0
- Zustand 5.0.6

**Content**
- React Markdown 9.0.1
- Gray Matter 4.0.3
- Remark GFM 4.0.0

**Build & Deploy**
- Vite 7.0.6
- Node.js 24.4.1 (via Volta)
- GitHub Actions (CI/CD)

---

## Project Structure

```
devfreddy.github.io/
├── frontend-project/          # React application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/            # Route pages
│   │   ├── store/            # Zustand state
│   │   └── App.jsx           # Main app
│   ├── public/               # Static assets
│   └── dist/                 # Build output
│
├── docs/                     # Documentation
│   ├── README.md            # This file (priorities & overview)
│   ├── FEATURES.md          # Feature documentation
│   ├── COMMANDS.md          # Useful commands
│   ├── TROUBLESHOOTING.md   # Common issues & solutions
│   └── sessions/            # Session notes by date
│
├── .claude/                 # Claude Code configuration
│   └── commands/            # Slash commands (/start, /wrap, /new-musing)
│
└── .github/                 # GitHub Actions workflows
    └── workflows/
        └── deploy.yml       # Auto-deploy on push
```

---

## Development Workflow

### Starting a Session
```
/start
```
Reviews recent work, checks priorities, suggests starting point.

### Wrapping Up
```
/wrap
```
Updates session notes, commits documentation.

### Common Commands
See [COMMANDS.md](COMMANDS.md) for full list.

---

## Key Decisions

### Architecture
- **SPA with React Router**: Client-side routing for better UX
- **Chakra UI**: Rapid development with accessible components
- **D3.js for Particles**: Custom animations vs. library
- **Zustand**: Lightweight state management

### Deployment
- **GitHub Pages**: Free, reliable hosting
- **GitHub Actions**: Automated CI/CD pipeline
- **BrowserRouter**: Better URLs than HashRouter, requires 404.html redirect

### Documentation
- **Session-based**: Track work by date for continuity
- **Feature-driven**: Document features, not just code
- **Minimal structure**: Consolidated to reduce maintenance overhead

---

## Performance Goals

- Lighthouse Performance: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Mobile-friendly: 100

---

## Accessibility Goals

- WCAG AA compliance
- Screen reader compatible
- Full keyboard navigation
- Color contrast validated
- Prefers-reduced-motion support

---

## Known Issues

### Current
- None

### Fixed
- **404 on Direct Routes**: Fixed with 404.html redirect (2025-10-11)
- **HashRouter URLs**: Switched to BrowserRouter (2025-10-11)

---

## Contributing

This is a personal portfolio, but issues and suggestions are welcome!

### Setup
1. Clone repository
2. `cd frontend-project && npm install`
3. `npm run dev`

### Code Style
- Use ESLint configuration
- Follow React best practices
- Document new features

---

## License

MIT License - See LICENSE file for details.

---

## Contact

**Freddy** - [GitHub](https://github.com/devfreddy)

**Portfolio**: https://devfreddy.github.io
