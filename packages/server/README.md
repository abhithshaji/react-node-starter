# Vite-Node Starter Template - Server

This is the backend server for the Vite-Node Starter Template.

## Table of Contents

- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Usage](#usage)
  - [Development](#development)
  - [Production](#production)
- [Linting](#linting)
- [Docker](#docker)

## Architecture

The server is built with a modern, scalable architecture using the following technologies:

- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: (To be implemented)
- **Logging**: [Winston](https://github.com/winstonjs/winston)
- **Security**: [Helmet](https://helmetjs.github.io/) for securing HTTP headers.
- **CORS**: [cors](https://github.com/expressjs/cors) for handling Cross-Origin Resource Sharing.

## Project Structure

The `src` directory is organized as follows:

```
src/
├── app.ts                # Express application setup and middleware
├── server.ts             # Server entry point
├── config/               # Application configuration
├── constant/             # Constants like response messages
├── controller/           # Express route handlers
├── middleware/           # Custom Express middleware
├── model/                # (Currently unused, Prisma is used for data modeling)
├── router/               # Express routers
├── services/             # Business logic and services (e.g., databaseService)
├── types/                # TypeScript types and interfaces
└── utils/                # Utility functions (e.g., logger, error handlers)
```

## Environment Variables

To run this project, you will need to create a `.env` file in the root of the `packages/server` directory and add the following environment variables:

```
# General
ENV=development # development, testing, production
SERVER_PORT=8080
SERVER_URL=http://localhost:8080

# Database (PostgreSQL)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Database (MongoDB for logging)
MONGODB_URL="mongodb://USER:PASSWORD@HOST:PORT/DATABASE"
```

You can copy the `.env.example` file to create your own `.env` file.

## Installation

1.  Navigate to the root of the monorepo.
2.  Install dependencies using `pnpm`:

    ```bash
    pnpm install
    ```
3.  Generate prisma files:

    ```bash
    pnpm run prisma:generate
    ```

## Usage

### Development

To run the server in development mode with hot-reloading:

```bash
pnpm --filter server dev
```

The server will be available at `http://localhost:8080` by default.

### Production

To build and run the server in production mode:

1.  **Build the project**:

    ```bash
    pnpm --filter server dist
    ```

2.  **Start the server**:

    ```bash
    pnpm --filter server start
    ```

## Linting

To check for linting errors:

```bash
pnpm --filter server lint:eslint-check
```

To automatically fix linting errors:

```bash
pnpm --filter server lint:eslint-fix
```

## Docker

A `Dockerfile` is available in the `docker` directory.