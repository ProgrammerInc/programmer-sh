/**
 * Waves Animation Component
 *
 * An interactive animation with dynamic wave lines that respond to mouse movement and noise.
 * Can be used as a background with content overlaid on top.
 */
import { forwardRef, useRef } from 'react';
import { CSS_CLASSES } from './waves.constants';
import { useWavesAnimation } from './waves.hooks';
import styles from './waves.module.css';
import { WavesProps } from './waves.types';
import { cn } from '@/utils/app.utils';

/**
 * Waves component that displays animated wave lines that respond to mouse movement
 * and use perlin noise for dynamic animations.
 */
export const WavesComponent = forwardRef<HTMLDivElement, WavesProps>((
  { children, className, containerClassName, ...restProps },
  ref
) => {
  // Create a ref for the canvas element
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Create a local ref for the container if an external ref isn't provided
  const internalContainerRef = useRef<HTMLDivElement>(null);
  
  // Use internal ref if external ref is not provided
  const containerRef = (ref || internalContainerRef) as React.RefObject<HTMLDivElement>;

  // Initialize the animation
  useWavesAnimation(canvasRef, containerRef, {
    lineColor: restProps.lineColor,
    backgroundColor: restProps.backgroundColor,
    waveSpeedX: restProps.waveSpeedX,
    waveSpeedY: restProps.waveSpeedY,
    waveAmpX: restProps.waveAmpX,
    waveAmpY: restProps.waveAmpY,
    xGap: restProps.xGap,
    yGap: restProps.yGap,
    friction: restProps.friction,
    tension: restProps.tension,
    maxCursorMove: restProps.maxCursorMove,
    style: restProps.style
  });

  // Remove all animated props from rest props to avoid DOM warnings
  const {
    lineColor,
    backgroundColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    xGap,
    yGap,
    friction,
    tension,
    maxCursorMove,
    style,
    ...htmlProps
  } = restProps;

  return (
    <div
      ref={containerRef}
      className={cn(styles[CSS_CLASSES.CONTAINER], containerClassName)}
      style={style}
      {...htmlProps}
    >
      <canvas ref={canvasRef} className={styles[CSS_CLASSES.CANVAS]} />
      {children && (
        <div className={cn(styles[CSS_CLASSES.CONTENT], className)}>{children}</div>
      )}
    </div>
  );
});

// Display name for debugging
WavesComponent.displayName = 'WavesComponent';

export default WavesComponent;
