#!/bin/bash
# scripts/startup.sh - Session initialization script

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}=== SDLC Session Startup ===${NC}"
echo "Date: $(date '+%Y-%m-%d %H:%M')"
echo ""

# 1. Check for project config
if [ -f ".claude/project-config.yaml" ]; then
    echo -e "${GREEN}✓${NC} Project config found"
    PROJECT_TYPE=$(grep "type:" .claude/project-config.yaml | cut -d: -f2 | xargs)
    echo "  Project type: $PROJECT_TYPE"
else
    echo -e "${YELLOW}!${NC} No project config found - using defaults"
    PROJECT_TYPE="generic"
fi

# 2. Generate context file for current session
CONTEXT_FILE=".claude/startup-context.md"
echo -e "${BLUE}Generating session context...${NC}"

cat > "$CONTEXT_FILE" << 'EOF'
# Session Context - Generated $(date '+%Y-%m-%d')

## Project Overview
EOF

# Add README summary if exists
if [ -f "README.md" ]; then
    echo "### From README.md" >> "$CONTEXT_FILE"
    head -n 50 README.md | grep -E "^#|^-|^\*" >> "$CONTEXT_FILE" 2>/dev/null
    echo "" >> "$CONTEXT_FILE"
fi

# Add recent session notes
echo "## Recent Sessions" >> "$CONTEXT_FILE"
LATEST_SESSION=$(ls -d docs/sessions/*/ 2>/dev/null | tail -1)
if [ -n "$LATEST_SESSION" ]; then
    echo "### Last Session: $(basename $LATEST_SESSION)" >> "$CONTEXT_FILE"
    if [ -f "$LATEST_SESSION/notes.md" ]; then
        grep -A 10 "Next Steps" "$LATEST_SESSION/notes.md" >> "$CONTEXT_FILE" 2>/dev/null
    fi
fi

# Add feature status
echo "## Active Features" >> "$CONTEXT_FILE"
if [ -f "docs/features/index.md" ]; then
    grep "🟡" docs/features/index.md >> "$CONTEXT_FILE" 2>/dev/null
fi

# Add current TODOs
echo "## Current TODOs" >> "$CONTEXT_FILE"
if [ -f "docs/ROADMAP.md" ]; then
    grep -A 5 "Current Sprint\|Next Up" docs/ROADMAP.md >> "$CONTEXT_FILE" 2>/dev/null
fi

echo -e "${GREEN}✓${NC} Context file generated at $CONTEXT_FILE"
echo ""
echo -e "${BLUE}Ready to start session!${NC}"
echo "Suggested first steps:"
echo "1. Review the generated context"
echo "2. Check for any incomplete work from last session"
echo "3. Select a feature or task to work on"
