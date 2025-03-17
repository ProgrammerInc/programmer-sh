/**
 * VelocityText component for the Scroll Velocity animation
 */
'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';

import { CSS_CLASSES } from './scroll-velocity.constants';
import { useVelocityAnimation } from './scroll-velocity.hooks';
import styles from './scroll-velocity.module.css';
import { VelocityTextProps } from './scroll-velocity.types';
import { cn } from './scroll-velocity.utils';

/**
 * VelocityText component that creates a continuous scrolling text effect influenced by scroll velocity
 *
 * @component
 */
const VelocityText = memo<VelocityTextProps>(
  ({
    children,
    baseVelocity,
    scrollContainerRef,
    className = '',
    damping,
    stiffness,
    numCopies = 6,
    velocityMapping,
    parallaxClassName = '',
    scrollerClassName = '',
    parallaxStyle,
    scrollerStyle
  }) => {
    // Initialize animation values using custom hook
    const { x, copyRef, copyWidth } = useVelocityAnimation(
      baseVelocity,
      scrollContainerRef,
      damping,
      stiffness,
      velocityMapping
    );

    // Generate repeating text copies to create seamless animation
    const spans = [];
    for (let i = 0; i < numCopies; i++) {
      spans.push(
        <span
          className={cn(styles[CSS_CLASSES.TEXT_ITEM], className)}
          key={i}
          ref={i === 0 ? copyRef : null}
        >
          {children}
        </span>
      );
    }

    return (
      <div className={cn(styles[CSS_CLASSES.PARALLAX], parallaxClassName)} style={parallaxStyle}>
        <motion.div
          className={cn(styles[CSS_CLASSES.SCROLLER], scrollerClassName)}
          style={{ x, ...scrollerStyle }}
        >
          {spans}
        </motion.div>
      </div>
    );
  }
);

VelocityText.displayName = 'VelocityText';
export default VelocityText;
