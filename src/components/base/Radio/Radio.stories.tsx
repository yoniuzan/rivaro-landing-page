import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Base/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    helperText: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Radio Option',
    name: 'radio-group',
    value: '1',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Radio',
    name: 'radio-group',
    value: '1',
    checked: true,
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Error Radio',
    error: true,
    helperText: 'This is an error message',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Radio',
    disabled: true,
  },
};

export const RadioGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Radio name="group1" value="1" label="Option 1" />
      <Radio name="group1" value="2" label="Option 2" />
      <Radio name="group1" value="3" label="Option 3" />
    </div>
  ),
};

