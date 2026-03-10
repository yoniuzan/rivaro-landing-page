import React, { useMemo } from 'react';
import { theme as defaultTheme, type Theme } from '@constants/theme';
import { ThemeContext } from './ThemeContext';

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: Partial<Theme>;
}

/**
 * ThemeProvider component
 * Provides theme context to all child components
 * Allows overriding default theme values
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme: customTheme }) => {
  const mergedTheme = useMemo(() => {
    if (!customTheme) return defaultTheme;
    
    return {
      ...defaultTheme,
      ...customTheme,
      colors: {
        ...defaultTheme.colors,
        ...customTheme.colors,
      },
      typography: {
        ...defaultTheme.typography,
        ...customTheme.typography,
      },
      spacing: {
        ...defaultTheme.spacing,
        ...customTheme.spacing,
      },
      borderRadius: {
        ...defaultTheme.borderRadius,
        ...customTheme.borderRadius,
      },
      shadows: {
        ...defaultTheme.shadows,
        ...customTheme.shadows,
      },
    } as Theme;
  }, [customTheme]);

  // Inject CSS variables
  React.useEffect(() => {
    const root = document.documentElement;
    
    // Helper to set CSS variable
    const setVar = (key: string, value: string) => {
      root.style.setProperty(`--${key}`, value);
    };

    // Helper to flatten and set nested objects
    const setNestedVars = (obj: Record<string, any>, prefix: string) => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          setNestedVars(value, `${prefix}-${key}`);
        } else {
          setVar(`${prefix}-${key}`, String(value));
        }
      });
    };

    // Colors (e.g., --color-primary-500, --color-neutral-100)
    setNestedVars(mergedTheme.colors, 'color');

    // Breakpoints
    Object.entries(mergedTheme.breakpoints).forEach(([key, value]) => {
      setVar(`breakpoint-${key}`, `${value}px`);
    });

    // Spacing
    Object.entries(mergedTheme.spacing).forEach(([key, value]) => {
      setVar(`spacing-${key}`, value);
    });

    // Border radius
    Object.entries(mergedTheme.borderRadius).forEach(([key, value]) => {
      setVar(`radius-${key}`, value);
    });

    // Shadows
    Object.entries(mergedTheme.shadows).forEach(([key, value]) => {
      setVar(`shadow-${key}`, value);
    });

    // Z-index
    Object.entries(mergedTheme.zIndex).forEach(([key, value]) => {
      setVar(`z-index-${key}`, String(value));
    });

    // Transitions
    Object.entries(mergedTheme.transitions.duration).forEach(([key, value]) => {
      setVar(`transition-${key}`, value);
    });
    
    // Typography Font Family
    Object.entries(mergedTheme.typography.fontFamily).forEach(([key, value]) => {
      setVar(`font-${key}`, value);
    });

  }, [mergedTheme]);

  return (
    <ThemeContext.Provider value={{ theme: mergedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
