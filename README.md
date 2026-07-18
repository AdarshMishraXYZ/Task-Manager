# Task Manager — Field Ledger

A React + Vite task manager with a distinctive "field ledger" visual identity: serif headers, monospace metadata, and an ink-stamp mark for completed tasks.

## Features

- Add, edit, delete tasks
- Mark complete/incomplete (stamped "DONE")
- Due dates with automatic overdue highlighting
- Priority levels (High / Medium / Low)
- Tags with filter chips
- Search across title, notes, and tags
- Sort by due date, priority, or A–Z
- Progress stats (logged / closed / overdue)
- Persists locally via `localStorage`

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).


## Project structure

```
src/
  components/       UI components (TaskList, TaskItem, TaskFormModal, Toolbar, TagRow, StatBar)
  hooks/            useLocalStorage persistence hook
  constants.js      Priority levels, storage key
  utils.js          Date/id helpers
  App.jsx           App state and wiring
  index.css         Design system (Field Ledger theme)
```
