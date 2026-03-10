import React from 'react';
import { useWindowSize } from '@hooks/useWindowSize';
import { getResponsiveValue, type ResponsiveValue } from '@utils/responsive';
import styles from './Typography.module.css';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline';
export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';
export type TypographyColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'text-primary' | 'text-secondary';

export interface TypographyProps {
  children: React.ReactNode;
  variant?: ResponsiveValue<TypographyVariant>;
  align?: TypographyAlign;
  color?: TypographyColor;
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

/**
 * Typography Component
 * Reusable text component with responsive variants
 */
export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body1',
  align = 'left',
  color = 'text-primary',
  weight,
  className = '',
  component,
}) => {
  const { width } = useWindowSize();
  
  const currentVariant = getResponsiveValue(variant, width);

  const variantComponentMap: Record<TypographyVariant, keyof React.JSX.IntrinsicElements> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    body1: 'p',
    body2: 'p',
    caption: 'span',
    overline: 'span',
  };

  const Component = (component || variantComponentMap[currentVariant]) as keyof React.JSX.IntrinsicElements;

  const typographyClasses = [
    styles.typography,
    styles[`typography--${currentVariant}`],
    styles[`typography--align-${align}`],
    styles[`typography--color-${color}`],
    weight ? styles[`typography--weight-${weight}`] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={typographyClasses}>
      {children}
    </Component>
  );
};
