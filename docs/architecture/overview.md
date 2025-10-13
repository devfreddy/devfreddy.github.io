# Architecture Overview

> High-level architecture of the DevFreddy Portfolio application

**Last Updated**: 2025-10-12

---

## System Architecture

### Application Type
**Single Page Application (SPA)** built with React and deployed as a static site on GitHub Pages.

### Architecture Pattern
**Component-Based Architecture** with:
- Client-side routing (React Router)
- State management (Zustand + React Hooks)
- UI component library (Chakra UI)
- Animation library (Framer Motion)
- Data visualization (D3.js)

---

## High-Level Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              React Application (SPA)                   │  │
│  │                                                        │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │  │
│  │  │   Router     │  │  Components  │  │   State    │  │  │
│  │  │ (React Router)│  │  (Chakra UI) │  │  (Zustand) │  │  │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │  │
│  │                                                        │  │
│  │  ┌──────────────┐  ┌──────────────┐                  │  │
│  │  │  Animations  │  │ Visualization│                  │  │
│  │  │(Framer Motion)│  │   (D3.js)   │                  │  │
│  │  └──────────────┘  └──────────────┘                  │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              localStorage (State Persistence)          │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/HTTPS
                              ▼
                    ┌──────────────────┐
                    │  GitHub Pages    │
                    │  (Static Hosting)│
                    └──────────────────┘
```

---

## Technology Stack

### Core Framework
- **React 19.1.0** - UI library
  - Component-based architecture
  - Hooks for state and lifecycle
  - Virtual DOM for performance

- **Vite 7.0.6** - Build tool and dev server
  - Fast HMR (Hot Module Replacement)
  - Optimized production builds
  - ESM-based development

### UI Layer
- **Chakra UI 3.23.0** - Component library
  - Accessible components out of the box
  - Theming system (light/dark mode)
  - Responsive design utilities

- **Emotion** - CSS-in-JS
  - Styled components
  - Dynamic styling
  - Theme-aware styles

### Routing & Navigation
- **React Router DOM 7.8.0** - Client-side routing
  - BrowserRouter for clean URLs
  - Route-based code splitting capability
  - 404.html fallback for GitHub Pages

### State Management
- **Zustand 5.0.6** - Global state
  - Simple, unopinionated state management
  - Minimal boilerplate
  - Good performance

- **React Hooks** - Local state
  - useState for component state
  - useEffect for side effects
  - Custom hooks for reusable logic

### Animations & Visuals
- **Framer Motion 12.23.11** - Animation library
  - Declarative animations
  - Layout animations
  - Gesture handling

- **D3.js 7.9.0** - Data visualization
  - Particle background effects
  - Canvas-based rendering
  - Interactive visualizations

### Data Persistence
- **localStorage** - Browser storage
  - Banner dismissal state
  - Theme preferences
  - Cross-tab synchronization

---

## Application Structure

```
frontend-project/
├── src/
│   ├── main.jsx              # Application entry point
│   ├── App.jsx               # Root component with routing
│   ├── ErrorBoundary.jsx     # Error handling
│   │
│   ├── components/           # React components
│   │   ├── Navbar.jsx        # Navigation bar
│   │   ├── AboutSection.jsx  # About section
│   │   ├── ExperienceSection.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── ParticleBackground.jsx  # D3.js particles
│   │   ├── FloatingTechIcons.jsx   # Animated icons
│   │   ├── CocktailsPageBasic.jsx  # Cocktails feature
│   │   └── ui/               # Chakra UI wrappers
│   │       └── color-mode.jsx
│   │
│   ├── hooks/                # Custom React hooks
│   │   └── useBannerState.js # Cross-tab banner state
│   │
│   ├── store/                # Zustand stores
│   │   └── useStore.js       # Global state store
│   │
│   ├── data/                 # Static data
│   │   └── cocktails.json    # Cocktail recipes
│   │
│   └── assets/               # Static assets (images, etc.)
│
├── public/                   # Public static files
│   └── vite.svg
│
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
└── eslint.config.js          # ESLint configuration
```

---

## Component Architecture

### Component Hierarchy

```
App (ErrorBoundary wrapper)
├── Provider (Chakra UI theming)
│   ├── Router (React Router)
│   │   ├── Route: / (Home)
│   │   │   ├── Navbar
│   │   │   ├── ParticleBackground
│   │   │   ├── FloatingTechIcons
│   │   │   ├── HeroSection
│   │   │   ├── AboutSection
│   │   │   ├── ExperienceSection
│   │   │   └── ProjectsSection
│   │   │
│   │   ├── Route: /cocktails
│   │   │   ├── Navbar
│   │   │   └── CocktailsPageBasic
│   │   │
│   │   └── Route: * (404)
│   │       └── NotFound
│   │
│   └── ConstructionBanner (global, dismissible)
```

### Component Types

#### 1. Layout Components
- **Navbar** - Navigation and routing
- **Footer** - Construction banner

#### 2. Content Components
- **HeroSection** - Landing page hero
- **AboutSection** - Personal introduction
- **ExperienceSection** - Work history and education
- **ProjectsSection** - Portfolio projects

#### 3. Interactive Components
- **ParticleBackground** - D3.js canvas animation
- **FloatingTechIcons** - Animated technology icons
- **CocktailsPageBasic** - Search/filter UI

#### 4. Utility Components
- **ErrorBoundary** - Error catching and display
- **ColorModeProvider** - Theme management

---

## Data Flow

### State Management Strategy

```
┌─────────────────────────────────────────────────────┐
│                   Global State                       │
│                    (Zustand)                         │
│  - Construction banner visibility                    │
│  - (Future: user preferences, settings)              │
└─────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│              Component Local State                   │
│                  (useState)                          │
│  - Form inputs (search, filters)                     │
│  - UI state (open/closed, expanded/collapsed)        │
│  - Animation states                                  │
└─────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│                  localStorage                        │
│  - Banner dismissed state                            │
│  - Theme preference (via Chakra)                     │
│  - (Future: favorites, settings)                     │
└─────────────────────────────────────────────────────┘
```

### Data Flow Patterns

#### 1. Static Data (Cocktails)
```
cocktails.json → CocktailsPage → Filter/Search → Display
```

#### 2. User Preferences
```
User Action → State Update → localStorage → Cross-tab Sync
```

#### 3. Theme Management
```
ColorModeToggle → Chakra Theme → localStorage → System
```

---

## Routing Architecture

### Route Configuration

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | Home | Main portfolio page |
| `/cocktails` | CocktailsPageBasic | Cocktail recipe collection |
| `*` | NotFound | 404 error page |

### GitHub Pages Routing Strategy

**Challenge**: GitHub Pages doesn't support client-side routing natively.

**Solution**:
1. Use BrowserRouter (not HashRouter) for clean URLs
2. Copy `index.html` to `404.html` during deployment
3. GitHub Pages serves `404.html` for all unmatched routes
4. React Router takes over and renders correct component

**Deployment Flow**:
```bash
./build-and-deploy.sh
  ↓
npm run build (creates dist/)
  ↓
Copy dist/* to root
  ↓
Copy index.html to 404.html
  ↓
Git commit and push
  ↓
GitHub Pages serves files
```

---

## Performance Considerations

### Optimization Strategies

1. **Code Splitting** (Future)
   - Route-based splitting with React.lazy()
   - Component lazy loading for heavy features

2. **Asset Optimization**
   - Vite automatically optimizes builds
   - Tree-shaking removes unused code
   - Minification in production

3. **Animation Performance**
   - D3 uses canvas (not SVG) for particles
   - requestAnimationFrame for smooth animations
   - Reduced particle count on mobile

4. **State Updates**
   - Zustand uses shallow comparison
   - Minimal re-renders
   - Memoization for expensive computations

### Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Performance: 90+
- Bundle size: < 500KB (main)

---

## Security Considerations

### Current Security Measures

1. **Static Site** - No server-side vulnerabilities
2. **No Sensitive Data** - All data is public
3. **HTTPS** - Enforced by GitHub Pages
4. **CSP Headers** - (Future: Content Security Policy)

### Future Enhancements

- Add CSP headers if custom domain is used
- Implement form validation if contact form added
- Add rate limiting for any future API integrations

---

## Deployment Architecture

### Build Process

```
Development (localhost:5173)
  ↓
npm run build
  ↓
Vite bundles code
  ↓
Output to dist/
  ↓
./build-and-deploy.sh
  ↓
Copy to root + commit
  ↓
GitHub Pages (devfreddy.github.io)
```

### Deployment Environments

| Environment | URL | Branch | Auto-Deploy |
|-------------|-----|--------|-------------|
| Production | devfreddy.github.io | main | Manual (script) |
| Development | localhost:5173 | * | N/A |

---

## Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.1.0 | UI framework |
| react-dom | 19.1.0 | React rendering |
| react-router-dom | 7.8.0 | Routing |
| @chakra-ui/react | 3.23.0 | UI components |
| framer-motion | 12.23.11 | Animations |
| d3 | 7.9.0 | Visualizations |
| zustand | 5.0.6 | State management |
| @emotion/react | 11.14.0 | CSS-in-JS |
| @emotion/styled | 11.14.1 | Styled components |
| next-themes | 0.4.6 | Theme management |
| react-icons | 5.5.0 | Icon library |

### Development Dependencies

| Package | Purpose |
|---------|---------|
| vite | Build tool |
| @vitejs/plugin-react | Vite React plugin |
| eslint | Code linting |
| eslint-plugin-react-* | React linting rules |

---

## Future Architecture Considerations

### Planned Enhancements

1. **TypeScript Migration**
   - Add type safety
   - Better IDE support
   - Catch errors at compile time

2. **Testing Infrastructure**
   - Unit tests (Vitest)
   - Component tests (React Testing Library)
   - E2E tests (Playwright)

3. **Performance Monitoring**
   - Web Vitals tracking
   - Error tracking (Sentry)
   - Analytics (privacy-focused)

4. **Progressive Web App (PWA)**
   - Service worker for offline support
   - App manifest
   - Push notifications (optional)

5. **API Integration** (if needed)
   - Backend for contact form
   - CMS for blog content
   - Analytics API

---

## Related Documentation

- [Data Flow Details](data-flow.md)
- [Dependencies Documentation](dependencies.md)
- [Feature Catalog](../features/index.md)
- [Project README](../../README.md)

---

*This architecture document should be updated as the system evolves.*
