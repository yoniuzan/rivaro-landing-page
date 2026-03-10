import React, { forwardRef } from 'react';
import styles from './Checkbox.module.css';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  error?: boolean;
  helperText?: string;
  indeterminate?: boolean;
  size?: CheckboxSize;
}

/**
 * Checkbox Component
 * Reusable checkbox with label and error states
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error = false, helperText, indeterminate = false, size = 'md', className = '', ...props }, ref) => {
    const checkboxRef = React.useRef<HTMLInputElement>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => checkboxRef.current as HTMLInputElement);

    // Handle indeterminate state
    React.useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

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
    
    const checkmarkClasses = [
      styles.checkmark,
      styles[`checkmark--${size}`],
    ].filter(Boolean).join(' ');

    return (
      <div className={wrapperClasses}>
        <label className={labelClasses}>
          <input
            ref={checkboxRef}
            type="checkbox"
            className={styles.input}
            {...props}
          />
          <span className={checkmarkClasses}>
            <span className={styles.ripple} />
            <svg
              className={styles.icon}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3334 4L6.00002 11.3333L2.66669 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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

Checkbox.displayName = 'Checkbox';
