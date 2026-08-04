# React-Node Starter Template - Client-Next

This is the Next.js client-side application for the React-Node Starter Template.

## Table of Contents

- [Introduction](#introduction)
- [Making Next.js the Primary Client](#making-nextjs-the-primary-client)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Usage](#usage)
  - [Development](#development)
  - [Production Build](#production-build)
  - [Running Production Server](#running-production-server)
- [Linting](#linting)
- [Testing](#testing)

## Introduction

The client-next application is an alternative user-facing interface for the React-Node Starter Template. It is built using Next.js (App Router) with React and TypeScript, providing a modern, high-performance experience with server-side rendering (SSR) capabilities and Turbopack support.

## Making Next.js the Primary Client

If you want to use Next.js as your primary frontend and remove the Vite React client from the monorepo:

1. Delete the `packages/client` directory.
2. Rename the `packages/client-next` directory to `packages/client`.
3. In `packages/client/package.json` (formerly `packages/client-next/package.json`), change `"name": "client-next"` to `"name": "client"`.
4. Run `pnpm install` in the monorepo root.

Monorepo commands like `pnpm dev:client` and `pnpm --filter client dev` will now automatically run this Next.js application.

## Architecture

The client application follows Next.js App Router architecture with modular feature-based organization. Key architectural aspects include:

-   **Framework**: [Next.js](https://nextjs.org/) (App Router) / [React](https://react.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool / Bundler**: [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)
-   **UI Components**: [Shadcn/ui](https://ui.shadcn.com/) / [Base UI](https://base-ui.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **State & Data Fetching**: [TanStack React Query](https://tanstack.com/query/latest)
-   **Error Tracking**: [Sentry](https://sentry.io/) (`@sentry/nextjs`)
-   **Icons**: [Lucide React](https://lucide.dev/)

## Project Structure

The `src` directory is organized as follows:

```
src/
├── app/                  # Next.js App Router pages, layouts, and global styles
├── components/           # Reusable UI components (including Shadcn/ui)
│   └── ui/               # Shadcn/ui components
├── features/             # Feature-specific modules
├── interfaces/           # TypeScript interfaces and type definitions
├── lib/                  # Utility functions and library configurations
├── locales/              # i18n and localization files
├── providers/            # Application context providers (e.g., TanStack Query)
├── shared/               # Shared utilities, hooks, and assets
├── store/                # Application state management
├── utils/                # Helper utilities
└── __tests__/            # Unit and integration tests
```

## Environment Variables

The client-next application requires specific environment variables to function correctly. These should be placed in environment files such as `.env.development`, `.env.production`, or `.env.testing` in the root of the `packages/client-next` directory. A `.env.example` is provided for reference.

```env
# Server Side
CLIENT_PORT="3000" # Port for Next.js server (e.g., 3000 in dev, 8080 in prod)
SENTRY_AUTH_TOKEN="" # Used for Sentry CLI during build/deploy, keep empty if not using Sentry CLI

# Client Side (prefixed with NEXT_PUBLIC_ to be exposed to client-side code)
NEXT_PUBLIC_ENV="development" # Accepts: development, testing, production
NEXT_PUBLIC_SENTRY_DSN="" # Your Sentry DSN for error tracking in the client
```

You can copy `.env.example` to create `.env.development`, `.env.production`, or `.env.local` files as needed.

## Installation

1.  Navigate to the root of the monorepo.
2.  Install dependencies using `pnpm`:

    ```bash
    pnpm install
    ```

## Usage

### Development

To run the client-next application in development mode with hot-reloading:

```bash
pnpm --filter client-next dev
```

The application will typically be accessible at `http://localhost:3000`.

### Production Build

To build the client-next application for production:

```bash
pnpm --filter client-next build
```

### Running Production Server

To start the production Next.js server:

```bash
pnpm --filter client-next start
```

The application will typically be accessible at `http://localhost:8080`.

## Linting

To check for linting errors with ESLint (JavaScript/TypeScript):

```bash
pnpm --filter client-next lint:eslint-check
```

To automatically fix ESLint errors:

```bash
pnpm --filter client-next lint:eslint-fix
```

To check for linting errors with Stylelint (CSS):

```bash
pnpm --filter client-next lint:stylelint-check
```

To automatically fix Stylelint errors:

```bash
pnpm --filter client-next lint:stylelint-fix
```

## Testing

To run unit tests with Vitest:

```bash
pnpm --filter client-next test:unit
```

To run unit tests and generate a coverage report:

```bash
pnpm --filter client-next test:coverage
```
