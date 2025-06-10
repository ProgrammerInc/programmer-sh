/* eslint-disable no-secrets/no-secrets */
'use client';

import { cn } from '@/utils/app.utils';
import { forwardRef, memo, useMemo } from 'react';

import styles from './table.module.css';
import {
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableFooterProps,
  TableHeadProps,
  TableHeaderProps,
  TableProps,
  TableRowProps
} from './table.types';

/**
 * Table Component - A responsive data table with various styling options
 *
 * Features:
 * - Multiple style variants: default, bordered, zebra, and compact
 * - Responsive layout with horizontally scrollable container
 * - Semantic markup with proper accessibility attributes
 * - Comprehensive sub-components for table structure
 * - Row selection and hover states
 * - Support for sortable columns
 * - Support for truncated cell content
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Table>
 *   <TableCaption>List of users</TableCaption>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Email</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>John Doe</TableCell>
 *       <TableCell>john@example.com</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 *
 * // With variants
 * <Table variant="bordered">
 *   {/* Table content *\/}
 * </Table>
 * ```
 */
const Table = memo(
  forwardRef<HTMLTableElement, TableProps>(({ className, variant = 'default', ...props }, ref) => {
    // Generate class names based on variant
    const tableClassName = useMemo(() => {
      return cn(
        styles.table,
        variant === 'bordered' && styles['table-bordered'],
        variant === 'zebra' && styles['table-zebra'],
        variant === 'compact' && styles['table-compact'],
        className
      );
    }, [className, variant]);

    return (
      <div className={styles['table-container']}>
        <table ref={ref} className={tableClassName} {...props} />
      </div>
    );
  })
);

Table.displayName = 'Table';

/**
 * TableHeader Component - Container for table header rows
 *
 * Used to group header rows in a table and apply appropriate styling.
 *
 * @example
 * ```tsx
 * <TableHeader>
 *   <TableRow>
 *     <TableHead>Name</TableHead>
 *     <TableHead>Email</TableHead>
 *   </TableRow>
 * </TableHeader>
 * ```
 */
const TableHeader = memo(
  forwardRef<HTMLTableSectionElement, TableHeaderProps>(({ className, ...props }, ref) => {
    const headerClassName = useMemo(() => {
      return cn(styles['table-header'], className);
    }, [className]);

    return <thead ref={ref} className={headerClassName} {...props} />;
  })
);

TableHeader.displayName = 'TableHeader';

/**
 * TableBody Component - Container for table body rows
 *
 * Used to group body rows in a table and apply appropriate styling.
 *
 * @example
 * ```tsx
 * <TableBody>
 *   <TableRow>
 *     <TableCell>John Doe</TableCell>
 *     <TableCell>john@example.com</TableCell>
 *   </TableRow>
 * </TableBody>
 * ```
 */
const TableBody = memo(
  forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className, ...props }, ref) => {
    const bodyClassName = useMemo(() => {
      return cn(styles['table-body'], className);
    }, [className]);

    return <tbody ref={ref} className={bodyClassName} {...props} />;
  })
);

TableBody.displayName = 'TableBody';

/**
 * TableFooter Component - Container for table footer rows
 *
 * Used to group footer rows in a table with distinct styling.
 *
 * @example
 * ```tsx
 * <TableFooter>
 *   <TableRow>
 *     <TableCell colSpan={2}>Total: 10 items</TableCell>
 *   </TableRow>
 * </TableFooter>
 * ```
 */
const TableFooter = memo(
  forwardRef<HTMLTableSectionElement, TableFooterProps>(({ className, ...props }, ref) => {
    const footerClassName = useMemo(() => {
      return cn(styles['table-footer'], className);
    }, [className]);

    return <tfoot ref={ref} className={footerClassName} {...props} />;
  })
);

TableFooter.displayName = 'TableFooter';

/**
 * TableRow Component - Table row element with hover and selected states
 *
 * Renders a table row with support for hover effects and selection state.
 *
 * @example
 * ```tsx
 * <TableRow>
 *   <TableCell>John Doe</TableCell>
 *   <TableCell>john@example.com</TableCell>
 * </TableRow>
 *
 * // Selected row
 * <TableRow selected>
 *   <TableCell>John Doe</TableCell>
 *   <TableCell>john@example.com</TableCell>
 * </TableRow>
 * ```
 */
const TableRow = memo(
  forwardRef<HTMLTableRowElement, TableRowProps>(({ className, selected, ...props }, ref) => {
    const rowClassName = useMemo(() => {
      return cn(styles['table-row'], className);
    }, [className]);

    return (
      <tr
        ref={ref}
        className={rowClassName}
        data-state={selected ? 'selected' : undefined}
        {...props}
      />
    );
  })
);

TableRow.displayName = 'TableRow';

/**
 * TableHead Component - Table header cell for column headers
 *
 * Renders a table header cell with optional sortable functionality.
 *
 * @example
 * ```tsx
 * <TableHead>Name</TableHead>
 *
 * // Right-aligned header
 * <TableHead className="text-right">Actions</TableHead>
 *
 * // Sortable header
 * <TableHead sortable sortDirection="asc">Name</TableHead>
 * ```
 */
const TableHead = memo(
  forwardRef<HTMLTableCellElement, TableHeadProps>(
    ({ className, sortable, sortDirection, ...props }, ref) => {
      const headClassName = useMemo(() => {
        return cn(styles['table-head'], className);
      }, [className]);

      return (
        <th
          ref={ref}
          className={headClassName}
          aria-sort={
            sortDirection ? (sortDirection === 'asc' ? 'ascending' : 'descending') : undefined
          }
          data-sortable={sortable ? 'true' : undefined}
          {...props}
        />
      );
    }
  )
);

TableHead.displayName = 'TableHead';

/**
 * TableCell Component - Table data cell with consistent styling
 *
 * Renders a table cell with options for content truncation.
 *
 * @example
 * ```tsx
 * <TableCell>John Doe</TableCell>
 *
 * // Right-aligned cell
 * <TableCell className="text-right">View</TableCell>
 *
 * // Truncated content
 * <TableCell truncate>Very long content that will be truncated</TableCell>
 * ```
 */
const TableCell = memo(
  forwardRef<HTMLTableCellElement, TableCellProps>(({ className, truncate, ...props }, ref) => {
    const cellClassName = useMemo(() => {
      return cn(styles['table-cell'], truncate && styles['table-cell-truncate'], className);
    }, [className, truncate]);

    return <td ref={ref} className={cellClassName} {...props} />;
  })
);

TableCell.displayName = 'TableCell';

/**
 * TableCaption Component - Caption for the table
 *
 * Renders a caption element for the table, typically shown at the bottom.
 *
 * @example
 * ```tsx
 * <TableCaption>List of users and their email addresses</TableCaption>
 * ```
 */
const TableCaption = memo(
  forwardRef<HTMLTableCaptionElement, TableCaptionProps>(({ className, ...props }, ref) => {
    const captionClassName = useMemo(() => {
      return cn(styles['table-caption'], className);
    }, [className]);

    return <caption ref={ref} className={captionClassName} {...props} />;
  })
);

TableCaption.displayName = 'TableCaption';

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };

export default Table;
