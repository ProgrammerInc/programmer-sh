'use client';

import { cn } from '@/utils/app.utils';
import { GripVertical } from 'lucide-react';
import * as React from 'react';
import { memo } from 'react';
import * as ResizablePrimitive from 'react-resizable-panels';

import styles from './resizable.module.css';
import {
  ResizableHandleProps,
  ResizablePanelGroupProps,
  ResizablePanelProps
} from './resizable.types';

/**
 * ResizablePanelGroup Component
 * 
 * A container that holds and manages multiple resizable panels.
 * Panels can be resized horizontally or vertically based on the direction prop.
 * 
 * @example
 * ```tsx
 * <ResizablePanelGroup direction="horizontal">
 *   <ResizablePanel defaultSize={25}>
 *     <div>Sidebar</div>
 *   </ResizablePanel>
 *   <ResizableHandle />
 *   <ResizablePanel defaultSize={75}>
 *     <div>Content</div>
 *   </ResizablePanel>
 * </ResizablePanelGroup>
 * ```
 */
const ResizablePanelGroup = memo(({ 
  className, 
  ...props 
}: ResizablePanelGroupProps) => (
  <ResizablePrimitive.PanelGroup
    className={cn(styles['panel-group'], className)}
    {...props}
  />
));

ResizablePanelGroup.displayName = 'ResizablePanelGroup';

/**
 * ResizablePanel Component
 * 
 * An individual panel within a ResizablePanelGroup that can be resized.
 * Can have a minimum and maximum size, and a default size.
 * 
 * @example
 * ```tsx
 * <ResizablePanel 
 *   defaultSize={50} 
 *   minSize={20} 
 *   maxSize={80}
 * >
 *   <div>Panel content</div>
 * </ResizablePanel>
 * ```
 */
const ResizablePanel = memo(ResizablePrimitive.Panel) as React.NamedExoticComponent<ResizablePanelProps>;

ResizablePanel.displayName = 'ResizablePanel';

/**
 * ResizableHandle Component
 * 
 * A handle component that users can drag to resize panels.
 * Can optionally display a grip handle for better visual indication.
 * 
 * @example
 * ```tsx
 * <ResizableHandle withHandle />
 * ```
 */
const ResizableHandle = memo(({ 
  withHandle, 
  className, 
  ...props 
}: ResizableHandleProps) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(styles['resize-handle'], className)}
    {...props}
  >
    {withHandle && (
      <div className={styles['grip-container']}>
        <GripVertical className={styles['grip-icon']} />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
));

ResizableHandle.displayName = 'ResizableHandle';

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
export default ResizableHandle;
