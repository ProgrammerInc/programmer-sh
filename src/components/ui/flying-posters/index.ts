/**
 * Flying Posters Component
 *
 * A WebGL-based component that displays images as 3D flying posters with
 * scroll-based navigation and animations.
 *
 * @module
 */

import FlyingPosters from './flying-posters';

// Export the component as both default and named export
export { default as FlyingPosters } from './flying-posters';

// Re-export types with renamed conflicting types
export type {
  // Rename ScreenSize to avoid conflicts
  ScreenSize as FlyingPostersScreenSize,
  // Export other types normally
  GL,
  OGLProgram,
  OGLMesh,
  OGLTransform,
  OGLPlane,
  ViewportSize,
  // Rename ScrollState to avoid naming conflicts
  ScrollState as FlyingPostersScrollState,
  AutoBindOptions,
  MediaParams,
  CanvasParams,
  FlyingPostersProps
} from './flying-posters.types';

export default FlyingPosters;
