/**
 * Type definitions for the Ballpit component
 */
import { MeshPhysicalMaterialParameters, Scene, Vector2, WebGLRenderer } from 'three';

/**
 * Configuration options for the Ballpit component
 *
 * @interface BallpitProps
 */
export interface BallpitProps {
  /** Optional class name for styling */
  className?: string;
  /** Whether the ballpit should follow the cursor */
  followCursor?: boolean;
  /** Number of balls in the ballpit */
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
  materialParams?: MeshPhysicalMaterialParameters;
  /** Minimum size of the balls */
  minSize?: number;
  /** Maximum size of the balls */
  maxSize?: number;
  /** Size of the first ball */
  size0?: number;
  /** Gravity strength */
  gravity?: number;
  /** Friction coefficient */
  friction?: number;
  /** Wall bounce coefficient */
  wallBounce?: number;
  /** Maximum velocity of the balls */
  maxVelocity?: number;
  /** Maximum X coordinate */
  maxX?: number;
  /** Maximum Y coordinate */
  maxY?: number;
  /** Maximum Z coordinate */
  maxZ?: number;
  /** Whether to control the first sphere with cursor */
  controlSphere0?: boolean;
}

/**
 * Configuration for the physics simulation
 *
 * @interface WConfig
 */
export interface WConfig {
  count: number;
  colors?: number[];
  ambientColor?: number;
  ambientIntensity?: number;
  lightIntensity?: number;
  materialParams?: MeshPhysicalMaterialParameters;
  minSize?: number;
  maxSize?: number;
  size0?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  maxVelocity?: number;
  maxX?: number;
  maxY?: number;
  maxZ?: number;
  controlSphere0?: boolean;
  followCursor?: boolean;
}

/**
 * Return type for createBallpit function
 *
 * @interface CreateBallpitReturn
 */
export interface CreateBallpitReturn {
  three: {
    scene: Scene;
    renderer: WebGLRenderer;
  };
  dispose: () => void;
  setCount: (count: number) => void;
  togglePause: () => void;
}

/**
 * Data for pointer tracking
 *
 * @interface PointerData
 */
export interface PointerData {
  /** Current pointer position */
  position: Vector2;
  /** Normalized pointer position (-1 to 1) */
  nPosition: Vector2;
  /** Whether the pointer is hovering over the element */
  hover: boolean;
  /** Callback when pointer enters element */
  onEnter: (data: PointerData) => void;
  /** Callback when pointer moves within element */
  onMove: (data: PointerData) => void;
  /** Callback when element is clicked */
  onClick: (data: PointerData) => void;
  /** Callback when pointer leaves element */
  onLeave: (data: PointerData) => void;
  /** Function to clean up event listeners */
  dispose?: () => void;
}

/**
 * Interface for objects with Three.js resources that can be disposed
 *
 * @interface ThreeJSInstance
 */
export interface ThreeJSInstance {
  three?: {
    scene?: Scene;
    renderer?: WebGLRenderer & {
      renderTarget?: { dispose: () => void };
    };
  };
  dispose?: () => void;
}
