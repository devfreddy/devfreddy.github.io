---
title: Context Windows as Architectural Constraints
date: 2025-10-16
excerpt: The rise of LLM coding assistants might fundamentally change how we architect software—not for performance or maintainability, but to fit within context windows.
tags: [llm, architecture, modularity, software-design]
---

# Context Windows as Architectural Constraints

Everyone talks about how LLM coding assistants get worse as projects grow more complex. But this isn't a new problem—it's just a restatement of the eternal challenge in software: breaking problems down, separating concerns into modules, packages, microservices, defining clean interfaces between components.

What's unique now? We might find ourselves refactoring codebases and large systems so that each component's entire codebase fits within the context window of the best LLM coding models.

## The Old Problem in New Clothes

- Complexity has always been the enemy
- We've always needed decomposition strategies
- Interfaces and boundaries have always mattered
- The "why" behind modularization is evolving

## A New Architectural Driver

Traditionally, we've modularized for:
- Team boundaries
- Performance isolation
- Deployment independence
- Testability
- Maintainability

Now we might add:
- **LLM comprehensibility**: Can the entire component fit in context?

## Key Points

- Context windows create a hard constraint on "graspable" code size
- This aligns well with many existing best practices (small modules, clear interfaces)
- But the motivation is different: not just human comprehension, but AI comprehension
- The optimal size might be different than what we've traditionally considered "right-sized"

## Thoughts

This could actually push us toward better architecture. If you can't explain your entire service to an LLM in one conversation, maybe it's doing too much. The context window becomes a forcing function for simplicity.

But there's a tension: what's "simple" for an LLM might not match what's simple for humans. LLMs can hold enormous amounts of detail in context—they don't get tired or lose focus. They might prefer different decomposition strategies than we do.

## Takeaways

- LLM context windows might become a primary architectural constraint
- This could accelerate the trend toward smaller, more focused services
- The "can this fit in context?" test might become as important as "can one person understand this?"
- We're not just coding for humans anymore—we're coding for human-AI collaboration

---

*This is a work in progress. I'll update this as my thinking evolves.*
