/**
 * Ballpit - A 3D ball pit animation using Three.js
 *
 * This module exports a React component that renders a 3D ball pit animation
 * with configurable parameters. The animation features bouncing balls that
 * can follow cursor movements.
 *
 * @module Ballpit
 */

export { Ballpit, default } from './ballpit';
export { DEFAULT_X_CONFIG } from './ballpit.constants';
export { useBallpit } from './ballpit.hooks';
export * as BallpitStyles from './ballpit.module.css';
export type { BallpitProps } from './ballpit.types';
export { createBallpit } from './ballpit.utils';
