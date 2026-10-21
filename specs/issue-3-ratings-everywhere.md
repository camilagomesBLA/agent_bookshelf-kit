# Show Ratings on the Book List and Shelf Pages — Spec

Oct 21, 2026 · Issue #3

## Problem
Agent Bookshelf already lets people rate books. On a book's page, a user picks who they are (Alice, Bob or Carol), gives a rating from 1 to 5 stars, and can add a written review if they want. The book page shows the average rating, and a Top Rated page ranks books that have at least 2 reviews.

But ratings are easy to miss. The book list (home page) and the shelf pages show only title and author. A reader browsing the app never sees that ratings exist unless they open a single book. Sales believes ratings would make the app "stickier", and that only works if people notice them.

This spec shows each book's average rating and number of ratings on the book list and on shelf pages. How people give a rating stays the same: the "Review as" picker, rating required, text optional. Web pages only.

## User Stories & Acceptance Criteria

### Story 1 — Ratings on the book list
As a reader browsing all books, I want to see each book's average rating and how many people rated it, so that I can spot well-liked books without opening each one.

**AC 1.1 — Rated book on the list**
Given a book has 2 ratings, 5 and 4
When I open the book list (home page)
Then that book's card shows its stars, "4.5 / 5" and "2 ratings" (proposed format, matching the book page)

**AC 1.2 — Unrated book on the list**
Given a book has no ratings
When I open the book list
Then that book's card shows "No ratings yet" (proposed wording) and no stars

### Story 2 — Ratings on a shelf page
As a reader looking at a shelf, I want to see the rating of each book on it, so that I can decide what to read next.

**AC 2.1 — Rated book on a shelf**
Given a shelf holds a book with 2 ratings, 5 and 4
When I open that shelf's page
Then that book's card shows its stars, "4.5 / 5" and "2 ratings"

**AC 2.2 — Unrated book on a shelf**
Given a shelf holds a book with no ratings
When I open that shelf's page
Then that book's card shows "No ratings yet"

**AC 2.3 — Book added to the shelf**
Given I am on a shelf page
When I add a book that has ratings, using the "Add a Book" form
Then the new book's card appears with its rating, without reloading the page

### Story 3 — Ratings stay up to date
As a reader, I want the numbers I see to include the latest ratings, so that I can trust them.

**AC 3.1 — New rating counted**
Given a book shows "1 rating" on the book list
When someone adds a rating for it on the book page and I open the book list again
Then the book shows "2 ratings" and the new average

## Edge Cases
| Case | What can go wrong | Expected behavior (proposed) |
|---|---|---|
| Exactly one rating | Text reads "1 ratings" | Shows "1 rating" (singular) |
| Average ends in .5 | Stars and number disagree (e.g. 4.5 shown as 5 stars) | Same rounding rule as the book page today: stars rounded to a whole number, number shown with one decimal |
| Book has ratings but no written reviews | Count shows 0 because only reviews with text are counted | Every rating counts, with or without text |
| Searching the book list | The rating text breaks the existing in-page search on the book list | Search still matches on title and author only; ratings do not affect results |
| Shelf page after adding or removing a book | Known bug: after the first add or remove, the page loses the marker it uses to update the list, so the next add or remove does not appear until reload | Not fixed by this spec; flagged for the dev team (see Open Questions) |
| Book removed from the app | Its ratings are still counted somewhere | Ratings are deleted with the book (the database already does this) |

## Out of Scope
- Changing how ratings are given (picker, required rating, optional text all stay as they are)
- Login or real user accounts
- A "my reviews" page (parked)
- Editing or deleting a rating on the web pages
- Sorting or filtering by rating
- The JSON API (can wait)
- What Sales had in mind beyond "show ratings in more places" (parked, to ask Sales)
- Dependencies: none. Ratings, averages and counts can all be built from the existing `reviews` table.

## Open Questions
### Before development
- On a shelf page, should each book show everyone's average rating, or the shelf owner's own rating? (This spec assumes everyone's average.)
- Should a book with only 1 rating show its average? The Top Rated page hides books with fewer than 2 reviews. (This spec assumes yes, show it.)
- Does "shelf pages" include the "<user>'s Shelves" overview page? That page lists shelves, not books. (This spec assumes no.)

### Can wait
- Should the book page also show the number of ratings, so all pages match?
- Should the dev team fix the shelf page bug that stops the list updating after the first add or remove, as part of this work or separately?
- What did Sales have in mind exactly? (parked)
