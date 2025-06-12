# Todo App – Frontend Examination Project

## Overview

This project is a single-page Todo application developed using React as part of the AltSchool Africa Frontend Engineering Second Semester Examination. It showcases the application of modern frontend development practices, with a focus on usability, accessibility, and architectural clarity.

### Key Highlights:
- Built with React 19 functional components and hooks
- Route-level data handling with TanStack Router
- Integrated with REST API endpoints using Axios
- Optimistic UI updates for a seamless user experience
- Utility-first styling via Tailwind CSS and DaisyUI
- Font customization using "Quicksand" via Google Fonts
- Focus management in modals (keyboard navigation, ESC to close)
- React Icons for visual cues (e.g., plus, trash, edit, status indicators)
- Persistent query cache via localStorage with optional Dexie.js support
- Designed with responsiveness, accessibility, and modularity in mind

## Live Demo

- **Deployed App**: https://exam-todo-app-xi.vercel.app/
- **Source Code**: https://github.com/Theezigner/exam-todo-app.git

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Features](#features)
- [UI/UX Design](#uiux-design)
- [Accessibility](#accessibility)
- [API Documentation](#api-documentation)
- [Known Issues](#known-issues)
- [Future Improvements](#future-improvements)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Theezigner/exam-todo-app.git
   cd exam-todo-app
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm run dev
   ```

## Scripts

| Command            | Description                      |
|--------------------|----------------------------------|
| `pnpm run dev`     | Starts local development server  |
| `pnpm run build`   | Builds for production            |
| `pnpm run preview` | Serves the production build      |

## Technology Stack

- **React 19**
- **Vite** (build tool)
- **Tailwind CSS** + **DaisyUI** (component styling)
- **TanStack Router** (nested routing, route loaders)
- **React Query** (data fetching, caching, persistence)
- **Axios** (API requests)
- **LocalStorage** (offline caching)
- **React Hook Form** (form validation)
- **React Icons**
- **React Hot Toast**(notifications)

## Architecture

```plaintext
src/
├── components/         # Reusable modal components, theme toggle, error display
├── layouts/            # App layout and outlet container
├── pages/              # Home and Detail views
├── routes/             # Route definitions and loaders
├── utils/              # Axios config, Dexie or localStorage utilities
├── App.jsx             # Main app container with persistence
├── main.jsx            # Entry point rendering the app
```

## Features

- Paginated list of todos with real-time search filtering
- Nested detail page with full todo data
- Add, update, and delete functionality using modals
- Optimistic updates via React Query for smooth UX
- Persistent query cache with `localStorage`
- Focus management: auto-focus, tabIndex, and ESC key support in modals
- Semantic HTML structure with accessible roles and landmarks
- Graceful error boundaries and skeleton loaders
- Mobile-first responsive layout
- Theme toggle for light/dark mode

## UI/UX Design

- Centralized layout using `max-w-md` containers
- Spacing and alignment handled with Tailwind utilities
- Buttons styled with attention to hover/focus/active states
- Modals optimized for clarity and keyboard use
- Visual feedback via spinners, skeletons, and toast notifications
- Friendly, modern font (Quicksand) imported via HTML <link> in index.html

## Accessibility

- Semantic HTML throughout (`<main>`, `<nav>`, `<section>`, `<article>`)
- ARIA roles applied to modals and dynamic components
- Escape key support for modal dismissal
- Screen reader-friendly alerts using `aria-live` regions
- Focus management using `tabIndex`, `autoFocus`, and keyboard event handling
- Color contrast meets WCAG AA standards
- No loss of keyboard access across components

## API Documentation

Base API: [`https://jsonplaceholder.typicode.com/todos`](https://jsonplaceholder.typicode.com/todos)

| Method | Endpoint       | Description             |
|--------|----------------|-------------------------|
| GET    | `/todos`       | Retrieve all todos      |
| GET    | `/todos/:id`   | Retrieve single todo    |
| POST   | `/todos`       | Create a new todo       |
| PUT    | `/todos/:id`   | Update existing todo    |
| DELETE | `/todos/:id`   | Delete a todo           |

> Note: Since JSONPlaceholder is a mock API, CRUD operations do not persist after refresh. The app uses local state and optimistic UI to simulate persistence.

## Known Issues

- JSONPlaceholder does not support persistent changes
- No authentication or user-specific data
- Focus is not programmatically trapped within modals (tab escape is possible)

## Future Improvements

- Sync offline actions with the server when back online (Dexie.js)
- Filter and sort todos by status or creation date
- Integrate a real backend for persistent storage
- Implement authentication and multi-user support
- Add accessibility enhancements using `focus-trap` or `aria-describedby`

## License

This project was submitted as part of the AltSchool Africa Frontend Engineering Program. It is intended solely for academic demonstration and evaluation.

## Author

**Temitayo Adebayo**  
AltSchool Africa – Frontend Engineering  
Second Semester, Tinyuka Cohort
