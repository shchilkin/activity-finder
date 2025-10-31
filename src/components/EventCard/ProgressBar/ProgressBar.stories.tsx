import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Event Card/Progress Bar',
  component: ProgressBar,
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
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    percentage: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress percentage (0-100)',
    },
    color: {
      control: { type: 'select' },
      options: ['sky', 'green', 'blue', 'purple', 'red'],
      description: 'Progress bar color theme',
    },
    animated: {
      control: 'boolean',
      description: 'Enable smooth animations',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default progress bar
export const Default: Story = {
  args: {
    percentage: 30,
    color: 'sky',
    animated: true,
  },
};
