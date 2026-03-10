import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './Modal';
import { Button } from '../Button';

const meta: Meta<typeof Modal> = {
  title: 'Base/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    closeOnBackdropClick: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: false,
    title: 'Example Modal',
    children: 'This is the content of the modal.',
    onClose: () => console.log('Modal closed'),
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal 
          {...args} 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  }
};

// Import useState for the render function
import { useState } from 'react';
