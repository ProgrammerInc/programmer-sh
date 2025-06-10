'use client';

import * as React from 'react';
import { useEffect, useRef } from 'react';

import { cn } from '@/utils/app.utils';
import { GalleryApp } from './circular-gallery-app.class';
import styles from './circular-gallery.module.css';
import { CircularGalleryProps } from './circular-gallery.types';

/**
 * CircularGallery Component
 *
 * A beautiful 3D gallery with curved layout and smooth scrolling.
 * Built with OGL for high-performance WebGL rendering.
 *
 * @example
 * ```tsx
 * <CircularGallery
 *   items={[
 *     { image: '/path/to/image1.jpg', text: 'Image 1' },
 *     { image: '/path/to/image2.jpg', text: 'Image 2' }
 *   ]}
 *   bend={3}
 *   textColor="#ffffff"
 *   borderRadius={0.05}
 *   font="bold 30px DM Sans"
 * />
 * ```
 */
export const CircularGallery = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CircularGalleryProps
>(
  (
    {
      className,
      items,
      bend = 3,
      textColor = '#ffffff',
      borderRadius = 0.05,
      font = 'bold 30px DM Sans',
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<GalleryApp | null>(null);

    // Initialize the gallery when the component mounts
    useEffect(() => {
      if (!containerRef.current) return;

      // Create the gallery
      appRef.current = new GalleryApp(containerRef.current, {
        items,
        bend,
        textColor,
        borderRadius,
        font
      });

      // Clean up when the component unmounts
      return () => {
        if (appRef.current) {
          appRef.current.destroy();
          appRef.current = null;
        }
      };
    }, [items, bend, textColor, borderRadius, font]);

    return (
      <div ref={ref} className={cn(styles.container, className)} {...props}>
        <div ref={containerRef} className={styles.container} />
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export default CircularGallery;
