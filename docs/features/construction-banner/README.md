# Construction Banner Feature

## Overview
A dismissible status banner that indicates the site is under active development, with state persisted across browser sessions and tabs.

## What Problem Does This Solve?
- Sets visitor expectations about site status
- Showcases localStorage usage and cross-tab synchronization
- Demonstrates attention to user experience (dismissible, persistent)
- Provides branding opportunity ("Built with Claude Code")

## User Interaction
- Banner appears at top of page on first visit
- Click "hide" to dismiss banner
- Dismissal persists across page reloads and tabs
- Navbar and hero section adjust spacing dynamically

## Technical Highlights
- **localStorage persistence**: State survives page reloads
- **Cross-tab sync**: Dismissing in one tab updates all tabs
- **Custom events**: `window.dispatchEvent()` for same-tab updates
- **Responsive layout**: Adjusts other components when visible/hidden

## File Location
`frontend-project/src/components/ConstructionBanner.jsx`
`frontend-project/src/hooks/useBannerState.js`
