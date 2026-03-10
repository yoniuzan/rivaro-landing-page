import { breakpoints, type Breakpoint, type ResponsiveValue } from '@constants/theme';

/**
 * Responsive Utilities
 * Helper functions for responsive design
 */

// Re-export types for convenience
export type { Breakpoint, ResponsiveValue } from '@constants/theme';

// Get current breakpoint based on window width
export const getCurrentBreakpoint = (width: number): Breakpoint => {
  if (width >= breakpoints.xxl) return 'xxl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
};

// Check if current width matches a breakpoint
export const isBreakpoint = (width: number, breakpoint: Breakpoint): boolean => {
  return width >= breakpoints[breakpoint];
};

// Check if mobile (< md)
export const isMobile = (width: number): boolean => {
  return width < breakpoints.md;
};

// Check if tablet (>= md and < lg)
export const isTablet = (width: number): boolean => {
  return width >= breakpoints.md && width < breakpoints.lg;
};

// Check if desktop (>= lg)
export const isDesktop = (width: number): boolean => {
  return width >= breakpoints.lg;
};

// Get responsive value based on current breakpoint
export const getResponsiveValue = <T>(
  value: ResponsiveValue<T>,
  currentWidth: number
): T => {
  // If value is not an object, return as is
  if (typeof value !== 'object' || value === null) {
    return value as T;
  }

  const responsiveObj = value as Record<string, T>;

  // Check for specific breakpoint keys
  if (currentWidth >= breakpoints.xl && 'xl' in responsiveObj) {
    return responsiveObj.xl;
  }
  if (currentWidth >= breakpoints.lg && 'lg' in responsiveObj) {
    return responsiveObj.lg;
  }
  if (currentWidth >= breakpoints.lg && 'desktop' in responsiveObj) {
    return responsiveObj.desktop;
  }
  if (currentWidth >= breakpoints.md && 'md' in responsiveObj) {
    return responsiveObj.md;
  }
  if (currentWidth >= breakpoints.md && 'tablet' in responsiveObj) {
    return responsiveObj.tablet;
  }
  if (currentWidth >= breakpoints.sm && 'sm' in responsiveObj) {
    return responsiveObj.sm;
  }
  if ('mobile' in responsiveObj) {
    return responsiveObj.mobile;
  }
  if ('xs' in responsiveObj) {
    return responsiveObj.xs;
  }

  // Return first available value
  const firstValue = Object.values(responsiveObj)[0];
  return firstValue as T;
};

// Generate responsive CSS string
export const generateResponsiveCSS = <T>(
  property: string,
  value: ResponsiveValue<T>,
  transform?: (val: T) => string
): string => {
  if (typeof value !== 'object' || value === null) {
    const cssValue = transform ? transform(value as T) : String(value);
    return `${property}: ${cssValue};`;
  }

  const responsiveObj = value as Record<string, T>;
  let css = '';

  // Base value (mobile first)
  if ('mobile' in responsiveObj || 'xs' in responsiveObj) {
    const baseValue = responsiveObj.mobile ?? responsiveObj.xs;
    const cssValue = transform ? transform(baseValue) : String(baseValue);
    css += `${property}: ${cssValue};\n`;
  }

  // Tablet
  if ('tablet' in responsiveObj || 'md' in responsiveObj) {
    const tabletValue = responsiveObj.tablet ?? responsiveObj.md;
    const cssValue = transform ? transform(tabletValue) : String(tabletValue);
    css += `@media (min-width: ${breakpoints.md}px) {\n  ${property}: ${cssValue};\n}\n`;
  }

  // Desktop
  if ('desktop' in responsiveObj || 'lg' in responsiveObj) {
    const desktopValue = responsiveObj.desktop ?? responsiveObj.lg;
    const cssValue = transform ? transform(desktopValue) : String(desktopValue);
    css += `@media (min-width: ${breakpoints.lg}px) {\n  ${property}: ${cssValue};\n}\n`;
  }

  // XL
  if ('xl' in responsiveObj) {
    const xlValue = responsiveObj.xl;
    const cssValue = transform ? transform(xlValue) : String(xlValue);
    css += `@media (min-width: ${breakpoints.xl}px) {\n  ${property}: ${cssValue};\n}\n`;
  }

  return css;
};

// Create media query string
export const createMediaQuery = (breakpoint: Breakpoint): string => {
  return `@media (min-width: ${breakpoints[breakpoint]}px)`;
};

// Clamp value between min and max
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// Convert px to rem
export const pxToRem = (px: number, baseFontSize: number = 16): string => {
  return `${px / baseFontSize}rem`;
};

// Convert rem to px
export const remToPx = (rem: number, baseFontSize: number = 16): number => {
  return rem * baseFontSize;
};

// Get responsive grid columns
export const getResponsiveColumns = (
  columns: ResponsiveValue<number>,
  currentWidth: number
): number => {
  return getResponsiveValue(columns, currentWidth);
};

// Get responsive gap
export const getResponsiveGap = (
  gap: ResponsiveValue<number | string>,
  currentWidth: number
): string => {
  const value = getResponsiveValue(gap, currentWidth);
  return typeof value === 'number' ? `${value}px` : value;
};
