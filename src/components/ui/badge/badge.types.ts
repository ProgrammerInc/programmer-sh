'use client';

import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { badgeVariants } from './badge.variants';

/**
 * Badge component props
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}
