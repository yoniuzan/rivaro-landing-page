import React, { forwardRef, useState } from 'react';
import styles from './Textarea.module.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  label?: string;
  showCount?: boolean;
}

/**
 * Textarea Component
 * Reusable textarea with error states
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error = false, helperText, fullWidth = false, resize = 'vertical', label, showCount = false, className = '', value, onChange, maxLength, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value || '');
    
    const currentValue = value !== undefined ? value : internalValue;
    const charCount = String(currentValue).length;
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      if (onChange) {
        onChange(e);
      }
    };
    const wrapperClasses = [
      styles.wrapper,
      fullWidth ? styles['wrapper--full-width'] : '',
    ].filter(Boolean).join(' ');
    
    const containerClasses = [
      styles.container,
      error ? styles['container--error'] : '',
      isFocused ? styles['container--focused'] : '',
    ].filter(Boolean).join(' ');
    
    const textareaClasses = [
      styles.textarea,
      styles[`textarea--resize-${resize}`],
      className,
    ].filter(Boolean).join(' ');
    
    const labelClasses = [
      styles.label,
      (isFocused || charCount > 0) ? styles['label--floating'] : '',
    ].filter(Boolean).join(' ');

    return (
      <div className={wrapperClasses}>
        <div className={containerClasses}>
          <div className={styles['textarea-wrapper']}>
            <textarea
              ref={ref}
              className={textareaClasses}
              value={currentValue}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={label ? '' : props.placeholder}
              maxLength={maxLength}
              {...props}
            />
            {label && (
              <label className={labelClasses}>
                {label}
              </label>
            )}
          </div>
        </div>
        
        <div className={styles.footer}>
          {helperText && (
            <span className={error ? styles['helper-text--error'] : styles['helper-text']}>
              {helperText}
            </span>
          )}
          {showCount && (
            <span className={styles['char-count']}>
              {charCount}{maxLength ? `/${maxLength}` : ''}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
