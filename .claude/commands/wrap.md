---
description: Wrap up the current session and generate documentation
---

# Session Wrap-Up Protocol

Execute the following streamlined session wrap-up procedure:

## 1. Update Session Documentation

Read and update the wrap-up document at `docs/sessions/YYYY-MM-DD/wrap-up.md` (today's date) with:

### Summary Section
- Brief overview of what was accomplished this session
- Key decisions made
- Any blockers encountered

### What Was Accomplished
- Detailed bullet points of completed work
- Features implemented or modified
- Documentation updates
- Infrastructure changes

### Next Steps
- **Immediate (Next Session)**: High priority items
- **Short Term**: Work for next few sessions
- **Long Term**: Future enhancements

### Other Sections (if applicable)
- **Prerequisites for Next Session**: Setup needed
- **Blockers**: Issues encountered and their status
- **Technical Debt**: Items to address later

## 2. Update Project Documentation (Only if Changed)

**Update only if relevant to this session's work:**

### docs/README.md
- Update "Current Priorities" if priorities changed
- Mark features as completed if finished
- Add new priorities discovered during work

### docs/FEATURES.md
- Add new features if created
- Update existing feature status or documentation
- Document significant changes to features

### docs/COMMANDS.md
- Add any new useful commands discovered/created
- Update commands that changed (e.g., deployment scripts)
- Remove obsolete commands

### docs/TROUBLESHOOTING.md
- Document any issues encountered and their solutions
- Add workarounds discovered
- Update existing entries if better solutions found

## 3. Review Git Status

Check what files were modified:
```bash
git status
git diff --stat
```

Identify any uncommitted changes that should be committed before wrap-up.

## 4. Commit Session Documentation

Stage and commit all documentation updates:
```bash
git add docs/
git commit -m "Session wrap-up: YYYY-MM-DD

Updated session documentation and project docs

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
git push origin main
```

## 5. Generate Session Summary

Provide the user with a concise summary:

### Format:
```markdown
# Session Complete - YYYY-MM-DD

## Delivered
- [User-visible change 1]
- [User-visible change 2]

## Technical Changes
- [Internal improvement 1]
- [Internal improvement 2]

## Documentation Updated
- [Doc 1]
- [Doc 2]

## Top 3 Priorities for Next Session
1. [Highest priority]
2. [Second priority]
3. [Third priority]

## Notes
- [Any important notes or warnings]
```

## Important Guidelines

- **Be selective**: Only update files that actually changed
- **Be concise**: Focus on "what" and "why", not just implementation details
- **Use links**: Include links to modified files using markdown format: [filename](path/to/file)
- **Update existing sections**: Don't create duplicate entries
- **Actionable next steps**: Ensure next steps are specific and implementable
- **Focus on session notes**: The session wrap-up is the primary artifact
- **Minimal overhead**: Don't update docs just for the sake of updating

## What Changed in This Version

**Simplified from previous version:**
- ❌ Removed: docs/ROADMAP.md (merged into docs/README.md)
- ❌ Removed: docs/TODO.md (merged into docs/README.md)
- ❌ Removed: docs/features/index.md (merged into docs/FEATURES.md)
- ❌ Removed: docs/features/{feature}/ folders (consolidated into docs/FEATURES.md)
- ✅ New: docs/README.md (single source of truth for priorities)
- ✅ New: docs/FEATURES.md (all feature docs in one place)
- 🎯 Focus: Only update session notes + changed docs

**Result**: Fewer files to maintain, faster wrap-ups, clearer documentation.
