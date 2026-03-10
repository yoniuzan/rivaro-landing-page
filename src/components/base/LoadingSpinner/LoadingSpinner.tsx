import React from 'react';
import styles from './LoadingSpinner.module.css';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
  centered?: boolean;
  className?: string;
}

/**
 * LoadingSpinner Component
 * Reusable loading spinner with different sizes and colors
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  variant = 'spinner',
  centered = false,
  className = '',
}) => {
  const wrapperClasses = [
    styles.wrapper,
    centered ? styles['wrapper--centered'] : '',
  ].filter(Boolean).join(' ');
  
  const spinnerClasses = [
    styles[variant],
    styles[`${variant}--${size}`],
    styles[`${variant}--color-${color}`],
    className,
  ].filter(Boolean).join(' ');

  const renderVariant = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className={spinnerClasses}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
        );
      case 'pulse':
        return <div className={spinnerClasses} />;
      case 'bars':
        return (
          <div className={spinnerClasses}>
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </div>
        );
      case 'spinner':
      default:
        return (
          <div className={spinnerClasses}>
            <div className={styles.circle} />
          </div>
        );
    }
  };

  return <div className={wrapperClasses}>{renderVariant()}</div>;
};
