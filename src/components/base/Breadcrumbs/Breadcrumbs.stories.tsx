import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Base/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    maxItems: { control: 'number' },
    separator: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Categories', href: '/products/categories' },
  { label: 'Electronics', href: '/products/categories/electronics' },
];

export const Default: Story = {
  args: {
    items,
  },
};

export const CustomSeparator: Story = {
  args: {
    items,
    separator: '>',
  },
};

export const MaxItems: Story = {
  args: {
    items,
    maxItems: 3,
  },
};
