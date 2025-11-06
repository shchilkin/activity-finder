import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Activity Details/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Activity title',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default state with a typical activity title
export const Default: Story = {
  args: {
    title: 'Beach Volleyball Tournament',
  },
};

// Long title that demonstrates truncation behavior
export const LongTitle: Story = {
  args: {
    title:
      'Annual Company-Wide Summer Beach Volleyball Championship Tournament with Prizes and Awards Ceremony',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows how the header handles very long titles with CSS truncation.',
      },
    },
  },
};
