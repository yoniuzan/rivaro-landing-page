import React, { useState } from 'react';
import styles from './Accordion.module.css';

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultExpanded?: string[];
  variant?: 'default' | 'bordered' | 'filled';
  className?: string;
  onChange?: (expandedIds: string[]) => void;
}

/**
 * Accordion Component
 * Collapsible content panels
 */
export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  variant = 'default',
  className = '',
  onChange,
}) => {
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpanded);

  const handleToggle = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item?.disabled) return;

    let newExpandedIds: string[];

    if (allowMultiple) {
      newExpandedIds = expandedIds.includes(id)
        ? expandedIds.filter((expandedId) => expandedId !== id)
        : [...expandedIds, id];
    } else {
      newExpandedIds = expandedIds.includes(id) ? [] : [id];
    }

    setExpandedIds(newExpandedIds);
    onChange?.(newExpandedIds);
  };

  const accordionClasses = [
    styles.accordion,
    styles[`accordion--${variant}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={accordionClasses}>
      {items.map((item) => {
        const isExpanded = expandedIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={[
              styles.item,
              isExpanded && styles['item--expanded'],
              item.disabled && styles['item--disabled'],
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <button
              className={styles.header}
              onClick={() => handleToggle(item.id)}
              disabled={item.disabled}
              aria-expanded={isExpanded}
              aria-controls={`accordion-content-${item.id}`}
            >
              <span className={styles.title}>{item.title}</span>
              <span
                className={[
                  styles.icon,
                  isExpanded && styles['icon--expanded'],
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                ▼
              </span>
            </button>

            <div
              id={`accordion-content-${item.id}`}
              className={[
                styles.content,
                isExpanded && styles['content--expanded'],
              ]
                .filter(Boolean)
                .join(' ')}
              aria-hidden={!isExpanded}
            >
              <div className={styles.contentInner}>{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
