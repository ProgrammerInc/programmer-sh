'use client';

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';
import { memo, forwardRef, useMemo } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/utils/app.utils';
import styles from './pagination.module.css';
import {
  PaginationContentProps,
  PaginationEllipsisProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationNextProps,
  PaginationPreviousProps,
  PaginationProps
} from './pagination.types';

/**
 * Pagination
 * 
 * A navigation component for switching between pages of content.
 */
const Pagination = memo(({ className, ...props }: PaginationProps) => {
  const navClassName = useMemo(() => {
    return cn(styles.pagination, className);
  }, [className]);

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={navClassName}
      {...props}
    />
  );
});

Pagination.displayName = 'Pagination';

/**
 * Pagination Content
 * 
 * Container for pagination items.
 */
const PaginationContent = memo(forwardRef<
  HTMLUListElement,
  PaginationContentProps
>(({ className, ...props }, ref) => {
  const contentClassName = useMemo(() => {
    return cn(styles['pagination-content'], className);
  }, [className]);

  return <ul ref={ref} className={contentClassName} {...props} />;
}));

PaginationContent.displayName = 'PaginationContent';

/**
 * Pagination Item
 * 
 * Wraps individual pagination elements like links, ellipsis, etc.
 */
const PaginationItem = memo(forwardRef<
  HTMLLIElement,
  PaginationItemProps
>(({ className, ...props }, ref) => {
  const itemClassName = useMemo(() => {
    return cn(styles['pagination-item'], className);
  }, [className]);

  return <li ref={ref} className={itemClassName} {...props} />;
}));

PaginationItem.displayName = 'PaginationItem';

/**
 * Pagination Link
 * 
 * A link component for navigating to a specific page.
 */
const PaginationLink = memo(({ 
  className, 
  isActive, 
  size = 'icon', 
  ...props 
}: PaginationLinkProps & React.ComponentPropsWithoutRef<'a'>) => {
  const linkClassName = useMemo(() => {
    return cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size
      }),
      styles['pagination-link'],
      className
    );
  }, [className, isActive, size]);

  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      className={linkClassName}
      {...props}
    />
  );
});

PaginationLink.displayName = 'PaginationLink';

/**
 * Pagination Previous
 * 
 * A link component for navigating to the previous page.
 */
const PaginationPrevious = memo(({ 
  className, 
  ...props 
}: Omit<PaginationPreviousProps, 'ref'>) => {
  const previousClassName = useMemo(() => {
    return cn(styles['pagination-previous'], className);
  }, [className]);

  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={previousClassName}
      {...props}
    >
      <ChevronLeft className={styles['pagination-icon']} />
      <span>Previous</span>
    </PaginationLink>
  );
});

PaginationPrevious.displayName = 'PaginationPrevious';

/**
 * Pagination Next
 * 
 * A link component for navigating to the next page.
 */
const PaginationNext = memo(({ 
  className, 
  ...props 
}: Omit<PaginationNextProps, 'ref'>) => {
  const nextClassName = useMemo(() => {
    return cn(styles['pagination-next'], className);
  }, [className]);

  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={nextClassName}
      {...props}
    >
      <span>Next</span>
      <ChevronRight className={styles['pagination-icon']} />
    </PaginationLink>
  );
});

PaginationNext.displayName = 'PaginationNext';

/**
 * Pagination Ellipsis
 * 
 * A component that represents a range of skipped pages.
 */
const PaginationEllipsis = memo(({ 
  className, 
  ...props 
}: PaginationEllipsisProps) => {
  const ellipsisClassName = useMemo(() => {
    return cn(styles['pagination-ellipsis'], className);
  }, [className]);

  return (
    <span
      aria-hidden
      className={ellipsisClassName}
      {...props}
    >
      <MoreHorizontal className={styles['pagination-icon']} />
      <span className={styles['sr-only']}>More pages</span>
    </span>
  );
});

PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
};

export default Pagination;
