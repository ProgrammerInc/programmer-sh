/**
 * Custom hooks for the BackgroundBoxes component
 */

import { CSSProperties, useMemo } from 'react';
import {
  CSS_CLASSES,
  DEFAULT_COLORS,
  DEFAULT_GRID,
  DEFAULT_TRANSFORM
} from './background-boxes.constants';
import styles from './background-boxes.module.css';
import { cn, createArray } from './background-boxes.utils';

/**
 * Hook to generate container class name with proper composition
 *
 * @param className - Additional class name
 * @returns Combined class name string
 */
export function useBoxesContainerClassName(className?: string): string {
  return useMemo(() => cn(styles[CSS_CLASSES.container], className), [className]);
}

/**
 * Hook to generate container style
 *
 * @returns Container style object
 */
export function useContainerStyle(): CSSProperties {
  return useMemo(() => DEFAULT_TRANSFORM, []);
}

/**
 * Hook to generate row class name
 *
 * @returns Row class name string
 */
export function useRowClassName(): string {
  return useMemo(() => styles[CSS_CLASSES.row], []);
}

/**
 * Hook to generate box class name
 *
 * @returns Box class name string
 */
export function useBoxClassName(): string {
  return useMemo(() => styles[CSS_CLASSES.box], []);
}

/**
 * Hook to generate icon class name
 *
 * @returns Icon class name string
 */
export function useIconClassName(): string {
  return useMemo(() => styles[CSS_CLASSES.icon], []);
}

/**
 * Hook to generate memoized rows array
 *
 * @param rowCount - Number of rows
 * @returns Memoized array of rows
 */
export function useRows(rowCount: number = DEFAULT_GRID.rowCount): number[] {
  return useMemo(() => createArray(rowCount, 1), [rowCount]);
}

/**
 * Hook to generate memoized columns array
 *
 * @param colCount - Number of columns
 * @returns Memoized array of columns
 */
export function useColumns(colCount: number = DEFAULT_GRID.colCount): number[] {
  return useMemo(() => createArray(colCount, 1), [colCount]);
}

/**
 * Hook to generate memoized colors array
 *
 * @returns Memoized array of color variables
 */
export function useColors(): string[] {
  return useMemo(() => DEFAULT_COLORS, []);
}
