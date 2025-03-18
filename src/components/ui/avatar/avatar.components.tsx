'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { AvatarFallbackProps, AvatarImageProps } from './avatar.types';
import styles from './avatar.module.css';
import { cn } from '@/utils/app.utils';

/**
 * Avatar Image component
 * 
 * Displays the avatar image within an Avatar component.
 */
export const AvatarImage = memo(React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const imageClassName = useMemo(() => {
    return cn(styles['avatar-image'], className);
  }, [className]);

  return (
    <AvatarPrimitive.Image
      className={imageClassName}
      ref={ref}
      {...props}
    />
  );
}));

AvatarImage.displayName = AvatarPrimitive.Image.displayName;

/**
 * Avatar Fallback component
 * 
 * Displays a fallback when the avatar image fails to load
 */
export const AvatarFallback = memo(React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const fallbackClassName = useMemo(() => {
    return cn(styles['avatar-fallback'], className);
  }, [className]);

  return (
    <AvatarPrimitive.Fallback
      className={fallbackClassName}
      ref={ref}
      {...props}
    />
  );
}));

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
