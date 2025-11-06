# Known Limitations

## No User Authentication

**Files:** [`src/app/activity/[id]/page.tsx`](src/app/activity/[id]/page.tsx), [`ActivityInteractiveContext.tsx`](src/components/ActivityDetails/ActivityInteractiveContext.tsx)

**Problem:** Anyone can edit any participant's data by typing their name.

**Why this matters:** In a real app, users should only change their own signup status and attendance.

**What's needed for production:**

- User login system
- Server API to save changes
- Check that users can only edit their own data

**Note:** This is a demo to show how the features work. It does not save data to a server.
