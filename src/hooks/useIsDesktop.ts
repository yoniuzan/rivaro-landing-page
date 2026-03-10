import { useState, useEffect } from 'react';
import { isDesktop } from '@utils/responsive';

/**
 * Hook to check if current viewport is desktop
 * Returns true if width >= lg breakpoint (992px)
 */
export const useIsDesktop = (): boolean => {
  const [desktop, setDesktop] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return isDesktop(window.innerWidth);
    }
    return true; // Default for SSR
  });

  useEffect(() => {
    const handleResize = () => {
      const newDesktop = isDesktop(window.innerWidth);
      if (newDesktop !== desktop) {
        setDesktop(newDesktop);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [desktop]);

  return desktop;
};

