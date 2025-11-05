# Coding Principles for AI Agents

This document outlines coding standards and principles for this project, especially when working with AI coding assistants.

## Testing

**See [Testing Guide](docs/testing-guide.md)** for comprehensive testing guidelines.

### Quick Reference

**Core Principle:** Test behavior, not implementation.

**Before writing any test, ask:**

1. Does this test verify the actual output/result?
2. Would this test fail if I broke the function's contract?
3. Am I mocking too much?
4. Does this test bring value?
5. Am I testing TypeScript's type system?

**Remember:** A test that looks comprehensive but doesn't validate the actual business requirement is worse than no test - it creates false confidence.

**Quality over quantity.** If removing a test wouldn't reduce your confidence in the code, delete it.
