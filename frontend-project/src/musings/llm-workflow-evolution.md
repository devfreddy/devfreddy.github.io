---
title: The Evolution of LLM Workflows
date: 2025-10-12
excerpt: Watching Claude and OpenAI compete is like watching the early browser wars—except this time, they're figuring out how humans and AI should actually work together.
tags: [llm, ai, product, workflows, tools]
---

# The Evolution of LLM Workflows

There's something fascinating happening in the LLM space right now. If you watch how Anthropic and OpenAI are evolving their products, you're not just seeing feature competition—you're watching two companies discover in real-time how humans and AI should collaborate.

And they're arriving at surprisingly different answers.

## The Original Model: Chat-Only

Remember when ChatGPT first launched? It was revolutionary, but limited. You had a conversation, and that was it. No memory between sessions, no ability to take actions, no persistent context.

It was powerful for Q&A, brainstorming, and text generation. But for actual *workflows*—the kind where AI helps you accomplish multi-step tasks—it fell short.

Both companies realized this. But they took different paths to solve it.

## OpenAI's Approach: Plugins and GPTs

OpenAI's first move was **Plugins** (March 2023). The idea was simple: let the LLM reach out to external services. Browse the web, query databases, interact with APIs.

Then came **GPTs** (November 2023)—customizable versions of ChatGPT with:
- Custom instructions and personality
- Uploaded knowledge files
- Access to specific plugins/actions
- Shareable with others

The vision was clear: a marketplace of specialized AI assistants, each configured for specific tasks. Need a travel planner? There's a GPT. Need a coding tutor? There's a GPT.

**The philosophy**: Users should be able to build their own AI tools without coding.

## Anthropic's Approach: Tools and Agency

Anthropic took a different angle with Claude. Instead of a marketplace of custom assistants, they focused on making Claude itself more *capable* through:

**Extended Context Windows**: Claude started pushing context length aggressively (100K, then 200K tokens). The bet: if Claude can "see" more, it can maintain complex workflows without external memory.

**Tool Use / Function Calling**: Like OpenAI's function calling, but with a stronger emphasis on structured workflows. Claude doesn't just call functions—it reasons about which tools to use and when.

**Artifacts** (2024): A UI innovation where Claude can create and iterate on standalone pieces of work (code, documents, diagrams) that live outside the chat.

**Projects**: Persistent context spaces where Claude maintains knowledge across conversations.

**The philosophy**: Make the base model smarter and give it better primitives, rather than fragmenting capability across custom instances.

## The Real Breakthrough: Agents

Then both companies started talking about **agents**—LLMs that can plan, use tools, and complete multi-step tasks autonomously.

**OpenAI's Assistants API** (November 2023):
- Persistent threads (conversation history)
- Built-in code interpreter
- Knowledge retrieval over files
- Function calling for external actions

**Claude's Computer Use** (October 2024):
- Claude can control a computer directly
- Navigate interfaces, click buttons, fill forms
- Visual understanding of screenshots
- Multi-step task execution

This is where it gets wild: OpenAI built structured APIs for agents to work within guardrails. Anthropic taught Claude to use a computer like a human would.

## The Developer Experience Divergence

**OpenAI's GPT Store**: Consumer-friendly. Build a GPT with no code, share it, maybe monetize it. Great for productizing AI workflows quickly.

**Claude's MCP (Model Context Protocol)**: Developer-friendly. A standardized way for Claude to connect to data sources and tools. Think of it like USB-C for AI—one protocol, many connections.

OpenAI optimized for the creator economy. Anthropic optimized for integration into existing developer workflows.

## Commands and Customization

Both are now adding customization at the interaction level:

**ChatGPT Custom Instructions**: Set persistent preferences for how ChatGPT responds. Tone, format, assumptions.

**Claude's Slash Commands**: User-defined shortcuts that expand into full prompts. Like aliases for common workflows. `/review-pr` could expand into a full code review template with your team's standards.

**The pattern**: Let users encode their preferences and workflows directly into the interface.

## What's Emerging

Watching both companies evolve, a few patterns are becoming clear:

### 1. Persistence Matters
LLMs need memory—both short-term (conversation context) and long-term (projects, custom instructions, uploaded knowledge).

### 2. Actions Over Answers
The next frontier isn't better responses—it's giving LLMs the ability to *do things*. Browse the web, run code, control computers, call APIs.

### 3. Structured vs. Unstructured Workflows
OpenAI tends toward structured workflows (Assistants with defined tools and files). Anthropic leans toward general capability (teach Claude to use any interface).

### 4. Developer Primitives Win
The companies that provide the best building blocks (APIs, protocols, tool systems) will win the developer platform race. The consumer layer will be built on top.

## The Browser Wars Parallel

This reminds me of the early browser wars. Netscape and Internet Explorer weren't just competing on speed—they were figuring out what a web browser *should be*.

Should it be lightweight and standards-focused, or feature-rich and integrated? Should extensions be simple scripts or full applications? Should the browser be neutral infrastructure or an opinionated platform?

We're asking the same questions about LLM interfaces now:

- Should AI assistants be specialized (GPTs) or general-purpose (Claude)?
- Should they work through structured APIs or general computer use?
- Should workflows be templates (Custom Instructions) or composable primitives (MCP)?

## Where This Goes

My guess? We'll see both approaches succeed in different contexts:

**OpenAI's GPT model** will thrive in consumer and small business contexts. Non-technical users will build and share custom assistants for specific use cases.

**Anthropic's tool-first model** will dominate in enterprise and developer workflows. Engineers will integrate Claude into existing systems using MCP and other protocols.

And eventually, the patterns will converge. Just like browsers eventually standardized on core web APIs while differentiating on UX.

## Why This Matters

We're not just watching product competition—we're watching the API for human-AI collaboration get designed in real-time.

Ten years from now, the interaction patterns being pioneered right now will feel as fundamental as clicking a link or typing in a search box.

The companies that figure out the right primitives won't just build better products—they'll define how millions of people work with AI.

That's what makes this moment so fascinating to watch.
