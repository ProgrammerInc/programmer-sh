/**
 * Type definitions for the Globe component
 */

import ThreeGlobe from 'three-globe';

/**
 * Position data type for globe arcs and points
 */
export type GlobePosition = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

/**
 * Configuration options for the globe visualization
 */
export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

/**
 * Main props for the World component
 */
export interface WorldProps {
  globeConfig: GlobeConfig;
  data: GlobePosition[];
}

/**
 * Type for globe point data with color function
 */
export type GlobePointData = {
  size: number;
  order: number;
  color: (t: number) => string;
  lat: number;
  lng: number;
};

/**
 * Type for country feature data from GeoJSON
 */
export type CountryFeature = {
  type: string;
  properties: Record<string, unknown>;
  geometry: {
    type: string;
    coordinates: number[][][][] | number[][][];
  };
};

/**
 * Props for the GlobeObject component
 */
export interface GlobeObjectProps {
  properties: WorldProps;
}

/**
 * Type definition for the globe ready callback
 */
export type GlobeReadyCallback = (globe: ThreeGlobe) => void;

/**
 * Properties for the useThreeGlobe hook
 */
export interface UseThreeGlobeProps {
  globeConfig: GlobeConfig;
  data: GlobePosition[];
  onReady: GlobeReadyCallback;
}
