/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from 'three';

/**
 * Interface representing a distortion effect that can be applied to the hyperspeed animation.
 * Defines the shader uniforms and distortion function used to create the visual effect.
 */
export interface Distortion {
  uniforms: Record<string, { value: any }>;
  getDistortion: string;
  getJS?: (progress: number, time: number) => THREE.Vector3;
}

/**
 * Collection of named distortion effects that can be applied to the hyperspeed animation.
 */
export interface Distortions {
  [key: string]: Distortion;
}

/**
 * Colors configuration for various elements of the hyperspeed animation.
 */
export interface Colors {
  roadColor: number;
  islandColor: number;
  background: number;
  shoulderLines: number;
  brokenLines: number;
  leftCars: number[];
  rightCars: number[];
  sticks: number;
}

/**
 * Configuration options for the hyperspeed animation with all customizable parameters.
 */
export interface HyperspeedOptions {
  onSpeedUp?: (ev: MouseEvent) => void;
  onSlowDown?: (ev: MouseEvent) => void;
  distortion?: string | Distortion;
  length: number;
  roadWidth: number;
  islandWidth: number;
  lanesPerRoad: number;
  fov: number;
  fovSpeedUp: number;
  speedUp: number;
  carLightsFade: number;
  totalSideLightSticks: number;
  lightPairsPerRoadWay: number;
  shoulderLinesWidthPercentage: number;
  brokenLinesWidthPercentage: number;
  brokenLinesLengthPercentage: number;
  lightStickWidth: [number, number];
  lightStickHeight: [number, number];
  movingAwaySpeed: [number, number];
  movingCloserSpeed: [number, number];
  carLightsLength: [number, number];
  carLightsRadius: [number, number];
  carWidthPercentage: [number, number];
  carShiftX: [number, number];
  carFloorSeparation: [number, number];
  colors: Colors;
  isHyper?: boolean;
}

/**
 * Props for the Hyperspeed React component.
 */
export interface HyperspeedProps {
  effectOptions?: Partial<HyperspeedOptions>;
}
