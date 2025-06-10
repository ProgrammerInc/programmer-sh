'use client';

import useEmblaCarousel from 'embla-carousel-react';
import * as React from 'react';
import { memo, useCallback, useEffect, useState } from 'react';

import { cn } from '@/utils/app.utils';
import { CarouselContext } from './carousel.context';
import styles from './carousel.module.css';
import { CarouselApi, CarouselProps } from './carousel.types';

/**
 * Carousel component
 *
 * A carousel/slider component that uses Embla Carousel.
 *
 * @example
 * ```tsx
 * <Carousel>
 *   <CarouselContent>
 *     <CarouselItem>Slide 1</CarouselItem>
 *     <CarouselItem>Slide 2</CarouselItem>
 *   </CarouselContent>
 *   <CarouselPrevious />
 *   <CarouselNext />
 * </Carousel>
 * ```
 */
const Carousel = memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
    ({ orientation = 'horizontal', opts, setApi, plugins, className, children, ...props }, ref) => {
      const [carouselRef, api] = useEmblaCarousel(
        {
          ...opts,
          axis: orientation === 'horizontal' ? 'x' : 'y'
        },
        plugins
      );

      const [canScrollPrev, setCanScrollPrev] = useState(false);
      const [canScrollNext, setCanScrollNext] = useState(false);

      const onSelect = useCallback((api: CarouselApi) => {
        if (!api) {
          return;
        }

        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
      }, []);

      const scrollPrev = useCallback(() => {
        api?.scrollPrev();
      }, [api]);

      const scrollNext = useCallback(() => {
        api?.scrollNext();
      }, [api]);

      const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            scrollPrev();
          } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            scrollNext();
          }
        },
        [scrollPrev, scrollNext]
      );

      useEffect(() => {
        if (!api || !setApi) {
          return;
        }

        setApi(api);
      }, [api, setApi]);

      useEffect(() => {
        if (!api) {
          return;
        }

        onSelect(api);
        api.on('reInit', onSelect);
        api.on('select', onSelect);

        return () => {
          api?.off('select', onSelect);
        };
      }, [api, onSelect]);

      return (
        <CarouselContext.Provider
          value={{
            carouselRef,
            api: api,
            opts,
            orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
            scrollPrev,
            scrollNext,
            canScrollPrev,
            canScrollNext
          }}
        >
          <div
            ref={ref}
            onKeyDownCapture={handleKeyDown}
            className={cn(styles.carousel, className)}
            role="region"
            aria-roledescription="carousel"
            {...props}
          >
            {children}
          </div>
        </CarouselContext.Provider>
      );
    }
  )
);

Carousel.displayName = 'Carousel';

export { Carousel };
export default Carousel;
