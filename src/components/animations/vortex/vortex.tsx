'use client';

import { cn } from '@/utils/app.utils';
import { motion } from 'framer-motion';
import { forwardRef, useRef } from 'react';
import { CSS_CLASSES, DEFAULT_SETTINGS } from './vortex.constants';
import { useVortexAnimation } from './vortex.hooks';
import styles from './vortex.module.css';
import { VortexProps } from './vortex.types';

/**
 * Vortex animation component
 *
 * Creates a dynamic vortex animation with particles flowing in a noise-based pattern
 * Can be used as a background with content overlaid on top
 *
 * @param props - Component properties
 * @returns A React component with vortex animation effect
 */
export const VortexComponent = forwardRef<HTMLDivElement, VortexProps>((props, ref) => {
  const {
    children,
    className,
    containerClassName,
    particleCount = DEFAULT_SETTINGS.PARTICLE_COUNT,
    rangeY = DEFAULT_SETTINGS.RANGE_Y,
    baseHue = DEFAULT_SETTINGS.BASE_HUE,
    baseSpeed = DEFAULT_SETTINGS.BASE_SPEED,
    rangeSpeed = DEFAULT_SETTINGS.RANGE_SPEED,
    baseRadius = DEFAULT_SETTINGS.BASE_RADIUS,
    rangeRadius = DEFAULT_SETTINGS.RANGE_RADIUS,
    backgroundColor = DEFAULT_SETTINGS.BACKGROUND_COLOR,
    ...restProps
  } = props;

  // References to DOM elements
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize the vortex animation
  useVortexAnimation(canvasRef, containerRef, {
    particleCount,
    rangeY,
    baseHue,
    baseSpeed,
    rangeSpeed,
    baseRadius,
    rangeRadius,
    backgroundColor
  });

  return (
    <div ref={ref} className={cn(styles[CSS_CLASSES.CONTAINER], containerClassName)} {...restProps}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={containerRef}
        className={styles['vortex-canvas-container']}
      >
        <canvas ref={canvasRef} className={styles[CSS_CLASSES.CANVAS]}></canvas>
      </motion.div>

      <div className={cn(styles[CSS_CLASSES.CONTENT], className)}>{children}</div>
    </div>
  );
});

VortexComponent.displayName = 'Vortex';

/**
 * Vortex animation component
 */
export const Vortex = VortexComponent;

export default Vortex;
