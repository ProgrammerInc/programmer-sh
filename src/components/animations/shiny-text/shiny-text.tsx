'use client';

import { FC, memo } from 'react';
import { CSS_CLASSES, DEFAULT_SHINY_TEXT, SHINE_GRADIENT } from './shiny-text.constants';
import { useAnimationDuration } from './shiny-text.hooks';
import styles from './shiny-text.module.css';
import { ShinyTextProps } from './shiny-text.types';
import { cn, getShineStyles } from './shiny-text.utils';

/**
 * ShinyText component - Creates an animated text with a shiny gradient effect
 *
 * This component displays text with a moving shiny highlight that sweeps
 * across the content, creating a polished, dynamic appearance.
 *
 * @param {ShinyTextProps} props - Component properties
 * @returns {JSX.Element} The ShinyText component
 */
export const ShinyText: FC<ShinyTextProps> = memo(function ShinyText({
  text,
  disabled = DEFAULT_SHINY_TEXT.DISABLED,
  speed = DEFAULT_SHINY_TEXT.SPEED,
  className = ''
}) {
  const animationDuration = useAnimationDuration(speed);

  return (
    <div
      className={cn(
        styles[CSS_CLASSES.CONTAINER],
        !disabled && styles[CSS_CLASSES.ANIMATED],
        className
      )}
      style={getShineStyles(
        SHINE_GRADIENT.BACKGROUND_IMAGE,
        SHINE_GRADIENT.BACKGROUND_SIZE,
        animationDuration
      )}
    >
      {text}
    </div>
  );
});

export default ShinyText;
