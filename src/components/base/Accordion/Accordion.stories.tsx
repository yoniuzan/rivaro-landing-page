import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Base/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'filled'],
    },
    allowMultiple: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { id: '1', title: 'Accordion Item 1', content: 'This is the content for item 1.' },
  { id: '2', title: 'Accordion Item 2', content: 'This is the content for item 2.' },
  { id: '3', title: 'Accordion Item 3', content: 'This is the content for item 3.' },
];

export const Default: Story = {
  args: {
    items,
    variant: 'default',
  },
};

export const Bordered: Story = {
  args: {
    items,
    variant: 'bordered',
  },
};

export const MultipleExpanded: Story = {
  args: {
    items,
    allowMultiple: true,
  },
};
