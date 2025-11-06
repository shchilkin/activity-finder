import type { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';
import { PersonChip } from './PersonChip';

const meta = {
  title: 'Components/PersonChip',
  component: PersonChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PersonChip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state showing a person who has signed up but not yet participated.
 */
export const SignedUp: Story = {
  args: {
    name: 'Alex Johnson',
    participated: false,
  },
  play: async ({ canvas }) => {
    // Verify the name is displayed
    await expect(canvas.getByText('Alex Johnson')).toBeInTheDocument();

    // Verify "Signed up" status is shown
    await expect(canvas.getByText('Signed up')).toBeInTheDocument();

    // Verify initials are displayed
    await expect(canvas.getByText('AJ')).toBeInTheDocument();
  },
};

/**
 * Shows a person who has participated in the activity with a checkmark indicator.
 */
export const Participated: Story = {
  args: {
    name: 'Sarah Mitchell',
    participated: true,
  },
  play: async ({ canvas }) => {
    // Verify the name is displayed
    await expect(canvas.getByText('Sarah Mitchell')).toBeInTheDocument();

    // Verify "Participated" status is shown
    await expect(canvas.getByText('Participated')).toBeInTheDocument();

    // Verify initials are displayed
    await expect(canvas.getByText('SM')).toBeInTheDocument();
  },
};

/**
 * Shows how long names are handled with text truncation.
 */
export const LongName: Story = {
  args: {
    name: 'Alexander Maximilian Bartholomew Wellington-Smith',
    participated: false,
  },
  play: async ({ canvas }) => {
    // Verify the full name is in the DOM (even if truncated visually)
    await expect(
      canvas.getByText('Alexander Maximilian Bartholomew Wellington-Smith'),
    ).toBeInTheDocument();

    // Verify initials are extracted correctly (first and last name)
    await expect(canvas.getByText('AW')).toBeInTheDocument();
  },
};

/**
 * Demonstrates single-word names and initial extraction.
 */
export const SingleName: Story = {
  args: {
    name: 'Madonna',
    participated: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Madonna')).toBeInTheDocument();
    // Single name should show first two letters
    await expect(canvas.getByText('MA')).toBeInTheDocument();
    await expect(canvas.getByText('Participated')).toBeInTheDocument();
  },
};
