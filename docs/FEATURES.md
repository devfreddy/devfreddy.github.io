# Feature Documentation

Complete reference for all features in the DevFreddy Portfolio.

---

## Feature Catalog

| Feature | Status | File Location | Dependencies |
|---------|--------|---------------|--------------|
| [Hero Section](#hero-section) | 🟢 Complete | `src/components/HeroSection.jsx` | Particle Background, Floating Tech Icons |
| [About Section](#about-section) | 🟢 Complete | `src/components/AboutSection.jsx` | - |
| [Experience Section](#experience-section) | 🟢 Complete | `src/components/ExperienceSection.jsx` | - |
| [Musings Blog](#musings-blog) | 🟢 Complete | `src/components/MusingsPage.jsx` | react-markdown, gray-matter |
| [Cocktails Page](#cocktails-page) | 🟢 Complete | `src/components/CocktailsPageBasic.jsx` | Navigation System (hidden) |
| [Navigation System](#navigation-system) | 🟢 Complete | `src/components/Navbar.jsx` | React Router |
| [Construction Banner](#construction-banner) | 🟢 Complete | `src/components/ConstructionBanner.jsx` | - |
| [Particle Background](#particle-background) | 🟢 Complete | `src/components/ParticleBackground.jsx` | D3.js |
| [Floating Tech Icons](#floating-tech-icons) | 🟢 Complete | `src/components/FloatingTechIcons.jsx` | React Icons |
| [Dark Mode](#dark-mode) | 🟢 Complete | `src/App.jsx` | Chakra UI, next-themes |
| [Client-Side Routing](#client-side-routing) | 🟢 Complete | `src/App.jsx`, `public/404.html` | React Router |

---

## Hero Section

### Overview
Full-screen landing section with animated text, gradient background, interactive particles, and call-to-action buttons.

### What It Does
- First visual element visitors see
- Animated name and title reveal
- Interactive particle background
- Two CTA buttons (Experience, About)
- Adjusts spacing when construction banner is visible

### Key Props
```jsx
<HeroSection
  scrollToSection={(id) => void}  // Smooth scroll to section
  showBanner={boolean}             // Adjust padding for banner
/>
```

### Animation Strategy
- **Container**: Fades in first
- **Children**: Stagger animation (0.2s delay between each)
- **Name**: Special spring animation with scale effect

### Technical Details
- **File**: `src/components/HeroSection.jsx`
- **Dependencies**: Chakra UI, Framer Motion, ParticleBackground, FloatingTechIcons
- **Performance**: Uses GPU-accelerated transforms and opacity

### Responsive Design
- Adaptive padding based on banner visibility
- Mobile-friendly button layout
- Flexible text sizing

---

## About Section

### Overview
Personal bio showcasing background story and technical skills.

### What It Does
- Tells personal story
- Highlights technical expertise
- Lists technology stack with icons
- Provides context about professional journey

### Technical Details
- **File**: `src/components/AboutSection.jsx`
- **Dependencies**: Chakra UI, React Icons

---

## Experience Section

### Overview
Professional work history and education timeline.

### What It Does
- Displays job positions chronologically
- Shows education background
- Highlights key responsibilities
- Provides career progression context

### Technical Details
- **File**: `src/components/ExperienceSection.jsx`
- **Dependencies**: Chakra UI

---

## Musings Blog

### Overview
Markdown-based blog section for sharing thoughts, learnings, and observations about technology and collaboration.

### What It Does
- Displays blog posts from markdown files with frontmatter
- List view showing all posts with title, date, excerpt, and tags
- Individual post view with full markdown rendering
- Automatic post discovery from `src/musings/*.md` files
- Click-through navigation from list to detail and back
- Posts sorted by date (newest first)
- Dark mode support throughout

### Post Structure
```markdown
---
title: Post Title
date: YYYY-MM-DD
excerpt: Brief description (1-2 sentences)
tags: [tag1, tag2, tag3]
---

# Post Content

Your markdown content here...
```

### Markdown Features Supported
- Headers (H1-H6)
- Paragraphs and line breaks
- Lists (ordered and unordered)
- Code blocks with syntax highlighting
- Inline code
- Blockquotes
- Links and bold/italic text
- Tables (via remark-gfm)
- Task lists (via remark-gfm)

### Routes
- `/musings` - List of all posts
- `/musings/{slug}` - Individual post view

### Technical Details
- **File**: `src/components/MusingsPage.jsx`
- **Dependencies**: react-markdown, gray-matter, remark-gfm
- **Post Discovery**: Vite's `import.meta.glob` for automatic file loading
- **Parsing**: gray-matter for frontmatter extraction
- **Rendering**: ReactMarkdown with GitHub-flavored markdown support

### Implementation Notes
- Posts are loaded dynamically from markdown files
- Frontmatter parsed on the client
- Slug is derived from filename (e.g., `welcome.md` → `/musings/welcome`)
- No build step required for new posts
- Markdown styling uses Chakra UI tokens for theme consistency
- Responsive design with max-width for readability

### Creating New Posts
Use the `/new-musing` slash command to create a new post with proper frontmatter structure and template.

### Future Enhancements
- RSS feed generation
- Search functionality (title, content, tags)
- Tag filtering
- Reading time estimate
- Table of contents generation
- Related posts suggestions
- Social sharing metadata
- Comments integration (Giscus/Utterances)

---

## Cocktails Page

### Overview
Searchable and filterable cocktail recipe collection with detailed ingredients and instructions. Hidden from public navigation but accessible via direct URL.

### What It Does
- Displays cocktail recipes with ingredients and instructions
- Real-time search by name or ingredient
- Filter by category (Classic, Tiki, Modern, etc.)
- Responsive grid layout
- Highlights matching search terms
- Hidden from navbar (accessible via `/cocktails` URL only)

### Key Features
```jsx
// Search functionality
const filteredCocktails = useMemo(() => {
  return cocktails.filter(cocktail => {
    const matchesSearch = cocktail.name.toLowerCase().includes(search)
    const matchesCategory = !category || cocktail.category === category
    return matchesSearch && matchesCategory
  })
}, [search, category])
```

### Data Structure
```javascript
{
  name: "Cocktail Name",
  category: "Classic",
  ingredients: ["2 oz Spirit", "1 oz Modifier"],
  instructions: "Shake with ice...",
  glass: "Coupe"
}
```

### Technical Details
- **File**: `src/components/CocktailsPageBasic.jsx`
- **State**: Local state with useState
- **Performance**: useMemo for filtered results
- **Dependencies**: Chakra UI, React Router
- **Visibility**: Hidden from navbar, accessible via direct URL

### Implementation Notes
- **Search**: Case-insensitive, matches name and ingredients
- **Filter**: Category dropdown with "All Categories" option
- **Layout**: Responsive grid (1 column mobile, 2-3 desktop)
- **Accessibility**: Proper labels and semantic HTML
- **Privacy**: "Security through obscurity" - no links to this page on the site

### Future Enhancements
- Add cocktail images
- Implement favorites (localStorage)
- Add sorting options
- Recipe sharing functionality
- Ingredient substitution suggestions

---

## Navigation System

### Overview
Responsive navbar with React Router integration for client-side navigation.

### What It Does
- Site-wide navigation menu
- Active route highlighting
- Mobile-responsive design
- Dark mode toggle integration
- Smooth transitions

### Routes
- `/` - Home (Hero, About, Experience)
- `/cocktails` - Cocktails Page

### Technical Details
- **File**: `src/components/Navbar.jsx`
- **Dependencies**: React Router DOM, Chakra UI

---

## Construction Banner

### Overview
Persistent footer banner showing development status with dismissible functionality.

### What It Does
- Shows "Under Construction" message
- Dismissible with localStorage persistence
- Adjusts page padding when visible
- Respects user preference across sessions

### State Management
```javascript
// Custom Zustand store
const useBannerState = create((set) => ({
  showBanner: localStorage.getItem('showBanner') !== 'false',
  hideBanner: () => {
    set({ showBanner: false })
    localStorage.setItem('showBanner', 'false')
  }
}))
```

### Technical Details
- **File**: `src/components/ConstructionBanner.jsx`
- **State**: Zustand store (`src/store/useBannerState.js`)
- **Persistence**: localStorage
- **Dependencies**: Chakra UI, Zustand

---

## Particle Background

### Overview
D3.js-powered interactive particle animation system that responds to user interaction.

### What It Does
- Animated particles floating across screen
- Mouse interaction (particles move away)
- Connects nearby particles with lines
- Configurable count, speed, and behavior

### Configuration
```javascript
const config = {
  particleCount: 100,
  particleRadius: 2,
  maxSpeed: 0.5,
  connectionDistance: 100,
  mouseRepelRadius: 150
}
```

### Technical Details
- **File**: `src/components/ParticleBackground.jsx`
- **Dependencies**: D3.js
- **Performance**: Canvas-based rendering, RequestAnimationFrame loop
- **Responsive**: Adjusts particle count based on screen size

### Performance Considerations
- Uses canvas for efficient rendering
- Particle count should be reduced on mobile
- Consider pause/resume based on visibility (Intersection Observer)

---

## Floating Tech Icons

### Overview
Animated technology stack icon visualization floating across the hero section.

### What It Does
- Displays tech stack icons (React, JavaScript, CSS, etc.)
- Smooth floating animation
- Visual interest for hero section
- Shows technical expertise at a glance

### Technical Details
- **File**: `src/components/FloatingTechIcons.jsx`
- **Dependencies**: React Icons, Framer Motion
- **Animation**: CSS keyframes or Framer Motion

---

## Dark Mode

### Overview
Color mode toggle with system preference detection and persistence.

### What It Does
- Switch between light and dark themes
- Respects system color scheme preference
- Persists user choice in localStorage
- Smooth theme transitions

### Technical Details
- **File**: Integrated in `src/App.jsx`
- **Dependencies**: Chakra UI ColorMode, next-themes
- **Toggle**: Sun/Moon icon button in navbar

### Color Scheme
- Uses Chakra UI's color mode tokens
- Consistent colors across all components
- Proper contrast ratios for accessibility

---

## Client-Side Routing

### Overview
React Router with GitHub Pages 404.html redirect handling for direct URL navigation.

### What It Does
- Enables client-side navigation without page reloads
- Handles direct URL access on GitHub Pages
- Clean URLs (no hash fragments)

### Implementation
```javascript
// App.jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/cocktails" element={<CocktailsPage />} />
  </Routes>
</BrowserRouter>
```

### 404.html Redirect
```html
<!-- public/404.html -->
<script>
  // Redirect to index.html with path as query param
  sessionStorage.setItem('redirect', location.pathname)
  location.replace('/index.html')
</script>
```

### Technical Details
- **Files**: `src/App.jsx`, `public/404.html`
- **Dependencies**: React Router DOM
- **Deployment**: Works with GitHub Pages single-page app constraints

---

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

---

## Testing Guidelines

### Manual Testing Checklist
- [ ] Hero section animations load smoothly
- [ ] All navigation links work correctly
- [ ] Cocktails search filters results correctly
- [ ] Dark mode toggles properly
- [ ] Banner dismisses and stays dismissed
- [ ] Direct URL navigation works
- [ ] Responsive design works on mobile
- [ ] Particle animations perform well

### Browser Compatibility
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Testing
- Lighthouse audit (target: 95+)
- Mobile performance testing
- Animation performance (60fps target)

---

## Accessibility Notes

### Current State
- Semantic HTML structure
- Some ARIA labels present
- Keyboard navigation partially supported
- Color contrast generally good

### Improvements Needed
- [ ] Add comprehensive ARIA labels
- [ ] Full keyboard navigation
- [ ] Focus indicators for all interactive elements
- [ ] Screen reader testing
- [ ] Prefers-reduced-motion support
- [ ] Better form accessibility (future contact form)

---

## Common Patterns

### Animation Pattern
Most components use Framer Motion with variants:
```jsx
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

<motion.div variants={variants} initial="hidden" animate="visible">
  Content
</motion.div>
```

### Responsive Design Pattern
Chakra UI responsive syntax:
```jsx
<Box
  fontSize={{ base: "sm", md: "md", lg: "lg" }}
  padding={{ base: 4, md: 6, lg: 8 }}
>
  Content
</Box>
```

### State Management
- **Local state**: useState for component-specific state
- **Global state**: Zustand for cross-component state (banner)
- **Router state**: React Router for navigation state

---

## Future Features

### Planned
- Projects Section (filterable gallery)
- Contact Form
- Blog Section (MDX support)
- Interactive code playground
- 3D visualizations

### Under Consideration
- Achievement system
- Easter eggs
- Real-time collaboration demos
- WebGL experiences

---

## Troubleshooting

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues and solutions.

---

**Last Updated**: 2025-10-15
