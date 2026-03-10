import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ActionsDropdown.module.css';

export interface ActionItem {
  key: string;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
  disabled?: boolean;
}

interface ActionsDropdownProps {
  actions: ActionItem[];
  /** Accessible label for the trigger button */
  ariaLabel?: string;
}

/**
 * ActionsDropdown Component
 * A dropdown menu triggered by a 3-dot button for row actions in tables
 */
export const ActionsDropdown: React.FC<ActionsDropdownProps> = ({ actions, ariaLabel }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleActionClick = (action: ActionItem) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!action.disabled) {
      action.onClick();
      setIsOpen(false);
    }
  };

  return (
    <div className={`${styles.container} ${isOpen ? styles.open : ''}`} ref={dropdownRef}>
      <button
        className={styles.trigger}
        onClick={handleToggle}
        aria-label={ariaLabel || t('common.actions')}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <span className={styles.dots}>⋮</span>
      </button>

      {isOpen && (
        <div className={styles.menu} role="menu">
          {actions.map((action) => (
            <button
              key={action.key}
              className={`${styles.menuItem} ${action.variant === 'danger' ? styles.danger : ''} ${action.disabled ? styles.disabled : ''}`}
              onClick={handleActionClick(action)}
              disabled={action.disabled}
              role="menuitem"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
