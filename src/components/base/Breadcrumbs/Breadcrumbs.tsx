import React from 'react';
import styles from './Breadcrumbs.module.css';

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  className?: string;
}

/**
 * Breadcrumbs Component
 * Navigation breadcrumbs for hierarchical navigation
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = '/',
  maxItems,
  className = '',
}) => {
  const displayItems = React.useMemo(() => {
    if (!maxItems || items.length <= maxItems) {
      return items;
    }

    // Show first item, ellipsis, and last (maxItems - 1) items
    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 1));

    return [
      firstItem,
      { label: '...', onClick: undefined, href: undefined },
      ...lastItems,
    ];
  }, [items, maxItems]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: BreadcrumbItem
  ) => {
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
    }
  };

  return (
    <nav className={[styles.breadcrumbs, className].filter(Boolean).join(' ')}>
      <ol className={styles.list}>
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.label === '...';

          return (
            <li key={index} className={styles.item}>
              {!isLast && !isEllipsis ? (
                <>
                  {item.href || item.onClick ? (
                    <a
                      href={item.href || '#'}
                      onClick={(e) => handleClick(e, item)}
                      className={styles.link}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className={styles.text}>{item.label}</span>
                  )}
                  <span className={styles.separator}>{separator}</span>
                </>
              ) : isEllipsis ? (
                <>
                  <span className={styles.ellipsis}>{item.label}</span>
                  <span className={styles.separator}>{separator}</span>
                </>
              ) : (
                <span className={[styles.text, styles['text--current']].join(' ')}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

