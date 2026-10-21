# Evidence — time and tokens

## Time per spec
| Run | Issue | Method | Minutes | Notes |
|---|---|---|---|---|
| Baseline | #4 Reading goal for the year | By hand | 26 | `specs/manual-baseline.md` |
| 1 | #1 | Kit | 20min | |
| 2 | #2 | Kit | 10min | |
| 3 | #3 | Kit | 10min | |

"Minutes" with the kit = from typing the brief command until the spec is reviewed and decisions are logged (includes my review time).

## /context — before and after the GitHub MCP connection
| Measurement | Total tokens used | MCP tools line | Screenshot |
|---|---|---|---|
| Before MCP (fresh session) | | 30.5k/1m tokens | `evidence/context-before.png` |
| After MCP (fresh session) | | 30.9k/1m tokens | `evidence/context-after.png` |

Why `/x/issues/readonly`: the full GitHub MCP server loads many toolsets. Loading only the read-only issues toolset keeps the context small and makes writing to GitHub impossible.

## What broke
- Run 1: Claude copied the baseline's "Phase 1" structure, inherited a "no login" decision from another spec, and wrote a spec so long that my review took 20 min. Fixed with Rules learned, a scope check step in the brief, and a length limit in the skill.
- Run 2: after a partial answer to the scope check, Claude turned the missing answers into open questions instead of asking. Fixed with a new rule.
- Setup: the MCP connection failed because I pasted the token twice (186 characters instead of 93).
