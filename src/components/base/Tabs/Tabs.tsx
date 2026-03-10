import React, { useState } from 'react';
import styles from './Tabs.module.css';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills';
  fullWidth?: boolean;
  className?: string;
}

/**
 * Tabs Component
 * Tabbed navigation with content panels
 */
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  onChange,
  variant = 'default',
  fullWidth = false,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (disabled) return;
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <div className={[styles.tabs, className].filter(Boolean).join(' ')}>
      <div
        className={[
          styles['tab-list'],
          styles[`tab-list--${variant}`],
          fullWidth ? styles['tab-list--full-width'] : '',
        ]
          .filter(Boolean)
          .join(' ')}
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            className={[
              styles.tab,
              styles[`tab--${variant}`],
              activeTab === tab.id ? styles['tab--active'] : '',
              tab.disabled ? styles['tab--disabled'] : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => handleTabClick(tab.id, tab.disabled)}
            disabled={tab.disabled}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles['tab-panels']}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={tab.id}
            className={[
              styles['tab-panel'],
              activeTab === tab.id ? styles['tab-panel--active'] : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {activeTab === tab.id && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
