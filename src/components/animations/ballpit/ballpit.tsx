/**
 * Ballpit Component - A 3D ball pit animation using Three.js
 *
 * This component renders a 3D ball pit animation with configurable parameters.
 * The animation uses Three.js for rendering and includes physics simulation
 * for the balls, which can optionally follow the cursor.
 *
 * @component
 */
'use client';

import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { memo, useRef } from 'react';
import { useBallpit } from './ballpit.hooks';
import styles from './ballpit.module.css';
import { BallpitProps } from './ballpit.types';

gsap.registerPlugin(Observer);

/**
 * Ballpit component that renders a Three.js animation of bouncing balls.
 *
 * @param {object} props - Component props
 * @param {string} [props.className=''] - Additional CSS class for styling
 * @param {boolean} [props.followCursor=true] - Whether balls should follow cursor movements
 * @param {number} [props.count] - Number of balls to render
 * @param {number[]} [props.colors] - Array of colors for the balls
 * @param {number} [props.ambientColor] - Ambient light color
 * @param {number} [props.ambientIntensity] - Ambient light intensity
 * @param {number} [props.lightIntensity] - Point light intensity
 * @param {object} [props.materialParams] - Material parameters for the balls
 * @param {number} [props.minSize] - Minimum size of balls
 * @param {number} [props.maxSize] - Maximum size of balls
 * @param {number} [props.size0] - Size of the first ball
 * @param {number} [props.gravity] - Gravity strength
 * @param {number} [props.friction] - Friction coefficient
 * @param {number} [props.wallBounce] - Wall bounce coefficient
 * @param {number} [props.maxVelocity] - Maximum velocity of balls
 * @param {number} [props.maxX] - Maximum X bound
 * @param {number} [props.maxY] - Maximum Y bound
 * @param {number} [props.maxZ] - Maximum Z bound
 * @param {boolean} [props.controlSphere0] - Whether to control the first sphere
 * @returns {JSX.Element} - Rendered component
 */
export const Ballpit = memo(({ className = '', followCursor = true, ...props }: BallpitProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Use the custom hook to manage the ballpit instance
  useBallpit(canvasRef, { followCursor, ...props });

  return <canvas className={`${className} ${styles.canvas}`} ref={canvasRef} />;
});

Ballpit.displayName = 'Ballpit';

export default Ballpit;
