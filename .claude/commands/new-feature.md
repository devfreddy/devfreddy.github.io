---
description: Create documentation structure for a new feature
---

# New Feature Setup

Create complete documentation structure for a new feature.

## Instructions

Ask the user for the feature name if not already provided, then:

## 1. Create Feature Directory

Create directory: `docs/features/[feature-name]/`

## 2. Create README.md

Create `docs/features/[feature-name]/README.md` with:

```markdown
# Feature: [feature-name]

## Overview
[Brief description of what this feature does]

## Problem Statement
[What problem does this solve?]

## User Interface
[How users interact with this feature]

## Configuration
[Any configuration needed]

## Usage Examples
[Code examples or usage instructions]

## Related Features
- [List related features]

## Status
🟡 In Progress - Started YYYY-MM-DD
```

## 3. Create implementation.md

Create `docs/features/[feature-name]/implementation.md` with:

```markdown
# Implementation: [feature-name]

## Architecture

### Components
- **Component A**: Purpose and responsibility
- **Component B**: Purpose and responsibility

### Data Flow
[Describe how data flows through the feature]

## Key Files
| File | Purpose | Key Functions |
|------|---------|---------------|
| file1.js | Main logic | func1(), func2() |

## State Management
[How state is managed in this feature]

## Dependencies
- External packages used
- Internal modules required

## Performance Considerations
- Optimization strategies
- Caching approach
- Resource usage

## Security Considerations
- Input validation
- Access control
- Data sanitization
```

## 4. Create testing.md

Create `docs/features/[feature-name]/testing.md` with:

```markdown
# Testing: [feature-name]

## Test Coverage
- Current coverage: X%
- Target coverage: Y%

## Unit Tests
| Test Case | Purpose | Status |
|-----------|---------|--------|
| test1 | Validates X | ⚪ Pending |

## Integration Tests
[Description of integration test scenarios]

## Manual Testing Procedures
1. Step-by-step testing instructions
2. Expected results at each step

## Edge Cases
- Edge case 1: How it's handled
- Edge case 2: How it's handled

## Performance Tests
[Benchmark requirements and results]

## Known Issues
[List any known issues]
```

## 5. Create decisions.md

Create `docs/features/[feature-name]/decisions.md` with:

```markdown
# Design Decisions: [feature-name]

## Decision 1: [Title]
**Date**: YYYY-MM-DD
**Status**: Proposed

### Context
What was the situation requiring a decision?

### Options Considered
1. **Option A**: Description
   - Pros:
   - Cons:
2. **Option B**: Description
   - Pros:
   - Cons:

### Decision
[Which option was chosen and why]

### Consequences
- Positive outcomes
- Trade-offs accepted
- Future considerations
```

## 6. Update Feature Index

Add entry to `docs/features/index.md`:

```markdown
- 🟡 **[feature-name]**: [Brief description] ([docs](features/[feature-name]/))
```

## 7. Inform User

Tell the user:

```markdown
✅ Created feature documentation for: [feature-name]

**Files created:**
- [docs/features/[feature-name]/README.md](docs/features/[feature-name]/README.md)
- [docs/features/[feature-name]/implementation.md](docs/features/[feature-name]/implementation.md)
- [docs/features/[feature-name]/testing.md](docs/features/[feature-name]/testing.md)
- [docs/features/[feature-name]/decisions.md](docs/features/[feature-name]/decisions.md)

**Next steps:**
1. Fill in the feature documentation with details
2. Start implementing the feature
3. Update documentation as you build

Would you like me to help you fill in any of these files?
```

## Notes
- Use kebab-case for feature names (e.g., `user-authentication`, not `User Authentication`)
- Always update the feature index
- Create all 4 documentation files even if some will be brief initially
