# React-Node Starter Template

Starter template for a full-stack application with Vite (React-TS) and Next.js (App Router) client packages and a Node-TS server in a pnpm workspace monorepo.

## Tech Stack

**Client (Vite):**
- React 19
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- Vitest & React Testing Library

**Client (Next.js):**
- Next.js 15 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui & Base UI
- TanStack React Query
- Vitest & React Testing Library

**Server:**
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma
- Winston (for logging)

**Monorepo:**
- pnpm workspaces

## Project Architecture

This project is a monorepo managed with pnpm workspaces. It consists of three main packages:

-   `packages/client`: A React frontend application built with Vite. It handles the user interface and interacts with the server API.
-   `packages/client-next`: An alternative React frontend application built with Next.js (App Router). It provides server-side rendering (SSR) capabilities and interacts with the server API.
-   `packages/server`: A Node.js backend application built with Express. It provides a RESTful API for the clients, manages the database with Prisma, and handles business logic.

## Choosing a Frontend Client (Vite vs Next.js)

This template includes two client options. Choose the one that fits your project requirements:

- **To use Vite (React SPA):**
  - Delete the `packages/client-next` directory.
  - No further changes are required.

- **To use Next.js (SSR / App Router):**
  - Delete the `packages/client` directory.
  - Rename `packages/client-next` to `packages/client`.
  - Update `packages/client/package.json` to change `"name": "client-next"` to `"name": "client"`.
  - Run `pnpm install` in the root directory.

All monorepo scripts targeting `client` (e.g. `pnpm dev:client`) will automatically work with your chosen client.

## Prerequisites

-   [Node.js](https://nodejs.org/) (v22.x recommended)
-   [pnpm](https://pnpm.io/) (v10.x recommended)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd react-node-starter
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
3.  Generate prisma files:

    ```bash
    pnpm --filter server prisma:generate
    ```

## Environment Variables

You need to create `.env` files for the client and server packages. You can copy the example files and fill in the required values.

### Client - Vite (`packages/client/.env`)

Copy `packages/client/.env.example` to `packages/client/.env`:

| Variable        | Description                                  | Example Value   |
| --------------- | -------------------------------------------- | --------------- |
| `VITE_ENV`      | The environment for the client.              | `development`   |
| `VITE_SENTRY_DSN` | Sentry DSN for error tracking.             |                 |

### Client - Next.js (`packages/client-next/.env.development` / `.env.production`)

Copy `packages/client-next/.env.example` to `packages/client-next/.env.development`:

| Variable                | Description                                  | Example Value   |
| ----------------------- | -------------------------------------------- | --------------- |
| `CLIENT_PORT`           | Port for the Next.js server.                 | `3000`          |
| `SENTRY_AUTH_TOKEN`     | Sentry CLI auth token during build.          |                 |
| `NEXT_PUBLIC_ENV`       | Environment for the client.                  | `development`   |
| `NEXT_PUBLIC_SENTRY_DSN`| Sentry DSN for error tracking in client.     |                 |

### Server (`packages/server/.env`)

Copy `packages/server/.env.example` to `packages/server/.env`:

| Variable       | Description                                 | Example Value                 |
| -------------- | ------------------------------------------- | ----------------------------- |
| `ENV`          | The environment for the server.             | `development`                 |
| `SERVER_PORT`  | The port the server will run on.            | `8080`                        |
| `SERVER_URL`   | The base URL of the server.                 | `http://localhost:8080`       |
| `DATABASE_URL` | The connection string for the PostgreSQL DB. | `postgresql://user:pass@host:port/db` |
| `MONGODB_URL`  | The connection string for MongoDB (for logs). |                               |


## Available Scripts

Here are some of the most important scripts you can run from the root directory:

| Script                          | Description                                            |
| ------------------------------- | ------------------------------------------------------ |
| `pnpm dev`                      | Runs all workspace packages in development mode.       |
| `pnpm dev:client`               | Runs only the Vite client in development mode.         |
| `pnpm dev:server`               | Runs only the server in development mode.              |
| `pnpm --filter client-next dev` | Runs only the Next.js client in development mode.      |

You can also run package-specific scripts from within their respective directories (e.g., `pnpm test:unit` inside `packages/client` or `packages/client-next`).

## Running the Application

To run the application in development mode with hot-reloading:

```bash
pnpm dev
```

- The Vite client will be available at `http://localhost:5173`.
- The Next.js client will be available at `http://localhost:3000`.
- The server will be available at `http://localhost:8080`.

## CI/CD

This project uses GitHub Actions for Continuous Integration. The workflow is defined in `.github/workflows/ci.yaml`. It runs tests and linting on every push and pull request to the `main` branch.

## Folder Structure

```
.
├── packages
│   ├── client/         # React Frontend (Vite)
│   ├── client-next/    # React Frontend (Next.js App Router)
│   └── server/         # Node.js Backend
├── .github/
│   └── workflows/      # CI/CD workflows
├── .husky/             # Git hooks
└── ...
```
