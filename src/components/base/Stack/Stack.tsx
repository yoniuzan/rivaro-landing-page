import React from 'react';
import { useWindowSize } from '@hooks/useWindowSize';
import { getResponsiveValue, type ResponsiveValue } from '@utils/responsive';
import styles from './Stack.module.css';

export type StackDirection = 'horizontal' | 'vertical';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface StackProps {
  children: React.ReactNode;
  direction?: ResponsiveValue<StackDirection>;
  spacing?: ResponsiveValue<number>;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  divider?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Stack Component
 * Layout component for stacking elements with consistent spacing
 * 
 * @example
 * // Vertical stack
 * <Stack direction="vertical" spacing={16}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Stack>
 * 
 * // Responsive horizontal stack
 * <Stack 
 *   direction={{ mobile: 'vertical', desktop: 'horizontal' }}
 *   spacing={{ mobile: 8, desktop: 16 }}
 * >
 *   <Button>Action 1</Button>
 *   <Button>Action 2</Button>
 * </Stack>
 */
export const Stack: React.FC<StackProps> = ({
  children,
  direction = 'vertical',
  spacing = 16,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  divider,
  className = '',
  style = {},
}) => {
  const { width } = useWindowSize();
  
  const currentDirection = getResponsiveValue(direction, width);
  const currentSpacing = getResponsiveValue(spacing, width);

  const alignMap: Record<StackAlign, string> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
  };

  const justifyMap: Record<StackJustify, string> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
  };

  const isHorizontal = currentDirection === 'horizontal';
  
  const stackStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isHorizontal ? 'row' : 'column',
    alignItems: alignMap[align],
    justifyContent: justifyMap[justify],
    flexWrap: wrap ? 'wrap' : 'nowrap',
    gap: divider ? 0 : `${currentSpacing}px`,
    ...style,
  };

  // If no divider, render simple stack
  if (!divider) {
    return (
      <div className={[styles.stack, className].filter(Boolean).join(' ')} style={stackStyle}>
        {children}
      </div>
    );
  }

  // With divider, insert divider between children
  const childrenArray = React.Children.toArray(children);
  const childrenWithDividers: React.ReactNode[] = [];

  childrenArray.forEach((child, index) => {
    childrenWithDividers.push(
      <div key={`child-${index}`} className={styles['stack-item']}>
        {child}
      </div>
    );

    if (index < childrenArray.length - 1) {
      childrenWithDividers.push(
        <div
          key={`divider-${index}`}
          className={styles.divider}
          style={{
            [isHorizontal ? 'marginLeft' : 'marginTop']: `${currentSpacing / 2}px`,
            [isHorizontal ? 'marginRight' : 'marginBottom']: `${currentSpacing / 2}px`,
          }}
        >
          {divider}
        </div>
      );
    }
  });

  return (
    <div className={[styles.stack, className].filter(Boolean).join(' ')} style={stackStyle}>
      {childrenWithDividers}
    </div>
  );
};

