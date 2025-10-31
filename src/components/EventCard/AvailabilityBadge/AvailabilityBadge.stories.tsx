import type { Meta, StoryObj } from '@storybook/react';
import { AvailabilityBadge } from './AvailabilityBadge';

const meta: Meta<typeof AvailabilityBadge> = {
  title: 'EventCard/Availability Badge',
  component: AvailabilityBadge,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0f172a' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  argTypes: {
    remaining: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Number of spots remaining',
    },
    capacity: {
      control: { type: 'number', min: 1, max: 200 },
      description: 'Total capacity of the event',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Plenty of spots available (green)
export const PlentyAvailable: Story = {
  args: {
    remaining: 15,
    capacity: 20,
  },
};

// Limited spots (amber)
export const LimitedSpots: Story = {
  args: {
    remaining: 3,
    capacity: 20,
  },
};

// Single spot remaining (red)
export const OneSpotLeft: Story = {
  args: {
    remaining: 1,
    capacity: 10,
  },
};

// Completely full
export const Full: Story = {
  args: {
    remaining: 0,
    capacity: 25,
  },
};
