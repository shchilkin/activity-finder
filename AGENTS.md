# Coding Principles for AI Agents

This document outlines coding standards and principles for this project, especially when working with AI coding assistants.

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
