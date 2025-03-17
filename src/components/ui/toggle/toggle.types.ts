'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { toggleVariants } from './toggle.variants';

/**
 * Toggle component props
 */
export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {}
