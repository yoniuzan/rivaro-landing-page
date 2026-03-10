import { useState, useEffect } from 'react';
import { getCurrentBreakpoint, type Breakpoint } from '@utils/responsive';

/**
 * Hook to get current breakpoint
 * Returns the current breakpoint based on window width
 */
export const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => {
    if (typeof window !== 'undefined') {
      return getCurrentBreakpoint(window.innerWidth);
    }
    return 'md'; // Default for SSR
  });

  useEffect(() => {
    const handleResize = () => {
      const newBreakpoint = getCurrentBreakpoint(window.innerWidth);
      if (newBreakpoint !== breakpoint) {
        setBreakpoint(newBreakpoint);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return breakpoint;
};

