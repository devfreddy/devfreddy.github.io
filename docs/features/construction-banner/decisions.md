# Construction Banner - Design Decisions

## Why localStorage vs Cookies?
**Decision: Use localStorage**

**Rationale:**
- Simpler API for boolean state
- No server interaction needed
- Storage event API for cross-tab sync
- No expiration management required

## Why Custom Hook vs Inline State?
**Decision: Create useBannerState hook**

**Rationale:**
- Reusable across components
- Encapsulates localStorage logic
- Easier to test and maintain
- Cleaner component code

## Trade-offs
- **Persistence**: Banner state lost if localStorage cleared (acceptable)
- **Complexity**: Added event listeners for sync (necessary for good UX)

## Future Improvements
- [ ] Add "show again" option
- [ ] Track dismiss timestamp (show again after X days)
- [ ] A/B test different messaging
