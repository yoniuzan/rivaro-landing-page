import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';
import { Typography } from '../Typography';

const meta: Meta<typeof Tabs> = {
  title: 'Base/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pills'],
    },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const tabs = [
  { id: '1', label: 'Tab 1', content: <Typography>Content for Tab 1</Typography> },
  { id: '2', label: 'Tab 2', content: <Typography>Content for Tab 2</Typography> },
  { id: '3', label: 'Tab 3', content: <Typography>Content for Tab 3</Typography> },
  { id: '4', label: 'Disabled', content: <Typography>Disabled Content</Typography>, disabled: true },
];

export const Default: Story = {
  args: {
    tabs,
  },
};

export const Pills: Story = {
  args: {
    tabs,
    variant: 'pills',
  },
};

export const FullWidth: Story = {
  args: {
    tabs,
    fullWidth: true,
  },
};
