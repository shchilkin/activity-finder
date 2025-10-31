# activity-finder

A web app for browsing and exploring community activities.

## Development

### Running the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Running Storybook
Storybook is configured with Next.js and Vite builder for fast development.

```bash
npm run storybook
```
This will start Storybook at [http://localhost:6006](http://localhost:6006).

To build Storybook for production:
```bash
npm run build-storybook
```

### Other Commands
- `npm run build` - Build the Next.js application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
## Development Setup

This project includes a devcontainer configuration for a consistent development environment.

### Using Dev Containers

1. Install [Docker](https://www.docker.com/products/docker-desktop) and [VS Code](https://code.visualstudio.com/)
2. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) for VS Code
3. Open this repository in VS Code
4. When prompted, click "Reopen in Container" (or use Command Palette: "Dev Containers: Reopen in Container")

The devcontainer will automatically:

- Set up a Node.js 20 environment
- Install project dependencies
- Configure ESLint, Tailwind CSS, and Prettier extensions
- Forward port 3000 for the development server

### Manual Setup

If you prefer not to use devcontainers, ensure you have Node.js 20 or later installed, then run:

```bash
npm install
```

## Mock Data

The project includes mock activities data for frontend development and testing purposes.

### Using Mock Activities Data

The mock data is located at `src/data/activities.json` and contains sample community activities with various categories, locations, and details.

To use the mock data in your components:

```typescript
import activities from '@/data/activities.json';

// Now you can use the activities array
console.log(activities); // Array of activity objects
```

Each activity object contains the following fields:
- `id`: Unique identifier
- `title`: Activity name
- `description`: Detailed description
- `category`: Activity category (e.g., "Fitness & Wellness", "Arts & Culture")
- `location`: Venue or meeting place
- `date`: Event date (YYYY-MM-DD format)
- `time`: Event time
- `duration`: Duration as a string with unit (e.g., "60 minutes", "120 minutes")
- `capacity`: Maximum number of participants
- `organizer`: Organizing group or individual
- `difficulty`: Difficulty level (Beginner, Intermediate, Advanced)
- `tags`: Array of relevant tags
- `imageUrl`: Path to activity image
- `price`: Price (e.g., "Free", "$15")

**Note:** This data is for development and testing purposes only and does not represent real activities or events.
## Testing

This project uses [Vitest](https://vitest.dev/) for unit and component testing, along with [React Testing Library](https://testing-library.com/react) for component testing.

### Running Tests

```bash
# Run tests in watch mode (interactive)
npm test

# Run tests once (CI mode)
npm run test:run

# Run tests with UI interface
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### Test Structure

- Test files are located in `src/__tests__/` directory
- Test files follow the naming convention: `*.test.tsx` or `*.test.ts`
- Example test files demonstrate testing React components with Vitest and Testing Library

### Writing Tests

The test setup includes:
- **Vitest**: Fast unit test framework with Jest-compatible API
- **@testing-library/react**: React component testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers for DOM assertions
- **jsdom**: Browser environment simulation for testing

Example test:
```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MyComponent from '../app/MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```
