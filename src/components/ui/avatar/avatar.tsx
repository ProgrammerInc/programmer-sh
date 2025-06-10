'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import { AvatarFallback, AvatarImage } from './avatar.components';
import styles from './avatar.module.css';
import { AvatarProps } from './avatar.types';

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
const Avatar = memo(
  React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
    ({ className, ...props }, ref) => {
      // Memoize the className calculation
      const rootClassName = useMemo(() => {
        return cn(styles['avatar-root'], className);
      }, [className]);

      return <AvatarPrimitive.Root className={rootClassName} ref={ref} {...props} />;
    }
  )
);

Avatar.displayName = AvatarPrimitive.Root.displayName;

export { Avatar, AvatarFallback, AvatarImage };
export default Avatar;
