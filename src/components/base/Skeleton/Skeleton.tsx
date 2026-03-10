import React from 'react';
import styles from './Skeleton.module.css';

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
  count?: number;
  className?: string;
}

/**
 * Skeleton Component
 * Loading placeholder with various shapes and animations
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  count = 1,
  className = '',
}) => {
  const skeletonClasses = [
    styles.skeleton,
    styles[`skeleton--${variant}`],
    animation !== 'none' && styles[`skeleton--${animation}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  // Default heights for variants
  if (!height) {
    if (variant === 'text') {
      style.height = '1em';
    } else if (variant === 'circular') {
      style.height = width || '40px';
      style.width = width || '40px';
    }
  }

  if (count === 1) {
    return <div className={skeletonClasses} style={style} />;
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={skeletonClasses} style={style} />
      ))}
    </>
  );
};

