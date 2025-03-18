'use client';

import * as React from 'react';

/**
 * Table variant type
 * 
 * Defines the visual style variants of the table.
 */
export type TableVariant = 'default' | 'bordered' | 'zebra' | 'compact';

/**
 * Table component props
 * 
 * @property {string} className - Additional CSS class for the table element
 * @property {TableVariant} variant - The visual style variant of the table
 * @property {React.Ref<HTMLTableElement>} ref - Ref forwarded to the table element
 */
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  variant?: TableVariant;
  ref?: React.Ref<HTMLTableElement>;
}

/**
 * Table header component props
 * 
 * @property {string} className - Additional CSS class for the thead element
 * @property {React.Ref<HTMLTableSectionElement>} ref - Ref forwarded to the thead element
 */
export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  ref?: React.Ref<HTMLTableSectionElement>;
}

/**
 * Table body component props
 * 
 * @property {string} className - Additional CSS class for the tbody element
 * @property {React.Ref<HTMLTableSectionElement>} ref - Ref forwarded to the tbody element
 */
export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  ref?: React.Ref<HTMLTableSectionElement>;
}

/**
 * Table footer component props
 * 
 * @property {string} className - Additional CSS class for the tfoot element
 * @property {React.Ref<HTMLTableSectionElement>} ref - Ref forwarded to the tfoot element
 */
export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  ref?: React.Ref<HTMLTableSectionElement>;
}

/**
 * Table row component props
 * 
 * @property {string} className - Additional CSS class for the tr element
 * @property {boolean} selected - Whether the row is selected
 * @property {React.Ref<HTMLTableRowElement>} ref - Ref forwarded to the tr element
 */
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
  ref?: React.Ref<HTMLTableRowElement>;
}

/**
 * Table head component props
 * 
 * @property {string} className - Additional CSS class for the th element
 * @property {"asc" | "desc"} sortDirection - The sort direction for sortable columns
 * @property {boolean} sortable - Whether the column is sortable
 * @property {React.Ref<HTMLTableCellElement>} ref - Ref forwarded to the th element
 */
export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortDirection?: "asc" | "desc";
  sortable?: boolean;
  ref?: React.Ref<HTMLTableCellElement>;
}

/**
 * Table cell component props
 * 
 * @property {string} className - Additional CSS class for the td element
 * @property {boolean} truncate - Whether to truncate overflow content
 * @property {React.Ref<HTMLTableCellElement>} ref - Ref forwarded to the td element
 */
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  truncate?: boolean;
  ref?: React.Ref<HTMLTableCellElement>;
}

/**
 * Table caption component props
 * 
 * @property {string} className - Additional CSS class for the caption element
 * @property {React.Ref<HTMLTableCaptionElement>} ref - Ref forwarded to the caption element
 */
export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
  ref?: React.Ref<HTMLTableCaptionElement>;
}
