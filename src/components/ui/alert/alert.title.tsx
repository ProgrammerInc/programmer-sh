/**
 * Alert Title Component
 *
 * A heading component for alert messages.
 */

'use client';

import { cn } from '@/utils/app.utils';
import * as React from 'react';
import { memo, useMemo } from 'react';

import styles from './alert.module.css';
import { AlertTitleProps } from './alert.types';

/**
 * AlertTitle component for the heading of an alert
 *
 * @example
 * ```tsx
 * <Alert>
 *   <AlertTitle>Heads up!</AlertTitle>
 * </Alert>
 * ```
 */
export const AlertTitle = memo(
  React.forwardRef<HTMLHeadingElement, AlertTitleProps>(({ className, ...props }, ref) => {
    const titleClassName = useMemo(() => {
      return cn(styles.title, className);
    }, [className]);

    return <h5 ref={ref} className={titleClassName} {...props} />;
  })
);

AlertTitle.displayName = 'AlertTitle';

export default AlertTitle;
