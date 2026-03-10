import React, { forwardRef, useState } from 'react';
import styles from './Input.module.css';

export type InputType = 'text' | 'number' | 'email' | 'password' | 'tel' | 'url' | 'search';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: InputType;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
}

/**
 * Input Component
 * Reusable text input with error states
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    type = 'text', 
    error = false, 
    helperText, 
    fullWidth = false, 
    label,
    leftIcon,
    rightIcon,
    clearable = false,
    onClear,
    className = '', 
    value,
    onChange,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value || '');
    
    const currentValue = value !== undefined ? value : internalValue;
    const hasValue = Boolean(currentValue);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      if (onChange) {
        onChange(e);
      }
    };
    
    const handleClear = () => {
      if (value === undefined) {
        setInternalValue('');
      }
      if (onClear) {
        onClear();
      }
    };
    
    const actualType = type === 'password' && showPassword ? 'text' : type;
    const wrapperClasses = [
      styles.wrapper,
      fullWidth ? styles['wrapper--full-width'] : '',
    ].filter(Boolean).join(' ');
    
    const containerClasses = [
      styles.container,
      error ? styles['container--error'] : '',
      isFocused ? styles['container--focused'] : '',
      leftIcon ? styles['container--with-left-icon'] : '',
      rightIcon || clearable || type === 'password' ? styles['container--with-right-icon'] : '',
    ].filter(Boolean).join(' ');
    
    const inputClasses = [
      styles.input,
      className,
    ].filter(Boolean).join(' ');
    
    const labelClasses = [
      styles.label,
      (isFocused || hasValue) ? styles['label--floating'] : '',
    ].filter(Boolean).join(' ');

    return (
      <div className={wrapperClasses}>
        <div className={containerClasses}>
          {leftIcon && <span className={styles['icon-left']}>{leftIcon}</span>}
          
          <div className={styles['input-wrapper']}>
            <input
              ref={ref}
              type={actualType}
              className={inputClasses}
              value={currentValue}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={label ? '' : props.placeholder}
              {...props}
            />
            {label && (
              <label className={labelClasses}>
                {label}
              </label>
            )}
          </div>
          
          <div className={styles['icon-right-group']}>
            {clearable && hasValue && !props.disabled && (
              <button
                type="button"
                className={styles['clear-button']}
                onClick={handleClear}
                tabIndex={-1}
                aria-label="Clear input"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            )}
            
            {type === 'password' && (
              <button
                type="button"
                className={styles['password-toggle']}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8C2 8 4 3 8 3C12 3 14 8 14 8C14 8 12 13 8 13C4 13 2 8 2 8Z" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 2L14 14M6.5 6.5C6.18 6.82 6 7.24 6 7.7C6 8.7 6.8 9.5 7.8 9.5C8.26 9.5 8.68 9.32 9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M4.5 4.5C3.3 5.4 2.5 6.6 2 8C2.5 9.4 4 12 8 12C9.2 12 10.2 11.7 11 11.2M13.5 10.5C13.8 10.1 14 9.6 14 9C14 9 12 4 8 4C7.5 4 7 4.1 6.5 4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            )}
            
            {rightIcon && <span className={styles['icon-right']}>{rightIcon}</span>}
          </div>
        </div>
        
        {helperText && (
          <span className={error ? styles['helper-text--error'] : styles['helper-text']}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
