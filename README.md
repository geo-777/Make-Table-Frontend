# MakeTable

Frontend application for MakeTable, a timetable management platform built for schools, colleges, and training institutes. It provides an interface for managing classes, teachers, subjects, rooms, and schedules while integrating with the MakeTable backend for timetable generation and data management.

## Overview

Creating and maintaining timetables is often a repetitive and error-prone process. MakeTable centralizes timetable management by allowing institutions to define their academic structure once and generate schedules that respect the constraints of their environment.

The frontend provides tools for managing timetable data, reviewing generated schedules, resolving conflicts, and publishing timetables for students and staff.

## Features

- Class, teacher, subject, and room management
- Timetable generation through the MakeTable scheduling engine
- Dedicated timetable views for classes and teachers
- Conflict detection and schedule validation
- Workspace-based timetable organization
- Public timetable sharing
- Responsive interface built for desktop and modern browsers

## Technology Stack

- React 19
- Vite
- React Router
- TanStack Query
- Zustand
- Axios
- Framer Motion
- React Toastify
- CSS Modules

## Backend Repository

This project requires the MakeTable backend to function.

Backend repository:

https://github.com/viswajith275/Make-Table-Backend

Follow the backend setup instructions before starting the frontend application.

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### 1. Clone the Repository

```bash
git clone <frontend-repository-url>
cd <frontend-project-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root.

For local development:

```env
VITE_API_URL=/api
```

If you are not using the Vite development proxy, provide the backend URL directly:

```env
VITE_API_URL=http://localhost:8000
```

Make sure the backend server is running and accessible before starting the frontend application.

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
src/
├── api/          Backend API modules and Axios configuration
├── app/          Application setup and routing
├── features/     Feature-specific components and logic
├── pages/        Application pages
├── shared/       Shared components, hooks, stores, and utilities
├── styles/       Global styles and animations
└── tools/        Development utilities and helper functions
```

## Development

Run ESLint:

```bash
npm run lint
```

## Contributing

1. Fork the repository

2. Create a feature branch

   ```bash
   git checkout -b feature/my-feature
   ```

3. Commit your changes

4. Push the branch

5. Open a pull request

## License

This project is provided as-is for educational and development purposes.
