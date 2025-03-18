'use client';

import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as React from 'react';

/**
 * Switch component props
 * 
 * Props for the Switch component, extending Radix UI's Switch Root props.
 * 
 * @property {string} className - Additional CSS class for the root element
 * @property {boolean} checked - Whether the switch is checked or not
 * @property {function} onCheckedChange - Callback for when the checked state changes
 * @property {boolean} disabled - Whether the switch is disabled or not
 * @property {string} name - Name attribute for the underlying input element
 * @property {string} value - Value attribute for the underlying input element
 * @property {string} id - Id attribute for the underlying input element
 * @property {string} aria-label - Accessible label for the switch
 * @property {string} aria-labelledby - Id of an element that labels the switch
 * @property {string} aria-describedby - Id of an element that describes the switch
 */
export type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>;

/**
 * Switch thumb component props
 * 
 * Props for the Switch thumb component, extending Radix UI's Switch Thumb props.
 * 
 * @property {string} className - Additional CSS class for the thumb element
 */
export type SwitchThumbProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Thumb>;

/**
 * Switch size type
 * 
 * Defines the available sizes for the Switch component.
 */
export type SwitchSize = 'default' | 'sm' | 'lg';

/**
 * Switch color scheme type
 * 
 * Defines the available color schemes for the Switch component.
 */
export type SwitchColorScheme = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
