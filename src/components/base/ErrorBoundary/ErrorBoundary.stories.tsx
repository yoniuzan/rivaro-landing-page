import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorBoundary } from './ErrorBoundary';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Base/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const BuggyComponent = () => {
  throw new Error('I crashed!');
};

const SafeComponent = () => {
  return <div>I am safe and working correctly.</div>;
};

export const Default: Story = {
  args: {
    children: <SafeComponent />,
  },
};

export const WithError: Story = {
  render: () => (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  ),
};

export const CustomFallback: Story = {
  args: {
    fallback: (
      <div style={{ padding: '20px', border: '1px solid red', borderRadius: '8px', color: 'red' }}>
        <h2>Custom Error UI</h2>
        <p>Something went wrong, but we handled it gracefully.</p>
      </div>
    ),
    children: <BuggyComponent />,
  },
};
