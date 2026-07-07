# Vite-Node Starter Template - Client

This is the client-side application for the Vite-Node Starter Template.

## Table of Contents

- [Introduction](#introduction)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Usage](#usage)
  - [Development](#development)
  - [Production](#production)
  - [Preview Production Build](#preview-production-build)
- [Linting](#linting)
- [Testing](#testing)

## Introduction

The client application is the user-facing interface for the Vite-Node Starter Template. It is built using React with TypeScript and Vite, providing a modern and responsive experience.

## Architecture

The client application follows a component-based architecture, leveraging React's declarative UI. Key architectural aspects include:

-   **Framework**: [React](https://react.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Routing**: [React Router](https://reactrouter.com/en/main) (using `react-router-dom` for web)
-   **Error Tracking**: [Sentry](https://sentry.io/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Carousels**: [Swiper](https://swiperjs.com/)

## Project Structure

The `src` directory is organized as follows:

```
src/
├── App.tsx               # Main application component
├── main.tsx              # Application entry point (React DOM rendering, Sentry init)
├── index.css             # Global styles
├── __tests__/            # Unit tests
├── components/           # Reusable UI components
│   └── ui/               # Shadcn/ui components
├── features/             # Feature-specific modules (e.g., dashboard, sidebar)
│   ├── dashboard/
│   └── sidebar/
├── lib/                  # Utility functions and libraries
└── shared/               # Shared assets and hooks (e.g., use-mobile hook)
    ├── assets/
    └── hooks/
```

## Environment Variables

The client application requires specific environment variables to function correctly. These should be placed in a `.env` file in the root of the `packages/client` directory. A `.env.example` is provided for reference.

```
# Server Side (used by Vite for development server, not directly by client-side code)
CLIENT_PORT="5173"
SENTRY_AUTH_TOKEN="" # Used for Sentry CLI during build/deploy, keep empty if not using Sentry CLI

# Client Side (prefixed with VITE_ to be exposed to client-side code)
VITE_ENV="development" # Accepts: development, testing, production
VITE_SENTRY_DSN="" # Your Sentry DSN for error tracking in the client
# VITE_API_BASE_URL="http://localhost:8080/api/v1" # Uncomment and set if your client needs to explicitly know the backend API URL
```

You can copy the `.env.example` file to create your own `.env` file.

## Installation

1.  Navigate to the root of the monorepo.
2.  Install dependencies using `pnpm`:

    ```bash
    pnpm install
    ```

## Usage

### Development

To run the client application in development mode with hot-reloading:

```bash
pnpm --filter client dev
```

The application will typically be accessible at `http://localhost:5173`.

### Production

To build the client application for production:

```bash
pnpm --filter client build
```

The production-ready assets will be generated in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
pnpm --filter client preview
```

## Linting

To check for linting errors with ESLint (JavaScript/TypeScript):

```bash
pnpm --filter client lint:eslint-check
```

To automatically fix ESLint errors:

```bash
pnpm --filter client lint:eslint-fix
```

To check for linting errors with Stylelint (CSS):

```bash
pnpm --filter client lint:stylelint-check
```

To automatically fix Stylelint errors:

```bash
pnpm --filter client lint:stylelint-fix
```

## Testing

To run unit tests with Vitest:

```bash
pnpm --filter client test:unit
```

To run unit tests and generate a coverage report:

```bash
pnpm --filter client test:coverage
```
