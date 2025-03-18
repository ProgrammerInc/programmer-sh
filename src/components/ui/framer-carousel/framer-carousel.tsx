'use client';

import { PanInfo, motion, useMotionValue, useTransform } from 'framer-motion';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { FiCircle, FiCode, FiFileText, FiLayers, FiLayout } from 'react-icons/fi';

import { cn } from '@/utils/app.utils';
import styles from './framer-carousel.module.css';
import {
  FramerCarouselDotsProps,
  FramerCarouselItem,
  FramerCarouselItemProps,
  FramerCarouselProps
} from './framer-carousel.types';

/**
 * Default carousel items used when no items are provided
 */
const DEFAULT_ITEMS: FramerCarouselItem[] = [
  {
    title: 'Text Animations',
    description: 'Cool text animations for your projects.',
    id: 1,
    icon: <FiFileText className="h-[16px] w-[16px] text-white" />
  },
  {
    title: 'Animations',
    description: 'Smooth animations for your projects.',
    id: 2,
    icon: <FiCircle className="h-[16px] w-[16px] text-white" />
  },
  {
    title: 'Components',
    description: 'Reusable components for your projects.',
    id: 3,
    icon: <FiLayers className="h-[16px] w-[16px] text-white" />
  },
  {
    title: 'Backgrounds',
    description: 'Beautiful backgrounds and patterns for your projects.',
    id: 4,
    icon: <FiLayout className="h-[16px] w-[16px] text-white" />
  },
  {
    title: 'Common UI',
    description: 'Common UI components are coming soon!',
    id: 5,
    icon: <FiCode className="h-[16px] w-[16px] text-white" />
  }
];

/**
 * Constants for the carousel behavior
 */
const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

/**
 * CarouselItem Component
 * 
 * Renders an individual carousel item with 3D transformation effects.
 */
const FramerCarouselItem = React.memo(function FramerCarouselItem({
  item,
  width,
  round,
  transition,
  rotateY
}: FramerCarouselItemProps): JSX.Element {
  return (
    <motion.div
      className={cn(
        styles['carousel-item'],
        round ? styles['carousel-item-round'] : styles['carousel-item-default']
      )}
      style={{
        width,
        height: round ? width : '100%',
        rotateY,
        ...(round && { borderRadius: '50%' })
      }}
      transition={transition}
    >
      <div className={cn(
        round ? styles['icon-container-round'] : styles['icon-container-default']
      )}>
        <span className={styles['icon-wrapper']}>
          {item.icon}
        </span>
      </div>
      <div className={styles['content-container']}>
        <div className={styles['item-title']}>{item.title}</div>
        <p className={styles['item-description']}>{item.description}</p>
      </div>
    </motion.div>
  );
});

FramerCarouselItem.displayName = 'FramerCarouselItem';

/**
 * CarouselDots Component
 * 
 * Navigation dots for the carousel, showing the current position.
 */
const FramerCarouselDots = React.memo(function FramerCarouselDots({
  items,
  currentIndex,
  setCurrentIndex,
  round
}: FramerCarouselDotsProps): JSX.Element {
  return (
    <div
      className={cn(
        styles['dots-container'],
        round ? styles['dots-container-round'] : ''
      )}
    >
      <div className={styles['dots-wrapper']}>
        {items.map((_, index) => (
          <motion.div
            key={index}
            className={cn(
              styles['dot'],
              currentIndex % items.length === index
                ? round
                  ? styles['dot-active-round']
                  : styles['dot-active-default']
                : round
                  ? styles['dot-inactive-round']
                  : styles['dot-inactive-default']
            )}
            animate={{
              scale: currentIndex % items.length === index ? 1.2 : 1
            }}
            onClick={() => setCurrentIndex(index)}
            transition={{ duration: 0.15 }}
          />
        ))}
      </div>
    </div>
  );
});

FramerCarouselDots.displayName = 'FramerCarouselDots';

/**
 * FramerCarousel Component
 * 
 * A carousel component with 3D effects using Framer Motion.
 * Supports autoplay, looping, and touch/drag interactions.
 * 
 * @example
 * ```tsx
 * <FramerCarousel 
 *   items={items} 
 *   baseWidth={300} 
 *   autoplay={true} 
 *   loop={true} 
 * />
 * ```
 */
const FramerCarousel = React.memo(function FramerCarousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false
}: FramerCarouselProps): JSX.Element {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle mouse hover events for pauseOnHover functionality
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  // Handle autoplay functionality
  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev === items.length - 1 && loop) {
            return prev + 1; // Animate to clone
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, carouselItems.length, pauseOnHover]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  // Handle animation completion for loop functionality
  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  // Handle drag end event for gesture-based navigation
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(prev => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0
        }
      };

  return (
    <div
      ref={containerRef}
      className={cn(
        styles['carousel-container'],
        round ? styles['carousel-container-round'] : styles['carousel-container-default']
      )}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px` })
      }}
    >
      <motion.div
        className={styles['carousel-track']}
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [
            -(index + 1) * trackItemOffset,
            -index * trackItemOffset,
            -(index - 1) * trackItemOffset
          ];
          const outputRange = [90, 0, -90];
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const rotateY = useTransform(x, range, outputRange, { clamp: false });
          return (
            <FramerCarouselItem
              key={index}
              item={item}
              width={itemWidth}
              round={round}
              transition={effectiveTransition}
              rotateY={rotateY}
            />
          );
        })}
      </motion.div>
      
      <FramerCarouselDots 
        items={items}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        round={round}
      />
    </div>
  );
});

FramerCarousel.displayName = 'FramerCarousel';

export { FramerCarousel, FramerCarouselItem, FramerCarouselDots };
export default FramerCarousel;
