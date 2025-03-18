/**
 * Alert Description Component
 *
 * A component for the descriptive content of an alert.
 */

'use client';

import { cn } from '@/utils/app.utils';
import * as React from 'react';
import { memo, useMemo } from 'react';

import styles from './alert.module.css';
import { AlertDescriptionProps } from './alert.types';

/**
 * AlertDescription component for the content of an alert
 * 
 * @example
 * ```tsx
 * <Alert>
 *   <AlertTitle>Heads up!</AlertTitle>
 *   <AlertDescription>This is an alert message.</AlertDescription>
 * </Alert>
 * ```
 */
export const AlertDescription = memo(React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className, ...props }, ref) => {
    const descriptionClassName = useMemo(() => {
      return cn(styles.description, className);
    }, [className]);

    return <div ref={ref} className={descriptionClassName} {...props} />;
  }
));

AlertDescription.displayName = 'AlertDescription';

export default AlertDescription;
