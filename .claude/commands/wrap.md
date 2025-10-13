---
description: Wrap up the current session and generate documentation
---

# Session Wrap-Up Protocol

Execute the following session wrap-up procedure:

## 1. Review Session Work

Read the current session's wrap-up document at `docs/sessions/YYYY-MM-DD/wrap-up.md` where YYYY-MM-DD is today's date.

## 2. Update Wrap-Up Documentation

Update the wrap-up document with:

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
Break down into three categories:
- **Immediate (Next Session)**: High priority items to tackle next
- **Short Term**: Work to complete in the next few sessions
- **Long Term**: Future enhancements or refactoring

### Prerequisites for Next Session
- Any setup needed before the next session
- Dependencies to install
- External changes needed (like GitHub settings)

### Blockers
- List any blockers encountered
- Note if they were resolved or still pending

### Features for Future Work
- Ideas that came up but are out of scope for now
- Enhancement opportunities identified

### Task Order Recommendation
- Numbered list of recommended task order based on priority and dependencies

## 3. Commit Changes

After updating the wrap-up documentation:
- Stage the wrap-up document
- Commit with message: "Session wrap-up: YYYY-MM-DD"
- Push to remote

## 4. Session Summary

Provide the user with:
- A concise summary of what was accomplished
- Top 3 priorities for next session
- Any important notes or warnings

## Important Guidelines

- Be thorough but concise
- Focus on "what" and "why", not just "what"
- Include links to modified files using markdown format: [filename](path/to/file)
- Update existing sections, don't create duplicate entries
- Ensure next steps are actionable and specific
