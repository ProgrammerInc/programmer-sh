import {
  DayPickerDefaultProps,
  DayPickerMultipleProps,
  DayPickerRangeProps,
  DayPickerSingleProps
} from 'react-day-picker';

/**
 * Base props for the Calendar component
 */
type CalendarBaseProps = {
  /**
   * Whether to show days from the previous and next months
   * @default true
   */
  showOutsideDays?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Custom class names for specific calendar elements
   */
  classNames?: Record<string, string>;
};

/**
 * Props for the Calendar component in default mode
 */
export type CalendarDefaultProps = Omit<DayPickerDefaultProps, 'classNames'> & CalendarBaseProps;

/**
 * Props for the Calendar component in single mode
 */
export type CalendarSingleProps = Omit<DayPickerSingleProps, 'classNames'> & CalendarBaseProps;

/**
 * Props for the Calendar component in multiple mode
 */
export type CalendarMultipleProps = Omit<DayPickerMultipleProps, 'classNames'> & CalendarBaseProps;

/**
 * Props for the Calendar component in range mode
 */
export type CalendarRangeProps = Omit<DayPickerRangeProps, 'classNames'> & CalendarBaseProps;

/**
 * Union type for all Calendar component props based on mode
 */
export type CalendarProps =
  | CalendarDefaultProps
  | CalendarSingleProps
  | CalendarMultipleProps
  | CalendarRangeProps;
