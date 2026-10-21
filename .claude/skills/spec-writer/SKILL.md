---
name: spec-writer
description: Writes a feature spec for Agent Bookshelf from a raw GitHub issue, using the exact format in specs/TEMPLATE.md. Use whenever asked to write, draft or refine a spec, user stories or acceptance criteria.
---

# Spec writer

Turn one raw issue into one spec the team can build from without a follow-up meeting.

## Before writing
1. Read `specs/TEMPLATE.md`. The spec MUST use its five `##` headings, spelled exactly:
   `## Problem`, `## User Stories & Acceptance Criteria`, `## Edge Cases`, `## Out of Scope`, `## Open Questions`.
2. Read `specs/manual-baseline.md`. Match its depth: about 4–7 stories, 8–10 edge cases, a split list of open questions.
3. Read `decisions.md` and apply every rule in the "Rules learned" section.
4. Check the codebase for what already exists for this feature. If something the feature needs does not exist (a table, a page, a field), list it as a dependency in Out of Scope.

## Writing rules
- **Problem:** what is wrong today, who feels it, what this phase delivers. Describe the app as it really is, based on the code you read.
- **Stories:** `As a <user>, I want <action>, so that <benefit>.` One story per user goal.
- **Acceptance criteria:** numbered `AC <story>.<n> — <name>`, always in Given / When / Then. Each AC checks ONE behavior a tester can see on screen. No vague words like "fast", "easy" or "intuitive".
- **Edge cases:** a table with `Case | What can go wrong | Expected behavior (proposed)`. Always consider: empty states, invalid input, very large values, deleting related data, dates and time zones, the same action done twice.
- **Out of Scope:** what this phase will not do, and dependencies.
- **Open Questions:** split into `### This phase` and `### Later phases`. When you are unsure about a product decision, write a question here. Never decide it silently.
- Plain English. No invented numbers, metrics or user research.
- Mark anything you assumed with "(proposed)".

## Output
Save the whole spec in ONE Write call to `specs/issue-<number>-<short-slug>.md`. Write the full file every time, because the spec-check hook validates the whole content. If the hook blocks the write, add the missing section and write again.
