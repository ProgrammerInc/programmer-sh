'use client';

import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import React, { useEffect, useRef, useMemo, useCallback, memo } from 'react';
import './infinite-scroll.module.css';

export interface InfiniteScrollItem {
  content: React.ReactNode;
}

export interface InfiniteScrollProps {
  // ----- Layout / Style Props -----
  width?: string; // Width of the outer wrapper
  maxHeight?: string; // Max-height of the outer wrapper
  negativeMargin?: string; // Negative margin to reduce spacing between items
  // ----- Items Prop -----
  items?: InfiniteScrollItem[]; // Array of items with { content: ... }
  itemMinHeight?: number; // Fixed height for each item
  // ----- Tilt Props -----
  isTilted?: boolean; // Whether the container is in "skewed" perspective
  tiltDirection?: 'left' | 'right'; // tiltDirection: "left" or "right"
  // ----- Autoplay Props -----
  autoplay?: boolean; // Whether it should automatically scroll
  autoplaySpeed?: number; // Speed (pixels/frame approx.)
  autoplayDirection?: 'down' | 'up'; // "down" or "up"
  pauseOnHover?: boolean; // Pause autoplay on hover
}

/**
 * InfiniteScroll component creates a scrollable container with infinite scrolling behavior
 * 
 * @param props - Component properties including styling and behavior options
 * @returns A memoized React component with infinite scrolling capability
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
      wrapper: { maxHeight },
      container: { width, transform: getTiltTransform() },
      item: { height: `${itemMinHeight}px`, marginTop: negativeMargin }
    }),
    [width, maxHeight, itemMinHeight, negativeMargin, getTiltTransform]
  );

  // Generate CSS style string
  const styleString = useMemo(
    () => `
      .infinite-scroll-wrapper {
        max-height: ${maxHeight};
      }

      .infinite-scroll-container {
        width: ${width};
      }

      .infinite-scroll-item {
        height: ${itemMinHeight}px;
        margin-top: ${negativeMargin};
      }
    `,
    [maxHeight, width, itemMinHeight, negativeMargin]
  );

  useEffect(() => {
    // Register GSAP Observer plugin if needed
    if (!gsap.globalTimeline.isRegistered('Observer')) {
      gsap.registerPlugin(Observer);
    }

    const container = containerRef.current;
    if (!container || items.length === 0) return;

    // Get all child elements of container as HTMLDivElement[]
    const divItems = gsap.utils.toArray<HTMLDivElement>(container.children);
    if (!divItems.length) return;

    const firstItem = divItems[0];
    const itemStyle = getComputedStyle(firstItem);
    const itemHeight = firstItem.offsetHeight;
    const itemMarginTop = parseFloat(itemStyle.marginTop) || 0;
    const totalItemHeight = itemHeight + itemMarginTop;
    const totalHeight = itemHeight * items.length + itemMarginTop * (items.length - 1);

    const wrapFn = gsap.utils.wrap(-totalHeight, totalHeight);

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
    <>
      <style>{styleString}</style>

      <div className="infinite-scroll-wrapper" ref={wrapperRef}>
        <div
          className="infinite-scroll-container"
          ref={containerRef}
          style={inlineStyles.container}
        >
          {items.map((item, i) => (
            <div className="infinite-scroll-item" key={i}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Export memoized component
const InfiniteScroll = memo(InfiniteScrollComponent);
export default InfiniteScroll;
