---
title: Markdown is the JSON of LLMs
date: 2025-10-16
excerpt: Just like JSON became the universal data interchange format for APIs, Markdown has emerged as the lingua franca for human-AI communication.
tags: [llm, ai, markdown, developer-tools]
---

# Markdown is the JSON of LLMs

If you've worked with LLMs lately, you've probably noticed something interesting: they love Markdown. And I mean *really* love it. Ask any modern LLM to format a response, and chances are it'll give you Markdown. But why?

## The JSON Parallel

Remember when JSON took over as the data interchange format? Before JSON, we had XML with its verbose tags and strict schemas. JSON succeeded because it was:

- **Simple**: Human-readable and easy to parse
- **Flexible**: Works for simple and complex data structures
- **Universal**: Language-agnostic and widely supported
- **Minimal**: Less ceremony, more signal

Markdown is doing the same thing for human-AI communication.

## Why LLMs Love Markdown

There are some technical and practical reasons why Markdown has become the default format:

**1. Token Efficiency**

LLMs are constrained by token limits. Markdown's lightweight syntax means you can convey structure and formatting without burning through your token budget. Compare:

```html
<h2>Section Title</h2>
<p>Some text with <strong>bold</strong> and <em>italic</em>.</p>
```

vs.

```markdown
## Section Title
Some text with **bold** and *italic*.
```

Same information, fewer tokens.

**2. Training Data**

LLMs are trained on massive amounts of text from the internet, including:
- GitHub repositories (mostly Markdown READMEs)
- Stack Overflow (Markdown-based)
- Documentation sites (often written in Markdown)
- Technical blogs (frequently Markdown-sourced)

Markdown isn't just familiar to LLMs—it's part of their core vocabulary.

**3. Structural Clarity**

Markdown provides just enough structure without overspecifying. Headers create hierarchy, lists organize information, code blocks separate code from prose. It gives LLMs a clear way to organize thoughts while remaining readable.

## The Developer Experience Win

Here's where it gets really interesting: Markdown creates a seamless interface between human, machine, and rendered output.

- Write a prompt in Markdown
- Get a response in Markdown
- Render it immediately or pipe it to another tool
- Store it as plain text (git-friendly!)
- Process it programmatically when needed

It's beautifully composable. You can chain LLM interactions, version control conversations, and build entire workflows around Markdown files.

## The Future Is Markdown-First

I think we're just scratching the surface. As AI tools get more sophisticated, Markdown will become even more central:

- **Agentic workflows**: Agents passing structured info via Markdown
- **Documentation generation**: AI writing docs in the same format humans read
- **Knowledge bases**: Markdown files as the storage layer for AI memory
- **Hybrid interfaces**: Apps where humans and AI collaborate in Markdown

## The Lesson

The best interchange formats aren't the most powerful—they're the ones that reduce friction. JSON didn't win because it could do things XML couldn't. It won because it made the common case trivial.

Markdown is doing the same thing for AI communication. It's not the most expressive format, but it's *good enough* for most use cases, and it's simple enough that both humans and LLMs can work with it naturally.

Sometimes the best tool is the one that gets out of the way.
