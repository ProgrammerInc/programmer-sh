/**
 * Animated Item Component
 *
 * An individual item in the animated list with smooth animations.
 */

'use client';

import { cn } from '@/utils/app.utils';
import { motion, useInView } from 'framer-motion';
import { memo, useRef } from 'react';

import styles from './animated-list.module.css';
import { AnimatedItemProps } from './animated-list.types';

/**
 * AnimatedItem component
 *
 * A list item that animates in when scrolled into view.
 *
 * @example
 * ```tsx
 * <AnimatedItem index={0} delay={0.1} onClick={() => console.log('clicked')}>
 *   <div>Item content</div>
 * </AnimatedItem>
 * ```
 */
export const AnimatedItem = memo<AnimatedItemProps>(
  ({ children, delay = 0, index, onMouseEnter, onClick, className }) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { amount: 0.5, once: false });

    return (
      <motion.div
        ref={ref}
        data-index={index}
        onMouseEnter={onMouseEnter}
        onClick={onClick}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.2, delay }}
        className={cn(styles['animated-item'], className)}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedItem.displayName = 'AnimatedItem';

export default AnimatedItem;
