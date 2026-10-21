# decisions.md — Backlog refinement kit memory

Claude reads this file at the start of every run (see `prompts/brief.md`).
After each run, the product owner logs decisions and anything Claude got wrong.

## Rules learned
<!-- When Claude gets something wrong, add a one-line rule here AND fix the skill or CLAUDE.md. -->
- Do not split a spec into phases unless the issue or the product owner asks for it. The baseline spec uses phases only because that feature needed them.
- Never inherit scope decisions (for example "no login") from other specs. Scope decisions are asked and confirmed before writing.
- Keep specs short: 3–5 stories, up to 6 edge cases, and only questions that block development.
- If the product owner answers only some scope questions, ask for the rest before writing.

## Run log

### Run 1 — Issue #1 Users want to know which books they already finished — Oct 21, 2026
- **Time with kit:** 20 min (manual baseline: 26 min)
- **Business-lens verdict:** Build now
- **Hook:** accepted first time
- **Critic verdict:** Ready after answers
- **Decisions (answers to critic questions):**
  - Q1: Is "finished" the same as being on the `read` shelf? → A: Yes. Finished = being on the Read shelf. The finish date is saved when the book is added to Read.
  - Q2: How does the book page know who the user is? → A: Use the existing Alice/Bob/Carol user list. No login.
  - Q3: What do seeded books show as the finish date? → A: "date unknown".
  - Q4: One click or a form with a date? → A: One click, saves today's date.
  - Q5: Where does the finished list live? → A: The existing Read shelf page, showing the finish date there.
  - Q6: Does marking finished remove the book from other shelves? → A: Yes, from "currently reading" and "want to read".
  - Q7: Which "today" wins near midnight? → A: The browser's local date.
  - Q9: Does removing a book from Read on the shelf page un-finish it? → A: Yes.
  - Q10: Sort order of the finished list? → A: Newest first.
  - Q11: Web pages only, or the JSON API too? → A: Web pages only.
  - Parked: editing the finish date later (Q4); what un-marking does (Q6); blocking or warning when the `read` shelf is deleted, to discuss with the dev team (Q8); JSON API (Q11)
- **What Claude got wrong:**
  1. It split the spec into "Phase 1" with no Phase 2, copying the structure of `specs/manual-baseline.md` without a reason.
  2. It decided on its own that there is no login in this phase, inherited from the other spec, instead of asking the product owner first.
  3. The spec was too long, which made the review slow.
- **Fix applied:** see Rules learned and the changes to the brief, skill and template.

### Run 2 — Issue #2 Search is hard to use when the shelf is big — Oct 21, 2026
- **Time with kit:** 10 min (manual baseline: 26 min)
- **Business-lens verdict:** Build later
- **Hook:** accepted first time
- **Critic verdict:** Ready after answers
- **Scope check answers:**
  - Q1: Which list is the problem? → A: Books on one shelf only.
  - Q2: What should search match? → A: Title and author, partial match, ignoring case and accents, no typo tolerance.
  - Q3: Browser or server? → A: In the browser. `/books/search` homework left as is.
  - Q4: Search, or also sort and filter? → A: Search only. Sort and filter parked.
  - Q5: Web pages or JSON API? → A: Web pages only. API can wait.
- **Decisions (answers to critic questions):**
  - Parked: all critic questions, to discuss with the dev team
- **What Claude got wrong:** after the product owner answered only question 1 of the scope check, it moved on and turned questions 2–5 into open questions instead of asking for the rest.
- **What improved since run 1:** no phases, shorter spec, and it asked about the API again instead of inheriting the answer from run 1.
- **Fix applied:** added to Rules learned: "If the product owner answers only some scope questions, ask for the rest before writing." Also updated step 3 of `prompts/brief.md` to match.

### Run 3 — Issue #3 Can we let people rate books? — Oct 21, 2026
- **Time with kit:** 10 min (manual baseline: 26 min)
- **Business-lens verdict:** Build now
- **Hook:** accepted first time
- **Critic verdict:** Ready after answers
- **Scope check answers:**
  - Q1: What's the actual gap, since rating already exists? → A: Show ratings in more places, so people see that ratings exist. What Sales had in mind exactly: parked, to ask Sales.
  - Q2: Who is rating? → A: Keep the "Review as: Alice / Bob / Carol" picker. No login.
  - Q3: Rating without a review? → A: Keep it as it is: rating required, text optional.
  - Q4: Where should ratings show up? → A: Average rating and number of ratings on the book list and on shelf pages. "My reviews" page parked.
  - Q5: Web pages or JSON API? → A: Web pages only. JSON API can wait.
- **Decisions (answers to critic questions):**
  - Parked: all critic questions, to discuss with the dev team
- **What Claude got wrong:** nothing found in the product owner's review.
- **What improved since run 2:** it read the code and found that rating already exists, so the spec focused on the real gap instead of rebuilding the feature. All scope questions answered in one message, no phases, short spec.
- **Fix applied:** none needed.


<!-- Copy this block for each run -->
### Run <n> — Issue #<number> <title> — <date>
- **Time with kit:** <minutes> (manual baseline: 26 min)
- **Business-lens verdict:** <build now / later / not at all>
- **Hook:** <accepted first time / blocked because …>
- **Critic verdict:** <Ready / Ready after answers / Not ready>
- **Decisions (answers to critic questions):**
  - Q: … → A: …
  - Parked: …
- **What Claude got wrong:** …
- **Fix applied:** <which file changed, or "none">
