# Job Tracker

A client-side job application tracker built with React 19, TypeScript, and Vite. Manage your pipeline from wishlist to offer in a kanban-style board, with search filtering and an analytics dashboard.

## Features

- **Kanban board** — five-stage pipeline: Wishlist → Applied → Interviewing → Offer → Rejected
- **Drag and drop** — reorder and move cards between columns
- **Add / edit / delete jobs** — modal forms with full CRUD
- **Search & filter** — real-time filtering across all job fields
- **Analytics view** — conversion rate, rejection rate, and a per-stage bar chart
- **Multi-user auth** — username-based login with per-user job isolation; state persisted in `localStorage`

## Tech Stack

| Layer | Choice |
|---|---|
| UI | React 19 |
| Language | TypeScript 6 |
| Bundler | Vite 8 |
| State | `useReducer` + Context API |
| Styling | Vanilla CSS (custom properties) |

No external UI libraries or state management packages — intentionally lean.

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

```bash
npm run build    # type-check + production bundle
npm run preview  # serve the production build locally
npm run lint     # ESLint
```

## Project Structure

```
src/
├── components/
│   ├── ui/             # Presentational atoms (JobCard, SearchBar, Header, …)
│   ├── forms/          # LoginModal, AddJobForm, EditJobForm
│   ├── JobBoard.tsx    # Kanban table
│   ├── AnalyticsView.tsx
│   ├── ViewNav.tsx
│   ├── ModalRenderer.tsx
│   └── Main.tsx
├── hooks/
│   ├── AppContext.tsx   # App-wide state provider
│   ├── appReducer.ts   # Pure reducer — all state transitions
│   ├── ModalContext.tsx
│   ├── useAppState.ts
│   └── useModal.ts
├── types/              # Shared TypeScript types
├── constants/          # Column definitions, calculateMetrics helper
└── index.css           # Global styles + CSS custom properties
```

## Architecture Notes

State lives in a single `AppState` tree (`jobs`, `searchQuery`, `auth`) managed by `appReducer`. Visible jobs are derived via `selectVisibleJobs` from the current user and search query (not stored separately). All mutations go through typed `AppAction` dispatches — no direct state writes anywhere.

Jobs are scoped by `owner` (the logged-in username), so multiple users can share the same `localStorage` bucket without seeing each other's data. Clear Data only removes the current user's jobs.
