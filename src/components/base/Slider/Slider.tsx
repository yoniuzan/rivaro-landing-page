import React from 'react';
import styles from './Slider.module.css';

export interface SliderProps {
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
  color?: 'primary' | 'secondary';
  size?: 'small' | 'medium';
  className?: string;
  name?: string;
  id?: string;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  label,
  color = 'primary',
  size = 'medium',
  className = '',
  name,
  id,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(e.target.value));
  };

  const percentage = ((value - min) / (max - min)) * 100;
  
  // CSS Variables for the track
  const style = {
    '--slider-fill-percent': `${percentage}%`,
    '--slider-fill-color': color === 'primary' ? 'var(--color-primary-600)' : 'var(--color-secondary-600)',
    '--slider-track-color': 'var(--color-neutral-300)',
  } as React.CSSProperties;

  return (
    <div className={[className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div 
        className={[
          styles.slider, 
          styles[`slider--${color}`], 
          styles[`slider--${size}`]
        ].join(' ')}
        style={style}
      >
        <input
          type="range"
          id={id}
          name={name}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={styles.input}
        />
      </div>
    </div>
  );
};
