import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastProvider } from './ToastProvider';
import { useToast } from './useToast';
import { Button } from '../Button';
import { Flex } from '../Flex';

const meta: Meta<typeof ToastProvider> = {
  title: 'Base/Toast',
  component: ToastProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ToastDemo = () => {
  const { showSuccess, showError, showWarning, showInfo, showToast } = useToast();

  return (
    <Flex direction="column" gap={16}>
      <Flex gap={16}>
        <Button variant="primary" onClick={() => showSuccess('Success! Operation completed.')}>
          Show Success
        </Button>
        <Button variant="danger" onClick={() => showError('Error! Something went wrong.')}>
          Show Error
        </Button>
      </Flex>
      <Flex gap={16}>
        <Button variant="secondary" onClick={() => showWarning('Warning! Check your inputs.')}>
          Show Warning
        </Button>
        <Button variant="link" onClick={() => showInfo('Info: This is a notification.')}>
          Show Info
        </Button>
      </Flex>
      <Button 
        onClick={() => showToast('Custom Position', { position: 'bottom-center' })}
      >
        Show at Bottom Center
      </Button>
    </Flex>
  );
};

export const Demo: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <ToastDemo />
    </ToastProvider>
  ),
  args: {
    defaultDuration: 3000,
    defaultPosition: 'top-right',
  },
};
