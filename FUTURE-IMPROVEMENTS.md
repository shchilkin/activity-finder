# Future Improvements

Items that were not implemented due to time constraints or lower priority, but could be added in future iterations.

## Accessibility Improvements

**Files:** All component files

**Current state:** Although the `@storybook/addon-a11y` package is installed for Storybook, components might still have accessibility violations that need to be addressed.

**What could be improved:**

- Review and fix accessibility violations identified by the Storybook a11y addon
- Add proper ARIA labels and roles where missing
- Ensure proper color contrast ratios throughout the application
- Implement keyboard navigation support for interactive elements
- Add focus management for dynamic content updates
- Test with screen readers and other assistive technologies

**Priority:** High - Accessibility is essential for inclusive user experience and legal compliance.

## 404 Page Component Testing

**Files:** [`src/app/activity/[id]/not-found.tsx`](src/app/activity/[id]/not-found.tsx)

**Current state:** The 404 page is functional with error handling, but the logic is not encapsulated into a testable component.

**What could be improved:**

- Extract the 404 page logic into a separate component
- Create Storybook stories to document different states (no suggestions, with suggestions, error loading suggestions)
- Add component tests for the 404 page behavior

**Priority:** Low - The page works correctly, this is purely for better testability and documentation.

## No User Authentication

**Files:** [`src/app/activity/[id]/page.tsx`](src/app/activity/[id]/page.tsx), [`ActivityInteractiveContext.tsx`](src/components/ActivityDetails/ActivityInteractiveContext.tsx)

**Problem:** Anyone can edit any participant's data by typing their name.

**Why this matters:** In a real app, users should only change their own signup status and attendance.

**What's needed for production:**

- User login system
- Server API to save changes
- Check that users can only edit their own data

**Note:** This is a demo to show how the features work. It does not save data to a server.
