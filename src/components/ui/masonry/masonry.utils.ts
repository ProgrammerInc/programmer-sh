import { MasonryItem, GridItem } from './masonry.types';

/**
 * Default column counts for different screen widths
 */
export const MASONRY_DEFAULTS = {
  /**
   * Column count for large screens (min-width: 1500px)
   */
  LARGE_SCREEN_COLUMNS: 5,
  
  /**
   * Column count for medium screens (min-width: 1000px)
   */
  MEDIUM_SCREEN_COLUMNS: 4,
  
  /**
   * Column count for small screens (min-width: 600px)
   */
  SMALL_SCREEN_COLUMNS: 3,
  
  /**
   * Column count for mobile screens
   */
  MOBILE_COLUMNS: 1,
  
  /**
   * Default height scaling factor
   */
  HEIGHT_SCALE_FACTOR: 2
};

/**
 * Calculate grid positions for masonry items
 * 
 * @param items - Array of masonry items
 * @param columns - Number of columns in the grid
 * @param containerWidth - Width of the container
 * @returns Array of grid items with position data and the final heights array
 */
export const calculateGridPositions = (
  items: MasonryItem[],
  columns: number,
  containerWidth: number
): { gridItems: GridItem[], heights: number[] } => {
  const heights = new Array(columns).fill(0);
  const heightScaleFactor = MASONRY_DEFAULTS.HEIGHT_SCALE_FACTOR;
  
  const gridItems = items.map(item => {
    // Find the column with the smallest height
    const column = heights.indexOf(Math.min(...heights));
    
    // Calculate position
    const columnWidth = containerWidth / columns;
    const x = columnWidth * column;
    const scaledHeight = item.height / heightScaleFactor;
    const y = (heights[column] += scaledHeight) - scaledHeight;
    
    return {
      ...item,
      x,
      y,
      width: columnWidth,
      height: scaledHeight
    };
  });
  
  return { gridItems, heights };
};

/**
 * Determine the number of columns based on screen width
 * 
 * @returns The appropriate number of columns
 */
export const getColumnCountForScreenSize = (): number => {
  if (typeof window === 'undefined') return MASONRY_DEFAULTS.SMALL_SCREEN_COLUMNS;
  
  if (window.matchMedia('(min-width: 1500px)').matches) {
    return MASONRY_DEFAULTS.LARGE_SCREEN_COLUMNS;
  } else if (window.matchMedia('(min-width: 1000px)').matches) {
    return MASONRY_DEFAULTS.MEDIUM_SCREEN_COLUMNS;
  } else if (window.matchMedia('(min-width: 600px)').matches) {
    return MASONRY_DEFAULTS.SMALL_SCREEN_COLUMNS;
  } else {
    return MASONRY_DEFAULTS.MOBILE_COLUMNS;
  }
};
