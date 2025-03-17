/**
 * CrazyBallpit component creates a 3D animation of colorful bouncing spheres
 * with physics simulation
 *
 * @module CrazyBallpit
 */

export { Ballpit as CrazyBallpit, default } from './ballpit';
export * as CrazyBallpitStyles from './ballpit.module.css';
export type {
  BallpitProps as CrazyBallpitProps,
  CreateBallpitReturn as CreateCrazyBallpitReturn
} from './ballpit.types';
