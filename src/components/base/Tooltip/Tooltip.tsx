import React, { useState, useRef } from 'react';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

/**
 * Tooltip Component
 * Hover tooltip for additional information
 */
export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  placement = 'top',
  delay = 200,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Get RTL direction from document
  const isRTL = typeof document !== 'undefined' && document.documentElement.getAttribute('dir') === 'rtl';

  // Swap left/right placement for RTL
  const getAdjustedPlacement = () => {
    if (!isRTL) return placement;
    
    if (placement === 'left') return 'right';
    if (placement === 'right') return 'left';
    return placement;
  };

  const adjustedPlacement = getAdjustedPlacement();

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          className={[
            styles.tooltip,
            styles[`tooltip--${adjustedPlacement}`],
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          role="tooltip"
        >
          {content}
          <div className={[styles.arrow, styles[`arrow--${adjustedPlacement}`]].join(' ')} />
        </div>
      )}
    </div>
  );
};
