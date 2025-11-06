# Activity Finder

A Next.js web app for browsing and exploring community activities.

**Live Demo:** [https://activity-finder-sigma.vercel.app](https://activity-finder-sigma.vercel.app)

## About

This project was created as a front-end take-home assignment for Illusian. It's a demo application that showcases:

- Modern React/Next.js development practices
- Component-driven development with Storybook
- Comprehensive testing strategies
- TypeScript and type-safe development

**Important notes:**

- No backend - all data is stored in mock JSON files
- No authentication - anyone can edit participant data by name
- Not production-ready (see [Future Improvements](FUTURE-IMPROVEMENTS.md) for details)

**📝 [Read about my thinking process and decisions →](THINKING-PROCESS.md)**

## Tech Stack

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Zod](https://zod.dev/)** - Schema validation
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[Storybook 10](https://storybook.js.org/)** - Component documentation and testing
- **[Motion](https://motion.dev/)** - Animation library

## Prerequisites

- **Node.js** 20.0.0 or higher
- **npm** 10.0.0 or higher

Check your versions:

```bash
node --version
npm --version
```

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Essential Commands

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start development server (port 3000) |
| `npm run storybook` | Start Storybook (port 6006)          |
| `npm test`          | Run tests in watch mode              |
| `npm run build`     | Build for production                 |
| `npm run lint`      | Check code quality                   |

## Development Setup

### Option 1: Dev Container (Recommended)

1. Install [Docker](https://www.docker.com/products/docker-desktop) and [VS Code](https://code.visualstudio.com/) with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
2. Open the repository in VS Code and select "Reopen in Container"

The container includes Node.js 20, all dependencies, and configured extensions.

### Option 2: Manual Setup

Requires Node.js 20 or later:

```bash
npm install
```

## Project Structure

- `src/app/` - Next.js pages and layouts
- `src/components/` - React components with stories and tests
- `src/data/` - Mock activity data
- `src/services/` - Business logic and data services
- `src/utils/` - Utility functions and helpers
- `src/schemas/` - Zod validation schemas
- `docs/` - Development guides

## Mock Data

Sample activities are available at `src/data/activities.json` for development:

```typescript
import activities from '@/data/activities.json';
```

See inline comments in the JSON file for field descriptions.

## Documentation

- **[Thinking Process & Decisions](THINKING-PROCESS.md)** - Architectural decisions and trade-offs
- **[Testing Guide](docs/testing-guide.md)** - Comprehensive testing principles and best practices
- **[Storybook Guide](docs/storybook-guide.md)** - Guidelines for writing effective component stories
- **[Future Improvements](FUTURE-IMPROVEMENTS.md)** - Planned enhancements and known limitations

## Testing

Run tests with Vitest and React Testing Library:

```bash
npm test              # Watch mode
npm run test:run      # CI mode
npm run test:ui       # UI interface
npm run test:coverage # With coverage
```

See the [Testing Guide](docs/testing-guide.md) for detailed guidelines on writing effective tests.

## Storybook

Component documentation and visual testing:

```bash
npm run storybook         # Start dev server
npm run build-storybook   # Build static site
```

See the [Storybook Guide](docs/storybook-guide.md) for best practices on creating stories.
