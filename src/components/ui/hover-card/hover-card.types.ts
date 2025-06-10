/**
 * @file hover-card.types.ts
 * @description Type definitions for the HoverCard component.
 * Based on Radix UI's HoverCard primitive component.
 */

import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as React from 'react';

// Import the missing types from Radix UI
import type { DismissableLayerProps } from '@radix-ui/react-dismissable-layer';

/**
 * Re-exported from Radix UI's DismissableLayer for proper typing
 */
type PointerDownOutsideEvent = DismissableLayerProps['onPointerDownOutside'] extends (
  event: infer Event
) => void
  ? Event
  : never;

/**
 * HoverCard root component props
 *
 * @see https://www.radix-ui.com/primitives/docs/components/hover-card#root
 *
 * @example
 * ```tsx
 * <HoverCard openDelay={200} closeDelay={300}>
 *   <HoverCardTrigger>Hover over me</HoverCardTrigger>
 *   <HoverCardContent>Content</HoverCardContent>
 * </HoverCard>
 * ```
 */
export interface HoverCardProps
  extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root> {
  /** The duration from when the mouse enters the trigger until the hover card opens (in milliseconds) */
  openDelay?: number;

  /** The duration from when the mouse leaves the trigger or content until the hover card closes (in milliseconds) */
  closeDelay?: number;
}

/**
 * HoverCard trigger component props
 *
 * The element that triggers the hover card when hovered or focused.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/hover-card#trigger
 *
 * @example
 * ```tsx
 * <HoverCardTrigger asChild>
 *   <Button>Hover over me</Button>
 * </HoverCardTrigger>
 * ```
 */
export interface HoverCardTriggerProps
  extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger> {
  /** Change the component to the HTML tag or custom component of the only child */
  asChild?: boolean;
}

/**
 * HoverCard content component props
 *
 * The component that pops out when the trigger is hovered or focused.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/hover-card#content
 *
 * @example
 * ```tsx
 * <HoverCardContent className="p-4" align="start" sideOffset={5}>
 *   <div className="flex space-x-4">
 *     <Avatar />
 *     <div className="space-y-1">
 *       <h4 className="text-sm font-semibold">User Name</h4>
 *       <p className="text-sm">Additional user information</p>
 *     </div>
 *   </div>
 * </HoverCardContent>
 * ```
 */
export interface HoverCardContentProps
  extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> {
  /** Change the component to the HTML tag or custom component of the only child */
  asChild?: boolean;

  /** The preferred alignment of the hover card against the trigger. May change when collisions occur. */
  align?: 'start' | 'center' | 'end';

  /** The preferred side of the trigger to render against when open. May change when collisions occur. */
  side?: 'top' | 'right' | 'bottom' | 'left';

  /** The distance in pixels from the trigger. */
  sideOffset?: number;

  /** The distance in pixels from the alignment edge. */
  alignOffset?: number;

  /** When true, overrides the side and align preferences to prevent collisions with window edges. */
  avoidCollisions?: boolean;

  /** The element used as the collision boundary. By default, this is the viewport. */
  collisionBoundary?: Element | null | Array<Element | null>;

  /** The distance in pixels from the boundary edges where collision detection should occur. */
  collisionPadding?: number | Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>;

  /** Event handler called when focus moves into the component. It can be prevented by calling event.preventDefault. */
  onFocusIn?: (event: React.FocusEvent) => void;

  /** Event handler called when focus moves out of the component. It can be prevented by calling event.preventDefault. */
  onFocusOut?: (event: React.FocusEvent) => void;

  /** Event handler called when the escape key is down. It can be prevented by calling event.preventDefault */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;

  /** Event handler called when a pointer down event happens outside of the component. It can be prevented by calling event.preventDefault. */
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
}
