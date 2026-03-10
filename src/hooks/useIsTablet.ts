import { useState, useEffect } from 'react';
import { isTablet } from '@utils/responsive';

/**
 * Hook to check if current viewport is tablet
 * Returns true if width >= md and < lg (768px - 991px)
 */
export const useIsTablet = (): boolean => {
  const [tablet, setTablet] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return isTablet(window.innerWidth);
    }
    return false; // Default for SSR
  });

  useEffect(() => {
    const handleResize = () => {
      const newTablet = isTablet(window.innerWidth);
      if (newTablet !== tablet) {
        setTablet(newTablet);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [tablet]);

  return tablet;
};

