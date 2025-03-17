/**
 * Utility functions for the Spotlight animation component
 */

import { cn } from '@/utils/app.utils';
import { CSS_CLASSES } from './spotlight.constants';

/**
 * Creates class names for the SVG element in the original Spotlight
 *
 * @param className - Additional classes to apply
 * @returns Combined class string
 */
export const createSpotlightSvgClasses = (className?: string): string => {
  return cn(
    CSS_CLASSES.ANIMATE_SPOTLIGHT,
    CSS_CLASSES.POINTER_EVENTS_NONE,
    CSS_CLASSES.ABSOLUTE,
    CSS_CLASSES.Z_INDEX,
    CSS_CLASSES.HEIGHT_LARGE,
    CSS_CLASSES.WIDTH_DEFAULT,
    CSS_CLASSES.WIDTH_LARGE,
    CSS_CLASSES.OPACITY_ZERO,
    className
  );
};

/**
 * Creates style object for the main gradient spotlight effect
 *
 * @param translateY - Vertical translation in pixels
 * @param gradient - Gradient string
 * @param width - Width in pixels
 * @param height - Height in pixels
 * @returns Style object for the gradient element
 */
export const createMainGradientStyle = (
  translateY: number,
  gradient: string,
  width: number,
  height: number,
  isRight?: boolean
): React.CSSProperties => {
  return {
    transform: `translateY(${translateY}px) rotate(${isRight ? '45' : '-45'}deg)`,
    background: gradient,
    width: `${width}px`,
    height: `${height}px`
  };
};

/**
 * Creates style object for the secondary gradient spotlight effect
 *
 * @param gradient - Gradient string
 * @param width - Width in pixels
 * @param height - Height in pixels
 * @param isRight - Whether this is for the right side
 * @returns Style object for the secondary gradient element
 */
export const createSecondaryGradientStyle = (
  gradient: string,
  width: number,
  height: number,
  isRight: boolean
): React.CSSProperties => {
  return {
    transform: `rotate(${isRight ? '45' : '-45'}deg) translate(${isRight ? '-' : ''}5%, -50%)`,
    background: gradient,
    width: `${width}px`,
    height: `${height}px`
  };
};

/**
 * Creates style object for the tertiary gradient spotlight effect
 *
 * @param gradient - Gradient string
 * @param width - Width in pixels
 * @param height - Height in pixels
 * @param isRight - Whether this is for the right side
 * @returns Style object for the tertiary gradient element
 */
export const createTertiaryGradientStyle = (
  gradient: string,
  width: number,
  height: number,
  isRight: boolean
): React.CSSProperties => {
  return {
    transform: `rotate(${isRight ? '45' : '-45'}deg) translate(${isRight ? '' : '-'}180%, -70%)`,
    background: gradient,
    width: `${width}px`,
    height: `${height}px`
  };
};
