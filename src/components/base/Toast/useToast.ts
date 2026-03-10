import { useContext } from 'react';
import { ToastContext } from './ToastContext';

/**
 * useToast Hook
 * Access toast notification functions
 * 
 * @example
 * const { showSuccess, showError } = useToast();
 * 
 * // Show success toast
 * showSuccess('Operation completed!');
 * 
 * // Show error toast
 * showError('Something went wrong!');
 * 
 * // Show custom toast
 * showToast('Custom message', { 
 *   variant: 'warning',
 *   duration: 5000,
 *   position: 'bottom-center'
 * });
 */
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

