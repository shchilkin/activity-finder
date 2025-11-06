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
  },
  argTypes: {
    activity: {
      control: 'object',
      description: 'Activity data',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default state - not signed up, spots available
export const Default: Story = {
  args: {
    activity: getMockActivity(),
  },
};

// User is signed up but hasn't participated
export const SignedUp: Story = {
  args: {
    activity: {
      ...getMockActivity(),
      signedUp: ['You', 'Alice', 'Bob'],
      participated: ['Alice'],
    },
  },
};

// User is signed up and has participated
export const SignedUpAndParticipated: Story = {
  args: {
    activity: {
      ...getMockActivity(),
      signedUp: ['You', 'Alice', 'Bob'],
      participated: ['You', 'Alice'],
    },
  },
};

// Event is full but user is not signed up
export const EventFull: Story = {
  args: {
    activity: {
      ...getMockActivity(),
      capacity: 5,
      signedUp: ['Alice', 'Bob', 'Carol', 'David', 'Eve'],
      participated: ['Alice', 'Bob'],
    },
  },
};

// Event is full and user is signed up
export const EventFullUserSignedUp: Story = {
  args: {
    activity: {
      ...getMockActivity(),
      capacity: 5,
      signedUp: ['You', 'Alice', 'Bob', 'Carol', 'David'],
      participated: ['Alice', 'Bob'],
    },
  },
};

// New event with no participants
export const NewEvent: Story = {
  args: {
    activity: {
      ...getMockActivity(),
      signedUp: [],
      participated: [],
    },
  },
};

// Almost full event
export const AlmostFull: Story = {
  args: {
    activity: {
      ...getMockActivity(),
      capacity: 10,
      signedUp: Array(9)
        .fill(0)
        .map((_, i) => `Participant ${i + 1}`),
      participated: Array(6)
        .fill(0)
        .map((_, i) => `Participant ${i + 1}`),
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the signup button when there is only one spot left.',
      },
    },
  },
};
