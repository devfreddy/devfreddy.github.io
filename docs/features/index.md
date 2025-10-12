# Feature Catalog

| Feature | Status | Description | Dependencies | Last Updated |
|---------|--------|-------------|--------------|--------------|
| [Hero Section](./hero-section/) | 🟢 Complete | Animated landing page with gradient background and call-to-action buttons | Particle Background, Floating Tech Icons | 2025-10-11 |
| [About Section](./about-section/) | 🟢 Complete | Personal bio, story, and technical skills showcase | - | 2025-10-11 |
| [Experience Section](./experience-section/) | 🟢 Complete | Professional work history and education timeline | - | 2025-10-11 |
| [Cocktails Page](./cocktails-page/) | 🟢 Complete | Searchable and filterable cocktail recipe collection | Navigation System | 2025-10-11 |
| [Navigation System](./navigation-system/) | 🟢 Complete | Responsive navbar with React Router integration | - | 2025-10-12 |
| [Construction Banner](./construction-banner/) | 🟢 Complete | Persistent footer banner showing development status | - | 2025-10-12 |
| [Particle Background](./particle-background/) | 🟢 Complete | D3.js-powered interactive particle animation system | - | 2025-10-11 |
| [Floating Tech Icons](./floating-tech-icons/) | 🟢 Complete | Animated technology stack icon visualization | - | 2025-10-11 |
| [Dark Mode](./dark-mode/) | 🟢 Complete | Color mode toggle with system preference detection | - | 2025-10-11 |
| [Client-Side Routing](./client-side-routing/) | 🟢 Complete | React Router with GitHub Pages 404.html redirect handling | - | 2025-10-11 |

## Feature Dependencies Graph

```
Navigation System
└── React Router (routing logic)

Hero Section
├── Particle Background (visual layer)
└── Floating Tech Icons (visual layer)

Cocktails Page
└── Navigation System (access route)

Client-Side Routing
├── Navigation System
├── Hero Section (home route)
└── Cocktails Page (cocktails route)

Construction Banner (independent footer component)
```

## Technology Stack

**Frontend Framework:**
- React 19.1.0
- React Router DOM 7.8.0

**UI Library:**
- Chakra UI 3.23.0
- Framer Motion 12.23.11

**Data Visualization:**
- D3.js 7.9.0

**State Management:**
- Zustand 5.0.6
- React Hooks (useState, useEffect, useMemo)

**Build Tools:**
- Vite 7.0.6
- Node.js 24.4.1 (via Volta)

**Styling:**
- Emotion (CSS-in-JS)
- Custom CSS modules
