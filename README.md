# stock-platform

> One dashboard for everything involved in building and running the Stock/HPP project.

## About the project

The other repos in this project produce a real product: an app that
tracks sales, stock, and expenses for a small business (see
[stock-frontend](https://github.com/theadonata/stock-frontend)). Building
and running that product involves its own separate moving parts —
architecture decisions, Jira tickets, pull requests, and a live server
that needs watching — spread across five different tools with no single
place to see all of it.

**This repo is that single place.** It's both a dashboard (see the status
of decisions, tickets, PRs, and server health together) and an
orchestrator (the one thing it automates: once a design decision is
approved, it automatically files the Jira tickets to build it — no more
manually copying a decision into ticket form). Everything past that point
— merging code, touching the live server — still needs a person to click
"approve."

STOCK (the business-finance app) is the first project this dashboard
manages, but it's built so a second project could be added later without
a rewrite.

### Part of a bigger project

Stock/HPP is split into six repos, each one buildable and deployable on
its own:

| Repo | What it does |
|---|---|
| [stock-frontend](https://github.com/theadonata/stock-frontend) | The web app people use day to day |
| [stock-backend](https://github.com/theadonata/stock-backend) | The API and database — stores data, does the math |
| [stock-infrastructure](https://github.com/theadonata/stock-infrastructure) | Deploys and runs everything on a server |
| [stock-qa](https://github.com/theadonata/stock-qa) | Automated tests that check everything works |
| [stock-business-analyst](https://github.com/theadonata/stock-business-analyst) | The original business requirements this is built from |
| **stock-platform** (this repo) | An internal dashboard for the team building this project |

For the full reasoning behind what this app does and doesn't do, see
[`CONTEXT.md`](./CONTEXT.md) (glossary of terms used throughout this repo)
and [`docs/adr/`](./docs/adr/) (the architecture decisions and why they
were made).

## What it does

- Shows the status of architecture decisions, Jira tickets, pull requests,
  and server health, all pulled into one dashboard
- Automatically files Jira tickets the moment a design decision is
  approved — the one manual step this project used to have
- Watches app and server logs, and (using Claude) suggests a diagnosis and
  a fix — always as a draft for a person to review and approve, never
  applied automatically

## Built with

- Backend: [FastAPI](https://fastapi.tiangolo.com/) + PostgreSQL +
  SQLAlchemy/Alembic — same stack as
  [stock-backend](https://github.com/theadonata/stock-backend)
- Frontend: React + Vite + TanStack Query + Tailwind — same stack as
  [stock-frontend](https://github.com/theadonata/stock-frontend)
- Login via GitHub
- Deployed the same way as the rest of the project, through
  [stock-infrastructure](https://github.com/theadonata/stock-infrastructure)'s
  GitOps setup

## Getting started

### Prerequisites

- Python 3.12, Node.js 22
- Docker (for a local Postgres database)

### Running the backend

```bash
docker compose up -d          # starts a local Postgres database
cd backend
pip install -e ".[dev]"
alembic upgrade head
uvicorn app.main:app --reload --port 8001
```

The API is at **http://localhost:8001**, with a health check at
`/healthz`.

### Running the frontend

```bash
cd frontend
npm install
npm run dev
```

The app is at **http://localhost:5174** and expects the backend above to
be running.

### Running tests

```bash
cd backend && pytest              # backend
cd frontend && npm run test       # frontend
```

## Project structure

```
backend/      FastAPI app, database migrations, tests
frontend/     React app, tests
database/     the Postgres image used for local development
docs/adr/     architecture decisions and why they were made
```
