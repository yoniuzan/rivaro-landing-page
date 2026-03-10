import type { Meta, StoryObj } from '@storybook/react-vite';
import { MultiSelect } from './MultiSelect';

const meta: Meta<typeof MultiSelect> = {
  title: 'Base/MultiSelect',
  component: MultiSelect,
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
    showSelectAll: { control: 'boolean' },
    helperText: { control: 'text' },
    maxTags: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
];

export const Default: Story = {
  args: {
    options,
    placeholder: 'Select frameworks',
  },
};

export const WithValues: Story = {
  args: {
    options,
    value: ['react', 'vue'],
  },
};

export const ErrorState: Story = {
  args: {
    options,
    error: true,
    helperText: 'This is an error message',
  },
};

export const MaxTags: Story = {
  args: {
    options,
    value: ['react', 'vue', 'angular', 'svelte'],
    maxTags: 2,
  },
};

