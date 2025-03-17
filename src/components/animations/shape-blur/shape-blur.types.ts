/**
 * Type definitions for the ShapeBlur animation component
 *
 * The ShapeBlur component creates animated interactive blurred shapes
 * using WebGL and Three.js with custom shaders.
 */

/**
 * Props for the ShapeBlur component
 *
 * @property {string} className - Additional CSS class names
 * @property {number} variation - Shape variation (0-3): 0=rounded rect, 1=filled circle, 2=circle stroke, 3=triangle
 * @property {number} pixelRatioProp - Custom pixel ratio override
 * @property {number} shapeSize - Size of the shape relative to container
 * @property {number} roundness - Roundness of corners for rounded rectangle
 * @property {number} borderSize - Size of the shape border
 * @property {number} circleSize - Size of the interactive mouse circle
 * @property {number} circleEdge - Edge softness of the interactive mouse circle
 */
export interface ShapeBlurProps {
  className?: string;
  variation?: number;
  pixelRatioProp?: number;
  shapeSize?: number;
  roundness?: number;
  borderSize?: number;
  circleSize?: number;
  circleEdge?: number;
}

/**
 * ShapeBlur animation configuration
 *
 * @property {number} damping - Damping factor for mouse movement (higher = more responsive)
 */
export interface ShapeBlurAnimation {
  damping: number;
}
