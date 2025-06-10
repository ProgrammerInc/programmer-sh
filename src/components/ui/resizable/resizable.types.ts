'use client';

import * as React from 'react';
import * as ResizablePrimitive from 'react-resizable-panels';

/**
 * Resizable Panel Group Props
 *
 * Props for the ResizablePanelGroup component that wraps resizable panels.
 * Extends ResizablePrimitive.PanelGroup component props.
 *
 * @see {@link https://github.com/bvaughn/react-resizable-panels | React Resizable Panels}
 */
export type ResizablePanelGroupProps = React.ComponentProps<typeof ResizablePrimitive.PanelGroup>;

/**
 * Resizable Panel Props
 *
 * Props for the ResizablePanel component representing a resizable panel within a group.
 * Extends ResizablePrimitive.Panel component props.
 *
 * @see {@link https://github.com/bvaughn/react-resizable-panels | React Resizable Panels}
 */
export type ResizablePanelProps = React.ComponentProps<typeof ResizablePrimitive.Panel>;

/**
 * Resizable Handle Props
 *
 * Props for the ResizableHandle component that allows users to resize panels.
 * Extends ResizablePrimitive.PanelResizeHandle component props with an additional
 * `withHandle` property to display a draggable handle.
 *
 * @see {@link https://github.com/bvaughn/react-resizable-panels | React Resizable Panels}
 */
export interface ResizableHandleProps
  extends React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> {
  /**
   * Whether to display a draggable handle.
   * When true, a grip icon will be shown on the resize handle.
   */
  withHandle?: boolean;
}
