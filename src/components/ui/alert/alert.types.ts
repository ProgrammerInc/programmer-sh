/**
 * Type definitions for Alert components
 */

import * as React from 'react';

/**
 * Props for the Alert component
 */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Style variant for the alert - 'default' or 'destructive' */
  variant?: 'default' | 'destructive';
}

/**
 * Props for the AlertTitle component
 */
export type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

/**
 * Props for the AlertDescription component
 */
export type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
