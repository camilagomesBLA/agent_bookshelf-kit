# Reading Challenges — Phase 1 Spec

Oct 21, 2026 · @Camila Gomes · Issue #4 · Written by hand (baseline: 26 minutes)

## Problem
Readers who want to read more have no way to set a goal in Agent Bookshelf and track progress toward it. Today the app records which books sit on which shelves, but not how much someone reads or whether they are keeping pace.

Who feels it: readers who set personal goals ("20 books this year", "50 pages a week") and end up tracking them in spreadsheets, notes, or other apps, or lose motivation because progress is invisible.

Phase 1 lets a user create personal reading challenges with a metric, a target, and a time period, and see their progress. Group challenges with friends come in Phase 2.

## User Stories & Acceptance Criteria

### Story 1 — Create a challenge
As a reader, I want to create a challenge with a name, description, metric, target, and period, so that I have a clear reading goal.

**AC 1.1 — Create a challenge**
Given I am on the challenges page
When I fill in name, description, metric, target, period, and recurrence, and save
Then the challenge appears in my list with status Active and progress 0

**AC 1.2 — Required fields**
Given I am creating a challenge
When I leave name, metric, target, or period empty, or enter a target of 0 or less
Then the challenge is not saved and I see a message naming the field to fix

### Story 2 — Choose a metric
As a reader, I want to measure my challenge in books read, pages read, or minutes read, so that the goal fits how I like to track reading.

**AC 2.1 — Metric options**
Given I am creating a challenge
When I open the metric field
Then I can pick exactly one of: Books read, Pages read, Minutes read

### Story 3 — Set period and recurrence
As a reader, I want to choose the challenge period and whether it restarts or finishes when the period ends, so that I can keep a habit going or run a one-time goal.

**AC 3.1 — Period options**
Given I am creating a challenge
When I open the period field
Then I can pick Weekly, Monthly, Yearly, or Custom (start and end date)

**AC 3.2 — Recurring challenge**
Given my challenge is set to restart
When the period ends
Then the result of that period is saved to history and a new period starts with progress 0

**AC 3.3 — One-time challenge**
Given my challenge is set to finish
When the period ends
Then the challenge stays in my history with its final status and no new period starts

### Story 4 — Log reading
As a reader, I want to log pages or minutes read and mark books as finished, so that my challenge progress updates.

**AC 4.1 — Progress from a finished book**
Given I have an active "Books read" challenge
When I mark a book as finished within the challenge period
Then the challenge progress goes up by 1

**AC 4.2 — Progress from logged pages or minutes**
Given I have an active "Pages read" or "Minutes read" challenge
When I log a reading session with a number of pages or minutes
Then the challenge progress goes up by that number

### Story 5 — See progress
As a reader, I want to see my current progress against the target and the time left, so that I know if I am on pace.

**AC 5.1 — Progress view**
Given I have an active challenge
When I open it
Then I see progress vs. target (e.g. 12 / 20 books) and days remaining

### Story 6 — See results
As a reader, I want to see whether I completed or missed a challenge when it ends, so that I can track my history.

**AC 6.1 — Target reached**
Given I have an active challenge
When my progress reaches the target before the period ends
Then the status changes to Completed and progress keeps counting until the period ends

**AC 6.2 — Period ends without target**
Given I have an active challenge below its target
When the period ends
Then the status changes to Failed

## Edge Cases
| Case | What can go wrong | Expected behavior (proposed) |
|---|---|---|
| Book started before the challenge | User finishes a book that was started before the period began | Counts if the finish date falls inside the period (see Open Questions) |
| Book un-finished | User marks a book finished, then undoes it | Progress goes back down by 1 |
| Wrong log entry | User logs 500 pages by mistake | User can edit or delete a reading log; progress recalculates |
| Log outside the period | User logs reading with a past date before the challenge started | Entry does not count toward that challenge |
| Several active challenges | User has a yearly books challenge and a weekly pages challenge | Each challenge counts the logs that match its metric and period |
| Custom dates invalid | End date is before start date, or in the past | Challenge is not saved; user sees an error |
| Very large target | User sets 10,000 books in a week | Allowed but flagged? Or a max value? (see Open Questions) |
| Period ends while offline | App is not used when the period closes | Status updates the next time the challenge is loaded |
| Time zones | A log at 23:50 lands in a different day or week | Use the user's local time to decide which period a log belongs to |
| Deleted book | User removes a book that counted toward a challenge | Open question: keep or remove its progress |

## Out of Scope
Phase 1 covers individual challenges only. These items are planned for Phase 2 or later:
- User accounts, login, and public profiles
- Following friends and seeing their reading activity (Strava-style feed)
- Inviting friends to a challenge, and accepting or declining invites
- Group challenges in a competitive format, with a ranking and shared progress view
- Enrollment period of 1 or 2 weeks before a group challenge starts
- Joining a challenge after it has started (not allowed, even in Phase 2 for now)
- Notifications and reminders (e.g. "you are behind pace")
- Badges, rewards, or streaks
- Automatic tracking from e-readers or other apps

Dependency for Phase 1: a reading log (pages, minutes, finish date per book) must exist. If Agent Bookshelf does not have one yet, it is part of this work.

## Open Questions
### This phase
- Does a book started before the challenge count if it is finished during the period?
- Can the same reading log count toward several active challenges at once?
- Can the user edit the target or period after the challenge starts?
- Can the user cancel or abandon a challenge? Does it show as Failed or Cancelled?
- Is there a maximum target or a warning for unrealistic targets?
- If a book is deleted, is its progress kept or removed?
- Does a weekly period start on Sunday or Monday?

### Later phases
- Recurring group challenges: do participants continue automatically, or accept again each cycle?
- Is there a new enrollment period at every cycle?
- Ranking: does the winner reach the target first, or have the highest number at the end? How are ties decided?
- Minimum participants: if nobody accepts by the end of enrollment, is the challenge cancelled or turned individual?
- Can a participant leave mid-challenge? Does their progress stay in the ranking?
