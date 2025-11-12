# Notes App Frontend

This project is the frontend for a notes application, built with [Next.js](https://nextjs.org) and the App Router.

## Application Architecture

The application is designed as a modern Single-Page Application (SPA), using the following technologies and patterns:

-   **Framework**: **Next.js.14+** with the **App Router**. All code is client-side (`"use client";`), meaning it runs in the user's browser.
-   **Styling**: **Tailwind CSS** for rapid UI development. The main colors are managed through CSS variables in `globals.css` to allow for dynamic and consistent theming (e.g., `bg-[--color-background]`).
-   **State Management**:
    -   **React Hooks**: Standard hooks like `useState`, `useEffect`, `useCallback`, and `useRef` are used to manage local component state.
    -   **Context API**: An `AuthContext` is used to globally manage the user's authentication state (token, login status) across the entire application.
-   **API Communication**:
    -   **Custom Hooks** (`useApi`, `useNotes`, `useCategories`) are used to encapsulate the communication logic with the Django REST backend.
    -   These hooks handle loading status (`loading`), errors (`error`), and the fetched data.
-   **Routing**:
    -   **File-based Routing**: The folder structure in `src/app` defines the application's routes (e.g., `app/notes/[id]/page.tsx` corresponds to the `/notes/:id` route).
    -   **Protected Routes**: An `app/notes/layout.tsx` file wraps all routes under `/notes/` with a `PrivateRoute` component. This component ensures that only authenticated users can access these pages.
    -   **Redirect**: The root path (`/`) automatically redirects to `/notes` to unify the application's entry point.
-   **Key Components**:
    -   `SideBar.tsx`: Displays the list of categories and the note count (fetched from the backend).
    -   `NoteCard.tsx`: A preview card for each note on the main list.
    -   `[id]/page.tsx`: The detail page for creating and editing a note, with auto-save logic.
    -   `CategoryDropdown.tsx`: A component for selecting a note's category.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
