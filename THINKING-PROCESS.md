# Thinking Process & Decisions

My approach to building this Activity Finder app, the choices I made, and why.

## What I Focused On

### Core Features

- Browse activities with clear information
- Detailed pages for each activity
- Interactive signup and attendance tracking
- Works well on mobile and desktop

### Code Quality

- TypeScript everywhere for type safety
- Component-driven architecture
- Tests where they matter most (business logic)
- Storybook for component docs and tests
- Automatic formatting and linting

## What I Time-boxed

### Testing

I focused tests on business logic - services, utilities, and schemas. For components, I used Storybook instead of React Testing Library. Skipped E2E tests.

**Why:** Business logic tests catch the most bugs. Storybook does double duty for documentation and visual testing. E2E tests are valuable but take time to set up properly.

### Features I Kept Simple

- No backend - JSON data works fine for a demo
- No auth - not needed for this assignment
- No search/filtering - focused on the core experience
- Basic animations - subtle, not flashy

**Why:** These features weren't critical for showing front-end skills. The core flow (browse → view details → interact) was more important.

## Tech Stack Choices

### React 19

Popular choice with a huge ecosystem. Component-based architecture keeps code maintainable. Latest version with better performance.

### Next.js 16 (App Router)

Officially recommended by React. Latest features like Server Components and App Router. Built-in routing and optimization.

**Trade-off:** Some features aren't needed for this demo, but the developer experience is excellent and it's production-ready if needed.

### TypeScript 5

Type safety catches bugs before runtime. Better IDE support. Professional standard.

**Trade-off:** Bit more setup time, but worth it for maintainability.

### Tailwind CSS 4

Fast styling without switching between files. Makes responsive design straightforward.

**Trade-off:** Class names can get long, but the development speed makes up for it.

### Zod

Runtime validation that works with TypeScript. Single source of truth for data shapes.

**Trade-off:** Could use plain TypeScript types, but Zod catches issues at runtime that TypeScript can't.

### Storybook 10

Best tool for component-driven development. Living documentation that stays up to date.

**Trade-off:** Takes time to set up, but invaluable for showcasing components.

### Vitest

Fast, modern testing. Works great with Next.js. Jest-compatible API.

**Trade-off:** Newer than Jest, but the performance and experience are better.

### Motion (Framer Motion)

Simple animations that make the UI feel polished.

**Trade-off:** Adds to bundle size, but I kept usage minimal.

### Vercel

Automatic deployment from GitHub. One-click setup. Preview for every PR. Free.

**Trade-off:** Some vendor lock-in, but perfect for demos.

### GitHub Actions

Easy CI/CD setup. Runs tests and linting on PRs automatically.

**Trade-off:** Could use other tools, but this is the most convenient with GitHub.

### DX Tools (Prettier, ESLint, Husky, lint-staged)

Automatic code formatting and quality checks. Pre-commit hooks prevent bad code.

**Trade-off:** Initial setup and occasional formatting conflicts, but keeps code consistent and catches issues early.

## Architecture Choices

### Component Structure

Tests and stories live next to their components.

**Why:** Easy to find everything related to a component. Encourages writing docs and tests.

### Service Layer

Business logic lives in service classes (like ActivityService).

**Why:** Keeps components focused on UI. Makes logic easy to test. Simple to swap data sources later.

### State Management

React Context for interactive state. No Redux or Zustand.

**Why:** Context is enough for this app's complexity. Shows I understand when not to over-engineer.

**Trade-off:** Bigger apps might need more, but that would be overkill here.

### Validation

Zod schemas validate data at the boundary.

**Why:** TypeScript checks types at compile time. Zod catches runtime issues from JSON data.

## What I'd Add With More Time

See [FUTURE-IMPROVEMENTS.md](FUTURE-IMPROVEMENTS.md) for the full list:

- Search and filtering
- Real backend and authentication
- E2E tests with Playwright
- Deploy Storybook publicly
- Visual regression testing with Chromatic
