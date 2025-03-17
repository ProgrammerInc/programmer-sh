import * as React from 'react';

/**
 * Table component props
 */
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  /**
   * Ref forwarded to the table element
   */
  ref?: React.Ref<HTMLTableElement>;
}

/**
 * Table header component props
 */
export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  /**
   * Ref forwarded to the thead element
   */
  ref?: React.Ref<HTMLTableSectionElement>;
}

/**
 * Table body component props
 */
export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  /**
   * Ref forwarded to the tbody element
   */
  ref?: React.Ref<HTMLTableSectionElement>;
}

/**
 * Table footer component props
 */
export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  /**
   * Ref forwarded to the tfoot element
   */
  ref?: React.Ref<HTMLTableSectionElement>;
}

/**
 * Table row component props
 */
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * Ref forwarded to the tr element
   */
  ref?: React.Ref<HTMLTableRowElement>;
}

/**
 * Table head component props
 */
export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * Ref forwarded to the th element
   */
  ref?: React.Ref<HTMLTableCellElement>;
}

/**
 * Table cell component props
 */
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /**
   * Ref forwarded to the td element
   */
  ref?: React.Ref<HTMLTableCellElement>;
}

/**
 * Table caption component props
 */
export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
  /**
   * Ref forwarded to the caption element
   */
  ref?: React.Ref<HTMLTableCaptionElement>;
}
