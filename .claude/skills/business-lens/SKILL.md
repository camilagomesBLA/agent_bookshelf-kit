---
name: business-lens
description: Evaluate a new feature or product idea the way a business owner would, not just a builder. Use whenever the user proposes, plans, brainstorms, or prioritizes a new feature or product idea — e.g. "I want to create a new feature...", "what feature should we build next?", "what do you think of this idea?", "should we add X?", "which of these should we do first?". Scores the idea on revenue, engagement, retention, effort/cost, differentiation, and risk (1–5 each), suggests one way to make it more valuable, and ends with a recommendation: build now, build later, or don't build. Do NOT use for bug fixes, styling or design changes, installing tools, or technical questions.
---

# Business Lens

## Purpose

Help the user think about features like a business owner, not just a builder. Before anyone asks "how do we build this?", answer "should we build this, and why?"

The user is not a developer. Write in plain, everyday language with no jargon. If a technical idea can't be avoided, explain it in a few simple words.

## When to use

Use this skill when the user is proposing, planning, brainstorming, or prioritizing a new feature or product idea. For example:

- "I want to create a new feature..."
- "What feature should we build next?"
- "What do you think of this idea?"
- "Should we add...?"
- "Which of these ideas should we do first?"

## When NOT to use

Do not use this skill for:

- Bug fixes ("this button doesn't work", "the page crashes")
- Styling or design changes (colors, fonts, layout). The ui-craft commands cover those.
- Installing or setting up tools
- Technical questions ("how does this code work?", "how do I run the tests?")

If a message mixes a feature idea with one of these, use the lens only for the feature-idea part.

## How to evaluate

### 1. Restate the idea

In one or two sentences, describe the feature and who it's for, so the user can check you understood it. If the idea is too vague to judge, ask one or two short questions first.

### 2. Score the six lenses

Score each lens from 1 to 5. **A higher score is always better for the business**, so the scores can be compared at a glance:

| Lens | What it asks | 1 means | 5 means |
|---|---|---|---|
| Revenue | Could this make money, directly or indirectly? | No path to money | Clear path to money |
| Engagement | Will people use it often and enjoy it? | Rarely used | Used all the time |
| Retention | Will it make people come back and stay? | No reason to return | Strong reason to return |
| Effort / cost | How cheap and quick is it to build and maintain? | Very costly or slow | Quick and cheap |
| Differentiation | Does it set us apart from similar products? | Everyone has it | Unique to us |
| Risk | How safe is it (breaking things, user trust, legal, data)? | Very risky | Very safe |

Give each score exactly one sentence of reasoning in plain language.

### 3. Make it more valuable

Suggest **one** concrete way to make the feature more valuable for the business, such as a small change in scope, a different audience, or pairing it with something that already exists.

### 4. Recommend

End with exactly one of these:

- **Build now**: high value and reasonable effort and risk.
- **Build later**: good idea, but something else should come first, or it needs more information.
- **Don't build**: low value, or the cost or risk outweighs the benefit.

Add one sentence explaining why.

## Output format

Always use this layout:

**The idea:** <one or two sentence restatement>

| Lens | Score | Why |
|---|---|---|
| Revenue | ?/5 | ... |
| Engagement | ?/5 | ... |
| Retention | ?/5 | ... |
| Effort / cost | ?/5 | ... |
| Differentiation | ?/5 | ... |
| Risk | ?/5 | ... |

**Make it more valuable:** <one suggestion>

**Recommendation: <Build now / Build later / Don't build>.** <one sentence why>

## Rules

- Plain language only, no jargon. Write for a business owner, not an engineer.
- Be honest. A low score or "Don't build" is a useful answer, so don't inflate scores to be encouraging.
- Don't write or change any code while using this skill. It is for thinking, not building.
- When comparing several ideas, score each one, then add a short ranking at the end.
