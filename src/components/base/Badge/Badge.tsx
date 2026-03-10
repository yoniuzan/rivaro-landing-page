import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  className?: string;
}

/**
 * Badge Component
 * Small status indicator or label
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
}) => {
  return (
    <span
      className={[
        styles.badge,
        styles[`badge--${variant}`],
        styles[`badge--${size}`],
        dot ? styles['badge--dot'] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
};
