import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatusCard } from './StatusCard';
import { ActivityInteractiveProvider } from '../ActivityInteractiveContext';
import { getMockActivity } from '@/data/mockActivity';
import type { Activity } from '@/schemas/activity';
import { expect } from 'storybook/test';

// Wrapper to provide context
function StatusCardWrapper({ activity }: { activity: Activity }) {
  return (
    <ActivityInteractiveProvider activity={activity}>
      <StatusCard />
    </ActivityInteractiveProvider>
  );
}

const meta: Meta<typeof StatusCardWrapper> = {
  title: 'Activity Details/Status Card',
  component: StatusCardWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Interactive card for managing activity signup and attendance. Shows name input when not signed up, hides it after signup. Users can toggle signup and mark previous attendance for recurring activities.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent, step }) => {
    await step("Step 1: Enter name 'Alice Jackson' into input", async () => {
      const name = 'Alice Jackson';
      const input = canvas.getByRole('textbox');
      await userEvent.type(input, name);
    });

    await step('Step 2: Click Sign Up Button', async () => {
      const signUpButton = canvas.getByRole('button', {
        name: 'Sign up for this activity',
      });
      await userEvent.click(signUpButton);
    });

    await step('Step 3: Verify signed up as Alice Jackson', async () => {
      // Find by partial text since "Signed up as" and "Alice Jackson" are in different elements
      const signedUpText = canvas.getByText(/Signed up as/i);
      expect(signedUpText).toBeInTheDocument();

      // Verify the name appears in the document
      const nameText = canvas.getByText('Alice Jackson');
      expect(nameText).toBeInTheDocument();
    });

    await step('Step 4: Click Mark as Attended Button', async () => {
      // Wait for the attendance button to appear after signup
      const attendButton = await canvas.findByRole('button', {
        name: 'Mark as attended',
      });
      await userEvent.click(attendButton);

      // Verify the button text changed
      expect(attendButton).toHaveTextContent("I haven't attended before");
    });

    await step('Step 5: Click Mark as Not Attended Button', async () => {
      const attendButton = canvas.getByRole('button', {
        name: 'Mark as not attended',
      });
      await userEvent.click(attendButton);

      expect(attendButton).toHaveTextContent('I have previously attended');
    });

    await step('Step 6: Click on Cancel Signup Button', async () => {
      const cancelButton = canvas.getByRole('button', {
        name: 'Cancel my signup',
      });
      await userEvent.click(cancelButton);

      // Verify the sign up button is visible again
      const signUpButton = canvas.getByRole('button', {
        name: 'Sign up for this activity',
      });
      expect(signUpButton).toBeInTheDocument();

      // Verify status text changed back
      const statusText = canvas.getByText('Not signed up yet');
      expect(statusText).toBeInTheDocument();
    });
  },
  args: {
    activity: getMockActivity(),
  },
};
