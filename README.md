# Backlog Refinement Kit for Claude Code

Turns a raw, vague GitHub issue into a feature spec a developer can build from, with a built-in critic.
Capstone project, "Automate Your Week". Task: weekly backlog refinement (PM track).

**Result:** one spec by hand took **26 min**. With the kit: **__ min** on average over 3 issues (see `evidence/timings.md`).

## What it does
1. Reads the issue from GitHub through a **read-only** MCP connection
2. Gives a build/later/no verdict with the `business-lens` skill
3. Writes the spec with the `spec-writer` skill, in the format of `specs/TEMPLATE.md`
4. A **hook** blocks the spec if a required section is missing
5. The **spec-critic** subagent (read-only) lists gaps, edge cases and questions
6. You answer the questions and log them in `decisions.md`

| Course block | Where |
|---|---|
| S1 Prompting | `prompts/brief.md` |
| S2 Workspace | `CLAUDE.md` |
| S3 Skill + hook | `.claude/skills/spec-writer/`, `.claude/hooks/check-spec.js`, `.claude/settings.json` |
| S4 Subagent + memory | `.claude/agents/spec-critic.md`, `decisions.md` |
| S5 MCP + tokens | GitHub MCP (`/x/issues/readonly`), `evidence/timings.md` |

## Install (about 10 minutes)
Requirements: Claude Code, Node.js, a GitHub account.

1. **Get the repo:** `git clone https://github.com/camilagomesBLA/agent_bookshelf-kit.git` then `cd agent_bookshelf-kit`
2. **Create a GitHub token (read-only):** github.com → profile photo → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token.
   Repository access: *Only select repositories* → your repo. Permissions → Repository → **Issues: Read-only**. Copy the token.
3. **Connect the GitHub MCP server** (stored in your user settings, never in the repo):
   ```
   claude mcp add --transport http github https://api.githubcopilot.com/mcp/x/issues/readonly --header "Authorization: Bearer YOUR_TOKEN"
   ```
   If you use your own fork, change the repo name in `prompts/brief.md`.
4. **Check it:** run `claude`, type `/mcp` and confirm `github` is connected.

## Run it
1. On GitHub, create an issue with the label `raw`.
2. In Claude Code, in the repo folder: `Run prompts/brief.md for issue #<NUMBER>`
3. Read the spec in `specs/`, answer the critic's questions, and log them in `decisions.md`.
4. When Claude gets something wrong, add a rule under "Rules learned" in `decisions.md`.

## Safety
- GitHub access is read-only: the kit cannot change issues.
- The hook blocks reading or editing `.env` and credential files.
- Specs are drafts. Nothing goes to the team without the product owner's review.

---

```
╔═════════════════════════════════════════════╗
║│▓│▒│░│█│▓│░│▒│█│▓│▒│░│█│▓│░│▒│█│▓│▒│░│█│▓│░│║
╠═════════════════════════════════════════════╣
║                                             ║
║     ▄▀█ █▀▀ █▀▀ █▄░█ ▀█▀                    ║
║     █▀█ █▄█ █▄▄ █░▀█ ░█░                    ║
║                                             ║
║     █▄▄ █▀█ █▀█ █▄▀ █▀ █░█ █▀▀ █░░ █▀▀      ║
║     █▄█ █▄█ █▄█ █░█ ▄█ █▀█ █▄▄ █▄▄ █▀░      ║
║                                             ║
║  a goodreads-lite playground for AI agents  ║
║                                             ║
╠═════════════════════════════════════════════╣
║│█│▓│░│▒│█│▓│▒│░│█│▓│░│▒│█│▓│▒│░│█│▓│░│▒│█│▓│║
╚═════════════════════════════════════════════╝
```

# Agent Bookshelf

A Goodreads-lite application designed as a teaching playground for AI agents courses. Students install it locally and use AI agents (Claude Code, etc.) to complete homework assignments.

## Quick Start

### Using npx (recommended)

```bash
npx agent-bookshelf
```

That's it! The app will start at http://localhost:3000 with pre-seeded data.

### Install globally

```bash
npm install -g agent-bookshelf
agent-bookshelf
```

### Development mode

```bash
git clone <repository-url>
cd agent_bookshelf
npm install
npm run dev
```

## What is this?

Agent Bookshelf is a deliberately structured teaching codebase where:

- **Students** get an easy-to-install app that works immediately
- **AI agents** get a familiar, well-structured codebase to work with
- **Homework gaps** are built in for agents to fill

### Features

- Browse 50 pre-seeded books (tech and sci-fi)
- View book details with reviews and ratings
- Manage user shelves (want-to-read, currently-reading, read)
- Add reviews and ratings
- REST API for agent interaction
- HTMX-powered dynamic UI

### Pre-seeded Data

The app comes with:
- 50 books across tech and sci-fi genres
- 3 users: Alice Chen, Bob Martinez, Carol Okafor
- Sample shelves and reviews
- SQLite database (zero configuration)

## For Students

### Installation

**Prerequisites:** Node.js 20 or higher

**macOS / Linux:**
```bash
npx agent-bookshelf
```

**Windows:**
```bash
npx agent-bookshelf
```

The app will start automatically at http://localhost:3000

### Using the App

1. Browse books at http://localhost:3000
2. Click a book to see details and reviews
3. Visit /shelves to see user bookshelves
4. Add reviews and manage shelves through the UI

### For AI Agents

The app provides a REST API at `/api/*`:

```bash
# Get all books
curl http://localhost:3000/api/books

# Get a specific book
curl http://localhost:3000/api/books/1

# Add a review
curl -X POST http://localhost:3000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "bookId": 5, "rating": 5, "reviewText": "Excellent!"}'

# Get user shelves
curl http://localhost:3000/api/shelves/user/1
```

See the API routes in `src/routes/api.ts` for full documentation.

## For Instructors

### Homework Gaps

The codebase includes deliberate gaps for homework assignments:

1. **Search functionality** - UI exists but backend is a TODO
   - Location: `src/routes/books.ts` line 14
   - Students can implement the search backend

2. **Missing tests** - Models have no test coverage
   - Location: `tests/` directory
   - QA homework: write test suites for models

3. **Input validation** - API endpoints lack validation
   - Location: `src/routes/api.ts`
   - Students can add validation middleware

4. **UI improvements** - Functional but minimal design
   - Location: `src/public/css/style.css`
   - PM homework: redesign specific components

### Architecture

- **Backend:** Express + TypeScript
- **Database:** SQLite (better-sqlite3)
- **Frontend:** EJS templates + HTMX
- **Testing:** Vitest (setup included, tests are homework)

### Project Structure

```
agent_bookshelf/
├── src/
│   ├── server.ts          # Express app + server
│   ├── db/
│   │   ├── schema.sql     # Database schema
│   │   ├── seed.sql       # Pre-seeded data
│   │   └── index.ts       # DB connection
│   ├── models/            # Data models (no tests - homework gap)
│   ├── routes/
│   │   ├── books.ts       # HTML routes
│   │   ├── shelves.ts
│   │   ├── reviews.ts
│   │   └── api.ts         # JSON API
│   ├── views/             # EJS templates
│   └── public/            # Static assets
├── tests/                 # Vitest setup (tests are homework)
├── bin/                   # CLI entry point
└── docs/adr/              # Architecture decisions
```

### Running Tests

```bash
npm test          # Run tests in watch mode
npm run test:run  # Run tests once
```

Note: The test setup is included, but actual tests are intentionally missing (homework gap).

## License

GPL-3.0

## Contributing

This is a teaching project. Contributions should maintain the deliberate gaps that make homework assignments possible.
