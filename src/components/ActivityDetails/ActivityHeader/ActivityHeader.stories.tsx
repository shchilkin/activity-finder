import type { Meta, StoryObj } from '@storybook/react';
import { ActivityHeader } from './ActivityHeader';
import { getMockActivity, getActivityById } from '@/data/mockActivity';

const meta: Meta<typeof ActivityHeader> = {
  title: 'Activity Details/Activity Header',
  component: ActivityHeader,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    activity: {
      control: 'object',
      description: 'Activity data',
    },
    spotsLeft: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Number of spots remaining',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default state with spots available
export const Default: Story = {
  args: {
    activity: getMockActivity(),
    spotsLeft: 15,
  },
};

// Few spots left
export const FewSpotsLeft: Story = {
  args: {
    activity: getMockActivity(),
    spotsLeft: 3,
  },
};

// One spot left
export const OneSpotLeft: Story = {
  args: {
    activity: getMockActivity(),
    spotsLeft: 1,
  },
};

// Fully booked
export const FullyBooked: Story = {
  args: {
    activity: getMockActivity(),
    spotsLeft: 0,
  },
};

// Long activity title
export const LongTitle: Story = {
  args: {
    activity: {
      ...getMockActivity(),
      title:
        'Advanced Machine Learning and Deep Neural Networks: A Comprehensive Workshop for Data Scientists and AI Researchers',
    },
    spotsLeft: 12,
  },
};

// Long location name
export const LongLocation: Story = {
  args: {
    activity: {
      ...getMockActivity(),
      location: 'University Research Center Building A, Room 301, 3rd Floor',
    },
    spotsLeft: 8,
  },
};

// Large capacity event
export const LargeEvent: Story = {
  args: {
    activity: {
      ...getActivityById(13)!,
      capacity: 200,
    },
    spotsLeft: 50,
  },
};

// Small intimate event
export const SmallEvent: Story = {
  args: {
    activity: {
      ...getMockActivity(),
      capacity: 5,
    },
    spotsLeft: 2,
  },
};
