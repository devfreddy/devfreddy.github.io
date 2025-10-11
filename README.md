# DevFreddy Portfolio

> Personal portfolio website showcasing professional experience, technical skills, and projects.

🌐 **Live Site:** [https://devfreddy.github.io](https://devfreddy.github.io)

## Overview

A modern, interactive portfolio built with React, featuring smooth animations, particle effects, and a unique cocktail recipe collection. The site demonstrates proficiency in frontend development, UI/UX design, state management, and deployment practices.

## Key Features

### Core Portfolio Sections
- **Hero Section** - Animated landing page with particle background and floating tech icons
- **About Section** - Personal story, skills showcase, and professional focus areas
- **Experience Section** - Detailed work history and education timeline
- **Navigation System** - Responsive navbar with smooth scroll and routing

### Interactive Elements
- **Particle Background** - D3.js-powered interactive animation system
- **Floating Tech Icons** - Animated technology stack visualization
- **Dark Mode** - Color theme toggle with system preference detection
- **Construction Banner** - Dismissible status banner with cross-tab state synchronization

### Unique Features
- **Cocktails Page** - Searchable and filterable recipe collection with 100+ cocktails
- **Client-Side Routing** - React Router with GitHub Pages optimization

📚 **[View Complete Feature Catalog →](docs/features/index.md)**

## Tech Stack

### Frontend Framework
- **React** 19.1.0 - UI library
- **React Router DOM** 7.8.0 - Client-side routing
- **Vite** 7.0.6 - Build tool and dev server

### UI & Animations
- **Chakra UI** 3.23.0 - Component library
- **Framer Motion** 12.23.11 - Animation library
- **Emotion** - CSS-in-JS styling
- **D3.js** 7.9.0 - Data visualization and particles

### State & Data
- **Zustand** 5.0.6 - State management
- **React Hooks** - Local state and effects
- **localStorage** - Banner state persistence

### Development
- **ESLint** 9.30.1 - Code linting
- **Node.js** 24.4.1 (via Volta) - Runtime environment

## Getting Started

### Prerequisites
- Node.js 24.4.1 (managed via Volta)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devfreddy/devfreddy.github.io.git
   cd devfreddy.github.io
   ```

2. **Install dependencies**
   ```bash
   cd frontend-project
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) to view the site.

### Build for Production

```bash
npm run build
```

Output will be in `frontend-project/dist/`

### Preview Production Build

```bash
npm run preview
```

## Deployment

The site is deployed to GitHub Pages using a custom build script:

```bash
./build-and-deploy.sh
```

**What it does:**
1. Builds the React app
2. Copies output to repository root
3. Ensures 404.html is in place for client-side routing
4. Commits and pushes to GitHub

## Project Structure

```
devfreddy.github.io/
├── frontend-project/          # React application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── data/              # Static data (cocktails)
│   │   ├── store/             # Zustand store
│   │   └── main.jsx           # App entry point
│   ├── public/                # Static assets
│   └── package.json           # Dependencies
├── docs/                      # Documentation
│   ├── features/              # Feature documentation
│   ├── sessions/              # Session notes
│   ├── COMMANDS.md            # Useful commands
│   ├── SETUP_LOG.md           # Setup history
│   └── TODO.md                # Task tracking
├── build-and-deploy.sh        # Deployment script
└── README.md                  # This file
```

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Feature Catalog](docs/features/index.md)** - All features with status and dependencies
- **[Commands Reference](docs/COMMANDS.md)** - Development, build, and deployment commands
- **[Setup Log](docs/SETUP_LOG.md)** - Installation and configuration history
- **[TODO List](docs/TODO.md)** - Current tasks and future improvements
- **[Session Notes](docs/sessions/)** - Development session logs

### Featured Documentation

- [Hero Section](docs/features/hero-section/) - Landing page implementation
- [Cocktails Page](docs/features/cocktails-page/) - Search and filter system
- [Construction Banner](docs/features/construction-banner/) - Cross-tab state sync

## Development Workflow

### Feature Development
1. Check [feature catalog](docs/features/index.md) for existing features
2. Create feature documentation folder if needed
3. Implement feature following project patterns
4. Document while building (not after)
5. Update feature index with status

### Session Management
1. Create session notes in `docs/sessions/YYYY-MM-DD/`
2. Track accomplishments, findings, and blockers
3. Link to relevant feature documentation
4. Update TODO.md with new/completed tasks

### Code Quality
- Match existing code style and patterns
- Use hooks for state management
- Optimize with `useMemo` for expensive operations
- Keep components focused and reusable

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 5173) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `./build-and-deploy.sh` | Build and deploy to GitHub Pages |

## Performance

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices)

## Browser Support

- ✅ Chrome 120+
- ✅ Firefox 120+
- ✅ Safari 17+
- ✅ Edge 120+

## Roadmap

### In Progress
- [ ] Complete documentation for all features
- [ ] Accessibility improvements (ARIA, keyboard nav)

### Planned
- [ ] Add Projects Section
- [ ] Implement contact form
- [ ] Performance optimization pass
- [ ] SEO enhancements
- [ ] Add testimonials section

See [TODO.md](docs/TODO.md) for complete task list.

## Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/suggestion`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

**Michael Frederick (DevFreddy)**
- GitHub: [@devfreddy](https://github.com/devfreddy)
- Portfolio: [devfreddy.github.io](https://devfreddy.github.io)
- LinkedIn: [Connect on LinkedIn](https://www.linkedin.com/in/yourprofile)

## Acknowledgments

- Built with [React](https://react.dev)
- UI components by [Chakra UI](https://chakra-ui.com)
- Animations powered by [Framer Motion](https://www.framer.com/motion)
- Particle effects using [D3.js](https://d3js.org)
- Deployed on [GitHub Pages](https://pages.github.com)
- Built with assistance from [Claude Code](https://claude.com/claude-code)

---

**Built with ❤️ and ☕ by DevFreddy**
