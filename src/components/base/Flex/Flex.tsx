import React from 'react';
import { useWindowSize } from '@hooks/useWindowSize';
import { getResponsiveValue, type ResponsiveValue } from '@utils/responsive';
import styles from './Flex.module.css';

export interface FlexProps {
  children: React.ReactNode;
  direction?: ResponsiveValue<'row' | 'column' | 'row-reverse' | 'column-reverse'>;
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: ResponsiveValue<number>;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Flex Component
 * Flexible layout container with responsive support
 */
export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  align = 'start',
  justify = 'start',
  wrap = 'nowrap',
  gap = 0,
  className = '',
  style = {},
}) => {
  const { width } = useWindowSize();
  
  const currentDirection = getResponsiveValue(direction, width);
  const currentGap = getResponsiveValue(gap, width);

  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
    baseline: 'baseline',
  };

  const justifyMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
  };

  return (
    <div
      className={[styles.flex, className].filter(Boolean).join(' ')}
      style={{
        flexDirection: currentDirection,
        alignItems: alignMap[align],
        justifyContent: justifyMap[justify],
        flexWrap: wrap,
        gap: typeof currentGap === 'number' ? `${currentGap}px` : currentGap,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

