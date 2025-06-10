'use client';

import { memo, useMemo } from 'react';
import { ClassNames, DayPicker } from 'react-day-picker';

import { cn } from '@/utils/app.utils';
import styles from './calendar.module.css';
import { CalendarProps } from './calendar.types';

/**
 * Calendar component based on react-day-picker
 *
 * A date picker component with support for date ranges and styling options.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Calendar />
 *
 * // With selected date
 * <Calendar selected={new Date()} />
 *
 * // With mode="range" for date range selection
 * <Calendar mode="range" selected={{ from: startDate, to: endDate }} />
 * ```
 */
const Calendar = memo(
  ({ className, classNames: userClassNames, showOutsideDays = true, ...props }: CalendarProps) => {
    // Create the combined class names with CSS module styles
    const combinedClassNames = useMemo(
      () => ({
        months: styles.months,
        month: styles.month,
        caption: styles.caption,
        caption_label: styles['caption-label'],
        nav: styles.nav,
        nav_button: cn(styles['nav-button']),
        nav_button_previous: cn(styles['nav-button'], styles['nav-button-previous']),
        nav_button_next: cn(styles['nav-button'], styles['nav-button-next']),
        table: styles.table,
        head_row: styles['head-row'],
        head_cell: styles['head-cell'],
        row: styles.row,
        cell: styles.cell,
        day: styles.day,
        day_range_end: styles['day-range-end'],
        day_selected: styles['day-selected'],
        day_today: styles['day-today'],
        day_outside: styles['day-outside'],
        day_disabled: styles['day-disabled'],
        day_range_middle: styles['day-range-middle'],
        day_hidden: styles['day-hidden'],
        ...(userClassNames || {})
      }),
      [userClassNames]
    );

    // Generate calendar container class name
    const calendarClassName = useMemo(() => {
      return cn(styles.calendar, className);
    }, [className]);

    // Icon components that return React elements, not just nodes
    const IconLeft = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    );

    const IconRight = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    );

    // Use a simpler approach - just spread all props to DayPicker
    return (
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={calendarClassName}
        classNames={combinedClassNames as ClassNames}
        components={{
          IconLeft,
          IconRight
        }}
        {...props}
      />
    );
  }
);

Calendar.displayName = 'Calendar';

export { Calendar };

export default Calendar;
