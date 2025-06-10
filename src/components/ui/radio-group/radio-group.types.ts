'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

/**
 * RadioGroup Component Props
 *
 * Props for the RadioGroup component that wraps radio options.
 * Extends RadixUI RadioGroup Root component props.
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/radio-group#root | Radix UI Radio Group Root}
 */
export type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>;

/**
 * RadioGroupItem Component Props
 *
 * Props for individual radio button items within a RadioGroup.
 * Extends RadixUI RadioGroup Item component props.
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/radio-group#item | Radix UI Radio Group Item}
 */
export type RadioGroupItemProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>;

/**
 * RadioGroupIndicator Component Props
 *
 * Props for the indicator element that appears when a radio item is selected.
 * Extends RadixUI RadioGroup Indicator component props.
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/radio-group#indicator | Radix UI Radio Group Indicator}
 */
export type RadioGroupIndicatorProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Indicator
>;
