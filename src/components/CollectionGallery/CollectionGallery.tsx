import React, { useEffect, useRef, useState } from 'react';
import { Typography, Flex } from '@components/base';
import styles from './CollectionGallery.module.css';

interface CollectionItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  size: 'large' | 'medium' | 'small';
}

export interface CollectionGalleryProps {
  className?: string;
}

export const CollectionGallery: React.FC<CollectionGalleryProps> = ({ className = '' }) => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const collectionItems: CollectionItem[] = [
    {
      id: '1',
      title: 'חליפות חתן',
      category: 'חליפת חתן יוקרתית של ריבארו - עיצוב מושלם ליום המיוחד',
      imageUrl: '/placeholder-groom.jpg',
      size: 'large',
    },
    {
      id: '2',
      title: 'Business Casual',
      category: 'חליפות עסקיות אלגנטיות - סגנון מקצועי ומעודן',
      imageUrl: '/placeholder-business.jpg',
      size: 'medium',
    },
    {
      id: '3',
      title: 'טוקסידו',
      category: 'טוקסידו יוקרתי של ריבארו - אלגנטיות קלאסית',
      imageUrl: '/placeholder-tuxedo.jpg',
      size: 'large',
    },
    {
      id: '4',
      title: 'אביזרים',
      category: 'אביזרים מעוצבים לחליפה - פרטים שעושים את ההבדל',
      imageUrl: '/placeholder-accessories.jpg',
      size: 'small',
    },
    {
      id: '5',
      title: 'חליפות ערב',
      category: 'חליפות ערב מעוצבות - יוקרה ואלגנטיות',
      imageUrl: '/placeholder-evening.jpg',
      size: 'medium',
    },
    {
      id: '6',
      title: 'קז׳ואל יוקרתי',
      category: 'לבוש קז׳ואל יוקרתי - נוחות ללא ויתור על סטייל',
      imageUrl: '/placeholder-casual.jpg',
      size: 'small',
    },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const itemId = entry.target.getAttribute('data-item-id');
          if (itemId) {
            setVisibleItems((prev) => new Set(prev).add(itemId));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    itemRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const setItemRef = (id: string) => (element: HTMLDivElement | null) => {
    if (element) {
      itemRefs.current.set(id, element);
    } else {
      itemRefs.current.delete(id);
    }
  };

  return (
    <section id="collection" className={`${styles.collectionGallery} ${className}`} aria-label="Collection gallery">
      <div className={styles.container}>
        <Flex direction="column" gap={48} align="center">
          <Typography 
            variant="h2" 
            color="text-primary"
            weight="light"
            align="center"
            className={styles.heading}
          >
            הקולקציה
          </Typography>

          <div className={styles.masonryGrid}>
            {collectionItems.map((item) => (
              <div
                key={item.id}
                ref={setItemRef(item.id)}
                data-item-id={item.id}
                className={`${styles.galleryItem} ${styles[`item--${item.size}`]} ${
                  visibleItems.has(item.id) ? styles['item--visible'] : ''
                }`}
              >
                <div className={styles.imageWrapper}>
                  <div className={styles.imagePlaceholder} role="img" aria-label={`${item.title} - ${item.category}`}>
                    <Typography variant="body2" color="text-secondary" align="center">
                      {item.title}
                    </Typography>
                  </div>
                  <div className={styles.overlay}>
                    <Flex direction="column" gap={8} align="center" justify="center" className={styles.overlayContent}>
                      <Typography 
                        variant="h4" 
                        color="text-primary"
                        weight="light"
                        align="center"
                        className={styles.overlayTitle}
                      >
                        {item.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text-secondary"
                        align="center"
                        className={styles.overlayCategory}
                      >
                        {item.category}
                      </Typography>
                    </Flex>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Flex>
      </div>
    </section>
  );
};
