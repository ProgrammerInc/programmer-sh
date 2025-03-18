'use client';

import { cn } from '@/utils/app.utils';
import { PanInfo, motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import React, { useEffect, useState, memo } from 'react';

import styles from './rolling-gallery.module.css';
import { RollingGalleryProps } from './rolling-gallery.types';
import {
  AUTOPLAY_DURATION,
  DEFAULT_IMAGES,
  DRAG_FACTOR,
  calculateCarouselGeometry,
  getFrameTransform
} from './rolling-gallery.utils';

/**
 * Rolling Gallery Component
 * 
 * A 3D rotating image carousel built with Framer Motion.
 * Supports dragging, autoplay, and responsive design.
 * 
 * Features:
 * - Interactive 3D rotating carousel
 * - Drag to rotate manually
 * - Optional autoplay with configurable behavior
 * - Responsive design that adapts to screen size
 * - Smooth animation and transitions
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <RollingGallery />
 * 
 * // With custom images and autoplay
 * <RollingGallery 
 *   images={[
 *     '/image1.jpg',
 *     '/image2.jpg',
 *     '/image3.jpg'
 *   ]}
 *   autoplay
 *   pauseOnHover
 * />
 * ```
 */
export const RollingGallery = memo(({ 
  autoplay = false,
  pauseOnHover = false,
  images = [],
  className
}: RollingGalleryProps) => {
  // Use default images if none are provided
  const galleryImages = images.length > 0 ? images : DEFAULT_IMAGES;

  // Handle responsive layout
  const [isScreenSizeSm, setIsScreenSizeSm] = useState<boolean>(false);
  
  useEffect(() => {
    // Initial check
    setIsScreenSizeSm(window.innerWidth <= 640);
    
    // Listen for window resize events
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate 3D geometry based on screen size and number of images
  const { cylinderWidth, faceWidth, radius } = calculateCarouselGeometry(
    isScreenSizeSm,
    galleryImages.length
  );

  // Framer Motion values and controls
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  // Create a 3D transform based on the rotation motion value
  const transform = useTransform(rotation, (val: number) => `rotate3d(0,1,0,${val}deg)`);

  /**
   * Start infinite spinning animation
   * @param startAngle The angle to start from
   */
  const startInfiniteSpin = (startAngle: number) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: AUTOPLAY_DURATION,
        ease: 'linear',
        repeat: Infinity
      }
    });
  };

  // Handle autoplay state changes
  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  /**
   * Update rotation value when animation runs
   */
  const handleUpdate = (latest: Record<string, unknown>) => {
    if (typeof latest.rotateY === 'number') {
      rotation.set(latest.rotateY);
    }
  };

  /**
   * Handle drag events for manual rotation
   */
  const handleDrag = (_: never, info: PanInfo): void => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * DRAG_FACTOR);
  };

  /**
   * Handle the end of a drag gesture
   */
  const handleDragEnd = (_: never, info: PanInfo): void => {
    const finalAngle = rotation.get() + info.velocity.x * DRAG_FACTOR;
    rotation.set(finalAngle);
    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  /**
   * Handle mouse enter events for pause-on-hover
   */
  const handleMouseEnter = (): void => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };

  /**
   * Handle mouse leave events to resume autoplay
   */
  const handleMouseLeave = (): void => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className={cn(styles.container, className)}>
      <div className={styles['left-gradient']} />
      <div className={styles['right-gradient']} />
      
      <div className={styles['perspective-container']}>
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: 'preserve-3d'
          }}
          className={styles.carousel}
        >
          {galleryImages.map((url, i) => (
            <div
              key={i}
              className={styles.frame}
              style={{
                width: `${faceWidth}px`,
                ...getFrameTransform(i, galleryImages.length, radius)
              }}
            >
              <img
                src={url}
                alt={`Gallery image ${i + 1}`}
                className={styles.image}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
});

RollingGallery.displayName = 'RollingGallery';

export default RollingGallery;
