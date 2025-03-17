'use client';

import { cn } from '@/utils/app.utils';
import { memo, useMemo, useRef } from 'react';
import { StarsBackground } from '..';

import CollisionMechanism from './collision-mechanism';
import { DEFAULT_BEAMS, DEFAULT_CONTAINER_SHADOW } from './rain-drops.constants';
import styles from './rain-drops.module.css';
import { RainDropsProps } from './rain-drops.types';

/**
 * RainDrops component creates an interactive rain effect with collisions
 *
 * @component
 * @example
 * ```tsx
 * <RainDrops withStars={true}>
 *   <div>Your content here</div>
 * </RainDrops>
 * ```
 */
export const RainDrops = memo(
  ({ children, className, withStars = true, ...restProps }: RainDropsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    // Use default beam configurations
    const beams = useMemo(() => DEFAULT_BEAMS, []);

    // Memoize the container style
    const containerStyle = useMemo(
      () => ({
        boxShadow: DEFAULT_CONTAINER_SHADOW
      }),
      []
    );

    return (
      <div
        ref={parentRef}
        className={cn(styles['rain-drops__container'], className)}
        {...restProps}
      >
        {beams.map((beam, index) => (
          <CollisionMechanism
            key={`beam-${index}-${beam.initialX}`}
            beamOptions={beam}
            containerRef={containerRef}
            parentRef={parentRef}
          />
        ))}

        {children}

        {withStars && <StarsBackground className={styles['rain-drops__stars']} />}

        <div ref={containerRef} className={styles['rain-drops__surface']} style={containerStyle} />
      </div>
    );
  }
);

RainDrops.displayName = 'RainDrops';

export default RainDrops;
