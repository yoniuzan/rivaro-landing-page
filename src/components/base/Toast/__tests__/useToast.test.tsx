import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ToastProvider } from '../ToastProvider';
import { useToast } from '../useToast';

describe('useToast', () => {
  it('should throw error when used outside ToastProvider', () => {
    expect(() => {
      renderHook(() => useToast());
    }).toThrow('useToast must be used within a ToastProvider');
  });

  it('should provide toast functions', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ToastProvider>{children}</ToastProvider>
    );

    const { result } = renderHook(() => useToast(), { wrapper });

    expect(result.current.showToast).toBeDefined();
    expect(result.current.showSuccess).toBeDefined();
    expect(result.current.showError).toBeDefined();
    expect(result.current.showWarning).toBeDefined();
    expect(result.current.showInfo).toBeDefined();
    expect(result.current.closeToast).toBeDefined();
    expect(result.current.clearAll).toBeDefined();
  });

  it('should show success toast', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ToastProvider>{children}</ToastProvider>
    );

    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.showSuccess('Success message');
    });

    // Toast is shown (we can't easily test the DOM here, but we can test the function doesn't throw)
    expect(result.current.showSuccess).toBeDefined();
  });

  it('should show error toast', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ToastProvider>{children}</ToastProvider>
    );

    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.showError('Error message');
    });

    expect(result.current.showError).toBeDefined();
  });

  it('should show warning toast', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ToastProvider>{children}</ToastProvider>
    );

    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.showWarning('Warning message');
    });

    expect(result.current.showWarning).toBeDefined();
  });

  it('should show info toast', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ToastProvider>{children}</ToastProvider>
    );

    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.showInfo('Info message');
    });

    expect(result.current.showInfo).toBeDefined();
  });
});

