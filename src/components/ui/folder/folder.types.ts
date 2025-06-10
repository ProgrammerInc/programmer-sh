import React from 'react';

/**
 * Offset Interface
 *
 * Represents the x and y offset for a paper element in the folder.
 */
export interface Offset {
  /**
   * Horizontal offset
   */
  x: number;

  /**
   * Vertical offset
   */
  y: number;
}

/**
 * FolderProps Interface
 *
 * Props for the Folder component.
 *
 * @example
 * ```tsx
 * <Folder
 *   color="#00d8ff"
 *   size={1.2}
 *   items={[
 *     <div>Document 1</div>,
 *     <div>Document 2</div>,
 *     <div>Document 3</div>
 *   ]}
 * />
 * ```
 */
export interface FolderProps {
  /**
   * Primary color of the folder
   * @default "#00d8ff"
   */
  color?: string;

  /**
   * Scale factor for the folder size
   * @default 1
   */
  size?: number;

  /**
   * Array of React nodes to display as papers in the folder.
   * Maximum of 3 items will be used.
   * @default []
   */
  items?: React.ReactNode[];

  /**
   * Additional CSS class name
   * @default ""
   */
  className?: string;
}
