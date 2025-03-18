/**
 * InfiniteMenu Component Type Definitions
 * 
 * Types for the InfiniteMenu component that provides a WebGL-based 3D interactive menu with grid items.
 * 
 * @module
 */

import { mat4, vec2, vec3 } from 'gl-matrix';
import { FC, MutableRefObject, ReactNode } from 'react';

/**
 * MenuItem Interface
 * 
 * Represents a single item in the infinite menu grid.
 * 
 * @example
 * ```tsx
 * const menuItems: MenuItem[] = [
 *   {
 *     image: '/images/item1.jpg',
 *     link: '/page1',
 *     title: 'First Item',
 *     description: 'Description of the first item'
 *   },
 *   // more items...
 * ];
 * ```
 */
export interface MenuItem {
  /** URL to the image displayed for this menu item */
  image: string;
  /** Navigation link for the item (can be internal route or external URL) */
  link: string;
  /** Title displayed for the item */
  title: string;
  /** Description displayed for the item */
  description: string;
}

/**
 * ActiveItemCallback Type
 * 
 * Callback function type for when the active item changes.
 * 
 * @param index The index of the newly active item
 */
export type ActiveItemCallback = (index: number) => void;

/**
 * MovementChangeCallback Type
 * 
 * Callback function type for when the movement state changes.
 * 
 * @param isMoving Whether the menu is currently in motion
 */
export type MovementChangeCallback = (isMoving: boolean) => void;

/**
 * InitCallback Type
 * 
 * Callback function type for initialization of the menu.
 * 
 * @param menu The InfiniteGridMenu instance
 */
export type InitCallback = (menu: InfiniteGridMenu) => void;

/**
 * InfiniteGridMenu Interface
 * 
 * Interface for the InfiniteGridMenu class used by the InfiniteMenu component.
 */
export interface InfiniteGridMenu {
  /** Run the WebGL animation loop */
  run: (time?: number) => void;
  /** Resize the WebGL canvas to match the container */
  resize: () => void;
}

/**
 * Camera Interface
 * 
 * Defines the properties for the 3D camera used in the menu.
 */
export interface Camera {
  /** The camera matrix */
  matrix: mat4;
  /** Near clipping plane distance */
  near: number;
  /** Far clipping plane distance */
  far: number;
  /** Field of view in radians */
  fov: number;
  /** Aspect ratio of the viewport */
  aspect: number;
  /** Camera position vector */
  position: vec3;
  /** Camera up vector */
  up: vec3;
  /** Matrices for view, projection, and inverse projection */
  matrices: {
    view: mat4;
    projection: mat4;
    inversProjection: mat4;
  };
}

/**
 * Face Interface
 * 
 * Represents a triangular face in 3D geometry.
 */
export interface Face {
  /** Index of the first vertex */
  a: number;
  /** Index of the second vertex */
  b: number;
  /** Index of the third vertex */
  c: number;
}

/**
 * Vertex Interface
 * 
 * Represents a vertex in 3D geometry.
 */
export interface Vertex {
  /** 3D position vector */
  position: vec3;
  /** Normal vector */
  normal: vec3;
  /** UV texture coordinates */
  uv: vec2;
}

/**
 * InfiniteMenuProps Interface
 * 
 * Props for the InfiniteMenu component.
 * 
 * @example
 * ```tsx
 * <InfiniteMenu items={myItems} />
 * ```
 */
export interface InfiniteMenuProps {
  /** Array of menu items to display in the grid */
  items?: MenuItem[];
}
