import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';

/**
 * Avatar component props
 */
export type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>;

/**
 * Avatar image component props
 */
export type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;

/**
 * Avatar fallback component props
 */
export type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>;
