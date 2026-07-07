# Vite-Node Starter Template

Starter template for a full-stack application using a vite react-ts client and node-ts server with a pnpm workspace monorepo.

## Tech Stack

**Client:**
- React 19
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
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

This project is a monorepo managed with pnpm workspaces. It consists of two main packages:

-   `packages/client`: A React frontend application built with Vite. It handles the user interface and interacts with the server API.
-   `packages/server`: A Node.js backend application built with Express. It provides a RESTful API for the client, manages the database with Prisma, and handles business logic.

## Prerequisites

-   [Node.js](https://nodejs.org/) (v22.x recommended)
-   [pnpm](https://pnpm.io/) (v10.x recommended)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd vite-node-starter
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

You need to create `.env` files for both the client and server packages. You can copy the example files and fill in the required values.

### Client (`packages/client/.env`)

Copy `packages/client/.env.example` to `packages/client/.env`:

| Variable        | Description                                  | Example Value   |
| --------------- | -------------------------------------------- | --------------- |
| `VITE_ENV`      | The environment for the client.              | `development`   |
| `VITE_SENTRY_DSN` | Sentry DSN for error tracking.             |                 |

### Server (`packages/server/.env`)

Copy `packages/server/.env.example` to `packages/server/.env`:

| Variable       | Description                                 | Example Value                 |
| -------------- | ------------------------------------------- | ----------------------------- |
| `ENV`          | The environment for the server.             | `development`                 |
| `SERVER_PORT`         | The port the server will run on.            | `8080`                        |
| `SERVER_URL`   | The base URL of the server.                 | `http://localhost:8080`       |
| `DATABASE_URL` | The connection string for the PostgreSQL DB. | `postgresql://user:pass@host:port/db` |
| `MONGODB_URL`  | The connection string for MongoDB (for logs). |                               |


## Available Scripts

Here are some of the most important scripts you can run from the root directory:

| Script           | Description                                    |
| ---------------- | ---------------------------------------------- |
| `pnpm dev`       | Runs both the client and server in development mode. |
| `pnpm dev:client`| Runs only the client in development mode.      |
| `pnpm dev:server`| Runs only the server in development mode.      |

You can also run package-specific scripts from within their respective directories (e.g., `pnpm test:unit` inside `packages/client`).

## Running the Application

To run the entire application in development mode with hot-reloading:

```bash
pnpm dev
```

The client will be available at `http://localhost:5173` and the server at `http://localhost:8080`.

## CI/CD

This project uses GitHub Actions for Continuous Integration. The workflow is defined in `.github/workflows/ci.yaml`. It runs tests and linting on every push and pull request to the `main` branch.

## Folder Structure

```
.
├── packages
│   ├── client/         # React Frontend
│   └── server/         # Node.js Backend
├── .github/
│   └── workflows/      # CI/CD workflows
├── .husky/             # Git hooks
└── ...
```
