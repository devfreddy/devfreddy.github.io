# Construction Banner - Implementation

## Architecture

### State Management Pattern
- **Custom Hook** (`useBannerState`): Encapsulates localStorage logic
- **Event Listeners**: Storage API for cross-tab, custom events for same-tab
- **Shared State**: Multiple components consume `showBanner` state

### Cross-Tab Synchronization
```javascript
// Storage event (different tabs)
window.addEventListener('storage', handleStorageChange)

// Custom event (same tab)
window.addEventListener('bannerDismissed', handleStorageChange)
window.dispatchEvent(new Event('bannerDismissed'))
```

## Key Files
- `frontend-project/src/components/ConstructionBanner.jsx`: UI component
- `frontend-project/src/hooks/useBannerState.js`: State management hook

## Data Flow
```
User clicks "hide"
  ↓
localStorage.setItem('constructionBannerDismissed', 'true')
  ↓
Custom event dispatched
  ↓
useBannerState hook updates
  ↓
All components using showBanner re-render
  ↓
Banner hidden, navbar/hero adjust spacing
```

## Performance
- Minimal overhead (single localStorage read on mount)
- Event listeners cleaned up properly
- No polling or interval-based checks
