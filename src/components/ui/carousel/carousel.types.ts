import { HTMLAttributes, RefObject } from 'react';
import { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';

/**
 * Type for the Embla Carousel API
 */
export type CarouselApi = UseEmblaCarouselType[1];

/**
 * Type for carousel options
 */
export type CarouselOptions = NonNullable<Parameters<typeof useEmblaCarousel>[0]>;

/**
 * Type for carousel plugins
 */
export type CarouselPlugin = NonNullable<Parameters<typeof useEmblaCarousel>[1]>;

/**
 * Props for the Carousel component
 */
export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Orientation of the carousel
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * Options to pass to embla-carousel
   */
  opts?: CarouselOptions;
  
  /**
   * Plugins to pass to embla-carousel
   */
  plugins?: CarouselPlugin;
  
  /**
   * Callback to get the carousel API
   */
  setApi?: (api: CarouselApi) => void;
}

/**
 * Props for the carousel context
 */
export interface CarouselContextProps {
  /**
   * Reference to the carousel element
   */
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  
  /**
   * Carousel API instance
   */
  api: CarouselApi | null;
  
  /**
   * Carousel options
   */
  opts?: CarouselOptions;
  
  /**
   * Carousel orientation
   */
  orientation: 'horizontal' | 'vertical';
  
  /**
   * Function to scroll to the previous slide
   */
  scrollPrev: () => void;
  
  /**
   * Function to scroll to the next slide
   */
  scrollNext: () => void;
  
  /**
   * Whether the carousel can scroll to the previous slide
   */
  canScrollPrev: boolean;
  
  /**
   * Whether the carousel can scroll to the next slide
   */
  canScrollNext: boolean;
}

/**
 * Props for the CarouselContent component
 */
export type CarouselContentProps = HTMLAttributes<HTMLDivElement>;

/**
 * Props for the CarouselItem component
 */
export type CarouselItemProps = HTMLAttributes<HTMLDivElement>;

/**
 * Props for the CarouselPrevious component
 */
export type CarouselPreviousProps = ComponentProps<typeof Button>;

/**
 * Props for the CarouselNext component
 */
export type CarouselNextProps = ComponentProps<typeof Button>;
