'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';
import { ANIMATION_SETTINGS, CSS_CLASSES, DEFAULT_VALUES } from './neon-cursor.constants';
import { useNeonCursor } from './neon-cursor.hooks';
import styles from './neon-cursor.module.css';
import type { NeonCursorProps } from './neon-cursor.types';
import { calculateCenterOffset, cn } from './neon-cursor.utils';

/**
 * NeonCursor component that renders a customizable neon cursor with glow effects.
 * The cursor consists of a main dot, a trailing circle and an outer glow.
 *
 * @param props - Component properties
 * @returns NeonCursor React component
 */
export const NeonCursor = memo(function NeonCursor({
  className,
  cursorSize = DEFAULT_VALUES.cursorSize,
  trailSize = DEFAULT_VALUES.trailSize,
  glowSize = DEFAULT_VALUES.glowSize,
  primaryColor = DEFAULT_VALUES.primaryColor,
  hoverColor = DEFAULT_VALUES.hoverColor
}: NeonCursorProps) {
  const { position, isClicking, isHovering, trailControls, glowControls } = useNeonCursor({
    primaryColor,
    hoverColor
  });

  // Calculate center offsets for cursor elements
  const cursorOffset = calculateCenterOffset(cursorSize);
  const trailOffset = calculateCenterOffset(trailSize);
  const glowOffset = calculateCenterOffset(glowSize);

  return (
    <div className={cn(styles[CSS_CLASSES.container], className)}>
      {/* Main cursor dot */}
      <motion.div
        className={styles[CSS_CLASSES.main]}
        style={{
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
          backgroundColor: primaryColor,
          boxShadow: `0 0 10px ${primaryColor}`
        }}
        animate={{
          x: position.x - cursorOffset,
          y: position.y - cursorOffset,
          scale: isClicking ? 0.8 : isHovering ? 1.2 : 1
        }}
        transition={ANIMATION_SETTINGS.main.transition}
      />

      {/* Trailing circle */}
      <motion.div
        className={styles[CSS_CLASSES.trail]}
        style={{
          width: `${trailSize}px`,
          height: `${trailSize}px`,
          borderColor: primaryColor
        }}
        initial={false}
        animate={{
          x: position.x - trailOffset,
          y: position.y - trailOffset,
          ...trailControls
        }}
        transition={ANIMATION_SETTINGS.trail.transition}
      />

      {/* Outer glow */}
      <motion.div
        className={styles[CSS_CLASSES.glow]}
        style={{
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          background: `radial-gradient(circle, ${primaryColor}66 0%, ${primaryColor}00 70%)`
        }}
        initial={false}
        animate={{
          x: position.x - glowOffset,
          y: position.y - glowOffset,
          ...glowControls
        }}
        transition={ANIMATION_SETTINGS.glow.transition}
      />
    </div>
  );
});

export default NeonCursor;
