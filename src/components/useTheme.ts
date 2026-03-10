import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { theme as defaultTheme, type Theme } from '@constants/theme';

/**
 * Hook to access theme context
 */
export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    return defaultTheme;
  }
  return context.theme;
};

