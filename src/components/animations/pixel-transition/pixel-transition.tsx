'use client';

import React from 'react';

import { cn } from '@/utils/app.utils';

import {
  DEFAULT_ANIMATION_STEP_DURATION,
  DEFAULT_ASPECT_RATIO,
  DEFAULT_GRID_SIZE,
  DEFAULT_PIXEL_COLOR
} from './pixel-transition.constants';
import { usePixelTransition } from './pixel-transition.hooks';
import styles from './pixel-transition.module.css';
import { PixelTransitionProps } from './pixel-transition.types';
import { isTouchDevice } from './pixel-transition.utils';

/**
 * Pixel Transition component that animates between two contents using a pixel effect
 *
 * @component
 * @example
 * ```tsx
 * <PixelTransition
 *   firstContent={<div>First Content</div>}
 *   secondContent={<div>Second Content</div>}
 *   gridSize={10}
 *   pixelColor="#ff0000"
 * />
 * ```
 */
export const PixelTransition = React.memo<PixelTransitionProps>(
  ({
    firstContent,
    secondContent,
    gridSize = DEFAULT_GRID_SIZE,
    pixelColor = DEFAULT_PIXEL_COLOR,
    animationStepDuration = DEFAULT_ANIMATION_STEP_DURATION,
    className = '',
    style = {},
    aspectRatio = DEFAULT_ASPECT_RATIO
  }) => {
    // Detect if using a touch device
    const isTouch = isTouchDevice();

    // Use custom hook to manage animation state and references
    const {
      isActive,
      containerRef,
      pixelGridRef,
      activeRef,
      handleMouseEnter,
      handleMouseLeave,
      handleClick
    } = usePixelTransition(gridSize, pixelColor, animationStepDuration);

    return (
      <div
        ref={containerRef}
        className={cn(styles['pixel-transition__container'], className)}
        style={{ ...style }}
        onMouseEnter={!isTouch ? handleMouseEnter : undefined}
        onMouseLeave={!isTouch ? handleMouseLeave : undefined}
        onClick={isTouch ? handleClick : undefined}
      >
        <div style={{ paddingTop: aspectRatio }} />

        <div className={styles['pixel-transition__initial-content']}>{firstContent}</div>

        <div
          ref={activeRef}
          className={cn(styles['pixel-transition__active-content'], {
            [styles['pixel-transition__active-content--active']]: isActive
          })}
        >
          {secondContent}
        </div>

        <div ref={pixelGridRef} className={styles['pixel-transition__pixel-grid']} />
      </div>
    );
  }
);

// Display name for debugging
PixelTransition.displayName = 'PixelTransition';

export default PixelTransition;
