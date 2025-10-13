# Dependencies Documentation

> Detailed documentation of all project dependencies and their purposes

**Last Updated**: 2025-10-12

---

## Overview

This document provides detailed information about all npm dependencies used in the project, including their purpose, version constraints, and usage patterns.

---

## Production Dependencies

### Core React

#### react (^19.1.0)
- **Purpose**: Core React library for building UI components
- **Size**: ~6 KB (gzipped)
- **Why we chose it**: Industry standard, excellent performance, huge ecosystem
- **Usage**: Foundation of entire application
- **Documentation**: https://react.dev

#### react-dom (^19.1.0)
- **Purpose**: React renderer for web browsers
- **Size**: ~40 KB (gzipped)
- **Why we chose it**: Required for React web applications
- **Usage**: Rendering React components to DOM
- **Documentation**: https://react.dev/reference/react-dom

---

### Routing

#### react-router-dom (^7.8.0)
- **Purpose**: Client-side routing for React applications
- **Size**: ~10 KB (gzipped)
- **Why we chose it**: Industry standard, works well with GitHub Pages
- **Key Features Used**:
  - BrowserRouter for clean URLs
  - Routes and Route for route configuration
  - Link for navigation
  - useNavigate for programmatic navigation
- **Usage**:
  ```javascript
  import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
  ```
- **Configuration**: See [main.jsx](../../frontend-project/src/main.jsx)
- **Documentation**: https://reactrouter.com

**GitHub Pages Integration**:
- Uses BrowserRouter (not HashRouter) for clean URLs
- 404.html fallback enables client-side routing
- See [Architecture Overview](overview.md#routing-architecture)

---

### UI Framework

#### @chakra-ui/react (^3.23.0)
- **Purpose**: Accessible React component library
- **Size**: ~50 KB (gzipped, tree-shakeable)
- **Why we chose it**:
  - Built-in accessibility (ARIA)
  - Excellent theming system
  - Dark mode support out of the box
  - Great documentation
  - Good TypeScript support
- **Key Features Used**:
  - Layout components (Box, Container, Stack)
  - Typography (Text, Heading)
  - Form components (Input, Button)
  - Theme customization
  - Color mode (dark/light)
- **Usage**:
  ```javascript
  import { Box, Button, Container } from '@chakra-ui/react'
  import { Provider } from './components/ui/provider'
  ```
- **Documentation**: https://chakra-ui.com

---

### Styling

#### @emotion/react (^11.14.0)
- **Purpose**: CSS-in-JS library for dynamic styling
- **Size**: ~7 KB (gzipped)
- **Why we chose it**: Required peer dependency for Chakra UI
- **Usage**: Implicit through Chakra UI
- **Documentation**: https://emotion.sh

#### @emotion/styled (^11.14.1)
- **Purpose**: Styled components API for Emotion
- **Size**: ~4 KB (gzipped)
- **Why we chose it**: Enables styled-component pattern with Chakra
- **Usage**: Implicit through Chakra UI
- **Documentation**: https://emotion.sh/docs/styled

---

### Animations

#### framer-motion (^12.23.11)
- **Purpose**: Production-ready animation library for React
- **Size**: ~30 KB (gzipped)
- **Why we chose it**:
  - Declarative animations
  - Great performance
  - Layout animations
  - Gesture support
  - Works well with React
- **Key Features Used**:
  - motion components (motion.div, motion.button)
  - Variants for complex animations
  - Layout animations
  - Animate presence for mount/unmount
- **Usage**:
  ```javascript
  import { motion } from 'framer-motion'

  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  />
  ```
- **Used In**:
  - Hero section animations
  - Floating tech icons
  - Page transitions (future)
- **Documentation**: https://www.framer.com/motion

---

### Data Visualization

#### d3 (^7.9.0)
- **Purpose**: Data visualization and manipulation library
- **Size**: ~75 KB (gzipped, tree-shakeable)
- **Why we chose it**:
  - Industry standard for visualizations
  - Powerful canvas manipulation
  - Force simulation for particle effects
- **Key Features Used**:
  - Canvas rendering
  - Force simulation (future)
  - Math utilities
- **Usage**:
  ```javascript
  import * as d3 from 'd3'
  ```
- **Used In**:
  - ParticleBackground component
- **Performance Notes**:
  - Using canvas (not SVG) for better performance
  - Reduced particle count on mobile
- **Documentation**: https://d3js.org

---

### State Management

#### zustand (^5.0.6)
- **Purpose**: Simple, fast state management
- **Size**: ~1 KB (gzipped)
- **Why we chose it**:
  - Minimal boilerplate
  - No providers needed
  - Great performance
  - Simple API
  - Works well with React
- **Key Features Used**:
  - Global store creation
  - Hooks-based API
  - Shallow comparison
- **Usage**:
  ```javascript
  import { create } from 'zustand'

  const useStore = create((set) => ({
    isBannerVisible: true,
    setIsBannerVisible: (visible) => set({ isBannerVisible: visible })
  }))
  ```
- **Used In**:
  - [useStore.js](../../frontend-project/src/store/useStore.js)
  - Construction banner state
- **Documentation**: https://zustand-demo.pmnd.rs

---

### Theming

#### next-themes (^0.4.6)
- **Purpose**: Theme management (dark/light mode)
- **Size**: ~1 KB (gzipped)
- **Why we chose it**:
  - System preference detection
  - No flash of wrong theme
  - localStorage persistence
  - Works with Chakra UI
- **Usage**: Integrated through Chakra UI's Provider
- **Documentation**: https://github.com/pacocoursey/next-themes

---

### Icons

#### react-icons (^5.5.0)
- **Purpose**: Icon library with popular icon sets
- **Size**: Tree-shakeable (only imports what you use)
- **Why we chose it**:
  - Huge icon collection
  - Tree-shakeable
  - Consistent API
  - Good performance
- **Icon Sets Used**:
  - Fa (Font Awesome) - General icons
  - Si (Simple Icons) - Brand/tech logos
- **Usage**:
  ```javascript
  import { FaGithub, FaLinkedin } from 'react-icons/fa'
  import { SiReact, SiJavascript } from 'react-icons/si'
  ```
- **Used In**:
  - Floating tech icons
  - Navigation icons
  - Social links
- **Documentation**: https://react-icons.github.io/react-icons

---

## Development Dependencies

### Build Tool

#### vite (^7.0.6)
- **Purpose**: Next-generation frontend build tool
- **Why we chose it**:
  - Extremely fast HMR
  - ESM-based development
  - Optimized production builds
  - Great dev experience
  - Built-in TypeScript support
- **Features Used**:
  - Dev server with HMR
  - Production bundling
  - Asset handling
  - CSS processing
- **Configuration**: [vite.config.js](../../frontend-project/vite.config.js)
- **Documentation**: https://vitejs.dev

#### @vitejs/plugin-react (^4.7.0)
- **Purpose**: Vite plugin for React support
- **Features**:
  - Fast Refresh (HMR for React)
  - JSX transformation
  - Automatic runtime detection
- **Documentation**: https://github.com/vitejs/vite-plugin-react

---

### Code Quality

#### eslint (^9.30.1)
- **Purpose**: JavaScript/React code linting
- **Why we chose it**: Industry standard, catches bugs early
- **Configuration**: [eslint.config.js](../../frontend-project/eslint.config.js)
- **Documentation**: https://eslint.org

#### @eslint/js (^9.30.1)
- **Purpose**: ESLint's JavaScript rules
- **Usage**: Base configuration for ESLint

#### eslint-plugin-react-hooks (^5.2.0)
- **Purpose**: ESLint rules for React Hooks
- **Why we need it**: Enforces Rules of Hooks
- **Key Rules**:
  - rules-of-hooks: Ensures hooks are called correctly
  - exhaustive-deps: Checks effect dependencies

#### eslint-plugin-react-refresh (^0.4.20)
- **Purpose**: ESLint rules for React Fast Refresh
- **Why we need it**: Ensures components are HMR-compatible

#### globals (^16.3.0)
- **Purpose**: Global variables for different environments
- **Usage**: ESLint configuration for browser globals

---

### Type Checking (Optional)

#### @types/react (^19.1.8)
- **Purpose**: TypeScript type definitions for React
- **Status**: Installed but not actively used (no TS yet)
- **Future**: Will be used when migrating to TypeScript

#### @types/react-dom (^19.1.6)
- **Purpose**: TypeScript type definitions for React DOM
- **Status**: Installed but not actively used (no TS yet)
- **Future**: Will be used when migrating to TypeScript

---

## Dependency Relationships

### Dependency Tree (Simplified)

```
react
├── react-dom
├── react-router-dom
└── @chakra-ui/react
    ├── @emotion/react
    ├── @emotion/styled
    └── framer-motion

framer-motion (independent)
d3 (independent)
zustand (independent)
react-icons (independent)
next-themes (used by Chakra)

vite
├── @vitejs/plugin-react
└── eslint
    ├── @eslint/js
    ├── eslint-plugin-react-hooks
    └── eslint-plugin-react-refresh
```

---

## Bundle Size Analysis

### Production Bundle (approximate)

| Package | Size (gzipped) | % of Bundle |
|---------|----------------|-------------|
| react + react-dom | 46 KB | 25% |
| @chakra-ui/react | 50 KB | 27% |
| d3 | 40 KB | 22% |
| framer-motion | 30 KB | 16% |
| react-router-dom | 10 KB | 5% |
| Other (zustand, icons, etc.) | 10 KB | 5% |
| **Total** | **~186 KB** | **100%** |

**Note**: Actual sizes vary based on tree-shaking and code splitting

---

## Version Constraints

### Versioning Strategy

- **^** (caret): Allow minor and patch updates
  - Example: `^19.1.0` allows `19.x.x` but not `20.0.0`
  - Used for: Most dependencies

### Why We Use Caret (^)

- **Pros**:
  - Get bug fixes automatically
  - Get new features in minor versions
  - Follows semver best practices
- **Cons**:
  - Potential for breaking changes (rare)
  - Need to test after updates

### Update Strategy

1. Check for updates: `npm outdated`
2. Review changelogs before updating
3. Update one dependency at a time (major packages)
4. Test thoroughly after updates
5. Update package-lock.json

---

## Peer Dependencies

### What Are Peer Dependencies?

Dependencies that your package expects to be present in the consuming project.

### Our Peer Dependencies

**Chakra UI requires**:
- react >= 18
- react-dom >= 18
- @emotion/react >= 11
- @emotion/styled >= 11
- framer-motion >= 6

**Framer Motion requires**:
- react >= 18

**React Router requires**:
- react >= 18

**Status**: ✅ All peer dependencies satisfied

---

## Security Considerations

### Dependency Security

1. **Regular Updates**: Check for updates monthly
2. **Audit**: Run `npm audit` regularly
3. **Lock File**: package-lock.json ensures consistent installs
4. **Minimal Dependencies**: Keep dependency count low

### Current Security Status

```bash
npm audit
# Should show 0 vulnerabilities
```

---

## Future Dependencies (Planned)

### Testing

- **vitest**: Unit testing framework
- **@testing-library/react**: React component testing
- **@testing-library/jest-dom**: DOM testing utilities
- **playwright**: E2E testing

### TypeScript

- **typescript**: TypeScript compiler
- Already have type definitions installed

### Analytics

- **@vercel/analytics**: Privacy-friendly analytics
- Or custom analytics solution

### Forms

- **react-hook-form**: Form validation and handling
- **zod**: Schema validation

---

## Dependency Management Commands

### Install All Dependencies
```bash
npm install
```

### Add New Dependency
```bash
npm install package-name
npm install --save-dev package-name  # For dev dependencies
```

### Update Dependencies
```bash
npm update                    # Update within version constraints
npm install package@latest    # Update to latest version
```

### Check for Updates
```bash
npm outdated
```

### Security Audit
```bash
npm audit
npm audit fix  # Auto-fix vulnerabilities
```

### View Dependency Tree
```bash
npm list
npm list --depth=1  # Show only direct dependencies
```

---

## Troubleshooting

### Common Issues

#### Peer Dependency Warnings

**Symptom**: npm warnings about peer dependencies

**Solution**:
```bash
npm install --legacy-peer-deps
```

#### Dependency Conflicts

**Symptom**: Unable to install due to conflicts

**Solution**:
1. Check which packages conflict
2. Update to compatible versions
3. Or use `--force` (not recommended)

#### Broken node_modules

**Symptom**: Weird errors, missing modules

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Related Documentation

- [Architecture Overview](overview.md)
- [Data Flow](data-flow.md)
- [Troubleshooting Guide](../TROUBLESHOOTING.md)
- [Package.json](../../frontend-project/package.json)

---

*Update this document when adding, removing, or upgrading major dependencies.*
