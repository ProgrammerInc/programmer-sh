'use client';

import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import styles from './card.module.css';
import {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardTitleProps
} from './card.types';

/**
 * CardHeader component
 *
 * Container for card title and description at the top of a card.
 *
 * @example
 * ```tsx
 * <CardHeader>
 *   <CardTitle>Title</CardTitle>
 *   <CardDescription>Description</CardDescription>
 * </CardHeader>
 * ```
 */
export const CardHeader = memo(
  React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => {
    const headerClassName = useMemo(() => {
      return cn(styles['card-header'], className);
    }, [className]);

    return <div ref={ref} className={headerClassName} {...props} />;
  })
);

CardHeader.displayName = 'CardHeader';

/**
 * CardTitle component
 *
 * The title displayed at the top of a card.
 *
 * @example
 * ```tsx
 * <CardTitle>Card Title</CardTitle>
 * ```
 */
export const CardTitle = memo(
  React.forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, ...props }, ref) => {
    const titleClassName = useMemo(() => {
      return cn(styles['card-title'], className);
    }, [className]);

    return <h3 ref={ref} className={titleClassName} {...props} />;
  })
);

CardTitle.displayName = 'CardTitle';

/**
 * CardDescription component
 *
 * Descriptive text displayed below the card title.
 *
 * @example
 * ```tsx
 * <CardDescription>This is a description of the card content</CardDescription>
 * ```
 */
export const CardDescription = memo(
  React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(({ className, ...props }, ref) => {
    const descriptionClassName = useMemo(() => {
      return cn(styles['card-description'], className);
    }, [className]);

    return <p ref={ref} className={descriptionClassName} {...props} />;
  })
);

CardDescription.displayName = 'CardDescription';

/**
 * CardContent component
 *
 * Container for the main content of a card.
 *
 * @example
 * ```tsx
 * <CardContent>
 *   <p>This is the main content of the card</p>
 * </CardContent>
 * ```
 */
export const CardContent = memo(
  React.forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => {
    const contentClassName = useMemo(() => {
      return cn(styles['card-content'], className);
    }, [className]);

    return <div ref={ref} className={contentClassName} {...props} />;
  })
);

CardContent.displayName = 'CardContent';

/**
 * CardFooter component
 *
 * Container for actions and content at the bottom of a card.
 *
 * @example
 * ```tsx
 * <CardFooter>
 *   <Button>Save</Button>
 *   <Button variant="outline">Cancel</Button>
 * </CardFooter>
 * ```
 */
export const CardFooter = memo(
  React.forwardRef<HTMLDivElement, CardFooterProps>(({ className, ...props }, ref) => {
    const footerClassName = useMemo(() => {
      return cn(styles['card-footer'], className);
    }, [className]);

    return <div ref={ref} className={footerClassName} {...props} />;
  })
);

CardFooter.displayName = 'CardFooter';
