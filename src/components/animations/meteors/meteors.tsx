'use client';

import { cn } from '@/utils/app.utils';
import React, { memo } from 'react';
import { StarsBackground } from '..';
import { BASE_METEOR_CLASSES, DEFAULT_METEOR_COUNT } from './meteors.constants';
import { useMeteorColor } from './meteors.hooks';
import styles from './meteors.module.css';
import { MeteorsProps } from './meteors.types';
import {
  getRandomMeteorDelay,
  getRandomMeteorDuration,
  getRandomMeteorPosition
} from './meteors.utils';

/**
 * A component that renders animated meteors flying across the screen
 *
 * @example
 * <Meteors
 *   number={75}
 *   color="#4c1d95"
 *   withStars={true}
 * />
 *
 * @param {MeteorsProps} props - The component props
 * @returns The Meteors component with optional StarsBackground
 */
export const Meteors = memo<MeteorsProps>(
  ({ color, number = DEFAULT_METEOR_COUNT, className, withStars = true, ...restProps }) => {
    // Create the array of meteor elements
    const meteors = new Array(number).fill(true);

    // Use the custom hook to manage meteor color CSS variable
    useMeteorColor(color);

    // Generate the meteor elements
    const meteorsHtml = meteors.map((_, idx) => (
      <span
        key={`meteor-${idx}`}
        className={cn(
          styles['meteor-element'],
          ...BASE_METEOR_CLASSES,
          color ? styles['meteor-custom-gradient'] : styles['meteor-default-gradient']
        )}
        style={
          {
            top: 0,
            left: getRandomMeteorPosition(),
            '--meteor-delay': getRandomMeteorDelay(),
            '--meteor-duration': getRandomMeteorDuration()
          } as React.CSSProperties
        }
      />
    ));

    // Render with or without stars background
    return (
      <div
        className={cn(styles['meteors-container'], className)}
        style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
        {...restProps}
      >
        {withStars && <StarsBackground className={styles['stars-background']} />}
        {meteorsHtml}
      </div>
    );
  }
);

// Add display name for better debugging
Meteors.displayName = 'Meteors';

export default Meteors;
