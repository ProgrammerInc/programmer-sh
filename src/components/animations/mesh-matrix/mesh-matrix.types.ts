/**
 * Type definitions for the Mesh Matrix animation component
 */

import { Mesh } from 'three';

/**
 * Props for the MeshMatrix component
 *
 * @interface MeshMatrixProps
 */
export interface MeshMatrixProps {
  /** Source URL for the video to be displayed with mesh effect */
  videoSrc: string;

  /** Color of the mesh wireframe. Default: '#ffffff' */
  meshColor?: string;

  /** Density of the mesh grid (higher = more detailed). Default: 30 */
  meshDensity?: number;

  /** Intensity of the distortion effect. Default: 0.5 */
  distortionIntensity?: number;

  /** Additional CSS class name */
  className?: string;
}

/**
 * Props for the internal VideoMesh component
 *
 * @interface VideoMeshProps
 */
export interface VideoMeshProps {
  /** Source URL for the video to be used as texture */
  videoSrc: string;

  /** Color of the mesh wireframe */
  meshColor: string;

  /** Density of the mesh grid */
  meshDensity: number;

  /** Intensity of the distortion effect */
  distortionIntensity: number;
}

/**
 * Ref type for the mesh element
 */
export type MeshRefType = React.RefObject<Mesh>;

/**
 * Position data for mesh distortion
 */
export interface DistortionPosition {
  /** X coordinate */
  x: number;

  /** Y coordinate */
  y: number;

  /** Z coordinate (height/distortion) */
  z: number;
}
