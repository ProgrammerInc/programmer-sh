'use client';

import * as React from 'react';
import { createContext, useContext } from 'react';
import { CarouselContextProps } from './carousel.types';

/**
 * Carousel Context
 * 
 * Context to share carousel state and API between components.
 */
export const CarouselContext = createContext<CarouselContextProps | null>(null);

/**
 * useCarousel hook
 * 
 * Hook to access the carousel context.
 * 
 * @throws Error if used outside of a carousel component
 * @returns The carousel context
 */
export const useCarousel = (): CarouselContextProps => {
  const context = useContext(CarouselContext);
  
  if (!context) {
    throw new Error('useCarousel must be used within a Carousel component');
  }
  
  return context;
};
