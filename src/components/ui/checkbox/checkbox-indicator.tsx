'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';

import { cn } from '@/utils/app.utils';
import { CheckboxIndicatorProps } from './checkbox.types';
import { CheckboxIcon } from './checkbox-icon';
import styles from './checkbox.module.css';

/**
 * CheckboxIndicator component
 * 
 * Container for the checkbox's indicator icon
 */
export const CheckboxIndicator = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Indicator>,
  CheckboxIndicatorProps
>(({ className, children, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Indicator
      ref={ref}
      className={cn(styles.indicator, className)}
      {...props}
    >
      {children || <CheckboxIcon />}
    </CheckboxPrimitive.Indicator>
  );
});

CheckboxIndicator.displayName = CheckboxPrimitive.Indicator.displayName;
