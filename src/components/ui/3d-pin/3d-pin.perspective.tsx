/**
 * 3D Pin Perspective Component
 *
 * Adds visual effects to the 3D pin including ripple animations, beam, and title.
 */

'use client';

import { cn } from '@/utils/app.utils';
import { motion } from 'motion/react';
import React from 'react';

import styles from './3d-pin.module.css';
import { PinPerspectiveProps } from './3d-pin.types';

/**
 * Pin Perspective component for 3D pins
 *
 * Provides visual effects like ripples, beams, and title for the 3D pin.
 *
 * @param props - Component props
 * @param props.title - Optional title to display above the pin
 * @param props.href - Optional URL for the title link
 * @returns Pin Perspective component
 */
export const PinPerspective: React.FC<PinPerspectiveProps> = ({ title, href }) => {
  return (
    <div className={styles['perspective-wrapper']}>
      <div className={styles['perspective-content']}>
        <div className={styles['title-container']}>
          <a href={href} target="_blank" rel="noopener noreferrer" className={styles['title-link']}>
            <span className={styles['title-text']}>{title}</span>
            <span className={styles['title-underline']}></span>
          </a>
        </div>

        <div className={styles['perspective-container']}>
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: '-50%',
                y: '-50%'
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 0
              }}
              className={styles.ripple}
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: '-50%',
                y: '-50%'
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 2
              }}
              className={styles.ripple}
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: '-50%',
                y: '-50%'
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 4
              }}
              className={styles.ripple}
            ></motion.div>
          </>
        </div>

        <>
          <div className={cn(styles['line-vertical'], styles['line-blur'])} />
          <div className={styles['line-vertical']} />
          <div className={cn(styles.dot, styles['dot-large'])} />
          <div className={cn(styles.dot, styles['dot-small'])} />
        </>
      </div>
    </div>
  );
};

export default PinPerspective;
