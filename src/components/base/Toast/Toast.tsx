import React, { useEffect } from 'react';
import { Button } from '../Button';
import styles from './Toast.module.css';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface ToastProps {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onClose: (id: string) => void;
  position?: ToastPosition;
}

/**
 * Toast Component
 * Individual toast notification
 */
export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  variant = 'info',
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [id, duration, onClose]);

  const variantIcons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div
      className={[styles.toast, styles[`toast--${variant}`]].filter(Boolean).join(' ')}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.icon}>{variantIcons[variant]}</div>
      <div className={styles.message}>{message}</div>
      <Button
        variant="link"
        size="sm"
        onClick={() => onClose(id)}
        aria-label="Close notification"
        className={styles.close}
      >
        ×
      </Button>
    </div>
  );
};
