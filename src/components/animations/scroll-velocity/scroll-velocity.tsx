/**
 * Scroll Velocity animation component
 */
'use client';

import { memo } from 'react';

import {
  CSS_CLASSES,
  DEFAULT_DAMPING,
  DEFAULT_NUM_COPIES,
  DEFAULT_STIFFNESS,
  DEFAULT_VELOCITY,
  DEFAULT_VELOCITY_MAPPING
} from './scroll-velocity.constants';
import styles from './scroll-velocity.module.css';
import { ScrollVelocityProps } from './scroll-velocity.types';
import VelocityText from './velocity-text';

/**
 * ScrollVelocity component that creates multiple rows of scrolling text
 * that react to scroll velocity
 *
 * @component
 * @example
 * ```tsx
 * <ScrollVelocity
 *   texts={['Text One', 'Text Two']}
 *   velocity={150}
 * />
 * ```
 */
export const ScrollVelocity = memo<ScrollVelocityProps>(
  ({
    scrollContainerRef,
    texts = [],
    velocity = DEFAULT_VELOCITY,
    className = '',
    damping = DEFAULT_DAMPING,
    stiffness = DEFAULT_STIFFNESS,
    numCopies = DEFAULT_NUM_COPIES,
    velocityMapping = DEFAULT_VELOCITY_MAPPING,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle
  }) => {
    return (
      <section className={styles[CSS_CLASSES.CONTAINER]}>
        {texts.map((text: string, index: number) => (
          <VelocityText
            key={index}
            className={className}
            baseVelocity={index % 2 !== 0 ? -velocity : velocity}
            scrollContainerRef={scrollContainerRef}
            damping={damping}
            stiffness={stiffness}
            numCopies={numCopies}
            velocityMapping={velocityMapping}
            parallaxClassName={parallaxClassName}
            scrollerClassName={scrollerClassName}
            parallaxStyle={parallaxStyle}
            scrollerStyle={scrollerStyle}
          >
            {text}&nbsp;
          </VelocityText>
        ))}
      </section>
    );
  }
);

ScrollVelocity.displayName = 'ScrollVelocity';
export default ScrollVelocity;
