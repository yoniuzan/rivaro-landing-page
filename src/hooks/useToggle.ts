import { useState, useCallback } from 'react';

/**
 * useToggle Hook
 * Manages a boolean state with toggle, set, and reset functions
 * 
 * @example
 * const [isOpen, { toggle, setTrue, setFalse, reset }] = useToggle(false);
 * 
 * <button onClick={toggle}>Toggle</button>
 * <button onClick={setTrue}>Open</button>
 * <button onClick={setFalse}>Close</button>
 */
export function useToggle(
  initialValue: boolean = false
): [
  boolean,
  {
    toggle: () => void;
    setTrue: () => void;
    setFalse: () => void;
    reset: () => void;
  }
] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return [value, { toggle, setTrue, setFalse, reset }];
}

