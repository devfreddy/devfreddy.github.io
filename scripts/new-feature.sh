#!/bin/bash
# scripts/new-feature.sh - Create feature documentation structure

FEATURE_NAME=$1
if [ -z "$FEATURE_NAME" ]; then
    echo "Usage: ./scripts/new-feature.sh <feature-name>"
    exit 1
fi

FEATURE_DIR="docs/features/$FEATURE_NAME"
mkdir -p "$FEATURE_DIR"

# Create README.md
cat > "$FEATURE_DIR/README.md" << EOF
# Feature: $FEATURE_NAME

## Overview
[Brief description of what this feature does]

## Problem Statement
[What problem does this solve?]

## User Interface
[How users interact with this feature]

## Configuration
\`\`\`yaml
# Example configuration
\`\`\`

## Usage Examples
\`\`\`bash
# Example usage
\`\`\`

## Related Features
- [List related features]

## Status
🟡 In Progress - Started $(date '+%Y-%m-%d')
EOF

# Create implementation.md
cat > "$FEATURE_DIR/implementation.md" << EOF
# Implementation: $FEATURE_NAME

## Architecture

### Components
- **Component A**: Purpose and responsibility
- **Component B**: Purpose and responsibility

### Data Flow
\`\`\`mermaid
graph LR
    A[Input] --> B[Process]
    B --> C[Output]
\`\`\`

## Key Files
| File | Purpose | Key Functions |
|------|---------|---------------|
| file1.js | Main logic | func1(), func2() |

## State Management
How state is managed in this feature.

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
EOF

# Create testing.md
cat > "$FEATURE_DIR/testing.md" << EOF
# Testing: $FEATURE_NAME

## Test Coverage
- Current coverage: X%
- Target coverage: Y%

## Unit Tests
| Test Case | Purpose | Status |
|-----------|---------|--------|
| test1 | Validates X | ✅ Pass |

## Integration Tests
Description of integration test scenarios.

## Manual Testing Procedures
1. Step-by-step testing instructions
2. Expected results at each step

## Edge Cases
- Edge case 1: How it's handled
- Edge case 2: How it's handled

## Performance Tests
- Benchmark results
- Load testing outcomes

## Known Issues
- Issue 1: Description and workaround
- Issue 2: Description and status
EOF

# Create decisions.md
cat > "$FEATURE_DIR/decisions.md" << EOF
# Design Decisions: $FEATURE_NAME

## Decision 1: [Title]
**Date**: $(date '+%Y-%m-%d')
**Status**: Accepted/Rejected/Superseded

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
Which option was chosen and why.

### Consequences
- Positive outcomes
- Trade-offs accepted
- Future considerations
EOF

echo "✓ Created feature documentation at $FEATURE_DIR"
echo ""
echo "Files created:"
echo "  - README.md"
echo "  - implementation.md"
echo "  - testing.md"
echo "  - decisions.md"
echo ""
echo "Next steps:"
echo "1. Fill in the feature documentation"
echo "2. Update docs/features/index.md with this feature"
echo "3. Start implementing the feature"
