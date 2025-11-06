# Storybook Guide

This document provides comprehensive guidelines for writing effective Storybook stories in this project.

## Table of Contents

- [Storybook Philosophy](#storybook-philosophy)
  - [Core Principle: Stories Should Demonstrate Real-World Usage](#core-principle-stories-should-demonstrate-real-world-usage)
  - [Critical Questions Before Writing Stories](#critical-questions-before-writing-stories)
  - [Warning Signs of Poor Stories](#warning-signs-of-poor-stories)
- [What to Document with Stories](#what-to-document-with-stories)
  - [✅ DO Create Stories For](#-do-create-stories-for)
  - [❌ DON'T Create Stories For](#-dont-create-stories-for)
- [Story Organization](#story-organization)
- [Controls Configuration](#controls-configuration)
- [Common Patterns](#common-patterns)
- [Composition Patterns](#composition-patterns)
- [Story Maintenance](#story-maintenance)
- [Accessibility Checks](#accessibility-checks)
- [Testing vs. Stories](#testing-vs-stories)
- [Storybook 10 Specific Features](#storybook-10-specific-features)
- [Anti-Patterns to Avoid](#anti-patterns-to-avoid)
- [Summary](#summary)

## Storybook Philosophy

### Core Principle: Stories Should Demonstrate Real-World Usage

Stories are **living documentation** that demonstrate how components behave in real scenarios. Focus on **meaningful states** that developers and designers will actually encounter.

### Document Behavior, Not Props

**Bad:** Creating a story for every possible prop combination

```typescript
// ❌ This adds no value - it just shows the prop works
export const WithCustomClassName: Story = {
  args: {
    ...Default.args,
    className: 'custom-class',
  },
};

// ❌ Testing boolean flags without meaningful context
export const ShowIconTrue: Story = {
  args: { showIcon: true },
};

export const ShowIconFalse: Story = {
  args: { showIcon: false },
};
```

**Good:** Demonstrating real-world states and use cases

```typescript
// ✅ Shows a meaningful business state
export const AlmostFull: Story = {
  args: {
    capacity: 20,
    signedUp: Array(18)
      .fill(0)
      .map((_, i) => `Participant ${i + 1}`),
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the warning state when only a few spots remain.',
      },
    },
  },
};

// ✅ Demonstrates edge case that affects UI
export const FullyBooked: Story = {
  args: {
    capacity: 10,
    signedUp: Array(10)
      .fill(0)
      .map((_, i) => `Participant ${i + 1}`),
  },
};
```

### Critical Questions Before Writing Stories

Before creating any story, ask yourself:

1. **Does this story show a meaningful state?**
   - If not, it's probably just prop permutation without purpose.

2. **Would a developer or designer need to see this scenario?**
   - If nobody will benefit from seeing it, don't create it.

3. **Does this demonstrate real-world usage?**
   - Stories should reflect actual use cases, not theoretical possibilities.

4. **Is this already covered by TypeScript or interactive controls?**
   - Don't create stories just to show that props exist.

5. **Does this help understand component behavior?**
   - If the story doesn't clarify how or when to use the component, skip it.

### Warning Signs of Poor Stories

- ❌ Stories that only change a single boolean prop without context
- ❌ Stories for `className` or `style` props (use controls instead)
- ❌ Stories that show "with prop X" and "without prop X" without meaningful difference
- ❌ Stories testing every possible data type (that's what TypeScript is for)
- ❌ Excessive stories that overwhelm the Storybook navigation
- ❌ Stories without descriptive names or documentation

**Remember:** A story that doesn't help someone understand your component is just noise. Quality over quantity.

## What to Document with Stories

### ✅ DO Create Stories For

1. **Visual States That Matter**

   ```typescript
   // Show meaningful availability states
   export const HighDemand: Story = {
     args: {
       remaining: 2,
       capacity: 50,
     },
   };

   export const PlentyAvailable: Story = {
     args: {
       remaining: 35,
       capacity: 50,
     },
   };
   ```

2. **Edge Cases & Boundary Conditions**

   ```typescript
   export const EmptyState: Story = {
     args: {
       items: [],
       emptyMessage: 'No activities found',
     },
   };

   export const SingleItem: Story = {
     args: {
       items: [mockActivity],
     },
   };

   export const MaximumItems: Story = {
     args: {
       items: Array(100).fill(mockActivity),
     },
   };
   ```

3. **Content Variations That Affect Layout**

   ```typescript
   export const LongTitle: Story = {
     args: {
       title:
         'Advanced Machine Learning and Deep Neural Networks: A Comprehensive Workshop',
       description: 'Short desc',
     },
   };

   export const LongContent: Story = {
     args: {
       title: 'Workshop',
       description: 'Lorem ipsum dolor sit amet...'.repeat(20),
     },
   };

   export const MinimalContent: Story = {
     args: {
       title: 'Yoga',
       description: 'Join us',
     },
   };
   ```

4. **Interactive States**

   ```typescript
   export const Loading: Story = {
     args: {
       isLoading: true,
     },
   };

   export const Error: Story = {
     args: {
       error: 'Failed to load activities',
     },
   };

   export const Success: Story = {
     args: {
       data: mockActivities,
     },
   };
   ```

5. **Responsive Behavior (when significant)**

   ```typescript
   export const MobileView: Story = {
     args: Default.args,
     parameters: {
       viewport: {
         defaultViewport: 'mobile1',
       },
     },
   };
   ```

6. **Accessibility States**

   ```typescript
   export const Disabled: Story = {
     args: {
       disabled: true,
       label: 'Submit',
     },
   };

   export const WithError: Story = {
     args: {
       error: 'Email is required',
       label: 'Email',
       value: '',
     },
   };
   ```

### ❌ DON'T Create Stories For

1. **Styling Props Without Meaningful Context**

   ```typescript
   // ❌ Don't do this - use controls instead
   export const CustomClassName: Story = {
     args: {
       className: 'my-custom-class',
     },
   };

   export const CustomStyle: Story = {
     args: {
       style: { color: 'red' },
     },
   };
   ```

2. **Every Boolean Combination**

   ```typescript
   // ❌ Don't do this - no meaningful difference
   export const WithIconTrue: Story = {
     args: { showIcon: true },
   };

   export const WithIconFalse: Story = {
     args: { showIcon: false },
   };
   ```

3. **Simple Prop Variations**

   ```typescript
   // ❌ Don't create 10 stories for different text values
   export const TextVariation1: Story = {
     args: { text: 'Hello' },
   };

   export const TextVariation2: Story = {
     args: { text: 'World' },
   };
   // ... etc
   ```

4. **TypeScript Type Coverage**

   ```typescript
   // ❌ Don't create stories just to show types work
   export const WithStringProp: Story = {
     args: { value: 'string' },
   };

   export const WithNumberProp: Story = {
     args: { value: 123 },
   };
   ```

5. **Internal Implementation Details**

   ```typescript
   // ❌ Don't document internal state or private props
   export const InternalStateExample: Story = {
     // Stories should focus on public API
   };
   ```

## Story Organization

### Structure Stories by User-Facing Scenarios

Organize stories around how users or developers will encounter the component:

```typescript
const meta: Meta<typeof EventCard> = {
  title: 'Components/Event Card',
  component: EventCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Start with the most common/default state
export const Default: Story = {
  args: mockActivity,
};

// Then show important variations
export const AlmostFull: Story = {
  args: {
    /* ... */
  },
};

export const FullyBooked: Story = {
  args: {
    /* ... */
  },
};

// Edge cases last
export const LongTitle: Story = {
  args: {
    /* ... */
  },
};
```

### Use Descriptive Names

Story names should clearly convey what state they represent:

```typescript
// ✅ Good - clear and descriptive
export const AlmostFull: Story = {
  /* ... */
};
export const HighDemand: Story = {
  /* ... */
};
export const PerfectAttendance: Story = {
  /* ... */
};

// ❌ Bad - vague or technical
export const Story1: Story = {
  /* ... */
};
export const WithProps: Story = {
  /* ... */
};
export const Test: Story = {
  /* ... */
};
```

### Add Documentation When Needed

Use parameters to add context for complex stories:

```typescript
export const ComplexState: Story = {
  args: {
    /* ... */
  },
  parameters: {
    docs: {
      description: {
        story:
          'This demonstrates the warning state that appears when capacity is almost reached. The badge color changes to amber and displays "X spots left".',
      },
    },
  },
};
```

## Controls Configuration

### Configure Meaningful Controls

Provide controls that let developers explore realistic variations:

```typescript
argTypes: {
  capacity: {
    control: { type: 'number', min: 1, max: 200 },
    description: 'Maximum capacity',
  },
  signedUp: {
    control: 'object',
    description: 'Array of signed up participants',
  },
  date: {
    control: 'text',
    description: 'Activity date (YYYY-MM-DD format)',
  },
}
```

### Hide Implementation Details

Don't expose props that users shouldn't modify:

```typescript
argTypes: {
  // ❌ Don't expose internal callbacks in stories
  onInternalChange: {
    table: {
      disable: true,
    },
  },
  // ✅ Only expose relevant props
  onChange: {
    action: 'changed',
    description: 'Called when value changes',
  },
}
```

## Common Patterns

### Using Real Data

Prefer using realistic mock data over minimal examples:

```typescript
import { getMockActivity } from '@/data/mockActivity';

export const Default: Story = {
  args: getMockActivity(),
};

// Or specific data
export const HighDemand: Story = {
  args: getActivityById(13),
};
```

### Demonstrating Variants

Show component variants when they have meaningful visual differences:

```typescript
export const PrimaryButton: Story = {
  args: {
    variant: 'primary',
    children: 'Click me',
  },
};

export const DangerButton: Story = {
  args: {
    variant: 'danger',
    children: 'Delete',
  },
};

export const DisabledButton: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Cannot click',
  },
};
```

### Arrays and Lists

Generate arrays when testing list behavior:

```typescript
// Show realistic data volumes
export const ManyParticipants: Story = {
  args: {
    participants: Array(50)
      .fill(0)
      .map((_, i) => ({
        id: i,
        name: `Participant ${i + 1}`,
      })),
  },
};
```

### Background and Layout

Configure appropriate display settings:

```typescript
const meta: Meta<typeof Component> = {
  title: 'Components/MyComponent',
  component: Component,
  parameters: {
    layout: 'centered', // or 'fullscreen', 'padded'
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0f172a' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
};
```

## Composition Patterns

### Building Complex Stories from Simple Ones

Reuse configurations for related stories:

```typescript
const baseActivity = {
  id: 1,
  title: 'Yoga Class',
  date: '2025-11-15',
  time: '14:00',
  location: 'Community Center',
  capacity: 20,
};

export const Default: Story = {
  args: {
    ...baseActivity,
    signedUp: ['Alice', 'Bob'],
    participated: ['Alice'],
  },
};

export const FullCapacity: Story = {
  args: {
    ...Default.args,
    signedUp: Array(20)
      .fill(0)
      .map((_, i) => `Person ${i + 1}`),
  },
};
```

### Using Decorators

Add context or wrappers when needed:

```typescript
export const WithinContainer: Story = {
  args: Default.args,
  decorators: [
    (Story) => (
      <div style={{ width: '400px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};
```

## Story Maintenance

### Keep Stories Updated

Stories should evolve with your components:

- Remove stories for deprecated props
- Add stories for new important states
- Update mock data to reflect current data structures
- Remove stories that no longer add value

### Review Story Value Regularly

Ask yourself:

- Is this story still relevant?
- Does it demonstrate something important?
- Would removing it reduce understanding of the component?

If the answer is no, delete it.

### Avoid Story Bloat

It's better to have 5 meaningful stories than 20 variations that don't add value. Each story should:

- Show a distinct state
- Provide useful information
- Help someone understand the component better

## Accessibility Checks

This project includes the `@storybook/addon-a11y` addon to help identify and fix accessibility issues during component development.

### Using the Accessibility Panel

When you open Storybook, you'll see an "Accessibility" tab in the bottom panel (alongside "Controls" and "Actions"). This panel displays:

- **Violations**: Accessibility issues that need to be fixed (e.g., missing alt text, insufficient color contrast)
- **Passes**: Accessibility rules that the component successfully meets
- **Incomplete**: Rules that require manual verification (e.g., checking that interactive elements are keyboard accessible)

### How to Use Accessibility Checks

1. **During Development**:
   - While developing a component, check the Accessibility panel for each story
   - Address any violations before committing your code
   - Pay special attention to "Violations" (red) and "Incomplete" (yellow) items

2. **During Code Review**:
   - Review the Accessibility panel for any new or modified stories
   - Ensure no new violations are introduced
   - Verify that accessibility concerns are addressed

3. **Common Issues to Watch For**:
   - **Color Contrast**: Ensure text has sufficient contrast with its background (WCAG AA minimum: 4.5:1 for normal text, 3:1 for large text)
   - **Alt Text**: All images must have meaningful alt attributes
   - **Form Labels**: Form inputs must have associated labels
   - **ARIA Labels**: Interactive elements should have appropriate ARIA attributes
   - **Keyboard Navigation**: Ensure interactive elements are keyboard accessible
   - **Semantic HTML**: Use appropriate HTML elements (buttons, links, headings, etc.)

### Configuring Accessibility Checks

The a11y addon runs automatically on all stories using the default rules from [axe-core](https://github.com/dequelabs/axe-core). These rules follow WCAG 2.1 Level A and AA standards.

You can customize accessibility checks for specific stories:

```typescript
// Disable specific rules for a story if needed (with justification)
export const SpecialCase: Story = {
  args: Default.args,
  parameters: {
    a11y: {
      // Disable specific rules (use sparingly and document why)
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: false, // Only disable with good reason
          },
        ],
      },
    },
  },
};
```

**Note**: Disabling accessibility rules should be rare and well-justified. Always strive to fix issues rather than disable rules.

### Best Practices

- **Fix violations immediately**: Don't let accessibility issues accumulate
- **Test with keyboard**: Use Tab, Enter, Space, and Arrow keys to navigate
- **Check color contrast**: Use the accessibility panel or browser DevTools to verify contrast ratios
- **Use semantic HTML**: Prefer native HTML elements over custom implementations
- **Add ARIA when needed**: Use ARIA attributes to enhance accessibility when HTML semantics aren't enough
- **Test with screen readers**: When possible, test your components with screen readers (VoiceOver, NVDA, JAWS)

### Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [Storybook a11y Addon Documentation](https://storybook.js.org/addons/@storybook/addon-a11y)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## Testing vs. Stories

### Stories Are Not Tests

Don't try to "test" every prop with stories:

```typescript
// ❌ This is a test, not a story
export const PropsWork: Story = {
  args: {
    prop1: 'value1',
    prop2: true,
    prop3: 123,
  },
};
```

Use visual regression testing tools (like Chromatic) for automated visual testing. Stories should focus on **documentation and exploration**.

### When to Write a Test vs. a Story

**Write a test when:**

- Verifying business logic
- Testing error handling
- Checking calculations
- Validating data transformations

**Write a story when:**

- Showing visual states
- Demonstrating usage patterns
- Exploring component variations
- Documenting edge cases visually

## Storybook 10 Specific Features

### Using Story Object Format

Storybook 10 uses Component Story Format (CSF) 3.0:

```typescript
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Component> = {
  title: 'Path/To/Component',
  component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // your props
  },
};
```

### Interaction Testing with Play Functions

Play functions allow you to simulate user interactions within stories. Use them to **demonstrate** complex user flows, not to replace actual tests.

#### When to Use Play Functions

Use play functions for:

✅ **Multi-step user workflows**

```typescript
import { userEvent, within, expect } from '@storybook/test';

export const SignupFlow: Story = {
  args: Default.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Demonstrate the complete signup process
    await userEvent.type(canvas.getByLabelText('Email'), 'user@example.com');
    await userEvent.type(canvas.getByLabelText('Password'), 'SecurePass123');
    await userEvent.click(canvas.getByRole('button', { name: /sign up/i }));

    // Optional: Assert visible outcome
    await expect(canvas.getByText('Welcome!')).toBeInTheDocument();
  },
};
```

✅ **Interactive component states**

```typescript
export const ModalInteraction: Story = {
  args: Default.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Show how modal opens and can be closed
    await userEvent.click(canvas.getByRole('button', { name: /open modal/i }));
    await expect(canvas.getByRole('dialog')).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: /close/i }));
  },
};
```

✅ **Form validation demonstrations**

```typescript
export const FormValidation: Story = {
  args: Default.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Show validation errors
    await userEvent.click(canvas.getByRole('button', { name: /submit/i }));
    await expect(canvas.getByText('Email is required')).toBeInTheDocument();

    // Show correction
    await userEvent.type(canvas.getByLabelText('Email'), 'valid@email.com');
    await expect(
      canvas.queryByText('Email is required'),
    ).not.toBeInTheDocument();
  },
};
```

#### When NOT to Use Play Functions

❌ **Don't replace real tests**

```typescript
// ❌ This belongs in a unit test, not a story
export const ValidatesEmail: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('Email'), 'invalid-email');
    await expect(canvas.getByText('Invalid email')).toBeInTheDocument();

    await userEvent.clear(canvas.getByLabelText('Email'));
    await userEvent.type(canvas.getByLabelText('Email'), 'valid@email.com');
    await expect(canvas.queryByText('Invalid email')).not.toBeInTheDocument();
  },
};
// This is testing business logic - write a proper unit test instead
```

❌ **Don't test implementation details**

```typescript
// ❌ Don't do this
export const InternalState: Story = {
  play: async ({ canvasElement }) => {
    // Testing that internal functions are called
    expect(mockInternalFunction).toHaveBeenCalled();
  },
};
```

❌ **Don't create complex test suites**

```typescript
// ❌ If you need this many test cases, write proper tests
export const EdgeCase1: Story = {
  play: async () => {
    /* ... */
  },
};
export const EdgeCase2: Story = {
  play: async () => {
    /* ... */
  },
};
export const EdgeCase3: Story = {
  play: async () => {
    /* ... */
  },
};
// ... 20 more test cases
```

#### Play Functions vs. Real Tests

**Use Play Functions For:**

- Demonstrating user flows visually
- Showing component behavior in documentation
- Interactive examples for designers/stakeholders
- Smoke tests for visual regression tools

**Use Real Tests (Vitest/Jest) For:**

- Business logic validation
- Edge cases and error handling
- Data transformations
- Integration testing
- Comprehensive coverage

#### Available Tools

Storybook provides `@storybook/test` which includes:

```typescript
import { userEvent, within, expect, waitFor } from '@storybook/test';

// userEvent - simulate user interactions
await userEvent.click(element);
await userEvent.type(input, 'text');
await userEvent.selectOptions(select, 'option');
await userEvent.hover(element);

// within - scope queries to specific elements
const canvas = within(canvasElement);
const modal = within(canvas.getByRole('dialog'));

// expect - Jest-compatible assertions (use sparingly)
await expect(element).toBeInTheDocument();
await expect(element).toBeVisible();
await expect(element).toHaveTextContent('text');

// waitFor - wait for async changes
await waitFor(() => expect(canvas.getByText('Loaded')).toBeInTheDocument());
```

#### Best Practices

1. **Keep play functions focused** - One flow per story
2. **Use descriptive story names** - `FormSubmissionFlow` not `Test1`
3. **Add comments** - Explain what the interaction demonstrates
4. **Avoid excessive assertions** - Focus on visible outcomes
5. **Don't test props** - That's what TypeScript is for
6. **Use for documentation** - Help developers understand complex interactions

**Remember:** Play functions are for **demonstration**, not **testing**. If you find yourself writing complex test logic, move it to proper test files.

## Anti-Patterns to Avoid

### Story Hell

Creating too many stories makes Storybook unusable:

```typescript
// ❌ Don't do this
export const Variant1: Story = {
  /* ... */
};
export const Variant2: Story = {
  /* ... */
};
export const Variant3: Story = {
  /* ... */
};
// ... 47 more stories
```

**Solution:** Use controls and create only stories for distinct, meaningful states.

### Prop Dumping

Don't just dump all possible props into stories:

```typescript
// ❌ This doesn't help anyone
export const AllProps: Story = {
  args: {
    prop1: 'value',
    prop2: true,
    prop3: 123,
    prop4: () => {},
    prop5: { nested: 'object' },
    // ... etc
  },
};
```

### Copy-Paste Stories

Don't create near-identical stories:

```typescript
// ❌ These are too similar
export const Button1: Story = {
  args: { text: 'Click' },
};

export const Button2: Story = {
  args: { text: 'Press' },
};

export const Button3: Story = {
  args: { text: 'Submit' },
};
```

**Solution:** Use one story with controls, or demonstrate meaningful variations.

## Summary

**Quality over quantity.** Write stories that:

1. Demonstrate real-world usage and states
2. Help developers understand component behavior
3. Show meaningful visual variations
4. Document edge cases and boundaries
5. Serve as living, explorable documentation

Remember: **If removing a story wouldn't reduce understanding of the component, delete it.**

### Quick Checklist

Before creating a story, ask:

- [ ] Does this show a meaningful state?
- [ ] Would someone benefit from seeing this?
- [ ] Is this already covered by controls?
- [ ] Does this demonstrate real-world usage?
- [ ] Does the story name clearly describe what it shows?

If you can't check all boxes, reconsider whether the story is needed.
