/**
 * Types for the WorldMap animation component
 */
import type { ReactNode } from 'react';

/**
 * Point coordinates definition for map locations
 */
export interface MapPoint {
  /** Latitude coordinate */
  lat: number;
  /** Longitude coordinate */
  lng: number;
  /** Optional label for the point */
  label?: string;
}

/**
 * Connection between two map points
 */
export interface MapConnection {
  /** Starting point coordinates */
  start: MapPoint;
  /** Ending point coordinates */
  end: MapPoint;
}

/**
 * SVG point coordinates after projection
 */
export interface ProjectedPoint {
  /** X coordinate on the SVG canvas */
  x: number;
  /** Y coordinate on the SVG canvas */
  y: number;
}

/**
 * Props for the WorldMap component
 */
export interface WorldMapProps {
  /** Array of connections between points on the map */
  dots?: MapConnection[];
  /** Whether the map is draggable */
  draggable?: boolean;
  /** Color for the connection lines */
  lineColor?: string;
  /** Map theme (dark or light) */
  theme?: 'dark' | 'light';
  /** Additional class name for the container */
  className?: string;
}
