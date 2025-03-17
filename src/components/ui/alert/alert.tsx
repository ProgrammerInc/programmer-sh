'use client';

import { cn } from '@/utils/app.utils';
import * as React from 'react';
import { memo, useMemo } from 'react';

import {
  AlertDescriptionProps,
  AlertProps,
  AlertTitleProps
} from './alert.types';
import { alertVariants } from './alert.variants';

/**
 * Alert component for displaying important messages
 * 
 * @example
 * ```tsx
 * <Alert>
 *   <AlertTitle>Heads up!</AlertTitle>
 *   <AlertDescription>This is an alert message.</AlertDescription>
 * </Alert>
 * 
 * <Alert variant="destructive">
 *   <AlertTitle>Error</AlertTitle>
 *   <AlertDescription>Something went wrong.</AlertDescription>
 * </Alert>
 * ```
 */
const Alert = memo(React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => {
    const alertClassName = useMemo(() => {
      return cn(alertVariants({ variant }), className);
    }, [variant, className]);

    return <div ref={ref} role="alert" className={alertClassName} {...props} />;
  }
));

Alert.displayName = 'Alert';

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
const AlertTitle = memo(React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, ...props }, ref) => {
    const titleClassName = useMemo(() => {
      return cn('mb-1 font-medium leading-none tracking-tight', className);
    }, [className]);

    return <h5 ref={ref} className={titleClassName} {...props} />;
  }
));

AlertTitle.displayName = 'AlertTitle';

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
const AlertDescription = memo(React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className, ...props }, ref) => {
    const descriptionClassName = useMemo(() => {
      return cn('text-sm [&_p]:leading-relaxed', className);
    }, [className]);

    return <div ref={ref} className={descriptionClassName} {...props} />;
  }
));

AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };

export default Alert;
