import React, { forwardRef } from 'react';
import styles from './Radio.module.css';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  error?: boolean;
  helperText?: string;
  size?: RadioSize;
}

/**
 * Radio Component
 * Reusable radio button with label and error states
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error = false, helperText, size = 'md', className = '', ...props }, ref) => {
    const wrapperClasses = [
      styles.wrapper,
      styles[`wrapper--${size}`],
    ].filter(Boolean).join(' ');
    
    const labelClasses = [
      styles.label,
      error ? styles['label--error'] : '',
      props.disabled ? styles['label--disabled'] : '',
      className,
    ].filter(Boolean).join(' ');
    
    const radioClasses = [
      styles.radio,
      styles[`radio--${size}`],
    ].filter(Boolean).join(' ');
    return (
      <div className={wrapperClasses}>
        <label className={labelClasses}>
          <input
            ref={ref}
            type="radio"
            className={styles.input}
            {...props}
          />
          <span className={radioClasses}>
            <span className={styles.ripple} />
            <span className={styles.dot}></span>
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

Radio.displayName = 'Radio';
