# MakeTable Frontend

A polished React frontend for the MakeTable scheduling platform. This interface is built to model school constraints, generate conflict-free timetables quickly, and publish schedules with minimal friction.

## 🚀 Product Overview

MakeTable is designed to solve the school timetabling problem with a deterministic scheduling engine.

- Model your school once and reuse the same constraint setup.
- Generate schedules automatically in seconds.
- Review, publish, and share timetables with one click.
- Self-host or connect to your own backend.

## ⭐ Key Features

- **Constraint Solver** — respect teacher availability, room capacity, subject load, and break windows every time.
- **Fast Regeneration** — update a class, lock a slot, or change a teacher and recompute schedules instantly.
- **Class & Teacher Views** — toggle between per-class, per-teacher, and master schedule views.
- **Easy Timetable Sharing** — publish schedules publicly and share them via link.
- **Workspace Isolation** — each timetable exists in its own workspace with clean separation and permissions.
- **Conflict Detection** — surface teacher overlaps, duplicate allocations, and scheduling issues before publishing.

## 🧩 Who It’s Built For

- Schools managing daily class schedules
- Colleges organizing faculty, courses, and labs
- Training institutes planning batches, instructors, and rooms

## 🛠️ Workflow

1. **Model your school**
   - Add classes, subjects, teachers, rooms, and scheduling constraints.
   - Import existing data or clone previous setups.
2. **Generate**
   - Run the solver and produce a conflict-aware timetable.
3. **Publish**
   - Review results, tweak as needed, export, and share with a single link.

## 📦 Tech Stack

- React 19
- Vite
- React Router DOM
- @tanstack/react-query
- Zustand
- Axios
- Framer Motion
- React Toastify
- ESLint

## ⚙️ Setup

### Prerequisites

- Node.js 18 or newer
- npm or yarn

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the app at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint the project

```bash
npm run lint
```

## 📁 Project Structure

- `src/api/` — backend API modules and axios instance
- `src/app/` — app entrypoint, route definitions, and provider setup
- `src/features/` — feature pages, hooks, styles, and components
- `src/pages/` — landing page, docs, profile, legal, and error pages
- `src/shared/` — reusable UI components, hooks, utilities, and Zustand stores
- `src/styles/` — global styling, theme, and animations
- `src/tools/` — mock data and helper utilities

## 💡 Notes

- This repository contains the frontend only. A backend API is required for authentication, timetable data, and CRUD operations.

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/name`
3. Commit your changes
4. Push your branch
5. Open a pull request