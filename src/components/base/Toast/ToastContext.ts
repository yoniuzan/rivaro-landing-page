import { createContext } from 'react';
import type { ToastVariant, ToastPosition } from './Toast';

interface ToastOptions {
  variant?: ToastVariant;
  duration?: number;
  position?: ToastPosition;
}

export interface ToastContextValue {
  showToast: (message: string, options?: ToastOptions) => void;
  showSuccess: (message: string, options?: Omit<ToastOptions, 'variant'>) => void;
  showError: (message: string, options?: Omit<ToastOptions, 'variant'>) => void;
  showWarning: (message: string, options?: Omit<ToastOptions, 'variant'>) => void;
  showInfo: (message: string, options?: Omit<ToastOptions, 'variant'>) => void;
  closeToast: (id: string) => void;
  clearAll: () => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
