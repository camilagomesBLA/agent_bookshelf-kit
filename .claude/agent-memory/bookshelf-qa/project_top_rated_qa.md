---
name: project-top-rated-qa
description: QA history for GET /top-rated page (first run + re-test both 2026-10-08) - both original bugs fixed; one open design question (4.95 avg rounds into tie with 5.0 and outranks it); regression checklist
metadata:
  type: project
---

GET /top-rated (min 2 reviews, top 10). Fully QA'd 2026-10-08, re-tested same day (regression run).

**Current implementation (as of re-test):** `getTopRatedBooks` in src/models/review.ts uses `ROUND(AVG(r.rating), 1) as avg_rating` and `ORDER BY avg_rating DESC, review_count DESC, b.title COLLATE NOCASE`. View still uses Math.round(avg) for stars and avg.toFixed(1) for text, but now on the pre-rounded value, so they agree.

**Regression checklist (all PASS on re-test):** seed baseline on live 3000 (Dune 5.0 #1, Pragmatic 4.5 #2); book appears at exactly 2 reviews (Neuromancer id 17 + user 1 review -> "4.5 / 5 (2 reviews)"); avg tie -> count desc -> title asc; 10-book limit (13 eligible -> 10 cards); HTML escaping of <script>, quotes, apostrophes in title/author; /top-rated/, /TOP-RATED, ?x=1 -> 200; POST -> 404; nav link on /, /books/1, /shelves, /top-rated; drop-off after deleting review, user (cascade), book; empty-state "No books have 2 or more reviews yet." message.
tests/routes/top-rated.test.ts: now 5 tests (added case-insensitive tie-break and stars-match-rounded-average), all pass.

**Bugs - status:**
1. Case-sensitive title tie-break: FIXED (re-test). "apple lower" now ranks #1 before "Banana Upper" and "Dune" at 5.0/2 reviews. Note NOCASE is ASCII-only (accented titles not tested).
2. Stars vs number mismatch: FIXED (re-test). 5x4+6x3 (3.4545) shows "3.5 / 5 (11 reviews)" with 4 stars, ranks above a 2-review true 3.5 (tie on rounded avg, more reviews wins).

**New finding from re-test (design question, not yet decided by user):** because ranking uses the rounded avg, a book with 19x5 + 1x4 (avg 4.95) shows "5.0 / 5 (20 reviews)" and ranks #1 ABOVE genuine perfect-5.0 books (Dune, 2 reviews) via the review_count tie-break. Arguably intended (more reviews = more trustworthy), but a book with a 4-star review beating perfect scores may surprise users. Re-report until user says it is intended.

**Related pre-existing gap (not a top-rated bug):** POST /api/reviews accepts non-integer ratings (homework gap in api.ts).

**Why:** lets future runs do a quick regression instead of re-deriving everything.
**How to apply:** on next run, check whether the ROUND/NOCASE query is unchanged, re-check the 4.95-vs-5.0 question, then run the checklist with the recipe in [[feedback-throwaway-instance]].
