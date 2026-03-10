import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useClickOutside } from '@hooks/useClickOutside';
import styles from './MultiSelect.module.css';

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  searchable?: boolean;
  showSelectAll?: boolean;
  maxTags?: number;
  disabled?: boolean;
  className?: string;
  minWidth?: string | number;
}

/**
 * MultiSelect Component
 * Multi-selection dropdown with checkboxes, search, and tags
 */
export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value = [],
  onChange,
  placeholder,
  error = false,
  helperText,
  fullWidth = false,
  searchable = true,
  showSelectAll = true,
  maxTags = 3,
  disabled = false,
  className = '',
  minWidth = '220px',
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>(value);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  
  const defaultPlaceholder = placeholder || t('common.select');

  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
    setSearchTerm('');
  });

  // Track previous value to only update state when prop changes
  const prevValueRef = React.useRef(value);

  useEffect(() => {
    // Only update internal state if the prop value has actually changed from outside
    if (JSON.stringify(prevValueRef.current) !== JSON.stringify(value)) {
      setSelectedValues(value);
      prevValueRef.current = value;
    }
  }, [value]);

  const filteredOptions = searchable
    ? options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;

  const enabledOptions = options.filter((opt) => !opt.disabled);
  const allSelected = enabledOptions.length > 0 && enabledOptions.every((opt) => selectedValues.includes(opt.value));
  const someSelected = selectedValues.length > 0 && !allSelected;

  const handleToggle = () => {
    if (!disabled) {
      if (!isOpen && triggerRef.current) {
        // Calculate available space and position before opening
        const rect = triggerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const dropdownHeight = 320; // max-height of dropdown
        
        // Determine if dropdown should open above or below
        const openAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
        
        // Calculate fixed position coordinates
        const style: React.CSSProperties = {
          position: 'fixed',
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          zIndex: 9999,
        };
        
        if (openAbove) {
          style.bottom = `${window.innerHeight - rect.top + 8}px`;
        } else {
          style.top = `${rect.bottom + 8}px`;
        }
        
        setDropdownStyle(style);
      }
      setIsOpen(!isOpen);
      setSearchTerm('');
    }
  };

  const handleSelectOption = (optionValue: string) => {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter((v) => v !== optionValue)
      : [...selectedValues, optionValue];
    
    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  const handleSelectAll = () => {
    if (allSelected) {
      // Deselect all
      setSelectedValues([]);
      onChange?.([]);
    } else {
      // Select all enabled options
      const allValues = enabledOptions.map((opt) => opt.value);
      setSelectedValues(allValues);
      onChange?.(allValues);
    }
  };

  const handleRemoveTag = (valueToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newValues = selectedValues.filter((v) => v !== valueToRemove);
    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValues([]);
    onChange?.([]);
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) {
      return <span className={styles.placeholder}>{String(defaultPlaceholder)}</span>;
    }

    const selectedOptions = options.filter((opt) => selectedValues.includes(opt.value));
    const visibleTags = selectedOptions.slice(0, maxTags);
    const remainingCount = selectedValues.length - maxTags;

    return (
      <div className={styles.tags}>
        {visibleTags.map((option) => (
          <span key={option.value} className={styles.tag}>
            {option.label}
            <button
              type="button"
              className={styles['tag-remove']}
              onClick={(e) => handleRemoveTag(option.value, e)}
              aria-label={`${String(t('common.remove'))} ${option.label}`}
            >
              ×
            </button>
          </span>
        ))}
        {remainingCount > 0 && (
          <span className={styles['tag-count']}>+{remainingCount}</span>
        )}
      </div>
    );
  };

  return (
    <div 
      className={styles.wrapper}
      style={{ minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth }}
    >
      <div
        ref={dropdownRef}
        className={[
          styles['multi-select'],
          error ? styles['multi-select--error'] : '',
          fullWidth ? styles['multi-select--full-width'] : '',
          isOpen ? styles['multi-select--open'] : '',
          disabled ? styles['multi-select--disabled'] : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div
          ref={triggerRef}
          className={styles.trigger}
          onClick={handleToggle}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggle();
            }
          }}
        >
          <div className={styles.content}>
            {getDisplayText()}
          </div>
          <div className={styles.actions}>
            {selectedValues.length > 0 && !disabled && (
              <button
                type="button"
                className={styles['clear-button']}
                onClick={handleClearAll}
                aria-label={String(t('common.clearAll'))}
              >
                ×
              </button>
            )}
            <span className={styles.arrow}>▼</span>
          </div>
        </div>

        {isOpen && (
          <div 
            className={styles.dropdown}
            style={dropdownStyle}
            role="listbox" 
            aria-multiselectable="true"
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
              {showSelectAll && filteredOptions.length > 0 && !searchTerm && (
                <>
                  <button
                    type="button"
                    className={[styles.option, styles['option--select-all']].join(' ')}
                    onClick={handleSelectAll}
                  >
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={allSelected}
                      ref={(input) => {
                        if (input) {
                          input.indeterminate = someSelected;
                        }
                      }}
                      readOnly
                    />
                    <span className={styles.label}>
                      {String(allSelected ? t('common.deselectAll') : t('common.selectAll'))}
                    </span>
                  </button>
                  <div className={styles.divider} />
                </>
              )}

              {filteredOptions.length === 0 ? (
                <div className={styles['no-options']}>{String(t('common.noResults'))}</div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      className={[
                        styles.option,
                        isSelected ? styles['option--selected'] : '',
                        option.disabled ? styles['option--disabled'] : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => !option.disabled && handleSelectOption(option.value)}
                      disabled={option.disabled}
                    >
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={isSelected}
                        disabled={option.disabled}
                        readOnly
                      />
                      <span className={styles.label}>{option.label}</span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {helperText && (
        <span className={error ? styles['helper-text--error'] : styles['helper-text']}>
          {helperText}
        </span>
      )}
    </div>
  );
};
