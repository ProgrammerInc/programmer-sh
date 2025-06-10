'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/app.utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import * as React from 'react';
import { useCarousel } from './carousel.context';
import styles from './carousel.module.css';
import {
  CarouselContentProps,
  CarouselItemProps,
  CarouselNextProps,
  CarouselPreviousProps
} from './carousel.types';

/**
 * CarouselContent component
 *
 * Container for all the carousel slides.
 *
 * @example
 * ```tsx
 * <Carousel>
 *   <CarouselContent>
 *     <CarouselItem>Slide 1</CarouselItem>
 *     <CarouselItem>Slide 2</CarouselItem>
 *   </CarouselContent>
 * </Carousel>
 * ```
 */
export const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    const isHorizontal = orientation === 'horizontal';

    return (
      <div ref={carouselRef} className={styles['carousel-content-container']}>
        <div
          ref={ref}
          className={cn(
            styles['carousel-content'],
            isHorizontal
              ? styles['carousel-content-horizontal']
              : styles['carousel-content-vertical'],
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

CarouselContent.displayName = 'CarouselContent';

/**
 * CarouselItem component
 *
 * Represents a single slide in the carousel.
 *
 * @example
 * ```tsx
 * <CarouselItem>
 *   <img src="image.jpg" alt="Slide" />
 * </CarouselItem>
 * ```
 */
export const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    const isHorizontal = orientation === 'horizontal';

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          styles['carousel-item'],
          isHorizontal ? styles['carousel-item-horizontal'] : styles['carousel-item-vertical'],
          className
        )}
        {...props}
      />
    );
  }
);

CarouselItem.displayName = 'CarouselItem';

/**
 * CarouselPrevious component
 *
 * Button to navigate to the previous slide.
 */
export const CarouselPrevious = React.forwardRef<HTMLButtonElement, CarouselPreviousProps>(
  ({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    const isHorizontal = orientation === 'horizontal';

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          styles['carousel-nav-button'],
          isHorizontal ? styles['carousel-prev-horizontal'] : styles['carousel-prev-vertical'],
          className
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className={styles['carousel-icon']} />
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  }
);

CarouselPrevious.displayName = 'CarouselPrevious';

/**
 * CarouselNext component
 *
 * Button to navigate to the next slide.
 */
export const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselNextProps>(
  ({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    const isHorizontal = orientation === 'horizontal';

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          styles['carousel-nav-button'],
          isHorizontal ? styles['carousel-next-horizontal'] : styles['carousel-next-vertical'],
          className
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className={styles['carousel-icon']} />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  }
);

CarouselNext.displayName = 'CarouselNext';
