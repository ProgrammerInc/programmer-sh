/**
 * Utility functions for the Starry Background animation component
 */

import {
  ANIMATION_SETTINGS,
  PARALLAX_SETTINGS,
  STAR_APPEARANCE,
  STAR_PROBABILITY
} from './starry-background.constants';
import { MousePosition, StarProperties } from './starry-background.types';

/**
 * Generates properties for a single star
 *
 * @returns Star properties object with randomized values
 */
export const generateStarProperties = (): StarProperties => {
  const isGlowing = Math.random() < STAR_PROBABILITY.GLOW_CHANCE;
  const baseOpacity =
    Math.random() * STAR_APPEARANCE.MAX_ADDITIONAL_OPACITY + STAR_APPEARANCE.MIN_OPACITY;

  // Determine star size based on probability
  let size;
  if (Math.random() < STAR_PROBABILITY.LARGE_STAR_CHANCE) {
    size = STAR_APPEARANCE.LARGE_SIZE;
  } else if (Math.random() < STAR_PROBABILITY.MEDIUM_STAR_CHANCE) {
    size = STAR_APPEARANCE.MEDIUM_SIZE;
  } else {
    size = STAR_APPEARANCE.SMALL_SIZE;
  }

  const glowIntensity =
    Math.random() * STAR_APPEARANCE.MAX_ADDITIONAL_INTENSITY + STAR_APPEARANCE.MIN_GLOW_INTENSITY;
  const animationDelay = `${Math.random() * -ANIMATION_SETTINGS.MAX_DELAY}s`;
  const animationDuration = `${Math.random() * ANIMATION_SETTINGS.MAX_ADDITIONAL_DURATION + ANIMATION_SETTINGS.MIN_DURATION}s`;
  const parallaxLayer = Math.floor(Math.random() * PARALLAX_SETTINGS.LAYER_COUNT);

  return {
    isGlowing,
    baseOpacity,
    size,
    glowIntensity,
    animationDelay,
    animationDuration,
    parallaxLayer
  };
};

/**
 * Generates an array of star properties
 *
 * @param count - Number of stars to generate
 * @returns Array of star property objects
 */
export const generateStars = (count: number): StarProperties[] => {
  return Array.from({ length: count }, () => generateStarProperties());
};

/**
 * Calculates the parallax transform style for a star
 *
 * @param mousePosition - Current mouse position
 * @param parallaxLayer - Star's parallax layer (0-2)
 * @returns Style object with transform and transition properties
 */
export const calculateParallaxTransform = (
  mousePosition: MousePosition,
  parallaxLayer: number
): React.CSSProperties => {
  const movementFactor = PARALLAX_SETTINGS.MOVEMENT_FACTOR;
  const layerIntensity = parallaxLayer + 1; // Make deeper layers move more

  return {
    transform: `translate(${mousePosition.x * layerIntensity * movementFactor}px, ${mousePosition.y * layerIntensity * movementFactor}px)`,
    transition: PARALLAX_SETTINGS.TRANSITION
  };
};

/**
 * Calculates star style properties including glow effects
 *
 * @param props - Star properties
 * @returns Style object for the star element
 */
export const calculateStarStyle = (props: StarProperties): React.CSSProperties => {
  const baseStyle: React.CSSProperties = {
    width: `${props.size}px`,
    height: `${props.size}px`,
    opacity: props.baseOpacity
  };

  if (props.isGlowing) {
    return {
      ...baseStyle,
      animation: `glow ${props.animationDuration} ease-in-out infinite`,
      animationDelay: props.animationDelay,
      boxShadow: `0 0 ${props.glowIntensity * 3}px rgba(255,255,255,${props.glowIntensity * 0.8})`
    };
  }

  return baseStyle;
};
