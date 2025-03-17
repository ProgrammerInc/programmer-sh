'use client';

import { buttonVariants } from '@/components/ui/button/button.variants';
import { cn } from '@/utils/app.utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';
import { ClassNames, DayPicker } from 'react-day-picker';

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
const Calendar = memo(({ 
  className, 
  classNames: userClassNames, 
  showOutsideDays = true, 
  ...props 
}: CalendarProps) => {
  // Create the combined class names with tailwind styles
  const combinedClassNames = useMemo(() => ({
    months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
    month: 'space-y-4',
    caption: 'flex justify-center pt-1 relative items-center',
    caption_label: 'text-sm font-medium',
    nav: 'space-x-1 flex items-center',
    nav_button: cn(
      buttonVariants({ variant: 'outline' }),
      'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
    ),
    nav_button_previous: 'absolute left-1',
    nav_button_next: 'absolute right-1',
    table: 'w-full border-collapse space-y-1',
    head_row: 'flex',
    head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
    row: 'flex w-full mt-2',
    cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
    day: cn(
      buttonVariants({ variant: 'ghost' }),
      'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
    ),
    day_range_end: 'day-range-end',
    day_selected:
      'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
    day_today: 'bg-accent text-accent-foreground',
    day_outside:
      'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
    day_disabled: 'text-muted-foreground opacity-50',
    day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
    day_hidden: 'invisible',
    ...(userClassNames || {})
  }), [userClassNames]);

  // Generate calendar container class name
  const calendarClassName = useMemo(() => {
    return cn('p-3', className);
  }, [className]);

  // Prepare the DayPicker props
  const customProps = {
    showOutsideDays,
    className: calendarClassName,
    classNames: combinedClassNames as unknown as ClassNames,
    components: {
      IconLeft: () => <ChevronLeft className="h-4 w-4" />,
      IconRight: () => <ChevronRight className="h-4 w-4" />
    }
  };

  // Use type assertion based on mode to fix the TypeScript error
  // This approach maintains type safety while working with the discriminated union
  return <DayPicker {...props} {...customProps} />;
});

Calendar.displayName = 'Calendar';

export { Calendar };

export default Calendar;
