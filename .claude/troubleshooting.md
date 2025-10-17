# Troubleshooting Guide

Common issues and solutions encountered in this project.

---

## JavaScript Date Parsing Issues

**Problem**: When parsing YYYY-MM-DD date strings with `new Date("2025-10-16")`, you may encounter:
- Inconsistent timezone behavior (UTC vs local time)
- Date shifting (showing previous day in some timezones)
- Component render errors that manifest as React context errors
- "ChakraProvider context undefined" errors (which are actually symptoms of date parsing failures)

**Root Cause**:
- `new Date("YYYY-MM-DD")` is interpreted as UTC midnight
- Browser implementations vary in how they handle date-only strings
- Failed date parsing can break React component rendering, causing cascading context errors

**Solution**: Always append `T00:00:00` to YYYY-MM-DD date strings for local timezone parsing:

```javascript
// ❌ BAD - Unreliable, timezone-dependent
const date = new Date("2025-10-16")

// ❌ BAD - Complex, error-prone
const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10))
const date = new Date(year, month - 1, day)

// ✅ GOOD - Reliable, local timezone
const date = new Date(dateString + 'T00:00:00')

// Then use safely with validation
if (isNaN(date.getTime())) {
  return 'Invalid Date'
}
```

**When This Applies**:
- Parsing dates from frontmatter (YAML)
- Parsing dates from markdown files
- Any YYYY-MM-DD format date string
- Displaying dates in UI components

**Related Files**:
- `frontend-project/src/components/MusingsPage.jsx` (formatDate function)

---

## Chakra UI v3 Component Issues

**Note**: Not all Chakra components are direct imports. Some require snippets or custom implementation.

**Known Working Components**:
- Badge (direct import from '@chakra-ui/react')
- Card.Root, Card.Body (compound component pattern)
- Box, Container, Heading, Text, VStack, HStack
- IconButton, Button, Link

**If you see "ChakraProvider context undefined"**:
1. First check if there's a JavaScript error earlier in the component (like date parsing)
2. Verify the component is properly imported
3. Check if you're in a route that's wrapped by ChakraProvider
4. Look for render errors that might be breaking the React tree

---

## Frontmatter YAML Parsing

**Problem**: YAML parsing errors like "incomplete explicit mapping pair"

**Root Cause**: Colons (`:`) in unquoted YAML values are interpreted as key-value separators

**Solution**: Always quote title, date, and excerpt fields in markdown frontmatter:

```yaml
# ❌ BAD - Colons cause parsing errors
---
title: Orchestrating Multiple AI Streams: The Art of Problem-Solving
date: 2025-10-16
excerpt: How I learned to juggle tasks with Claude
---

# ✅ GOOD - Quoted values
---
title: "Orchestrating Multiple AI Streams: The Art of Problem-Solving"
date: "2025-10-16"
excerpt: "How I learned to juggle tasks with Claude"
tags: [llm, workflow, productivity]
---
```

**Related Files**:
- `.claude/commands/new-musing.md` (template with instructions)
- All files in `frontend-project/src/musings/*.md`

---

*Last Updated: 2025-10-17*
