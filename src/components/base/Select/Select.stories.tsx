import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Base/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    searchable: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    helperText: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Disabled Option', disabled: true },
];

export const Default: Story = {
  args: {
    options,
    placeholder: 'Select an option',
  },
};

export const WithLocaleDefaults: Story = {
  args: {
    options,
    // No placeholder provided, so it should use the default from translation
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the default placeholder text which changes based on the current locale (try switching language in the toolbar).',
      },
    },
  },
};

export const Searchable: Story = {
  args: {
    options,
    placeholder: 'Search...',
    searchable: true,
  },
};

export const WithValue: Story = {
  args: {
    options,
    value: 'option2',
  },
};

export const ErrorState: Story = {
  args: {
    options,
    error: true,
    helperText: 'This is an error message',
  },
};

export const Disabled: Story = {
  args: {
    options,
    disabled: true,
  },
};
