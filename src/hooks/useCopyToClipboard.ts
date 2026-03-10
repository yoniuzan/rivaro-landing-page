import { useState, useCallback } from 'react';

interface CopyToClipboardResult {
  value: string | null;
  success: boolean | null;
  copy: (text: string) => Promise<void>;
  reset: () => void;
}

/**
 * useCopyToClipboard Hook
 * Copies text to clipboard with success state
 * 
 * @example
 * const { copy, success } = useCopyToClipboard();
 * 
 * <button onClick={() => copy('Hello World')}>
 *   {success ? 'Copied!' : 'Copy'}
 * </button>
 */
export function useCopyToClipboard(): CopyToClipboardResult {
  const [value, setValue] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const copy = useCallback(async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      setSuccess(false);
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setValue(text);
      setSuccess(true);
    } catch (error) {
      console.error('Failed to copy:', error);
      setValue(null);
      setSuccess(false);
    }
  }, []);

  const reset = useCallback(() => {
    setValue(null);
    setSuccess(null);
  }, []);

  return { value, success, copy, reset };
}

