---
description: Start a new session with context from recent work
---

# Session Startup

Initialize a new work session by loading relevant context from the project.

## Tasks to Complete

1. **Check Project Configuration**
   - Read `.claude/project-config.yaml`
   - Note the project type and preferences

2. **Review Recent Session**
   - Find the most recent session in `docs/sessions/`
   - Read the wrap-up document from that session
   - Pay attention to "Next Steps" section
   - Identify any unfinished work

3. **Check Current Priorities**
   - Read `docs/README.md`
   - Check "Current Priorities" section
   - Note "This Week" and "Next Sprint" priorities
   - Identify high-priority items

4. **Check Feature Status (if needed)**
   - Read `docs/FEATURES.md` if working on specific features
   - Note any features that need attention

5. **Check for Blockers**
   - Look for any blockers noted in recent session docs
   - Check `docs/TROUBLESHOOTING.md` for known issues

6. **Present Context to User**

Provide a summary in this format:

```markdown
# Session Started - YYYY-MM-DD

## Last Session Summary
[Brief summary of what was done last time]

## Unfinished Work
- [Item 1]
- [Item 2]

## Current Priorities (from docs/README.md)
### This Week
1. [Top priority]
2. [Second priority]
3. [Third priority]

### Next Sprint
- [Future priority 1]
- [Future priority 2]

## Suggested Starting Point
[Based on the context, suggest what to work on next]

## Ready to Start!
What would you like to work on today?
```

## Notes
- Be concise but thorough
- Highlight the most important/urgent items
- If there are blockers, mention them prominently
- Make it easy for the user to decide what to work on
