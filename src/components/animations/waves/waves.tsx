/**
 * Waves Animation Component
 *
 * An interactive animation with dynamic wave lines that respond to mouse movement and noise.
 */
'use client';

import { cn } from '@/utils/app.utils';
import React, { useRef } from 'react';
import { CSS_CLASSES, DEFAULT_VALUES } from './waves.constants';
import { useWavesAnimation, useWavesConfig, useWavesStyles } from './waves.hooks';
import styles from './waves.module.css';
import { WavesProps } from './waves.types';

/**
 * Waves component that displays animated wave lines that respond to mouse movement
 * and uses perlin noise for dynamic animations.
 */
export const Waves: React.FC<WavesProps> = ({
  lineColor = DEFAULT_VALUES.LINE_COLOR,
  backgroundColor = DEFAULT_VALUES.BACKGROUND_COLOR,
  waveSpeedX = DEFAULT_VALUES.WAVE_SPEED_X,
  waveSpeedY = DEFAULT_VALUES.WAVE_SPEED_Y,
  waveAmpX = DEFAULT_VALUES.WAVE_AMP_X,
  waveAmpY = DEFAULT_VALUES.WAVE_AMP_Y,
  xGap = DEFAULT_VALUES.X_GAP,
  yGap = DEFAULT_VALUES.Y_GAP,
  friction = DEFAULT_VALUES.FRICTION,
  tension = DEFAULT_VALUES.TENSION,
  maxCursorMove = DEFAULT_VALUES.MAX_CURSOR_MOVE,
  style,
  className
}) => {
  // Refs for DOM elements
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Configure animation settings
  const configRef = useWavesConfig({
    lineColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    xGap,
    yGap,
    friction,
    tension,
    maxCursorMove
  });

  // Apply styles to the container
  useWavesStyles(containerRef, backgroundColor, lineColor, style);

  // Initialize animation
  useWavesAnimation(containerRef, canvasRef, configRef);

  return (
    <div ref={containerRef} className={cn(styles[CSS_CLASSES.CONTAINER], className)}>
      <div className={styles[CSS_CLASSES.CURSOR]} />
      <canvas ref={canvasRef} className={styles[CSS_CLASSES.CANVAS]} />
    </div>
  );
};

export default React.memo(Waves);
