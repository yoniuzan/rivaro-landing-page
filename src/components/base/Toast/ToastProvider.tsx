import React, { useState, useCallback } from 'react';
import { ToastContainer, type ToastData } from './ToastContainer';
import type { ToastVariant, ToastPosition } from './Toast';
import { ToastContext, type ToastContextValue } from './ToastContext';

interface ToastOptions {
  variant?: ToastVariant;
  duration?: number;
  position?: ToastPosition;
}

interface ToastProviderProps {
  children: React.ReactNode;
  defaultPosition?: ToastPosition;
  defaultDuration?: number;
}

/**
 * ToastProvider Component
 * Provides toast notification context to the app
 * 
 * @example
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  defaultPosition = 'top-right',
  defaultDuration = 3000,
}) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback(
    (message: string, options: ToastOptions = {}) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const newToast: ToastData = {
        id,
        message,
        variant: options.variant || 'info',
        duration: options.duration ?? defaultDuration,
        position: options.position || defaultPosition,
      };

      setToasts((prev) => [...prev, newToast]);
    },
    [defaultDuration, defaultPosition]
  );

  const showSuccess = useCallback(
    (message: string, options: Omit<ToastOptions, 'variant'> = {}) => {
      showToast(message, { ...options, variant: 'success' });
    },
    [showToast]
  );

  const showError = useCallback(
    (message: string, options: Omit<ToastOptions, 'variant'> = {}) => {
      showToast(message, { ...options, variant: 'error' });
    },
    [showToast]
  );

  const showWarning = useCallback(
    (message: string, options: Omit<ToastOptions, 'variant'> = {}) => {
      showToast(message, { ...options, variant: 'warning' });
    },
    [showToast]
  );

  const showInfo = useCallback(
    (message: string, options: Omit<ToastOptions, 'variant'> = {}) => {
      showToast(message, { ...options, variant: 'info' });
    },
    [showToast]
  );

  const closeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  const value: ToastContextValue = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    closeToast,
    clearAll,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onClose={closeToast} position={defaultPosition} />
    </ToastContext.Provider>
  );
};

