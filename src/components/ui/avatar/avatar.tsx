'use client';

import { cn } from '@/utils/app.utils';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { AvatarFallbackProps, AvatarImageProps, AvatarProps } from './avatar.types';

/**
 * Avatar component
 * 
 * A form control that displays a user avatar with optional fallback.
 * Built on top of Radix UI's Avatar primitive.
 * 
 * @example
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="https://example.com/avatar.jpg" alt="@username" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
const Avatar = memo(React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const rootClassName = useMemo(() => {
    return cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className);
  }, [className]);

  return (
    <AvatarPrimitive.Root
      className={rootClassName}
      ref={ref}
      {...props}
    />
  );
}));

Avatar.displayName = AvatarPrimitive.Root.displayName;

/**
 * Avatar Image component
 * 
 * Displays the avatar image within an Avatar component.
 */
const AvatarImage = memo(React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const imageClassName = useMemo(() => {
    return cn('aspect-square h-full w-full', className);
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
const AvatarFallback = memo(React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const fallbackClassName = useMemo(() => {
    return cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className
    );
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

export { Avatar, AvatarFallback, AvatarImage };
export default Avatar;
