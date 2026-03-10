import React, { useState, useRef, useEffect } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  addDays, 
  isSameMonth, 
  isSameDay, 
  isToday,
  isValid,
  parseISO,
  startOfDay,
  setYear,
  getYear
} from 'date-fns';
import { he, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import styles from './DatePicker.module.css';

export interface DatePickerProps {
  label?: string;
  value?: string | Date;
  onChange?: (event: { target: { value: string } }) => void; // Mimic event for consistency
  error?: boolean;
  helperText?: string;
  minDate?: string | Date;
  maxDate?: string | Date;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  error = false,
  helperText,
  minDate,
  maxDate,
  disabled = false,
  className = '',
  placeholder = 'DD/MM/YYYY',
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'calendar' | 'year'>('calendar');
  
  // Internal state for the calendar view navigation
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const containerRef = useRef<HTMLDivElement>(null);

  const locale = i18n.language === 'he' ? he : enUS;
  const dateFormat = i18n.language === 'he' ? 'dd/MM/yyyy' : 'MM/dd/yyyy';

  // Parse initial value to set current month view
  useEffect(() => {
    if (value) {
      const date = typeof value === 'string' ? parseISO(value) : value;
      if (isValid(date)) {
        setCurrentMonth(startOfDay(date));
      }
    }
  }, [value]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setView('calendar');
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleDateClick = (day: Date) => {
    if (onChange) {
      const isoDate = format(day, 'yyyy-MM-dd');
      onChange({ target: { value: isoDate } });
    }
    setIsOpen(false);
    setView('calendar');
  };

  const handleYearClick = (year: number) => {
    const newDate = setYear(currentMonth, year);
    setCurrentMonth(newDate);
    setView('calendar');
  };

  const renderHeader = () => {
    return (
      <div className={styles.header}>
        <button type="button" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className={styles['nav-button']}>
          ‹
        </button>
        <button 
            type="button" 
            className={styles['month-year-btn']}
            onClick={() => setView(view === 'calendar' ? 'year' : 'calendar')}
        >
          {format(currentMonth, 'MMMM yyyy', { locale })}
        </button>
        <button type="button" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className={styles['nav-button']}>
          ›
        </button>
      </div>
    );
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale });
    const endDate = endOfWeek(monthEnd, { locale });

    const weekDays = [];
    const dayHeaders = startOfWeek(new Date(), { locale });
    for (let i = 0; i < 7; i++) {
      weekDays.push(
        <div key={i} className={styles['week-day']}>
          {format(addDays(dayHeaders, i), 'EEEEEE', { locale })}
        </div>
      );
    }

    const rows = [];
    let days = [];
    let day = startDate;

    // Parse current value for selection highlighting
    let selectedDate: Date | null = null;
    if (value) {
        const date = typeof value === 'string' ? parseISO(value) : value;
        if (isValid(date)) selectedDate = startOfDay(date);
    }

    // Parse min/max dates
    const min = minDate ? (typeof minDate === 'string' ? parseISO(minDate) : minDate) : null;
    const max = maxDate ? (typeof maxDate === 'string' ? parseISO(maxDate) : maxDate) : null;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isTodayDate = isToday(day);
        
        // Check if disabled
        let isDisabled = false;
        if (min && day < startOfDay(min)) isDisabled = true;
        if (max && day > startOfDay(max)) isDisabled = true;

        days.push(
          <button
            key={day.toString()}
            type="button"
            disabled={isDisabled}
            className={[
              styles.day,
              isSelected ? styles['day--selected'] : '',
              !isCurrentMonth ? styles['day--other-month'] : '',
              isTodayDate && !isSelected ? styles['day--today'] : ''
            ].filter(Boolean).join(' ')}
            onClick={() => handleDateClick(cloneDay)}
          >
            {format(day, 'd')}
          </button>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className={styles.grid}>
          {days}
        </div>
      );
      days = [];
    }

    return (
      <div className={styles['calendar-view']}>
        <div className={styles.grid}>{weekDays}</div>
        <div>{rows}</div>
      </div>
    );
  };

  const renderYears = () => {
    const currentYear = getYear(new Date());
    const startYear = currentYear - 100;
    const endYear = currentYear + 10;
    const years = [];

    for (let i = endYear; i >= startYear; i--) {
      const isSelected = getYear(currentMonth) === i;
      years.push(
        <button
          key={i}
          type="button"
          className={[
            styles['year-btn'],
            isSelected ? styles['year-btn--selected'] : ''
          ].join(' ')}
          onClick={() => handleYearClick(i)}
        >
          {i}
        </button>
      );
    }

    return <div className={styles['year-view']}>{years}</div>;
  };

  const displayValue = value ? format(typeof value === 'string' ? parseISO(value) : value, dateFormat, { locale }) : '';

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')} ref={containerRef}>
      {label && <label className={styles.label}>{label}</label>}
      
      <div 
        className={styles['input-wrapper']} 
        onClick={() => !disabled && setIsOpen(true)}
      >
        <input
          readOnly
          type="text"
          className={[
            styles.input,
            error ? styles['input--error'] : ''
          ].filter(Boolean).join(' ')}
          value={displayValue}
          placeholder={placeholder}
          disabled={disabled}
        />
        <button 
          type="button" 
          className={styles['icon-button']}
          tabIndex={-1}
          disabled={disabled}
        >
          📅
        </button>
      </div>

      {helperText && (
        <span className={[
          styles['helper-text'],
          error ? styles['helper-text--error'] : ''
        ].join(' ')}>
          {helperText}
        </span>
      )}

      {isOpen && !disabled && (
        <div className={styles.popover}>
          {renderHeader()}
          {view === 'calendar' ? renderCalendar() : renderYears()}
        </div>
      )}
    </div>
  );
};

DatePicker.displayName = 'DatePicker';
