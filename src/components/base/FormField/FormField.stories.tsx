import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormField } from './FormField';
import { Input } from '../Input';

const meta: Meta<typeof FormField> = {
  title: 'Base/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Username',
    children: <Input placeholder="Enter username" />,
  },
};

export const Required: Story = {
  args: {
    label: 'Email',
    required: true,
    children: <Input placeholder="Enter email" />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    required: true,
    error: 'Password is required',
    children: <Input type="password" error />,
  },
};
