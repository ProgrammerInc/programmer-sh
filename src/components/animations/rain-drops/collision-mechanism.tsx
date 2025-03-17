/**
 * CollisionMechanism component handles the physics of raindrops and their collision effects
 */
'use client';

import { cn } from '@/utils/app.utils';
import { AnimatePresence, motion } from 'motion/react';
import React, { memo, useRef } from 'react';

import Explosion from './explosion';
import { useBeamAnimation, useCollisionDetection } from './rain-drops.hooks';
import styles from './rain-drops.module.css';
import { CollisionMechanismProps } from './rain-drops.types';

/**
 * CollisionMechanism component handles the physics of raindrops and their collision effects
 *
 * @component
 */
const CollisionMechanism = memo(
  React.forwardRef<HTMLDivElement, CollisionMechanismProps>(
    ({ parentRef, containerRef, beamOptions = {} }, ref) => {
      const beamRef = useRef<HTMLDivElement>(null);

      // Use custom hooks for collision detection and animation
      const { collision, beamKey } = useCollisionDetection(parentRef, containerRef, beamRef);
      const { initialProps, animateVariants, transitionProps } = useBeamAnimation(beamOptions);

      return (
        <>
          <motion.div
            key={beamKey}
            ref={beamRef}
            animate="animate"
            initial={initialProps}
            variants={animateVariants}
            transition={transitionProps}
            className={cn(styles['rain-drops__beam'], beamOptions.className)}
          />

          <AnimatePresence>
            {collision.detected && collision.coordinates && (
              <Explosion
                key={`${collision.coordinates.x}-${collision.coordinates.y}`}
                style={{
                  left: `${collision.coordinates.x}px`,
                  top: `${collision.coordinates.y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            )}
          </AnimatePresence>
        </>
      );
    }
  )
);

CollisionMechanism.displayName = 'CollisionMechanism';

export default CollisionMechanism;
