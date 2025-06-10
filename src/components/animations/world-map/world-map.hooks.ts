/**
 * Custom hooks for the WorldMap animation component
 */
import DottedMap from 'dotted-map';
import { useMemo } from 'react';
import { DEFAULT_VALUES } from './world-map.constants';

/**
 * Hook to generate the dotted map SVG
 * @param theme Theme of the map (dark or light)
 * @returns SVG string representation of the dotted map
 */
export const useDottedMapSVG = (theme: 'dark' | 'light' = DEFAULT_VALUES.THEME): string => {
  return useMemo(() => {
    const map = new DottedMap({
      height: DEFAULT_VALUES.MAP_HEIGHT,
      grid: DEFAULT_VALUES.MAP_GRID
    });

    return map.getSVG({
      radius: DEFAULT_VALUES.DOT_RADIUS,
      color: theme === 'dark' ? DEFAULT_VALUES.DOT_COLORS.DARK : DEFAULT_VALUES.DOT_COLORS.LIGHT,
      shape: DEFAULT_VALUES.DOT_SHAPE,
      backgroundColor: DEFAULT_VALUES.BACKGROUND_COLOR
    });
  }, [theme]);
};
