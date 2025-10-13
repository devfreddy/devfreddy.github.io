# Data Flow Architecture

> Detailed documentation of data flow patterns in the DevFreddy Portfolio

**Last Updated**: 2025-10-12

---

## Overview

This document describes how data flows through the application, from user interactions to state updates to UI rendering.

---

## State Management Layers

### 1. Global State (Zustand)

**Location**: [frontend-project/src/store/useStore.js](../../frontend-project/src/store/useStore.js)

**Purpose**: Shared state across multiple components

**Current State**:
```javascript
{
  // Construction banner state
  isBannerVisible: boolean
}
```

**Flow**:
```
User Action → Component Event Handler → Zustand Action
                                              ↓
                                        State Update
                                              ↓
                                  All Subscribed Components Re-render
```

**Example**:
```javascript
// In any component
const { isBannerVisible, setIsBannerVisible } = useStore()

// Update state
const handleDismiss = () => {
  setIsBannerVisible(false)
}

// State automatically syncs to all subscribers
```

---

### 2. Local Component State (useState)

**Purpose**: State local to a single component

**Common Uses**:
- Form inputs (search queries, filters)
- UI state (modals open/closed, expanded/collapsed)
- Temporary data (hover states, loading states)

**Flow**:
```
User Input → setState → Component Re-renders
```

**Example**: Cocktails page search/filter
```javascript
const [searchQuery, setSearchQuery] = useState('')
const [selectedCategory, setSelectedCategory] = useState('All')

// User types → setState → filtered results update
```

---

### 3. Persistent State (localStorage)

**Purpose**: State that survives page reloads and is shared across tabs

**Current Uses**:
- Banner dismissal state
- Theme preference (Chakra UI)

**Flow**:
```
State Change → localStorage.setItem()
                    ↓
            localStorage Event
                    ↓
        Other Tabs Receive Event
                    ↓
          Update Their State
```

**Example**: Banner cross-tab sync
```javascript
// useBannerState.js
useEffect(() => {
  const handleStorageChange = (e) => {
    if (e.key === 'bannerDismissed' && e.newValue === 'true') {
      setIsBannerVisible(false)
    }
  }
  window.addEventListener('storage', handleStorageChange)
  return () => window.removeEventListener('storage', handleStorageChange)
}, [])
```

---

## Feature-Specific Data Flows

### Construction Banner

**Components Involved**:
- ConstructionBanner (UI)
- useStore (global state)
- useBannerState (localStorage sync)

**Flow Diagram**:
```
User Clicks Dismiss Button
         ↓
setIsBannerVisible(false)
         ↓
┌────────┴─────────┐
│                  │
▼                  ▼
Zustand Store      localStorage.setItem('bannerDismissed', 'true')
Updates                  ↓
│                  Storage Event Fires
│                        ↓
└──────────┬──── Other Open Tabs Detect Change
           │             ↓
           │      useBannerState Hook Updates
           │             ↓
           ▼       setIsBannerVisible(false)
Banner Hides in All Tabs
```

**Code Flow**:
```javascript
// 1. User clicks dismiss
<Button onClick={() => setIsBannerVisible(false)}>

// 2. useStore updates
set({ isBannerVisible: false })

// 3. useBannerState syncs to localStorage
useEffect(() => {
  if (!isBannerVisible) {
    localStorage.setItem('bannerDismissed', 'true')
  }
}, [isBannerVisible])

// 4. Other tabs receive storage event
window.addEventListener('storage', (e) => {
  if (e.key === 'bannerDismissed') {
    setIsBannerVisible(false)
  }
})
```

---

### Cocktails Page Search & Filter

**Components Involved**:
- CocktailsPageBasic
- cocktails.json (static data)

**Flow Diagram**:
```
Page Load
    ↓
Import cocktails.json
    ↓
Store in Component State (useState)
    ↓
User Types in Search
    ↓
setSearchQuery(value)
    ↓
useMemo Recalculates Filtered Results
    ↓
UI Re-renders with Filtered Data
```

**Code Flow**:
```javascript
// 1. Load data
import cocktailsData from '../data/cocktails.json'

// 2. Local state
const [searchQuery, setSearchQuery] = useState('')
const [selectedCategory, setSelectedCategory] = useState('All')

// 3. Filter logic (memoized for performance)
const filteredCocktails = useMemo(() => {
  return cocktails.filter(cocktail => {
    const matchesSearch = cocktail.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' ||
      cocktail.category === selectedCategory
    return matchesSearch && matchesCategory
  })
}, [cocktails, searchQuery, selectedCategory])

// 4. User input updates state
<Input
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>

// 5. Render filtered results
{filteredCocktails.map(cocktail => (
  <CocktailCard key={cocktail.id} {...cocktail} />
))}
```

---

### Theme (Dark Mode)

**Components Involved**:
- ColorModeProvider (Chakra UI)
- useColorMode hook
- localStorage (automatic via Chakra)

**Flow Diagram**:
```
User Clicks Theme Toggle
         ↓
toggleColorMode()
         ↓
Chakra Updates Theme
         ↓
┌────────┴────────┐
│                 │
▼                 ▼
CSS Variables     localStorage
Update            .setItem('chakra-ui-color-mode')
│                 │
▼                 │
Components        │
Re-render         │
with New Theme    │
                  │
         On Next Page Load
                  ↓
         Read from localStorage
                  ↓
         Restore Theme
```

**Code Flow**:
```javascript
// 1. Chakra provides the hook
const { colorMode, toggleColorMode } = useColorMode()

// 2. User clicks toggle
<Button onClick={toggleColorMode}>
  {colorMode === 'light' ? '🌙' : '☀️'}
</Button>

// 3. Chakra handles:
// - Updating CSS variables
// - Saving to localStorage
// - Re-rendering components
// - System preference detection
```

---

### Particle Background Animation

**Components Involved**:
- ParticleBackground (D3.js canvas)

**Flow Diagram**:
```
Component Mounts
      ↓
Create Canvas Element
      ↓
Initialize D3 Simulation
      ↓
┌─────┴──────┐
│            │
▼            ▼
Generate     Set up
Particles    Animation Loop
│            (requestAnimationFrame)
│            │
└─────┬──────┘
      ↓
Render Loop:
  - Update positions
  - Clear canvas
  - Draw particles
  - Draw connections
      ↓
Component Unmounts
      ↓
Cancel Animation
Clean up Canvas
```

**Code Flow**:
```javascript
useEffect(() => {
  // 1. Setup
  const canvas = canvasRef.current
  const ctx = canvas.getContext('2d')

  // 2. Create particles
  const particles = Array.from({ length: particleCount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.random() - 0.5,
    vy: Math.random() - 0.5
  }))

  // 3. Animation loop
  const animate = () => {
    // Update positions
    particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      // Bounce off edges
      if (p.x < 0 || p.x > width) p.vx *= -1
      if (p.y < 0 || p.y > height) p.vy *= -1
    })

    // Render
    ctx.clearRect(0, 0, width, height)
    particles.forEach(p => {
      ctx.fillStyle = 'rgba(100, 200, 255, 0.5)'
      ctx.fillRect(p.x, p.y, 2, 2)
    })

    animationId = requestAnimationFrame(animate)
  }
  animate()

  // 4. Cleanup
  return () => cancelAnimationFrame(animationId)
}, [])
```

---

## Routing Data Flow

### Navigation Flow

```
User Clicks Link/Button
         ↓
<Link to="/path"> or navigate('/path')
         ↓
React Router Updates URL
         ↓
Router Matches Path to Route
         ↓
Previous Component Unmounts
         ↓
New Component Mounts
         ↓
New Component Fetches/Loads Data (if needed)
         ↓
Render Complete
```

**GitHub Pages Special Case**:
```
User Navigates to /cocktails Directly
         ↓
GitHub Pages: "No file at /cocktails"
         ↓
Serves 404.html (copy of index.html)
         ↓
React App Loads
         ↓
React Router Reads URL (/cocktails)
         ↓
Matches and Renders CocktailsPage
```

---

## Performance Optimizations

### Memoization

**Purpose**: Avoid expensive recalculations on every render

**Example**: Cocktails filtering
```javascript
// ❌ Without memoization - recalculates on every render
const filteredCocktails = cocktails.filter(...)

// ✅ With memoization - only recalculates when dependencies change
const filteredCocktails = useMemo(
  () => cocktails.filter(...),
  [cocktails, searchQuery, selectedCategory]
)
```

### Conditional Rendering

**Purpose**: Don't render what's not visible

**Example**: Banner visibility
```javascript
// Only render if visible
{isBannerVisible && <ConstructionBanner />}
```

---

## Event Flow Patterns

### User Interactions

**Click Events**:
```
User Click → onClick Handler → State Update → Re-render
```

**Input Events**:
```
User Types → onChange Handler → setState → Re-render
```

**Scroll Events** (Future):
```
User Scrolls → Throttled Handler → Update Scroll State → Conditional Rendering
```

---

## Data Source Patterns

### Static JSON Data

**Pattern**: Import and use directly
```javascript
import data from './data/file.json'
// Data is bundled at build time
```

**Use Cases**:
- Cocktails list
- (Future) Projects data
- (Future) Experience data

### Future: API Data

**Pattern**: Fetch on mount or on demand
```javascript
useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(setData)
}, [])
```

**Use Cases** (planned):
- Contact form submission
- Blog posts (if CMS added)
- Analytics data

---

## State Synchronization

### Cross-Tab Communication

**Mechanism**: localStorage + storage event

**Pattern**:
```javascript
// Tab 1: Update state
localStorage.setItem('key', 'value')

// Tab 2: Detect change
window.addEventListener('storage', (e) => {
  if (e.key === 'key') {
    updateLocalState(e.newValue)
  }
})
```

**Note**: storage event only fires in OTHER tabs, not the tab that made the change

---

## Error Handling Flow

### Error Boundary

**Flow**:
```
Component Throws Error
         ↓
React Catches Error
         ↓
Error Boundary componentDidCatch()
         ↓
Update Error State
         ↓
Render Fallback UI
         ↓
Log Error (console/tracking service)
```

**Code**:
```javascript
// ErrorBoundary.jsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo)
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />
    }
    return this.props.children
  }
}
```

---

## Future Data Flow Enhancements

### Planned Additions

1. **Form Submissions**
   ```
   User Submits → Validate → API Call → Response → Update UI
   ```

2. **Favorites/Bookmarks**
   ```
   Click Favorite → Update State → Save to localStorage → Sync Across Tabs
   ```

3. **Analytics Events**
   ```
   User Action → Track Event → Send to Analytics → (No UI update)
   ```

4. **Lazy Loading**
   ```
   Component Enters Viewport → Load Data/Image → Display
   ```

---

## Debugging Data Flow

### Tools

1. **React DevTools**
   - Inspect component state
   - Track prop changes
   - Profile re-renders

2. **Zustand DevTools**
   - Track state changes
   - Time-travel debugging

3. **Console Logging**
   ```javascript
   useEffect(() => {
     console.log('State changed:', state)
   }, [state])
   ```

4. **localStorage Inspector**
   - Chrome DevTools → Application → Local Storage

---

## Related Documentation

- [Architecture Overview](overview.md)
- [Dependencies](dependencies.md)
- [Feature Catalog](../features/index.md)

---

*Update this document when adding new data flows or state management patterns.*
