'use client';

import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import React, { useEffect, useRef, useMemo, useCallback } from 'react';

import { cn } from '@/utils/app.utils';
import styles from './infinite-scroll.module.css';
import { InfiniteScrollItem, InfiniteScrollProps } from './infinite-scroll.types';

/**
 * InfiniteScroll component creates a scrollable container with infinite scrolling behavior
 * 
 * The component uses GSAP for smooth animations and supports custom styling, autoplay,
 * and 3D tilting effects. Perfect for showcasing content in a continuous loop.
 * 
 * @example
 * ```tsx
 * <InfiniteScroll
 *   items={[
 *     { content: <div>Item 1</div> },
 *     { content: <div>Item 2</div> },
 *     { content: <div>Item 3</div> }
 *   ]}
 *   width="30rem"
 *   autoplay={true}
 *   isTilted={true}
 * />
 * ```
 */
const InfiniteScrollComponent: React.FC<InfiniteScrollProps> = ({
  width = '30rem',
  maxHeight = '100%',
  negativeMargin = '-0.5em',
  items = [],
  itemMinHeight = 150,
  isTilted = false,
  tiltDirection = 'left',
  autoplay = false,
  autoplaySpeed = 0.5,
  autoplayDirection = 'down',
  pauseOnHover = false
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);

  // Memoize the tilt transform calculation
  const getTiltTransform = useCallback((): string => {
    if (!isTilted) return 'none';
    return tiltDirection === 'left'
      ? 'rotateX(20deg) rotateZ(-20deg) skewX(20deg)'
      : 'rotateX(20deg) rotateZ(20deg) skewX(-20deg)';
  }, [isTilted, tiltDirection]);

  // Memoize styles to prevent recalculations
  const inlineStyles = useMemo(
    () => ({
      container: { width, transform: getTiltTransform() },
      item: { height: `${itemMinHeight}px`, marginTop: negativeMargin }
    }),
    [width, itemMinHeight, negativeMargin, getTiltTransform]
  );

  useEffect(() => {
    // Register GSAP Observer plugin if needed
    if (!gsap.globalTimeline.isRegistered('Observer')) {
      gsap.registerPlugin(Observer);
    }

    const container = containerRef.current;
    if (!container || items.length === 0) return;

    const firstItem = container.children[0] as HTMLElement;
    const itemStyle = getComputedStyle(firstItem);
    const itemHeight = firstItem.offsetHeight;
    const itemMarginTop = parseFloat(itemStyle.marginTop) || 0;
    const totalItemHeight = itemHeight + itemMarginTop;
    const totalHeight = itemHeight * items.length + itemMarginTop * (items.length - 1);

    const wrapFn = gsap.utils.wrap(-totalHeight, totalHeight);

    // Get all child elements of container as HTMLDivElement[]
    const divItems = gsap.utils.toArray<HTMLDivElement>(container.children);
    if (!divItems.length) return;

    // Set initial positions
    divItems.forEach((child, i) => {
      const y = i * totalItemHeight;
      gsap.set(child, { y });
    });

    // Create GSAP Observer for scroll/touch interactions
    const observer = Observer.create({
      target: container,
      type: 'wheel,touch,pointer',
      preventDefault: true,
      onPress: ({ target }) => {
        (target as HTMLElement).style.cursor = 'grabbing';
      },
      onRelease: ({ target }) => {
        (target as HTMLElement).style.cursor = 'grab';
      },
      onChange: ({ deltaY, isDragging, event }) => {
        const d = event.type === 'wheel' ? -deltaY : deltaY;
        const distance = isDragging ? d * 5 : d * 10;
        divItems.forEach(child => {
          gsap.to(child, {
            duration: 0.5,
            ease: 'expo.out',
            y: `+=${distance}`,
            modifiers: {
              y: gsap.utils.unitize(wrapFn)
            }
          });
        });
      }
    });

    // Set up autoplay animation if enabled
    if (autoplay) {
      const directionFactor = autoplayDirection === 'down' ? 1 : -1;
      const speedPerFrame = autoplaySpeed * directionFactor;

      const tick = () => {
        divItems.forEach(child => {
          gsap.set(child, {
            y: `+=${speedPerFrame}`,
            modifiers: {
              y: gsap.utils.unitize(wrapFn)
            }
          });
        });
        rafIdRef.current = requestAnimationFrame(tick);
      };

      rafIdRef.current = requestAnimationFrame(tick);

      // Add pause on hover functionality if enabled
      if (pauseOnHover) {
        const stopTicker = () => {
          if (rafIdRef.current) {
            cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = null;
          }
        };
        
        const startTicker = () => {
          if (!rafIdRef.current) {
            rafIdRef.current = requestAnimationFrame(tick);
          }
        };

        container.addEventListener('mouseenter', stopTicker);
        container.addEventListener('mouseleave', startTicker);

        return () => {
          observer.kill();
          stopTicker();
          container.removeEventListener('mouseenter', stopTicker);
          container.removeEventListener('mouseleave', startTicker);
        };
      }
    }

    // Cleanup function
    return () => {
      observer.kill();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [
    items,
    autoplay,
    autoplaySpeed,
    autoplayDirection,
    pauseOnHover
  ]);

  return (
    <div 
      className={styles['infinite-scroll-wrapper']} 
      ref={wrapperRef} 
      style={{ maxHeight }}
    >
      <div
        className={styles['infinite-scroll-container']}
        ref={containerRef}
        style={inlineStyles.container}
      >
        {items.map((item, i) => (
          <div 
            className={cn(
              styles['infinite-scroll-item'],
              isTilted && (tiltDirection === 'left' 
                ? styles['infinite-scroll-tilted-left'] 
                : styles['infinite-scroll-tilted-right'])
            )} 
            key={i}
            style={inlineStyles.item}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

// Set displayName for debugging
InfiniteScrollComponent.displayName = 'InfiniteScrollComponent';

/**
 * Memoized InfiniteScroll component
 * 
 * A vertical infinite scrolling container that can display any React content
 * with support for autoplay, tilting effects, and interactive scrolling.
 */
const InfiniteScroll = React.memo(InfiniteScrollComponent);
InfiniteScroll.displayName = 'InfiniteScroll';

export default InfiniteScroll;
