import type { Meta, StoryObj } from '@storybook/react';
import { ActivityStatusCard } from './ActivityStatusCard';
import { ActivityInteractiveProvider } from '../ActivityInteractiveContext';
import { getMockActivity } from '@/data/mockActivity';
import type { Activity } from '@/schemas/activity';

// Wrapper to provide context
function ActivityStatusCardWrapper({ activity }: { activity: Activity }) {
  return (
    <ActivityInteractiveProvider activity={activity}>
      <ActivityStatusCard />
    </ActivityInteractiveProvider>
  );
}

const meta: Meta<typeof ActivityStatusCardWrapper> = {
  title: 'Activity Details/Activity Status Card',
  component: ActivityStatusCardWrapper,
  parameters: {
    layout: 'centered',
    play: (canvas, userEvent, step) => {
      step;
    },
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
  args: {
    activity: getMockActivity(),
  },
};
