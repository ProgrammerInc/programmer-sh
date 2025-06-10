/* eslint-disable no-secrets/no-secrets */
/**
 * Alert Component
 *
 * A component for displaying important messages to the user.
 */

'use client';

import { cn } from '@/utils/app.utils';
import * as React from 'react';
import { memo, useMemo } from 'react';

import styles from './alert.module.css';
import { AlertProps } from './alert.types';

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
export const Alert = memo(
  React.forwardRef<HTMLDivElement, AlertProps>(
    ({ className, variant = 'default', ...props }, ref) => {
      const alertClassName = useMemo(() => {
        return cn(
          styles.alert,
          variant === 'destructive' ? styles.destructive : styles.default,
          className
        );
      }, [variant, className]);

      return <div ref={ref} role="alert" className={alertClassName} {...props} />;
    }
  )
);

Alert.displayName = 'Alert';

export default Alert;
