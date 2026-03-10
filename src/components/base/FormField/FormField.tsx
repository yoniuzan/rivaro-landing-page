import React from 'react';
import styles from './FormField.module.css';

export interface FormFieldProps {
  children: React.ReactNode;
  label?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  className?: string;
}

/**
 * FormField Component
 * Wrapper component for form inputs with label and error display
 */
export const FormField: React.FC<FormFieldProps> = ({
  children,
  label,
  error,
  required = false,
  htmlFor,
  className = '',
}) => {
  return (
    <div className={[styles['form-field'], className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={htmlFor} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

