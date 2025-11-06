# Future Improvements

Things I didn't implement to but might add later.

## Make the 404 Page Testable

**File:** [`src/app/activity/[id]/not-found.tsx`](src/app/activity/[id]/not-found.tsx)

**What's the situation:** The 404 page works fine, but the code is directly in the page file instead of a separate component.

**What I'd like to do:**

- Pull the 404 logic into its own component
- Add Storybook stories showing different states (with suggestions, without suggestions, error states)
- Write some tests for it

**Priority:** Low - It works, this is just for cleaner code.

## Add User Authentication

**Files:** [`src/app/activity/[id]/page.tsx`](src/app/activity/[id]/page.tsx), [`ActivityInteractiveContext.tsx`](src/components/ActivityDetails/ActivityInteractiveContext.tsx)

**The issue:** Right now, anyone can edit anyone's signup info just by typing their name. Obviously not how a real app would work.

**What a real app would need:**

- Actual user login
- A backend to save changes
- Make sure people can only edit their own data

**Note:** This is just a demo - it doesn't save anything to a server anyway.

## Deploy Storybook and Add Visual Testing

**What's the situation:** Storybook runs locally but isn't published anywhere.

**What I'd like to add:**

- Put Storybook online (GitHub Pages, Vercel, or Chromatic) so anyone can see it
- Use [Chromatic](https://www.chromatic.com/) to catch visual bugs automatically
- Update it automatically when code changes

**Why this would be useful:**

- People can see the components without cloning the repo
- Visual tests would catch accidental UI changes
- Designers could review components easily
- Makes the project look more professional

**Priority:** Medium - Nice to have but not urgent.

## Custom Mascot and Favicon

**What's the situation:** The app uses the default Next.js favicon.

**What I'd like to add:**

- Custom favicon that represents the brand
- A friendly mascot for the app
- Generate both using AI image generation (like OpenAI's DALL-E 3)

**Why this would be nice:**

- Makes the app feel more polished and unique
- Easier to spot in browser tabs
- Mascot could be used across marketing materials
- Shows attention to branding details

**Priority:** Low - Visual polish, not functionality.

## Polish the UI and Design System

**What's the situation:** The app is functional and responsive, but the design could be more refined.

**What I'd like to improve:**

- More cohesive color palette and spacing system
- Better typography hierarchy
- More thoughtful micro-interactions and animations
- Consistent component styling patterns
- Consider the design from a holistic perspective, not just feature-by-feature

**Why this matters:**

- Good design makes the app feel more professional
- Consistency across components improves user experience
- Attention to visual details shows craft and polish
- A well-designed UI is easier to use and more memorable

**Priority:** Medium - Functional now, but design polish would elevate the whole project.
