import type { Meta, StoryObj } from '@storybook/react';
import { EventCard } from './EventCard';
import { getMockActivity, getActivityById } from '../../data/mockActivity';

const meta: Meta<typeof EventCard> = {
  title: 'Components/Event Card',
  component: EventCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0f172a', // slate-900
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Activity title',
    },
    date: {
      control: 'text',
      description: 'Activity date (YYYY-MM-DD format)',
    },
    time: {
      control: 'text',
      description: 'Activity time (HH:MM format)',
    },
    location: {
      control: 'text',
      description: 'Activity location',
    },
    capacity: {
      control: { type: 'number', min: 1, max: 200 },
      description: 'Maximum capacity',
    },
    signedUp: {
      control: 'object',
      description: 'Array of signed up participants',
    },
    participated: {
      control: 'object',
      description: 'Array of participants who attended',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with good availability
export const Default: Story = {
  args: getMockActivity(),
};

// Popular event with high signup rate
export const HighDemand: Story = {
  args: getActivityById(13), // Charity Run 5K - large capacity event
};

// Almost full event
export const AlmostFull: Story = {
  args: {
    ...getActivityById(4)!, // Cooking class
    signedUp: Array(11)
      .fill(0)
      .map((_, i) => `Participant ${i + 1}`),
    participated: Array(8)
      .fill(0)
      .map((_, i) => `Participant ${i + 1}`),
  },
};

// Full event
export const FullEvent: Story = {
  args: {
    ...getActivityById(15)!, // Pottery Workshop (capacity 10)
    signedUp: Array(10)
      .fill(0)
      .map((_, i) => `Participant ${i + 1}`),
    participated: Array(7)
      .fill(0)
      .map((_, i) => `Participant ${i + 1}`),
  },
};

// Low participation event
export const LowParticipation: Story = {
  args: {
    ...getActivityById(5)!, // Book Club Meeting
    participated: ['Quinn Hall'], // Only 1 out of 4 participated
  },
};

// Perfect attendance event
export const PerfectAttendance: Story = {
  args: getActivityById(4), // Cooking Class - 100% attendance
};

// New event with no participation history
export const NewEvent: Story = {
  args: {
    id: 99,
    title: 'Future AI Workshop',
    date: '2025-12-15',
    time: '14:00',
    location: 'Tech Hub',
    capacity: 25,
    signedUp: ['Early Bird 1', 'Early Bird 2', 'Early Bird 3'],
    participated: [], // No participation history yet
  },
};

// Large capacity event
export const LargeEvent: Story = {
  args: {
    ...getActivityById(13)!, // Charity Run 5K
    signedUp: Array(150)
      .fill(0)
      .map((_, i) => `Runner ${i + 1}`),
    participated: Array(120)
      .fill(0)
      .map((_, i) => `Runner ${i + 1}`),
  },
};

// Small intimate event
export const IntimateEvent: Story = {
  args: {
    id: 88,
    title: 'Wine & Paint Night',
    date: '2025-11-22',
    time: '19:00',
    location: 'Art Loft',
    capacity: 6,
    signedUp: ['Alice', 'Bob', 'Carol', 'Diana'],
    participated: ['Alice', 'Bob', 'Carol'],
  },
};

// Event with long title
export const LongTitle: Story = {
  args: {
    id: 77,
    title:
      'Advanced Machine Learning and Deep Neural Networks: A Comprehensive Workshop for Data Scientists',
    date: '2025-11-30',
    time: '09:00',
    location: 'University Research Center Building A Room 301',
    capacity: 40,
    signedUp: Array(35)
      .fill(0)
      .map((_, i) => `Researcher ${i + 1}`),
    participated: Array(28)
      .fill(0)
      .map((_, i) => `Researcher ${i + 1}`),
  },
};
