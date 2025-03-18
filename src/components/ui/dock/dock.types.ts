import { MotionValue, SpringOptions } from 'framer-motion';
import React from 'react';

/**
 * Dock Item Data
 * 
 * Represents a single item in the dock.
 * 
 * @example
 * ```tsx
 * const items: DockItemData[] = [
 *   {
 *     icon: <CommandIcon size={24} />,
 *     label: 'Command',
 *     onClick: () => setCommandOpen(true),
 *   },
 *   {
 *     icon: <SettingsIcon size={24} />,
 *     label: 'Settings',
 *     onClick: () => setSettingsOpen(true),
 *   }
 * ];
 * ```
 */
export interface DockItemData {
  /** Icon component to display in the dock item */
  icon: React.ReactNode;
  /** Label text that appears on hover */
  label: React.ReactNode;
  /** Handler that's called when the dock item is clicked */
  onClick: () => void;
  /** Optional custom className for styling */
  className?: string;
}

/**
 * Dock Props
 * 
 * Props for the main Dock component.
 * 
 * @see https://www.framer.com/motion/spring/ for spring options
 * 
 * @example
 * ```tsx
 * <Dock
 *   items={dockItems}
 *   magnification={80}
 *   baseItemSize={50}
 *   distance={200}
 * />
 * ```
 */
export interface DockProps {
  /** Array of items to display in the dock */
  items: DockItemData[];
  /** Optional custom className for styling */
  className?: string;
  /** Distance threshold for magnification effect (in pixels) */
  distance?: number;
  /** Height of the dock panel (in pixels) */
  panelHeight?: number;
  /** Base size of dock items (in pixels) */
  baseItemSize?: number;
  /** Maximum height of the dock (in pixels) */
  dockHeight?: number;
  /** Maximum size for magnified items (in pixels) */
  magnification?: number;
  /** Spring animation options for smooth transitions */
  spring?: SpringOptions;
}

/**
 * Dock Item Props
 * 
 * Props for individual dock items.
 * 
 * @internal
 */
export interface DockItemProps {
  /** Optional custom className for styling */
  className?: string;
  /** Icon and label components */
  children: React.ReactNode;
  /** Handler that's called when the dock item is clicked */
  onClick?: () => void;
  /** Current mouse X position as a motion value */
  mouseX: MotionValue;
  /** Spring animation options */
  spring: SpringOptions;
  /** Distance threshold for magnification effect */
  distance: number;
  /** Base size of dock items */
  baseItemSize: number;
  /** Maximum size for magnified items */
  magnification: number;
}

/**
 * Dock Label Props
 * 
 * Props for the label that appears on hover.
 * 
 * @example
 * ```tsx
 * <DockLabel>Settings</DockLabel>
 * ```
 */
export interface DockLabelProps {
  /** Optional custom className for styling */
  className?: string;
  /** Label text */
  children: React.ReactNode;
  /** @internal */
  isHovered?: MotionValue<number>;
}

/**
 * Dock Icon Props
 * 
 * Props for the icon within a dock item.
 * 
 * @example
 * ```tsx
 * <DockIcon><SettingsIcon size={24} /></DockIcon>
 * ```
 */
export interface DockIconProps {
  /** Optional custom className for styling */
  className?: string;
  /** Icon component */
  children: React.ReactNode;
}
