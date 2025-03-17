/**
 * Utility functions for the Neon Cursor component.
 */

/**
 * Combines multiple class names into a single string.
 * Similar to clsx or classnames libraries.
 *
 * @param classes - Class names to combine
 * @returns Combined class name string
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Calculates center offset for cursor elements.
 *
 * @param size - Size of the element in pixels
 * @returns Offset value to center the element on cursor position
 */
export function calculateCenterOffset(size: number): number {
  return size / 2;
}

/**
 * Checks if the event target is an interactive element.
 *
 * @param element - DOM element to check
 * @param selector - Selector string for interactive elements
 * @returns Whether the element matches the interactive elements selector
 */
export function isInteractiveElement(element: Element, selector: string): boolean {
  return element.matches(selector);
}
