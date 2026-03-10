import { useState, useEffect } from 'react';
import { isMobile } from '@utils/responsive';

/**
 * Hook to check if current viewport is mobile
 * Returns true if width < md breakpoint (768px)
 */
export const useIsMobile = (): boolean => {
  const [mobile, setMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return isMobile(window.innerWidth);
    }
    return false; // Default for SSR
  });

  useEffect(() => {
    const handleResize = () => {
      const newMobile = isMobile(window.innerWidth);
      if (newMobile !== mobile) {
        setMobile(newMobile);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobile]);

  return mobile;
};

