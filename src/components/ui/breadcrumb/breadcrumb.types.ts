import * as React from 'react';

/**
 * Props for the Breadcrumb component
 */
export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<'nav'> {
  /**
   * Custom separator element to use between breadcrumb items
   */
  separator?: React.ReactNode;
}

/**
 * Props for the BreadcrumbList component
 */
export type BreadcrumbListProps = React.ComponentPropsWithoutRef<'ol'>;

/**
 * Props for the BreadcrumbItem component
 */
export type BreadcrumbItemProps = React.ComponentPropsWithoutRef<'li'>;

/**
 * Props for the BreadcrumbLink component
 */
export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  /**
   * When true, the component will not render an <a> tag, but will instead use the child as the root element
   */
  asChild?: boolean;
}

/**
 * Props for the BreadcrumbPage component
 */
export type BreadcrumbPageProps = React.ComponentPropsWithoutRef<'span'>;

/**
 * Props for the BreadcrumbSeparator component
 */
export type BreadcrumbSeparatorProps = React.ComponentProps<'li'>;

/**
 * Props for the BreadcrumbEllipsis component
 */
export type BreadcrumbEllipsisProps = React.ComponentProps<'span'>;
