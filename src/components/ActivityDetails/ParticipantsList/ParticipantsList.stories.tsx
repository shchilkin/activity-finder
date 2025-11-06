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

// Default state with some participants
export const Default: Story = {
  args: {
    activity: getMockActivity(),
  },
};

// Empty state - no signups
export const NoParticipants: Story = {
  args: {
    activity: {
      ...getMockActivity(),
      signedUp: [],
      participated: [],
    },
  },
};

// Single participant
export const SingleParticipant: Story = {
  args: {
    activity: {
      ...getMockActivity(),
      signedUp: ['Alice Johnson'],
      participated: ['Alice Johnson'],
    },
  },
};

// Few participants with mixed status
export const FewParticipants: Story = {
  args: {
    activity: {
      ...getMockActivity(),
      signedUp: ['Alice Johnson', 'Bob Smith', 'Carol Williams', 'David Brown'],
      participated: ['Alice Johnson', 'Carol Williams'],
    },
  },
};

// Many participants
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
};

// All participated
export const PerfectAttendance: Story = {
  args: {
    activity: getActivityById(4)!,
  },
};

// None participated yet
export const NoParticipation: Story = {
  args: {
    activity: {
      ...getMockActivity(),
      signedUp: ['Alice', 'Bob', 'Carol', 'David', 'Eve'],
      participated: [],
    },
  },
};

// Names with different lengths
export const VariedNames: Story = {
  args: {
    activity: {
      ...getMockActivity(),
      signedUp: [
        'A',
        'Bo',
        'Dr. Christopher Alexander Montgomery III',
        'Jane',
        'Maria García López',
        'Xi',
      ],
      participated: ['Bo', 'Jane', 'Xi'],
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tests how the component handles names of varying lengths, including very short and very long names.',
      },
    },
  },
};
