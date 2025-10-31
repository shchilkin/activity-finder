import type { Meta, StoryObj } from '@storybook/react';
import { Location } from './Location';

const meta: Meta<typeof Location> = {
  title: 'Event Card/Location',
  component: Location,
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
    location: {
      control: 'text',
      description: 'Location name or address',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show map pin icon',
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
    location: 'Community Center',
    showIcon: true,
  },
};

// Without icon
export const WithoutIcon: Story = {
  args: {
    location: 'Community Center',
    showIcon: false,
  },
};
