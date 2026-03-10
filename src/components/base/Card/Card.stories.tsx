import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Typography } from '../Typography';

const meta: Meta<typeof Card> = {
  title: 'Base/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled', 'flat'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    padding: 'md',
    children: (
      <div>
        <Typography variant="h5">Elevated Card</Typography>
        <Typography variant="body2" color="text-secondary">This is the default card style with a shadow.</Typography>
      </div>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    padding: 'md',
    children: (
      <div>
        <Typography variant="h5">Outlined Card</Typography>
        <Typography variant="body2" color="text-secondary">This card has a border and no shadow.</Typography>
      </div>
    ),
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    padding: 'md',
    children: (
      <div>
        <Typography variant="h5">Filled Card</Typography>
        <Typography variant="body2" color="text-secondary">This card has a background color.</Typography>
      </div>
    ),
  },
};

