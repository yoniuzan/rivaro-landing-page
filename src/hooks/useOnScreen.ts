import { useState, useEffect, useRef, type RefObject } from 'react';

interface UseOnScreenOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

/**
 * useOnScreen Hook
 * Detects if an element is visible on screen using Intersection Observer
 * 
 * @example
 * const ref = useOnScreen<HTMLDivElement>();
 * 
 * return (
 *   <div ref={ref.ref}>
 *     {ref.isIntersecting ? 'Visible!' : 'Not visible'}
 *   </div>
 * );
 */
export function useOnScreen<T extends HTMLElement = HTMLElement>(
  options: UseOnScreenOptions = {}
): { ref: RefObject<T>; isIntersecting: boolean } {
  const { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false } = options;

  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const frozen = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If already frozen and visible, don't observe
    if (frozen.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);

        if (isElementIntersecting && freezeOnceVisible) {
          frozen.current = true;
          observer.disconnect();
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, freezeOnceVisible]);

  return { ref, isIntersecting };
}

