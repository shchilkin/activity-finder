# Coding Principles for AI Agents

This document outlines coding standards and principles for this project, especially when working with AI coding assistants.

## Agent Onboarding

Welcome! This is a Next.js app for browsing community activities. Start here:

### Quick Orientation

1. **Read the [README.md](README.md)** - Project overview, setup, and essential commands
2. **Review [docs/testing-guide.md](docs/testing-guide.md)** - Testing philosophy and best practices
3. **Review [docs/storybook-guide.md](docs/storybook-guide.md)** - Component documentation standards
4. **Check [FUTURE-IMPROVEMENTS.md](FUTURE-IMPROVEMENTS.md)** - Known limitations and planned work

### Key Project Info

- **Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, Zod
- **Testing:** Vitest + React Testing Library
- **Component Docs:** Storybook 10
- **Data:** Mock JSON data in `src/data/activities.json` (no backend)
- **No Auth:** This is a demo - users can edit any participant data by name

### File Structure

```text
src/
├── app/              # Next.js pages (App Router)
├── components/       # React components with .stories and .test files
├── data/             # Mock activity data
├── services/         # Business logic (ActivityService)
├── schemas/          # Zod validation schemas
└── utils/            # Helper functions
```

### Before You Code

1. **Understand the context** - Read related files, tests, and stories
2. **Follow the principles below** - Especially testing and Storybook guidelines
3. **Quality over speed** - Thoughtful implementation beats quick fixes
4. **Ask before major changes** - Confirm approach for significant refactors

### Common Tasks

- **Run the app:** `npm run dev` (port 3000)
- **Run tests:** `npm test` (watch mode)
- **Run Storybook:** `npm run storybook` (port 6006)
- **Lint code:** `npm run lint`

## Testing

**See [Testing Guide](docs/testing-guide.md)** for comprehensive testing guidelines.

### Testing Quick Reference

**Core Principle:** Test behavior, not implementation.

**Before writing any test, ask:**

1. Does this test verify the actual output/result?
2. Would this test fail if I broke the function's contract?
3. Am I mocking too much?
4. Does this test bring value?
5. Am I testing TypeScript's type system?

**Remember:** A test that looks comprehensive but doesn't validate the actual business requirement is worse than no test - it creates false confidence.

**Quality over quantity.** If removing a test wouldn't reduce your confidence in the code, delete it.

## Storybook

**See [Storybook Guide](docs/storybook-guide.md)** for comprehensive guidelines on writing effective stories.

### Storybook Quick Reference

**Core Principle:** Stories should demonstrate real-world usage.

**Before writing any story, ask:**

1. Does this story show a meaningful state?
2. Would a developer or designer need to see this scenario?
3. Does this demonstrate real-world usage?
4. Is this already covered by TypeScript or interactive controls?
5. Does this help understand component behavior?

**Remember:** A story that doesn't help someone understand your component is just noise.

**Quality over quantity.** If removing a story wouldn't reduce understanding of the component, delete it.
