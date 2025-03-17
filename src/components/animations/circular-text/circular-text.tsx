'use client';

import { motion } from 'framer-motion';
import { memo, useCallback, useEffect, useMemo } from 'react';
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_ON_HOVER,
  DEFAULT_SIZE,
  DEFAULT_SPIN_DURATION
} from './circular-text.constants';
import { useCircularTextAnimation } from './circular-text.hooks';
import { CircularTextProps } from './circular-text.types';

/**
 * CircularText component that displays text in a circular arrangement with animation.
 * It can respond to hover events with various behaviors.
 *
 * @param props - Component properties
 * @returns Memoized React component with circular text animation
 */
export const CircularText = memo(function CircularText({
  text,
  spinDuration = DEFAULT_SPIN_DURATION,
  onHover = DEFAULT_ON_HOVER,
  className = '',
  size = DEFAULT_SIZE,
  fontSize = DEFAULT_FONT_SIZE
}: CircularTextProps) {
  // Convert text string to array of letters for individual placement
  const letters = useMemo(() => Array.from(text), [text]);

  // Use custom hook to manage animations
  const { controls, currentRotation, setCurrentRotation, getTransition } =
    useCircularTextAnimation(spinDuration);

  // Container styles
  const containerStyle = useMemo(
    () => ({
      width: size,
      height: size
    }),
    [size]
  );

  // Start the default animation when component mounts or props change
  useEffect(() => {
    controls.start({
      rotate: currentRotation + 360,
      scale: 1,
      transition: getTransition(spinDuration, currentRotation)
    });
  }, [spinDuration, controls, currentRotation, getTransition]);

  // Handle mouse hover start based on the onHover prop
  const handleHoverStart = useCallback(() => {
    if (!onHover) return;

    switch (onHover) {
      case 'slowDown':
        controls.start({
          rotate: currentRotation + 360,
          scale: 1,
          transition: getTransition(spinDuration * 2, currentRotation)
        });
        break;
      case 'speedUp':
        controls.start({
          rotate: currentRotation + 360,
          scale: 1,
          transition: getTransition(spinDuration / 4, currentRotation)
        });
        break;
      case 'pause':
        controls.start({
          rotate: currentRotation,
          scale: 1,
          transition: {
            rotate: { type: 'spring', damping: 20, stiffness: 300 },
            scale: { type: 'spring', damping: 20, stiffness: 300 }
          }
        });
        break;
      case 'goBonkers':
        controls.start({
          rotate: currentRotation + 360,
          scale: 0.8,
          transition: getTransition(spinDuration / 20, currentRotation)
        });
        break;
      default:
        break;
    }
  }, [onHover, controls, currentRotation, getTransition, spinDuration]);

  // Reset animation when mouse leaves
  const handleHoverEnd = useCallback(() => {
    controls.start({
      rotate: currentRotation + 360,
      scale: 1,
      transition: getTransition(spinDuration, currentRotation)
    });
  }, [controls, currentRotation, getTransition, spinDuration]);

  // Generate class name for container
  const containerClassName = useMemo(() => {
    return `mx-auto rounded-full text-white font-black text-center cursor-pointer origin-center ${fontSize} ${className}`;
  }, [className, fontSize]);

  return (
    <motion.div
      initial={{ rotate: 0 }}
      className={containerClassName}
      style={containerStyle}
      animate={controls}
      onUpdate={latest => setCurrentRotation(Number(latest.rotate))}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotation = (360 / letters.length) * i;
        const factor = Number((Math.PI / letters.length).toFixed(2));
        const radius = size / 2 - 30; // Adjust for better text placement
        const x = radius * Math.cos((rotation * Math.PI) / 180);
        const y = radius * Math.sin((rotation * Math.PI) / 180);
        const transform = `rotateZ(${rotation}deg) translate3d(${x}px, ${y}px, 0)`;

        return (
          <span
            key={i}
            className="absolute inline-block inset-0 transition-all duration-500 ease-&lsqb;cubic-bezier(0,0,0,1)&rsqb;"
            style={{ transform, WebkitTransform: transform }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
});

// Add displayName to help with debugging
CircularText.displayName = 'CircularText';

export default CircularText;
