'use client';

import * as React from 'react';

import { type ButtonProps } from '@/components/ui/button/button.types';

/**
 * Pagination Props
 *
 * Props for the root Pagination component that contains a collection of pagination elements.
 *
 * Provides navigation between pages of content.
 */
export type PaginationProps = React.ComponentProps<'nav'>;

/**
 * Pagination Content Props
 *
 * Props for the PaginationContent component that contains pagination items.
 *
 * Provides a container for pagination items in a horizontal list.
 */
export type PaginationContentProps = React.HTMLAttributes<HTMLUListElement>;

/**
 * Pagination Item Props
 *
 * Props for the PaginationItem component that wraps pagination elements.
 *
 * Acts as a container for individual pagination elements like links, ellipsis, etc.
 */
export type PaginationItemProps = React.HTMLAttributes<HTMLLIElement>;

/**
 * Pagination Link Props
 *
 * Props for the PaginationLink component that represents a link to a specific page.
 *
 * @property isActive - Whether the link represents the current page
 * @property size - The size of the button
 */
export type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>;

/**
 * Pagination Previous Props
 *
 * Props for the PaginationPrevious component that navigates to the previous page.
 *
 * Extends PaginationLinkProps.
 */
export type PaginationPreviousProps = React.ComponentProps<'a'> & PaginationLinkProps;

/**
 * Pagination Next Props
 *
 * Props for the PaginationNext component that navigates to the next page.
 *
 * Extends PaginationLinkProps.
 */
export type PaginationNextProps = React.ComponentProps<'a'> & PaginationLinkProps;

/**
 * Pagination Ellipsis Props
 *
 * Props for the PaginationEllipsis component that represents a range of skipped pages.
 *
 * Used to indicate a gap in page numbers.
 */
export type PaginationEllipsisProps = React.HTMLAttributes<HTMLSpanElement>;
