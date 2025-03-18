'use client';

import { cn } from '@/utils/app.utils';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import React, { memo, useState } from 'react';

import styles from './stack.module.css';
import {
  AnimationConfig,
  CardData,
  CardDimensions,
  CardRotateProps,
  StackProps
} from './stack.types';

/**
 * CardRotate component - Handles the 3D rotation effect for cards in the stack
 * 
 * Features:
 * - 3D rotation based on drag position
 * - Drag with elastic constraints
 * - Send to back functionality when dragged beyond sensitivity threshold
 * - Smooth animation return to center when not sent to back
 * 
 * @example
 * ```tsx
 * <CardRotate onSendToBack={() => console.log('Card sent to back')} sensitivity={200}>
 *   <div>Card content</div>
 * </CardRotate>
 * ```
 */
const CardRotate = memo(function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className={styles['card-rotate']}
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
});

CardRotate.displayName = 'CardRotate';

/**
 * Default cards data used when no custom cards are provided
 */
const DEFAULT_CARDS_DATA: CardData[] = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format'
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format'
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format'
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format'
  }
];

/**
 * Default animation configuration
 */
const DEFAULT_ANIMATION_CONFIG: AnimationConfig = { stiffness: 260, damping: 20 };

/**
 * Default card dimensions in pixels
 */
const DEFAULT_CARD_DIMENSIONS: CardDimensions = { width: 208, height: 208 };

/**
 * Stack component - Creates an interactive stack of cards that can be dragged and rearranged
 * 
 * Features:
 * - Draggable cards with 3D rotation effects
 * - Configurable card dimensions and animation properties
 * - Optional random rotation for a more natural appearance
 * - Ability to send cards to the back via drag or click
 * - Customizable sensitivity for drag interactions
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Stack />
 * 
 * // With custom configuration
 * <Stack
 *   randomRotation={true}
 *   sensitivity={150}
 *   cardDimensions={{ width: 300, height: 200 }}
 *   sendToBackOnClick={true}
 * />
 * 
 * // With custom cards data
 * <Stack
 *   cardsData={[
 *     { id: 1, img: '/image1.jpg' },
 *     { id: 2, img: '/image2.jpg' },
 *   ]}
 * />
 * ```
 */
const Stack = memo(function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = DEFAULT_CARD_DIMENSIONS,
  cardsData = [],
  animationConfig = DEFAULT_ANIMATION_CONFIG,
  sendToBackOnClick = false
}: StackProps) {
  const [cards, setCards] = useState<CardData[]>(
    cardsData.length ? cardsData : DEFAULT_CARDS_DATA
  );

  /**
   * Sends the card with the specified ID to the back of the stack
   */
  const sendToBack = (id: number) => {
    setCards(prev => {
      const newCards = [...prev];
      const index = newCards.findIndex(card => card.id === id);
      if (index === -1) return prev;
      
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div
      className={styles['stack-container']}
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height
      }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotation
          ? Math.random() * 10 - 5 // Random degree between -5 and 5
          : 0;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
          >
            <motion.div
              className={cn(styles.card, styles['card-appear'])}
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: '90% 90%'
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height
              }}
            >
              <img
                src={card.img}
                alt={`card-${card.id}`}
                className={styles['card-image']}
              />
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
});

Stack.displayName = 'Stack';

export { CardRotate };
export default Stack;
