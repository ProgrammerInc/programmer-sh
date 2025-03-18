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
  BreadcrumbSeparatorProps
} from './breadcrumb.types';
import styles from './breadcrumb.module.css';

/**
 * BreadcrumbList component to contain breadcrumb items
 */
export const BreadcrumbList = memo(React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => {
    const listClassName = useMemo(() => {
      return cn(styles.list, className);
    }, [className]);

    return <ol ref={ref} className={listClassName} {...props} />;
  }
));

BreadcrumbList.displayName = 'BreadcrumbList';

/**
 * BreadcrumbItem component to represent each item in the breadcrumb trail
 */
export const BreadcrumbItem = memo(React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => {
    const itemClassName = useMemo(() => {
      return cn(styles.item, className);
    }, [className]);

    return <li ref={ref} className={itemClassName} {...props} />;
  }
));

BreadcrumbItem.displayName = 'BreadcrumbItem';

/**
 * BreadcrumbLink component for clickable breadcrumb items
 */
export const BreadcrumbLink = memo(React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a';
    const linkClassName = useMemo(() => {
      return cn(styles.link, className);
    }, [className]);

    return <Comp ref={ref} className={linkClassName} {...props} />;
  }
));

BreadcrumbLink.displayName = 'BreadcrumbLink';

/**
 * BreadcrumbPage component for the current page in the breadcrumb
 */
export const BreadcrumbPage = memo(React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => {
    const pageClassName = useMemo(() => {
      return cn(styles.page, className);
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
export const BreadcrumbSeparator = memo(({ 
  children, 
  className, 
  ...props 
}: BreadcrumbSeparatorProps) => {
  const separatorClassName = useMemo(() => {
    return cn(styles.separator, className);
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
export const BreadcrumbEllipsis = memo(({ 
  className, 
  ...props 
}: BreadcrumbEllipsisProps) => {
  const ellipsisClassName = useMemo(() => {
    return cn(styles.ellipsis, className);
  }, [className]);

  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={ellipsisClassName}
      {...props}
    >
      <MoreHorizontal className={styles['ellipsis-icon']} />
      <span className={styles['sr-only']}>More</span>
    </span>
  );
});

BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';
