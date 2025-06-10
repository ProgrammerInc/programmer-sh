'use client';

import { cn } from '@/utils/app.utils';
import { memo } from 'react';
import { useBounceCardsAnimation } from './bounce-cards.hooks';
import styles from './bounce-cards.module.css';
import { BounceCardsProps } from './bounce-cards.types';

/**
 * BounceCards Component
 *
 * A dynamic card stack that animates with GSAP and responds to hover interactions.
 *
 * @example
 * ```tsx
 * <BounceCards
 *   images={['image1.jpg', 'image2.jpg']}
 *   enableHover={true}
 * />
 * ```
 */
const BounceCards = memo(function BounceCards({
  className = '',
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(10deg) translate(-170px)',
    'rotate(5deg) translate(-85px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(85px)',
    'rotate(2deg) translate(170px)'
  ],
  enableHover = false
}: BounceCardsProps) {
  // Use custom hook for animation logic
  const { pushSiblings, resetSiblings } = useBounceCardsAnimation(
    images,
    transformStyles,
    animationDelay,
    animationStagger,
    easeType,
    enableHover
  );

  return (
    <div
      className={cn(styles.container, className)}
      style={{
        width: containerWidth,
        height: containerHeight
      }}
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          className={`card card-${idx} ${styles.card}`}
          style={{
            transform: transformStyles[idx] || 'none'
          }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          <img className={styles['card-image']} src={src} alt={`card-${idx}`} />
        </div>
      ))}
    </div>
  );
});

export { BounceCards };
export default BounceCards;
