# Repository Agent Guidelines

## 1. Safety & Behavioral Constraints (Strict Enforcement)

- **No Git Commits / Pushes:** You are NOT allowed to execute `git commit` or `git push`. Leave all modified files unstaged for developer review. All commits and pushes must be made manually by the developer.
- **No Unapproved File Deletion:** You are NOT allowed to delete existing source files or directories unless explicitly approved by the user during refactoring/cleanup.
- **Mandatory Skill Utilization:** Actively check and utilize available skills (located in `.agents/skills/` or `~/.agents/skills/`) when writing, refactoring, or reviewing code.

---

## 2. Interactive Workflow & Communication Protocol

### Bug Fixes / Issue Troubleshooting

- Do NOT jump directly into coding or modifying repository files.
- **Step 1:** Investigate and explain the root cause of the issue clearly.
- **Step 2:** Outline the proposed solution step-by-step.
- **Step 3:** Explicitly ask for user confirmation before making any code modifications.

### New Features & Enhancements

- Do NOT jump directly into implementation.
- **Step 1:** Explain the proposed architecture and design approach.
- **Step 2:** Initiate an interactive `/grill-me` interview:
  - Focus on 3–5 high-impact questions per turn across key design branches.
  - Suggest smart defaults for minor implementation choices.
- **Step 3:** Obtain explicit user approval before writing code.

---

## 3. Project Overview & Role

- **Repository Type:** Monorepo (`packages/client` and `packages/server`, with an optional `packages/client-next` package).
- **Primary Role:** Full-Stack Feature Developer (adhering strictly to user-approved plans).
- **Package Manager:** Use `pnpm` exclusively across all workspace packages.

---

## 4. Architecture & Code Conventions

### Client Options (`packages/client` / `packages/client-next`)

The repository supports two frontend options:

- **Vite React SPA (`packages/client`)**: Built with React 19, Vite, React Router, Tailwind CSS, and Shadcn UI.
- **Next.js App Router (`packages/client-next` or `packages/client`)**: Built with React 19, Next.js 15 (App Router), Turbopack, Tailwind CSS, Shadcn UI, Base UI, and TanStack React Query.

#### Client Selection & Cleanup Guidance

- **Using Vite React SPA:** Delete the `packages/client-next` directory if not needed.
- **Using Next.js:** Delete `packages/client`, rename `packages/client-next` to `packages/client`, and update `"name": "client-next"` to `"name": "client"` in `packages/client/package.json` (followed by `pnpm install`).

#### Client Code Conventions

- **Separation of Concerns:**
  - Keep presentational UI components lightweight and focused on layout/styling.
  - Extract all stateful logic, side effects, and data fetching into custom hooks or providers.
- **Testing Requirement:** Always write unit tests (Vitest + React Testing Library) when implementing key client logic, such as custom hooks, reusable components, utility functions, or critical feature modules.
- **Patterns:** Apply React 19 features (`use()` hook, `<Context>` syntax) and reference local skills (`.agents/skills/react-design-patterns`).

### Server (`packages/server`)

- **Tech Stack:** Express 5, Prisma 7 (PostgreSQL adapter), TypeScript, Winston logging.
- **Layered Architecture:**
  - `Controllers`: Handle HTTP requests, input validation, and HTTP responses.
  - `Services`: Encapsulate core business logic and state transitions.
  - `Database`: Interface strictly through Prisma client models (`prisma/schema.prisma`). Do not apply database migrations without approval.
- **Logging & Errors:** Use `winston` for structured logging; never swallow server exceptions silently.

---

## 5. Verification Quality Gates

Before declaring any task completed, run and pass all of the following (targeting the active client package):

```bash
# 1. Type Checking & Linters
pnpm --filter client exec tsc --noEmit
pnpm --filter server exec tsc --noEmit
pnpm --filter client lint:eslint-check
pnpm --filter server lint:eslint-check
pnpm --filter client lint:stylelint-check

# 2. Unit Tests
pnpm --filter client test:unit

# 3. Build Validation
pnpm --filter client build
pnpm --filter server dist
```
