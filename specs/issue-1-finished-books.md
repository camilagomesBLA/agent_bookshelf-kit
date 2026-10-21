# Finished Books — Phase 1 Spec

Oct 21, 2026 · Issue #1 · Drafted by Claude for product owner review

## Problem
Readers lose track of which books they have already finished. One reader told us they keep this list somewhere else, such as their notes, because Agent Bookshelf does not make it easy to see.

How the app works today: every seeded user (Alice, Bob, Carol) has three shelves, `want-to-read`, `currently-reading` and `read`. A `read` shelf already exists, but it is only a shelf name. Nothing in the app treats it as "finished". The book page does not say whether a user has read the book. There is no way to put a book on a shelf from the book page; you have to open the shelf and choose the book from a dropdown list of all 50 books. The app has no login: pages ask "which user?" through a list (for example, the "Review as" dropdown on the book page and the user cards on the Shelves page). Users created through the API get no shelves at all, so they have no `read` shelf. The app also does not store the date a book was finished. The only date it keeps is when a book was added to a shelf.

Who feels it: readers who want one trusted list of the books they finished, and who now keep that list somewhere else.

Phase 1 lets a user mark a book as finished from the book page, see whether they have finished a book, and see a list of all their finished books with the date each was finished. Reading stats, goals and challenges (issue #4) come later and will build on this data.

## User Stories & Acceptance Criteria

### Story 1 — Mark a book as finished
As a reader, I want to mark a book as finished from its page, so that I don't have to open a shelf and search a dropdown list.

**AC 1.1 — Mark as finished**
Given I am on a book's page and have selected myself as the user
When I click "Mark as finished"
Then the page shows "Finished" for that book without a full page reload, and the book appears on my `read` shelf

**AC 1.2 — User required**
Given I am on a book's page and have not selected a user
When I click "Mark as finished"
Then nothing is saved and I see a message asking me to choose a user

### Story 2 — See if I already finished a book
As a reader, I want the book page to tell me whether I already finished the book, so that I don't start or buy a book I have already read.

**AC 2.1 — Finished status shown**
Given I have finished "Dune"
When I open the "Dune" book page and select myself as the user
Then I see "Finished on <date>"

**AC 2.2 — Not finished**
Given I have not finished "Dune"
When I open the "Dune" book page and select myself as the user
Then I see a "Mark as finished" button and no finished date

### Story 3 — See my list of finished books
As a reader, I want one list of all the books I finished, so that I can stop keeping that list in my notes.

**AC 3.1 — Finished list**
Given I have finished 4 books
When I open my finished books list
Then I see those 4 books with title, author and finished date, newest finished first (proposed)

**AC 3.2 — Count**
Given I have finished 4 books
When I open my finished books list
Then I see the total "4 books finished"

**AC 3.3 — Empty list**
Given I have not finished any books
When I open my finished books list
Then I see the message "No finished books yet" and a link to browse books

### Story 4 — Record when I finished
As a reader, I want a finished date saved with each book, so that I remember when I read it.

**AC 4.1 — Default date**
Given I am marking a book as finished
When I do not change the date
Then today's date is saved as the finished date

**AC 4.2 — Pick a past date**
Given I am marking a book I finished last year
When I choose a past date and confirm
Then that date is saved and shown as the finished date

**AC 4.3 — No future date**
Given I am marking a book as finished
When I choose a date after today
Then nothing is saved and I see "The finished date can't be in the future"

### Story 5 — Undo a mistake
As a reader, I want to un-mark a book I marked as finished by mistake, so that my list stays accurate.

**AC 5.1 — Un-mark**
Given a book is marked as finished
When I click "Not finished" on the book page
Then the book shows the "Mark as finished" button again and is no longer in my finished list

### Story 6 — Moving out of "currently reading"
As a reader, I want a book to leave my `currently-reading` shelf when I mark it finished, so that my shelves match where I really am. (proposed — see Open Questions)

**AC 6.1 — Removed from currently reading**
Given "The Three-Body Problem" is on my `currently-reading` shelf
When I mark it as finished
Then it is no longer on my `currently-reading` shelf and is on my `read` shelf

## Edge Cases
| Case | What can go wrong | Expected behavior (proposed) |
|---|---|---|
| User has no `read` shelf | Users created through the API get no shelves | The `read` shelf is created automatically the first time the user marks a book finished |
| `read` shelf deleted | Deleting a shelf also deletes its book links, so finished history is lost | Open question: block deleting the `read` shelf, or warn first |
| Marked finished twice | User clicks the button twice, or the book is already on `read` | The book stays finished once; the first finished date is kept; no error shown |
| Books seeded on `read` today | Seeded books have no finished date | Show them as finished with the date they were added to the shelf, or "date unknown" (see Open Questions) |
| Added via the shelf page | User adds a book to `read` from the shelf page, not the book page | It counts as finished, with the add date as the finished date |
| Re-reading a book | User finishes the same book a second time | Phase 1 keeps one finished date per book; re-reads are later (see Open Questions) |
| Book deleted | A finished book is removed from the catalogue | It disappears from the finished list and the count goes down |
| Future date | User picks tomorrow as the finished date | Not saved; error message (AC 4.3) |
| Time zones | A book finished at 23:50 shows as the next day | Use the user's local date when saving the finished date |
| Book on `want-to-read` and finished | Book stays on `want-to-read` after it is finished | Open question: remove it from `want-to-read` too, or leave it |
| Large list | A user has hundreds of finished books | The list still loads; paging comes later |

## Out of Scope
- Login and accounts. Phase 1 keeps the current "pick a user" approach
- Reading stats, yearly totals and charts
- Reading goals and challenges (issue #4, which will use this finished data)
- Logging pages or minutes read, and reading progress
- Re-read history (several finished dates per book)
- Importing reading history from Goodreads or other apps
- Sharing a finished list with friends
- Changes to the review feature (a review does not mark a book as finished)

Dependencies for Phase 1:
- A place to store the finished date per user and book. Today the app only stores the date a book was added to a shelf, and that date resets if the book is removed and added again
- A "Mark as finished" control and finished status on the book page, which does not show any shelf information today
- A finished books list page (or a clear link to the user's `read` shelf)
- Default shelves (`want-to-read`, `currently-reading`, `read`) for new users, or creating `read` on demand

## Open Questions
### This phase
- Is "finished" the same as "on the `read` shelf", or a separate status? If a user renames their own shelf to "finished", does it count?
- Should marking a book finished remove it from `currently-reading` (Story 6) and from `want-to-read` automatically?
- Seeded books already on `read` have no real finished date. Show the shelf added date, or "date unknown"?
- Can the user edit the finished date after saving it?
- Can the `read` shelf be deleted? If yes, should the app warn that finished history will be lost?
- Where does the finished list live: a new page, or the existing `read` shelf page with dates added?
- How does the book page know who "I" am without login? Reuse a user dropdown like "Review as", or a single user choice remembered for the whole site?
- Should the finished list sort newest first, or alphabetically?

### Later phases
- Re-reads: keep every finished date, and show "read 2 times"?
- Should finished books feed reading challenges (issue #4) automatically?
- Should a finished book prompt the user to write a review?
- Yearly summary ("you finished 12 books in 2026")?
- Import from Goodreads or a spreadsheet?
