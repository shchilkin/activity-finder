import type { Meta, StoryObj } from '@storybook/react';
import { DateTime } from './DateTime';

const meta: Meta<typeof DateTime> = {
  title: 'Event Card/DateTime',
  component: DateTime,
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
    date: {
      control: 'text',
      description: 'Date in YYYY-MM-DD format',
    },
    time: {
      control: 'text',
      description: 'Time in HH:MM format',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show calendar icon',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// With icon (default)
export const WithIcon: Story = {
  args: {
    date: '2025-11-15',
    time: '14:30',
    showIcon: true,
  },
};

// Without icon
export const WithoutIcon: Story = {
  args: {
    date: '2025-11-15',
    time: '14:30',
    showIcon: false,
  },
};
