import React from 'react';
import { createPortal } from 'react-dom';
import { Toast, type ToastProps, type ToastPosition } from './Toast';
import styles from './ToastContainer.module.css';

export interface ToastData extends Omit<ToastProps, 'onClose'> {
  id: string;
  message: string;
  variant?: ToastProps['variant'];
  duration?: number;
  position?: ToastPosition;
}

interface ToastContainerProps {
  toasts: ToastData[];
  onClose: (id: string) => void;
  position?: ToastPosition;
}

/**
 * ToastContainer Component
 * Container for all toast notifications
 */
export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onClose,
  position = 'top-right',
}) => {
  if (toasts.length === 0) return null;

  const positionClass = styles[`container--${position}`] || styles['container--top-right'];

  const content = (
    <div className={[styles.container, positionClass].filter(Boolean).join(' ')}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} position={position} />
      ))}
    </div>
  );

  return createPortal(content, document.body);
};

