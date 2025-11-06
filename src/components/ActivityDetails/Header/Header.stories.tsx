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

// Short title
export const ShortTitle: Story = {
  args: {
    title: 'Yoga',
  },
};

// Long title that will truncate
export const LongTitle: Story = {
  args: {
    title:
      'Annual Company-Wide Summer Beach Volleyball Championship Tournament with Prizes',
  },
};

// Title with special characters
export const SpecialCharacters: Story = {
  args: {
    title: 'Coffee & Code: TypeScript → React ⚛️',
  },
};

// Title with emoji
export const WithEmoji: Story = {
  args: {
    title: '🏐 Beach Volleyball 🌊',
  },
};
