/* eslint-disable no-secrets/no-secrets */
'use client';

import * as React from 'react';
import { memo } from 'react';
import {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from './breadcrumb.components';
import { BreadcrumbProps } from './breadcrumb.types';

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
const Breadcrumb = memo(
  React.forwardRef<HTMLElement, BreadcrumbProps>(({ separator, ...props }, ref) => (
    <nav ref={ref} aria-label="breadcrumb" {...props} />
  ))
);

Breadcrumb.displayName = 'Breadcrumb';

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
