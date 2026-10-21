# Search Within a Shelf — Spec

Oct 21, 2026 · Issue #2

## Problem
People with many books on a shelf say finding one takes too long. Today a shelf page (`/shelves/:id`) shows every book on that shelf as cards in one grid, with no search, filter or sort. To find a book, the reader has to scroll and scan every card.

Who feels it: readers whose shelves have grown large, for example a long "want to read" list. The bigger the shelf, the slower it gets.

This spec adds a search box to the shelf page that finds a book among the books already on that shelf, by title or author. The search runs in the browser, on the books the page already shows, with no new request to the server. Searching the whole catalog (the home page and `/books/search`) is not part of this spec.

## User Stories & Acceptance Criteria
### Story 1 — Search my shelf
As a reader, I want to type part of a book's title or author on a shelf page, so that I only see the books on that shelf that match.

**AC 1.1 — Match by title**
Given I am on a shelf page that has "Dune" and "The Hobbit" on it
When I type "dune" in the shelf search box
Then only the "Dune" card is shown

**AC 1.2 — Match by author**
Given I am on a shelf page that has "The Hobbit" by J.R.R. Tolkien on it
When I type "tolkien" in the shelf search box
Then "The Hobbit" is shown

**AC 1.3 — Part of a word**
Given I am on a shelf page that has "Dune" on it
When I type "un" in the shelf search box
Then "Dune" is shown

**AC 1.4 — Only this shelf's books**
Given a book is in the catalog but not on this shelf
When I type its title in the shelf search box
Then it is not shown in the results

### Story 2 — Know when nothing matches
As a reader, I want a clear message when no book on the shelf matches, so that I know the book is not on this shelf rather than thinking the page is broken.

**AC 2.1 — No matches message**
Given I am on a shelf page
When I type text that matches no book on the shelf
Then no book cards are shown and I see the message "No books on this shelf match your search." (proposed wording)

### Story 3 — Go back to the full shelf
As a reader, I want to clear my search, so that I can see every book on the shelf again.

**AC 3.1 — Clear the search**
Given I have typed a search and only some books are shown
When I delete all the text in the shelf search box
Then every book on the shelf is shown again

## Edge Cases
| Case | What can go wrong | Expected behavior (proposed) |
|---|---|---|
| Empty shelf | A search box on a shelf with no books is confusing | Search box is hidden; the existing "This shelf is empty" message shows |
| Only spaces typed | Spaces could hide every book | Spaces at the start and end are ignored; only spaces = show all books |
| Capitals and accents | "DUNE" does not find "Dune", or "garcia" does not find "García" | Matching ignores upper/lower case and accents, in both directions |
| Special characters | Typing `'`, `%` or `_` breaks the search or matches everything (e.g. "Hitchhiker's") | These characters are matched as plain text |
| Book added or removed while a search is active | The list refreshes and the search no longer matches what is shown | See Open Questions |
| Very long text typed | Page slows down or breaks | No error; nothing matches and the no-matches message shows |

## Out of Scope
- Searching the whole catalog on the home page, and the `/books/search` route (that route is a course homework exercise and stays as it is)
- Matching on anything other than title and author (ISBN, year, description)
- Typo tolerance (for example "Dnue" finding "Dune")
- Sorting and filtering the shelf (parked)
- Searching within a shelf through the JSON API (can wait)
- The "Add a Book" dropdown on the shelf page (listing every book in the catalog)
- Searching across all of a user's shelves at once
- Saving or remembering a search after the page is reloaded
- Dependency / known issue: on the shelf page, adding or removing a book replaces the book list in a way that drops the label (`#shelf-books-list`) the page uses to find it. After the first add or remove, the next one no longer updates the list correctly. Shelf search has to work alongside this, so the dev team should decide whether to fix it as part of this work.

## Open Questions
### Before development
- If a reader adds or removes a book while a search is active, should the search stay applied, or should the full shelf be shown again?

### Can wait
- Should the search box show on every shelf, or only on shelves above a certain number of books?
