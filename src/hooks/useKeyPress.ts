import { useState, useEffect } from 'react';

/**
 * useKeyPress Hook
 * Detects when a specific key is pressed
 * 
 * @example
 * const enterPressed = useKeyPress('Enter');
 * const escapePressed = useKeyPress('Escape');
 * 
 * useEffect(() => {
 *   if (enterPressed) {
 *     handleSubmit();
 *   }
 * }, [enterPressed]);
 */
export function useKeyPress(targetKey: string): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        setKeyPressed(true);
      }
    };

    const upHandler = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);

  return keyPressed;
}

