import type { Meta, StoryObj } from '@storybook/react';
import { ParticipantsList } from './ParticipantsList';
import { ActivityInteractiveProvider } from '../ActivityInteractiveContext';
import { getMockActivity, getActivityById } from '@/data/mockActivity';
import type { Activity } from '@/schemas/activity';

// Wrapper to provide context
function ParticipantsListWrapper({ activity }: { activity: Activity }) {
  return (
    <ActivityInteractiveProvider activity={activity}>
      <ParticipantsList />
    </ActivityInteractiveProvider>
  );
}

const meta: Meta<typeof ParticipantsListWrapper> = {
  title: 'Activity Details/Participants List',
  component: ParticipantsListWrapper,
  parameters: {
    layout: 'padded',
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

/**
 * Default state showing a typical list of participants.
 */
export const Default: Story = {
  args: {
    activity: getMockActivity(),
  },
};

/**
 * Empty state when no one has signed up yet.
 * Demonstrates the fallback message.
 */
export const NoParticipants: Story = {
  args: {
    activity: {
      ...getMockActivity(),
      signedUp: [],
      participated: [],
    },
  },
};

/**
 * Many participants demonstrating grid layout and wrapping behavior.
 * Shows how the component handles large lists (note: no pagination implemented yet).
 */
export const ManyParticipants: Story = {
  args: {
    activity: {
      ...getActivityById(13)!,
      signedUp: Array(24)
        .fill(0)
        .map((_, i) => `Participant ${i + 1}`),
      participated: Array(18)
        .fill(0)
        .map((_, i) => `Participant ${i + 1}`),
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates grid layout with many participants. Note that pagination is not currently implemented.',
      },
    },
  },
};
