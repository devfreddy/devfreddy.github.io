---
description: Wrap up the current session and generate documentation
---

# Session Wrap-Up Protocol

Execute the following 6-step session wrap-up procedure based on the unified SDLC workflow:

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

### Other Sections
- **Prerequisites for Next Session**: Setup needed
- **Blockers**: Issues encountered and their status
- **Features for Future Work**: Out-of-scope ideas
- **Task Order Recommendation**: Prioritized task list

## 2. Update Project Documentation

Check and update these files if relevant to this session's work:

### docs/COMMANDS.md
- Add any new useful commands discovered/created
- Update commands that changed (e.g., deployment scripts)
- Remove obsolete commands

### docs/TROUBLESHOOTING.md
- Document any issues encountered and their solutions
- Add workarounds discovered
- Update existing entries if better solutions found

### docs/ROADMAP.md
- Update progress on current sprint items
- Mark completed features
- Add new items discovered during work

### docs/features/index.md
- Update feature status (🟡 in progress, 🟢 complete, ⚪ planned)
- Add new features if created
- Update dependencies between features

## 3. Update Feature Documentation

If you worked on specific features, update their documentation:

### docs/features/[feature-name]/
- **README.md**: Update if feature behavior changed
- **implementation.md**: Document technical changes
- **testing.md**: Add test cases or validation steps
- **decisions.md**: Document key design decisions made

## 4. Review Git Status

Check what files were modified:
```bash
git status
git diff --stat
```

Identify any uncommitted changes that should be committed before wrap-up.

## 5. Commit Session Documentation

Stage and commit all documentation updates:
```bash
git add docs/
git commit -m "Session wrap-up: YYYY-MM-DD

Updated session documentation and project docs

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
git push origin main
```

## 6. Generate Session Summary

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

- Be thorough but concise
- Focus on "what" and "why", not just "what"
- Include links to modified files using markdown format: [filename](path/to/file)
- Update existing sections, don't create duplicate entries
- Ensure next steps are actionable and specific
- Always update COMMANDS.md if commands changed
- Document solutions in TROUBLESHOOTING.md for future reference
