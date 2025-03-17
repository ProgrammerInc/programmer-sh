'use client';

import { cn } from '@/utils/app.utils';
import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';

import {
  BreadcrumbEllipsisProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbPageProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps
} from './breadcrumb.types';

/**
 * Breadcrumb component for navigation hierarchy
 * 
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/components">Components</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */
const Breadcrumb = memo(React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />
));

Breadcrumb.displayName = 'Breadcrumb';

/**
 * BreadcrumbList component to contain breadcrumb items
 */
const BreadcrumbList = memo(React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => {
    const listClassName = useMemo(() => {
      return cn(
        'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
        className
      );
    }, [className]);

    return <ol ref={ref} className={listClassName} {...props} />;
  }
));

BreadcrumbList.displayName = 'BreadcrumbList';

/**
 * BreadcrumbItem component to represent each item in the breadcrumb trail
 */
const BreadcrumbItem = memo(React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => {
    const itemClassName = useMemo(() => {
      return cn('inline-flex items-center gap-1.5', className);
    }, [className]);

    return <li ref={ref} className={itemClassName} {...props} />;
  }
));

BreadcrumbItem.displayName = 'BreadcrumbItem';

/**
 * BreadcrumbLink component for clickable breadcrumb items
 */
const BreadcrumbLink = memo(React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a';
    const linkClassName = useMemo(() => {
      return cn('transition-colors hover:text-foreground', className);
    }, [className]);

    return <Comp ref={ref} className={linkClassName} {...props} />;
  }
));

BreadcrumbLink.displayName = 'BreadcrumbLink';

/**
 * BreadcrumbPage component for the current page in the breadcrumb
 */
const BreadcrumbPage = memo(React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => {
    const pageClassName = useMemo(() => {
      return cn('font-normal text-foreground', className);
    }, [className]);

    return (
      <span
        ref={ref}
        role="link"
        aria-disabled="true"
        aria-current="page"
        className={pageClassName}
        {...props}
      />
    );
  }
));

BreadcrumbPage.displayName = 'BreadcrumbPage';

/**
 * BreadcrumbSeparator component for visual separation between breadcrumb items
 */
const BreadcrumbSeparator = memo(({ 
  children, 
  className, 
  ...props 
}: BreadcrumbSeparatorProps) => {
  const separatorClassName = useMemo(() => {
    return cn('[&>svg]:size-3.5', className);
  }, [className]);

  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={separatorClassName}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
});

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

/**
 * BreadcrumbEllipsis component for indicating truncated breadcrumb items
 */
const BreadcrumbEllipsis = memo(({ 
  className, 
  ...props 
}: BreadcrumbEllipsisProps) => {
  const ellipsisClassName = useMemo(() => {
    return cn('flex h-9 w-9 items-center justify-center', className);
  }, [className]);

  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={ellipsisClassName}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More</span>
    </span>
  );
});

BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
};

export default Breadcrumb;
