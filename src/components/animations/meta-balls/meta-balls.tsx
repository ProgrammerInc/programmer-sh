'use client';

import { memo, useRef } from 'react';
import {
  DEFAULT_ANIMATION_SIZE,
  DEFAULT_BALL_COUNT,
  DEFAULT_CLUMP_FACTOR,
  DEFAULT_COLOR,
  DEFAULT_CURSOR_BALL_COLOR,
  DEFAULT_CURSOR_BALL_SIZE,
  DEFAULT_ENABLE_MOUSE_INTERACTION,
  DEFAULT_ENABLE_TRANSPARENCY,
  DEFAULT_HOVER_SMOOTHNESS,
  DEFAULT_SPEED
} from './meta-balls.constants';
import { useMetaBallsEffect } from './meta-balls.hooks';
import { MetaBallsProps } from './meta-balls.types';

/**
 * Meta Balls Component
 *
 * A component that displays an interactive metaball animation using WebGL shaders.
 * The animation consists of a field of blob-like shapes that merge together when
 * they get close to each other, creating a fluid-like effect.
 *
 * @param props Component props
 * @returns A div container with the metaball animation
 */
export const MetaBalls = memo<MetaBallsProps>(
  ({
    color = DEFAULT_COLOR,
    speed = DEFAULT_SPEED,
    enableMouseInteraction = DEFAULT_ENABLE_MOUSE_INTERACTION,
    hoverSmoothness = DEFAULT_HOVER_SMOOTHNESS,
    animationSize = DEFAULT_ANIMATION_SIZE,
    ballCount = DEFAULT_BALL_COUNT,
    clumpFactor = DEFAULT_CLUMP_FACTOR,
    cursorBallSize = DEFAULT_CURSOR_BALL_SIZE,
    cursorBallColor = DEFAULT_CURSOR_BALL_COLOR,
    enableTransparency = DEFAULT_ENABLE_TRANSPARENCY
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Use custom hook to manage WebGL rendering and animation
    useMetaBallsEffect(
      containerRef,
      color,
      cursorBallColor,
      speed,
      enableMouseInteraction,
      hoverSmoothness,
      animationSize,
      ballCount,
      clumpFactor,
      cursorBallSize,
      enableTransparency
    );

    return <div ref={containerRef} className="w-full h-full relative" />;
  }
);

// Add display name for better debugging
MetaBalls.displayName = 'MetaBalls';

export default MetaBalls;
