'use client';

import { cn } from '@/utils/app.utils';
import {
  DEFAULT_BLENDING_VALUE,
  DEFAULT_FIFTH_COLOR,
  DEFAULT_FIRST_COLOR,
  DEFAULT_FOURTH_COLOR,
  DEFAULT_GRADIENT_BACKGROUND_END,
  DEFAULT_GRADIENT_BACKGROUND_START,
  DEFAULT_INTERACTIVE,
  DEFAULT_POINTER_COLOR,
  DEFAULT_SECOND_COLOR,
  DEFAULT_SIZE,
  DEFAULT_THIRD_COLOR
} from './gradient-animation.constants';
import {
  useGradientCssVariables,
  useInteractivePointer,
  useSafariDetection
} from './gradient-animation.hooks';
import styles from './gradient-animation.module.css';
import { GradientAnimationProps } from './gradient-animation.types';

/**
 * GradientAnimation Component
 * A component that displays animated gradient backgrounds with optional interactive mouse following.
 */
export const GradientAnimation = ({
  gradientBackgroundStart = DEFAULT_GRADIENT_BACKGROUND_START,
  gradientBackgroundEnd = DEFAULT_GRADIENT_BACKGROUND_END,
  firstColor = DEFAULT_FIRST_COLOR,
  secondColor = DEFAULT_SECOND_COLOR,
  thirdColor = DEFAULT_THIRD_COLOR,
  fourthColor = DEFAULT_FOURTH_COLOR,
  fifthColor = DEFAULT_FIFTH_COLOR,
  pointerColor = DEFAULT_POINTER_COLOR,
  size = DEFAULT_SIZE,
  blendingValue = DEFAULT_BLENDING_VALUE,
  children,
  className,
  interactive = DEFAULT_INTERACTIVE,
  containerClassName
}: GradientAnimationProps) => {
  // Set up CSS variables for the animation
  useGradientCssVariables({
    gradientBackgroundStart,
    gradientBackgroundEnd,
    firstColor,
    secondColor,
    thirdColor,
    fourthColor,
    fifthColor,
    pointerColor,
    size,
    blendingValue
  });

  // Handle interactive pointer movement
  const { interactiveRef, handleMouseMove } = useInteractivePointer();

  // Detect Safari browser for different blur implementation
  const isSafari = useSafariDetection();

  return (
    <div className={cn(styles['gradient-container'], containerClassName)}>
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn('', className)}>{children}</div>
      <div
        className={cn(
          styles['gradients-wrapper'],
          isSafari ? styles['gradients-wrapper-safari'] : styles['gradients-wrapper-standard']
        )}
      >
        {/* First gradient */}
        <div className={cn(styles['gradient-element'], styles['first-gradient'])}></div>

        {/* Second gradient */}
        <div className={cn(styles['gradient-element'], styles['second-gradient'])}></div>

        {/* Third gradient */}
        <div className={cn(styles['gradient-element'], styles['third-gradient'])}></div>

        {/* Fourth gradient */}
        <div className={cn(styles['gradient-element'], styles['fourth-gradient'])}></div>

        {/* Fifth gradient */}
        <div className={cn(styles['gradient-element'], styles['fifth-gradient'])}></div>

        {/* Interactive pointer gradient (mouse follower) */}
        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className={cn(styles['interactive-pointer'])}
          ></div>
        )}
      </div>
    </div>
  );
};

export default GradientAnimation;
