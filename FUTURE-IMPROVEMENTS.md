# Future Improvements

Items that were not implemented due to time constraints or lower priority, but could be added in future iterations.

## Shuffle Algorithm in ActivityService

**Files:** [`src/services/ActivityService/ActivityService.ts`](src/services/ActivityService/ActivityService.ts)

**Current state:** The `getRandomActivities` method uses `sort(() => Math.random() - 0.5)` to shuffle activities.

**Problem:** This shuffle method has known biases and doesn't produce a uniform distribution. It's not a reliable way to randomize an array.

**What should be implemented:**

Use the Fisher-Yates shuffle algorithm instead:

```typescript
// Fisher-Yates shuffle
const shuffled = [...allActivities];
for (let i = shuffled.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
}
return shuffled.slice(0, count);
```

**Priority:** Medium - The current implementation works for demo purposes, but should be improved for production use to ensure truly random activity suggestions.

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
