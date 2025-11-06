import type { Meta, StoryObj } from '@storybook/react';
import { ActivityOverview } from './ActivityOverview';
import { ActivityInteractiveProvider } from '../ActivityInteractiveContext';
import { getMockActivity, getActivityById } from '@/data/mockActivity';
import type { Activity } from '@/schemas/activity';

// Wrapper to provide context
function ActivityOverviewWrapper({ activity }: { activity: Activity }) {
  return (
    <ActivityInteractiveProvider activity={activity}>
      <ActivityOverview />
    </ActivityInteractiveProvider>
  );
}

const meta: Meta<typeof ActivityOverviewWrapper> = {
  title: 'Activity Details/Activity Overview',
  component: ActivityOverviewWrapper,
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

// Default state with moderate participation
export const Default: Story = {
  args: {
    activity: getMockActivity(),
  },
};

// New activity with no signups
export const NoSignups: Story = {
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
      ...getActivityById(4)!,
      signedUp: Array(11)
        .fill(0)
        .map((_, i) => `Participant ${i + 1}`),
      participated: Array(8)
        .fill(0)
        .map((_, i) => `Participant ${i + 1}`),
    },
  },
};

// Fully booked event
export const FullyBooked: Story = {
  args: {
    activity: {
      ...getActivityById(15)!,
      capacity: 10,
      signedUp: Array(10)
        .fill(0)
        .map((_, i) => `Participant ${i + 1}`),
      participated: Array(7)
        .fill(0)
        .map((_, i) => `Participant ${i + 1}`),
    },
  },
};

// Perfect participation rate
export const PerfectParticipation: Story = {
  args: {
    activity: getActivityById(4)!,
  },
};

// Low participation rate
export const LowParticipation: Story = {
  args: {
    activity: {
      ...getActivityById(5)!,
      signedUp: ['Alice', 'Bob', 'Carol', 'David'],
      participated: ['Alice'], // Only 25% participated
    },
  },
};

// Large event with high demand
export const LargeEvent: Story = {
  args: {
    activity: {
      ...getActivityById(13)!,
      signedUp: Array(150)
        .fill(0)
        .map((_, i) => `Runner ${i + 1}`),
      participated: Array(120)
        .fill(0)
        .map((_, i) => `Runner ${i + 1}`),
    },
  },
};

// Small intimate event
export const SmallEvent: Story = {
  args: {
    activity: {
      ...getMockActivity(),
      capacity: 6,
      signedUp: ['Alice', 'Bob', 'Carol', 'Diana'],
      participated: ['Alice', 'Bob', 'Carol'],
    },
  },
};
