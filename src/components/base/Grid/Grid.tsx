import React from 'react';
import { useWindowSize } from '@hooks/useWindowSize';
import { getResponsiveValue, type ResponsiveValue } from '@utils/responsive';
import styles from './Grid.module.css';

export interface GridProps {
  children: React.ReactNode;
  columns?: ResponsiveValue<number>;
  gap?: ResponsiveValue<number>;
  rowGap?: ResponsiveValue<number>;
  columnGap?: ResponsiveValue<number>;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Grid Component
 * Responsive grid layout with configurable columns and gaps
 */
export const Grid: React.FC<GridProps> = ({
  children,
  columns = 1,
  gap,
  rowGap,
  columnGap,
  className = '',
  style = {},
}) => {
  const { width } = useWindowSize();
  
  const currentColumns = getResponsiveValue(columns, width);
  const currentGap = gap !== undefined ? getResponsiveValue(gap, width) : undefined;
  const currentRowGap = rowGap !== undefined ? getResponsiveValue(rowGap, width) : currentGap;
  const currentColumnGap = columnGap !== undefined ? getResponsiveValue(columnGap, width) : currentGap;

  const gridStyle: React.CSSProperties = {
    gridTemplateColumns: `repeat(${currentColumns}, 1fr)`,
    ...style,
  };

  if (currentRowGap !== undefined) {
    gridStyle.rowGap = typeof currentRowGap === 'number' ? `${currentRowGap}px` : currentRowGap;
  }

  if (currentColumnGap !== undefined) {
    gridStyle.columnGap = typeof currentColumnGap === 'number' ? `${currentColumnGap}px` : currentColumnGap;
  }

  return (
    <div className={[styles.grid, className].filter(Boolean).join(' ')} style={gridStyle}>
      {children}
    </div>
  );
};

