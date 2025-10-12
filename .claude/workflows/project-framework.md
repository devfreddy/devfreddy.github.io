# Project Framework Workflow

## Overview
This workflow defines the documentation and development practices for this portfolio project, based on a master project framework that emphasizes feature-driven development, comprehensive documentation, and session tracking.

## Working Style

### Autonomy Level
- Be persistent and autonomous - keep going until the task is completely resolved
- Only stop when you're certain the problem is solved or need critical input
- Don't ask for confirmation on reasonable assumptions - document them and proceed
- Research uncertainties rather than stopping - deduce the most reasonable approach

### Communication Style
- Begin each major task by rephrasing my goal clearly and concisely
- Outline your approach with a structured plan before diving in
- Provide progress updates as you work through complex tasks
- Summarize completed work at natural breakpoints
- Use markdown formatting with clear headers and bullet points

### Verbosity Preferences
- Status updates: Brief and focused
- Code/technical work: Detailed with clear comments
- Documentation: Comprehensive but scannable
- Explanations: Step-by-step reasoning for complex decisions

## Documentation Structure

This project follows a feature-driven documentation pattern:

```
project-root/
├── README.md                 # Project overview, setup, key features
├── docs/
│   ├── features/            # Feature-by-feature documentation
│   │   ├── index.md         # Feature catalog with status
│   │   └── [feature-name]/
│   │       ├── README.md    # Feature overview and usage
│   │       ├── implementation.md  # Technical details
│   │       ├── testing.md   # Test cases and validation
│   │       └── decisions.md # Design decisions and trade-offs
│   ├── sessions/            # Session-by-session progress tracking
│   │   └── YYYY-MM-DD/
│   │       ├── notes.md     # What was accomplished, findings, blockers
│   │       └── wrap-up.md   # Summary and next steps
│   ├── COMMANDS.md          # Useful commands and patterns discovered
│   ├── SETUP_LOG.md         # Installation and configuration history
│   └── TODO.md              # Task tracking with phases/milestones
├── scripts/                 # Any automation or helper scripts
└── .claude/                 # Claude-specific workflows and config
```

## Feature Documentation Pattern

For each discrete feature or component:

**Create/Update `docs/features/[feature-name]/` with:**

1. **README.md** - Feature overview
   - What problem does this solve?
   - How does a user interact with it?
   - Quick start examples
   - Configuration options
   - Common use cases

2. **implementation.md** - Technical details
   - Architecture and design patterns
   - Key files and functions
   - Data flow and state management
   - Dependencies and integrations
   - Performance considerations

3. **testing.md** - Validation approach
   - Test cases and coverage
   - Manual testing procedures
   - Edge cases and error handling
   - Performance benchmarks
   - Known limitations

4. **decisions.md** - Design rationale
   - Why this approach vs alternatives?
   - Trade-offs made
   - Future improvements considered
   - Lessons learned
   - Related features or impacts

**Update `docs/features/index.md`** with:
- Feature name and one-line description
- Status: 🟢 Complete | 🟡 In Progress | 🔴 Planned | ⚪ Deprecated
- Links to feature folder
- Dependencies on other features
- Session dates when worked on

## Session Documentation Pattern

For each work session, track in `docs/sessions/YYYY-MM-DD/notes.md`:
- **Accomplishments:** What was completed with ✅ markers
- **Key Findings:** Important discoveries or insights
- **Configuration Changes:** Any setup or settings modified
- **Known Issues:** Problems discovered but not yet resolved
- **Next Steps:** Specific, actionable items for continuation
- **Files Modified:** List of what changed and why
- **Features Touched:** Link to relevant feature documentation

## Working Principles

### Planning & Execution
1. **Decompose First:** Break complex tasks into explicit requirements, unclear areas, and hidden assumptions
2. **Map the Scope:** Identify all relevant files, functions, and dependencies before starting
3. **Research Thoroughly:** Use tools to understand the codebase/content - don't guess
4. **Define Success:** Specify exact deliverables and success criteria upfront
5. **Verify Continuously:** Test and validate work as you progress
6. **Document Features:** Each significant capability gets its own feature documentation

### Feature-Driven Development
When building or modifying functionality:
1. **Check feature index** first - does this feature already exist?
2. **Create feature folder** if new, with all four documentation files
3. **Document while building** - not after
4. **Link features** that depend on or relate to each other
5. **Track feature status** accurately (🟢🟡🔴⚪)

### Code/Content Creation Guidelines
- **Quality over Speed:** Fix root causes, not symptoms
- **Consistency:** Match existing style and patterns in the project
- **Minimal Changes:** Make focused updates that solve the specific problem
- **Documentation:** Update relevant docs as you modify functionality
- **Clean Up:** Remove debug code, temp files, and unnecessary comments before finishing
- **Feature Isolation:** Keep feature changes discrete and well-bounded

### Tool Usage Patterns
- **Search/Research:** Gather context broadly first, then narrow focus
- **File Operations:** Use batch operations where possible for efficiency
- **Version Control:** Create descriptive commits that explain what and why
- **Testing:** Verify changes work before declaring completion

## Session Wrap-Up Protocol

When I say "wrap this session up", follow this workflow:

1. **Review Accomplishments**
   - List what was completed (with ✅ markers)
   - Note incomplete work and blockers
   - Identify key learnings or insights
   - List which features were worked on

2. **Update Feature Documentation**
   - For each feature touched this session:
     - Create new feature folder if needed
     - Update implementation.md with changes made
     - Add test cases to testing.md
     - Document design decisions in decisions.md
     - Update feature README.md with new capabilities
   - Update `docs/features/index.md` catalog

3. **Update Session Documentation**
   - Create session notes in `docs/sessions/YYYY-MM-DD/notes.md`
   - Link to relevant feature documentation
   - Update TODO.md with completed/new items
   - Add useful commands to COMMANDS.md
   - Update main README.md if project capabilities changed

4. **Create Next Steps**
   - Specific, actionable items for next session
   - Which features need more work
   - Prerequisites or preparations needed
   - Order of tasks to tackle
   - Any blockers or dependencies

5. **Commit Changes**
   ```
   git add .
   git commit -m "Session YYYY-MM-DD: [Brief summary]

   Features:
   - [Feature 1]: [What changed]
   - [Feature 2]: [What changed]

   Documentation:
   - Updated feature docs for [features touched]
   - Session notes added

   Next: [Primary next step]

   Created with Claude Code"
   ```

6. **Provide Summary**
   - Features worked on (with links to docs)
   - What was accomplished (high-level bullets)
   - Documentation updates made
   - Next session starting points
   - Any user actions required

## Project-Specific Context

**Project:** DevFreddy Portfolio
**Type:** Personal portfolio website
**Tech Stack:** React 19, Vite 7, Chakra UI 3, Framer Motion, D3.js
**Deployment:** GitHub Pages
**Build Script:** `./build-and-deploy.sh`

### Key Directories
- `frontend-project/` - React application source
- `docs/` - All documentation
- `.claude/` - Claude Code workflows

### Current Features
See [docs/features/index.md](../../docs/features/index.md) for complete catalog.

### Development Workflow
```bash
cd frontend-project
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Deployment
```bash
./build-and-deploy.sh  # Build and deploy to GitHub Pages
```

## Using This Workflow

To activate this workflow in a session, simply reference it:
- "Follow the project framework workflow"
- "Use the session wrap-up protocol"
- "Document this feature following our framework"

### Session Wrap-Up Triggers

**IMPORTANT:** When you hear ANY of these phrases, IMMEDIATELY activate the Session Wrap-Up Protocol (see section above):
- "wrap this session up"
- "let's wrap up"
- "wrap up this session"
- "let's wrap this up"
- "wrap it up"
- "use the wrap-up protocol"
- "finish this session"

The protocol is a 6-step process that MUST be completed in order:
1. ✅ Review Accomplishments
2. ✅ Update Feature Documentation
3. ✅ Update Session Documentation
4. ✅ Create Next Steps
5. ✅ Commit Changes (with proper format)
6. ✅ Provide Summary

Do NOT skip steps or provide a casual summary - follow the complete protocol.

The workflow will guide documentation practices, session management, and commit conventions throughout development.
