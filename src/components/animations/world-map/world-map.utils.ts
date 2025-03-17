/**
 * Utility functions for the WorldMap animation component
 */
import { MAP_PROJECTION } from './world-map.constants';
import type { MapPoint, ProjectedPoint } from './world-map.types';

/**
 * Projects a geographic coordinate (lat/lng) to an SVG coordinate (x/y)
 * @param lat Latitude coordinate
 * @param lng Longitude coordinate
 * @returns Projected point with x,y coordinates
 */
export const projectPoint = (lat: number, lng: number): ProjectedPoint => {
  const x = (lng + MAP_PROJECTION.LNG_OFFSET) * MAP_PROJECTION.X_SCALE;
  const y = (MAP_PROJECTION.LAT_OFFSET - lat) * MAP_PROJECTION.Y_SCALE;
  return { x, y };
};

/**
 * Creates a curved SVG path between two points
 * @param start Starting point coordinates
 * @param end Ending point coordinates
 * @returns SVG path data string for a quadratic Bezier curve
 */
export const createCurvedPath = (start: ProjectedPoint, end: ProjectedPoint): string => {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - MAP_PROJECTION.CURVE_HEIGHT_OFFSET;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
};

/**
 * Projects a MapPoint to SVG coordinates
 * @param point Map point with lat/lng
 * @returns Projected point with x,y coordinates
 */
export const projectMapPoint = (point: MapPoint): ProjectedPoint => {
  return projectPoint(point.lat, point.lng);
};
