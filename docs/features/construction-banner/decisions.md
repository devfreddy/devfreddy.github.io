# Construction Banner - Design Decisions

## Why Footer vs Header? (2025-10-12)
**Decision: Move to footer position**

**Rationale:**
- Less intrusive to users (doesn't push content down)
- No need for dismiss functionality (not blocking navigation)
- Permanent visibility is acceptable in footer
- Simplified code by removing state management

**Trade-offs:**
- Less prominent (users might not notice immediately)
- Acceptable: Main purpose is branding, not critical information

## Why Remove Dismiss Functionality? (2025-10-12)
**Decision: Always show banner**

**Rationale:**
- Footer position is non-intrusive
- Simplified codebase (removed hook, localStorage, events)
- Permanent branding presence acceptable
- Reduced maintenance complexity

**Previous Architecture (Deprecated):**
~~localStorage-based state~~
~~Custom hook for cross-tab sync~~
~~Dynamic component spacing~~

## Previous Decisions (Historical)

### Why localStorage vs Cookies? (Original)
**Decision: Use localStorage** *(No longer applicable)*

### Why Custom Hook vs Inline State? (Original)
**Decision: Create useBannerState hook** *(No longer applicable)*

## Lessons Learned
- Footer positioning removes need for complex state management
- Simpler is better when feature requirements change
- Permanent footer banners can replace dismissible header banners for branding

## Future Improvements
- [ ] Add animation on scroll (subtle bounce/pulse)
- [ ] Make clickable to link to Claude Code
- [ ] Consider dark mode variant
