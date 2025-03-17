'use client';

import { cn } from '@/utils/app.utils';
import * as React from 'react';
import { memo, useMemo } from 'react';

import {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps
} from './card.types';

/**
 * Card component
 * 
 * A container component with rounded corners, border, and subtle shadow.
 * 
 * @example
 * // Basic card with content
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Card Content</CardContent>
 *   <CardFooter>Card Footer</CardFooter>
 * </Card>
 */
const Card = memo(React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    const cardClassName = useMemo(() => {
      return cn('rounded-lg border bg-card text-card-foreground shadow-sm', className);
    }, [className]);

    return <div ref={ref} className={cardClassName} {...props} />;
  }
));

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
const CardHeader = memo(React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    const headerClassName = useMemo(() => {
      return cn('flex flex-col space-y-1.5 p-6', className);
    }, [className]);

    return <div ref={ref} className={headerClassName} {...props} />;
  }
));

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
const CardTitle = memo(React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    const titleClassName = useMemo(() => {
      return cn('text-2xl font-semibold leading-none tracking-tight', className);
    }, [className]);

    return <h3 ref={ref} className={titleClassName} {...props} />;
  }
));

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
const CardDescription = memo(React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    const descriptionClassName = useMemo(() => {
      return cn('text-sm text-muted-foreground', className);
    }, [className]);

    return <p ref={ref} className={descriptionClassName} {...props} />;
  }
));

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
const CardContent = memo(React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    const contentClassName = useMemo(() => {
      return cn('p-6 pt-0', className);
    }, [className]);

    return <div ref={ref} className={contentClassName} {...props} />;
  }
));

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
const CardFooter = memo(React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    const footerClassName = useMemo(() => {
      return cn('flex items-center p-6 pt-0', className);
    }, [className]);

    return <div ref={ref} className={footerClassName} {...props} />;
  }
));

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
};

export default Card;
