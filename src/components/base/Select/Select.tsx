import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useClickOutside } from '@hooks/useClickOutside';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  searchable?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

/**
 * Select Component
 * Reusable select dropdown with optional search
 */
export const Select: React.FC<SelectProps> = ({
  options,
  value,
  error = false,
  helperText,
  fullWidth = false,
  searchable = false,
  placeholder,
  onChange,
  className = '',
  disabled = false,
}) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedValue, setSelectedValue] = useState(value || '');
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useClickOutside<HTMLDivElement>(() => {
      setIsOpen(false);
      setSearchTerm('');
    });
    const containerRef = useRef<HTMLDivElement>(null);
    
    const defaultPlaceholder = placeholder || String(t('common.select'));

    const filteredOptions = searchable
      ? options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
      : options;

    const selectedOption = options.find((opt) => opt.value === selectedValue);

    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    const handleSelect = (optionValue: string) => {
      setSelectedValue(optionValue);
      setIsOpen(false);
      setSearchTerm('');
      onChange?.(optionValue);
    };

    const updateDropdownPosition = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const dropdownHeight = 320;
        
        const openAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
        
        const style: React.CSSProperties = {
          position: 'fixed',
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          zIndex: 10000,
        };
        
        if (openAbove) {
          style.bottom = `${window.innerHeight - rect.top + 4}px`;
          style.transformOrigin = 'bottom';
        } else {
          style.top = `${rect.bottom + 4}px`;
          style.transformOrigin = 'top';
        }
        
        setDropdownStyle(style);
      }
    };

    const handleToggle = () => {
      if (!isOpen) {
        updateDropdownPosition();
      }
      setIsOpen(!isOpen);
      setSearchTerm('');
    };

    useEffect(() => {
      if (!isOpen) return;

      const handleScroll = () => updateDropdownPosition();
      const handleResize = () => updateDropdownPosition();
      
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
      };
    }, [isOpen]);

    const renderDropdown = () => {
      if (!isOpen) return null;

      const dropdown = (
        <div 
          ref={dropdownRef}
          className={styles.dropdown}
          style={dropdownStyle}
          role="listbox"
        >
          {searchable && (
            <div className={styles['search-wrapper']}>
              <input
                type="text"
                className={styles['search-input']}
                placeholder={String(t('common.searchPlaceholder'))}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <div className={styles.options}>
            {filteredOptions.length === 0 ? (
              <div className={styles['no-options']}>{String(t('common.noResults'))}</div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={option.value === selectedValue}
                  className={[
                    styles.option,
                    option.value === selectedValue ? styles['option--selected'] : '',
                    option.disabled ? styles['option--disabled'] : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  disabled={option.disabled}
                >
                  {option.label}
                </button>
              ))
            )}
          </div>
        </div>
      );

      return createPortal(dropdown, document.body);
    };

    return (
      <div className={styles.wrapper} ref={containerRef}>
        <div
          className={[
            styles['custom-select'],
            error ? styles['custom-select--error'] : '',
            fullWidth ? styles['custom-select--full-width'] : '',
            isOpen ? styles['custom-select--open'] : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <button
            ref={triggerRef}
            type="button"
            className={styles.trigger}
            onClick={handleToggle}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            disabled={disabled}
          >
            <span className={selectedOption ? styles.value : styles.placeholder}>
              {selectedOption ? selectedOption.label : defaultPlaceholder}
            </span>
            <span className={styles.arrow}>▼</span>
          </button>
        </div>

        {renderDropdown()}

        {helperText && (
          <span className={error ? styles['helper-text--error'] : styles['helper-text']}>
            {helperText}
          </span>
        )}
      </div>
    );
  }

Select.displayName = 'Select';
