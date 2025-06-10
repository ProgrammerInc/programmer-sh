/**
 * MasonryItem Interface
 *
 * Represents a single item in the masonry grid.
 *
 * @example
 * ```tsx
 * const items: MasonryItem[] = [
 *   {
 *     id: 1,
 *     height: 400,
 *     image: '/images/example1.jpg'
 *   },
 *   {
 *     id: 'unique-id-2',
 *     height: 300,
 *     image: '/images/example2.jpg'
 *   }
 * ];
 * ```
 */
export interface MasonryItem {
  /**
   * Unique identifier for the item
   */
  id: string | number;

  /**
   * The height of the item in pixels
   */
  height: number;

  /**
   * URL path to the image
   */
  image: string;
}

/**
 * GridItem Interface
 *
 * Extends MasonryItem with position and dimension data for rendering.
 * This interface is used internally by the Masonry component.
 *
 * @example
 * ```tsx
 * // Typically created internally by the Masonry component
 * const gridItem: GridItem = {
 *   id: 1,
 *   height: 400,
 *   image: '/images/example1.jpg',
 *   x: 0,
 *   y: 0,
 *   width: 300,
 *   height: 200
 * };
 * ```
 */
export interface GridItem extends MasonryItem {
  /**
   * X position in the grid
   */
  x: number;

  /**
   * Y position in the grid
   */
  y: number;

  /**
   * Width of the item in the grid
   */
  width: number;
}

/**
 * MasonryProps Interface
 *
 * Props for the Masonry component.
 *
 * @example
 * ```tsx
 * <Masonry data={masonryItems} />
 * ```
 */
export interface MasonryProps {
  /**
   * Array of items to be displayed in the masonry grid
   */
  data: MasonryItem[];
}
