import React, { forwardRef } from 'react';
import styles from './Switch.module.css';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  error?: boolean;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Switch Component
 * Toggle switch for on/off states
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, error = false, helperText, size = 'md', className = '', ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        <label
          className={[
            styles.label,
            error ? styles['label--error'] : '',
            props.disabled ? styles['label--disabled'] : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <input
            ref={ref}
            type="checkbox"
            className={styles.input}
            {...props}
          />
          <span className={[styles.switch, styles[`switch--${size}`]].join(' ')}>
            <span className={[styles.thumb, styles[`thumb--${size}`]].join(' ')}></span>
          </span>
          {label && <span className={styles.text}>{label}</span>}
        </label>
        {helperText && (
          <span className={error ? styles['helper-text--error'] : styles['helper-text']}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
