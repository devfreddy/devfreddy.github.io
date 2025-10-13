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

3. **Check Active Features**
   - Read `docs/features/index.md`
   - List features marked with 🟡 (in progress)
   - Note any features that need attention

4. **Review Current Sprint**
   - Read `docs/ROADMAP.md`
   - Check "Current Sprint" or "Next Up" sections
   - Identify high-priority items

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

## Active Features (🟡 In Progress)
- [Feature 1]: [Status]
- [Feature 2]: [Status]

## Current Sprint Priorities
1. [Top priority from ROADMAP]
2. [Second priority]
3. [Third priority]

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
