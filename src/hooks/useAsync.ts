import { useState, useCallback, useEffect } from 'react';

interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

interface UseAsyncReturn<T> extends AsyncState<T> {
  execute: (...args: unknown[]) => Promise<void>;
  reset: () => void;
}

/**
 * useAsync Hook
 * Handles async operations with loading and error states
 * 
 * @example
 * const { data, loading, error, execute } = useAsync(async (id: string) => {
 *   const response = await fetch(`/api/users/${id}`);
 *   return response.json();
 * });
 * 
 * useEffect(() => {
 *   execute('123');
 * }, []);
 */
export function useAsync<T>(
  asyncFunction: (...args: unknown[]) => Promise<T>,
  immediate: boolean = false
): UseAsyncReturn<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: immediate,
  });

  const execute = useCallback(
    async (...args: unknown[]) => {
      setState({ data: null, error: null, loading: true });

      try {
        const data = await asyncFunction(...args);
        setState({ data, error: null, loading: false });
      } catch (error) {
        setState({ data: null, error: error as Error, loading: false });
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, error: null, loading: false });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute, reset };
}

