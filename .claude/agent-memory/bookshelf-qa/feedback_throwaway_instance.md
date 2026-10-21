---
name: feedback-throwaway-instance
description: Never mutate data on port 3000 (user's real DB); run a throwaway server on another port with a /tmp cwd for data-changing tests
metadata:
  type: feedback
---

Never create/change/delete data on http://localhost:3000; it runs against the user's real ./bookshelf.db. For tests that need data changes, start a throwaway instance:
`mkdir -p /tmp/qa-<name> && cd /tmp/qa-<name> && PORT=3055 npx tsx "<repo>/src/server.ts"` (background). DB is created as bookshelf.db in that cwd, seeded fresh. Mutations and DELETEs are allowed there only. Stop the server and rm the /tmp folder when done.

**Why:** the user explicitly required this (2026-10-08) to protect their real data.
**How to apply:** any QA that POSTs/PATCHes/DELETEs. Tips: 14 users lets you make 11+ reviews on one book (create users via POST /api/users; 20 users needed for the 4.95-avg case); `npx vitest run` is safe (tests use their own /tmp DBs). Related: [[project-top-rated-qa]].
