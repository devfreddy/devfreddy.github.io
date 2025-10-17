---
description: Create a new blog post for the Musings section
---

# New Musing

Create a new blog post for the Musings section.

## Instructions

Ask the user for the following information if not already provided:
1. **Title**: The title of the blog post
2. **Slug**: URL-friendly version (default: lowercase title with hyphens)
3. **Excerpt**: A brief description (1-2 sentences)
4. **Tags**: Comma-separated list of tags (optional)
5. **Initial content**: Any initial content or notes they want to start with (optional)

## Steps

### 1. Gather Information

If the user hasn't provided all the required information, ask them:
- What's the title of your post?
- What would you like the URL slug to be? (or suggest: lowercase-with-hyphens)
- Write a brief excerpt (1-2 sentences) for the post listing
- Any tags to categorize this post? (comma-separated)
- Would you like to start with any initial content, or just the template?

### 2. Create the Blog Post File

Create a new file at: `frontend-project/src/musings/{slug}.md`

Use this template:

**IMPORTANT**: Always quote the title, date, and excerpt fields in the frontmatter to avoid YAML parsing errors, especially when titles contain colons or special characters.

```markdown
---
title: "[Title]"
date: "[Today's date in YYYY-MM-DD format]"
excerpt: "[Excerpt]"
tags: [tag1, tag2, tag3]
---

# [Title]

[Initial content or blank space for writing]

## Key Points

-

## Thoughts

## Takeaways

---

*This is a work in progress. I'll update this as my thinking evolves.*
```

### 3. Confirm Creation

Tell the user:

```markdown
✅ Created new musing: [Title]

**File created:**
- [frontend-project/src/musings/{slug}.md](frontend-project/src/musings/{slug}.md)

**Details:**
- **Slug**: {slug}
- **Date**: {date}
- **Tags**: {tags or "none"}
- **URL**: `/musings/{slug}`

The post is now live on your site! You can:
1. Edit the markdown file to add your content
2. View it at `/musings/{slug}` when running the dev server
3. It will automatically appear in the musings list

Ready to start writing?
```

## Guidelines

- Use kebab-case for the slug (e.g., "my-first-post")
- Use today's date in YYYY-MM-DD format
- Keep tags lowercase and simple (e.g., "javascript", "architecture", "team-dynamics")
- The template includes sections for structure, but the user can modify freely
- The post will automatically appear in the musings list once created
- Markdown supports:
  - Headers (# ## ###)
  - Lists (- or 1.)
  - Code blocks (\`\`\`)
  - Links [text](url)
  - Bold **text**
  - Italic *text*
  - Blockquotes (>)

## Example

```markdown
---
title: "On Debugging Complex Systems"
date: "2025-10-15"
excerpt: "Lessons learned from tracking down a production issue that took three days to diagnose"
tags: [debugging, observability, production]
---

# On Debugging Complex Systems

Last week, we had a production issue that stumped our entire team for three days. Here's what I learned about debugging distributed systems.

## The Problem

It started with a vague report: "The dashboard feels slow sometimes." No error messages, no clear pattern, just... slow.

## Key Points

- Intermittent issues are the hardest to debug
- Good logging is worth its weight in gold
- Sometimes you need to step back and question your assumptions

## The Investigation

[Details about the debugging process...]

## Takeaways

- Always instrument your code with meaningful metrics
- Document your hypotheses as you go
- Take breaks—fresh eyes catch what tired ones miss

---

*This is a work in progress. I'll update this as my thinking evolves.*
```

## Notes

- The file is automatically picked up by the musings page
- No need to restart the dev server
- The post appears in the list sorted by date (newest first)
- Tags are displayed as badges on both the list and detail views
- Markdown rendering includes syntax highlighting and GitHub-flavored markdown support
