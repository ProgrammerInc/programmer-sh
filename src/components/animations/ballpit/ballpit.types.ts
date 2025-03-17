/**
 * Type definitions for the Ballpit animation component
 *
 * @module BallpitTypes
 */

import { Vector2, WebGLRendererParameters } from 'three';
import { X } from './x.class';
import { Z } from './z.class';

/**
 * Props for the Ballpit component
 *
 * @interface BallpitProps
 */
export interface BallpitProps {
  /** Additional CSS class for styling */
  className?: string;
  /** Whether balls should follow cursor movements */
  followCursor?: boolean;
  /** Number of balls to render */
  count?: number;
  /** Array of colors for the balls */
  colors?: number[];
  /** Ambient light color */
  ambientColor?: number;
  /** Ambient light intensity */
  ambientIntensity?: number;
  /** Point light intensity */
  lightIntensity?: number;
  /** Material parameters for the balls */
  materialParams?: {
    metalness: number;
    roughness: number;
    clearcoat: number;
    clearcoatRoughness: number;
  };
  /** Minimum size of balls */
  minSize?: number;
  /** Maximum size of balls */
  maxSize?: number;
  /** Size of the first ball */
  size0?: number;
  /** Gravity strength */
  gravity?: number;
  /** Friction coefficient */
  friction?: number;
  /** Wall bounce coefficient */
  wallBounce?: number;
  /** Maximum velocity of balls */
  maxVelocity?: number;
  /** Maximum X bound */
  maxX?: number;
  /** Maximum Y bound */
  maxY?: number;
  /** Maximum Z bound */
  maxZ?: number;
  /** Whether to control the first sphere */
  controlSphere0?: boolean;
}

/**
 * Return type for the createBallpit function
 *
 * @interface CreateBallpitReturn
 */
export interface CreateBallpitReturn {
  /** Three.js instance */
  three: X;
  /** Spheres instance */
  spheres: Z;
  /** Function to set the number of balls */
  setCount: (count: number) => void;
  /** Function to toggle animation pause state */
  togglePause: () => void;
  /** Function to dispose and clean up resources */
  dispose: () => void;
}

/**
 * Interface for pointer/cursor data
 *
 * @interface PointerData
 */
export interface PointerData {
  /** Current pointer position */
  position: Vector2;
  /** Normalized pointer position */
  nPosition: Vector2;
  /** Whether pointer is hovering */
  hover: boolean;
  /** Callback when pointer enters */
  onEnter: (data: PointerData) => void;
  /** Callback when pointer moves */
  onMove: (data: PointerData) => void;
  /** Callback when pointer clicks */
  onClick: (data: PointerData) => void;
  /** Callback when pointer leaves */
  onLeave: (data: PointerData) => void;
  /** Function to dispose pointer listeners */
  dispose?: () => void;
}

/**
 * Interface for size data
 *
 * @interface SizeData
 */
export interface SizeData {
  /** Canvas width */
  width: number;
  /** Canvas height */
  height: number;
  /** World width */
  wWidth: number;
  /** World height */
  wHeight: number;
  /** Aspect ratio */
  ratio: number;
  /** Device pixel ratio */
  pixelRatio: number;
}

/**
 * Configuration for the W class (spheres physics)
 *
 * @interface WConfig
 */
export interface WConfig {
  /** Number of balls to render */
  count: number;
  /** Maximum X bound */
  maxX: number;
  /** Maximum Y bound */
  maxY: number;
  /** Maximum Z bound */
  maxZ: number;
  /** Maximum size of balls */
  maxSize: number;
  /** Minimum size of balls */
  minSize: number;
  /** Size of the first ball */
  size0: number;
  /** Gravity strength */
  gravity: number;
  /** Friction coefficient */
  friction: number;
  /** Wall bounce coefficient */
  wallBounce: number;
  /** Maximum velocity of balls */
  maxVelocity: number;
  /** Whether to control the first sphere */
  controlSphere0?: boolean;
  /** Whether balls should follow cursor movements */
  followCursor?: boolean;
}

/**
 * Configuration for the X class (Three.js setup)
 *
 * @interface XConfig
 */
export interface XConfig {
  /** Canvas element to render to */
  canvas?: HTMLCanvasElement;
  /** Unique identifier */
  id?: string;
  /** Three.js WebGL renderer options */
  rendererOptions?: Partial<WebGLRendererParameters>;
  /** Size configuration */
  size?: 'parent' | { width: number; height: number };
}
