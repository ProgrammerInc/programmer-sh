'use client';

import { cn } from '@/utils/app.utils';
import * as React from 'react';
import { memo, useMemo } from 'react';

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
 * Table component
 * 
 * A responsive table with various sub-components for different parts of the table structure.
 * 
 * @example
 * ```tsx
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
 * ```
 */
const Table = memo(React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => {
    // Memoize the className calculation
    const tableClassName = useMemo(() => {
      return cn('w-full caption-bottom text-sm', className);
    }, [className]);
    
    return (
      <div className="relative w-full overflow-auto">
        <table ref={ref} className={tableClassName} {...props} />
      </div>
    );
  }
));

Table.displayName = 'Table';

/**
 * TableHeader component
 * 
 * Container for table header rows.
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
const TableHeader = memo(React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const headerClassName = useMemo(() => {
    return cn('[&_tr]:border-b', className);
  }, [className]);
  
  return <thead ref={ref} className={headerClassName} {...props} />;
}));

TableHeader.displayName = 'TableHeader';

/**
 * TableBody component
 * 
 * Container for table body rows.
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
const TableBody = memo(React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const bodyClassName = useMemo(() => {
    return cn('[&_tr:last-child]:border-0', className);
  }, [className]);
  
  return <tbody ref={ref} className={bodyClassName} {...props} />;
}));

TableBody.displayName = 'TableBody';

/**
 * TableFooter component
 * 
 * Container for table footer rows.
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
const TableFooter = memo(React.forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const footerClassName = useMemo(() => {
    return cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className);
  }, [className]);
  
  return <tfoot ref={ref} className={footerClassName} {...props} />;
}));

TableFooter.displayName = 'TableFooter';

/**
 * TableRow component
 * 
 * Table row element with hover and selected states.
 * 
 * @example
 * ```tsx
 * <TableRow>
 *   <TableCell>John Doe</TableCell>
 *   <TableCell>john@example.com</TableCell>
 * </TableRow>
 * ```
 */
const TableRow = memo(React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => {
    // Memoize the className calculation
    const rowClassName = useMemo(() => {
      return cn(
        'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className
      );
    }, [className]);
    
    return <tr ref={ref} className={rowClassName} {...props} />;
  }
));

TableRow.displayName = 'TableRow';

/**
 * TableHead component
 * 
 * Table header cell with styling for column headers.
 * 
 * @example
 * ```tsx
 * <TableHead>Name</TableHead>
 * <TableHead className="text-right">Actions</TableHead>
 * ```
 */
const TableHead = memo(React.forwardRef<
  HTMLTableCellElement,
  TableHeadProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const headClassName = useMemo(() => {
    return cn(
      'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
      className
    );
  }, [className]);
  
  return <th ref={ref} className={headClassName} {...props} />;
}));

TableHead.displayName = 'TableHead';

/**
 * TableCell component
 * 
 * Table data cell with consistent padding and alignment.
 * 
 * @example
 * ```tsx
 * <TableCell>John Doe</TableCell>
 * <TableCell className="text-right">Edit</TableCell>
 * ```
 */
const TableCell = memo(React.forwardRef<
  HTMLTableCellElement,
  TableCellProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const cellClassName = useMemo(() => {
    return cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className);
  }, [className]);
  
  return <td ref={ref} className={cellClassName} {...props} />;
}));

TableCell.displayName = 'TableCell';

/**
 * TableCaption component
 * 
 * Caption for the table, typically shown at the bottom.
 * 
 * @example
 * ```tsx
 * <TableCaption>List of users and their email addresses</TableCaption>
 * ```
 */
const TableCaption = memo(React.forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const captionClassName = useMemo(() => {
    return cn('mt-4 text-sm text-muted-foreground', className);
  }, [className]);
  
  return <caption ref={ref} className={captionClassName} {...props} />;
}));

TableCaption.displayName = 'TableCaption';

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };

export default Table;
