'use client';

import { useEffect, useRef, useCallback, useMemo, memo } from 'react';

import { cn } from '@/utils/app.utils';
import { Pixel } from './pixel.class';
import { PixelCardProps } from './pixel-card.types';
import { PIXEL_CARD_VARIANTS, getEffectiveSpeed } from './pixel-card.utils';
import styles from './pixel-card.module.css';

/**
 * PixelCard component creates a card with animated pixel effects on hover/focus
 * 
 * @param props - Component properties including styling and behavior options
 * @returns A memoized React component with animated pixel effects
 * 
 * @example
 * ```tsx
 * <PixelCard>
 *   <h3>Animated Card</h3>
 *   <p>Hover or focus to see the pixel animation effect</p>
 * </PixelCard>
 * 
 * <PixelCard variant="blue" gap={10} speed={0.2}>
 *   <div>Custom configuration</div>
 * </PixelCard>
 * ```
 */
const PixelCard = memo(function PixelCard({
  variant = 'default',
  gap,
  speed,
  colors,
  noFocus,
  className = '',
  children
}: PixelCardProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number | null>(null);
  const timePreviousRef = useRef(performance.now());
  
  // Check for reduced motion preference
  const reducedMotion = useRef(
    typeof window !== 'undefined' ? 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  ).current;

  // Memoize configuration to prevent unnecessary recalculations
  const { 
    finalGap, 
    finalSpeed, 
    finalColors, 
    finalNoFocus 
  } = useMemo(() => {
    const variantCfg = PIXEL_CARD_VARIANTS[variant] || PIXEL_CARD_VARIANTS.default;
    return {
      finalGap: gap ?? variantCfg.gap,
      finalSpeed: speed ?? variantCfg.speed,
      finalColors: colors ?? variantCfg.colors,
      finalNoFocus: noFocus ?? variantCfg.noFocus
    };
  }, [variant, gap, speed, colors, noFocus]);

  // Initialize pixels - memoized with useCallback for stability
  const initPixels = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);
    const ctx = canvasRef.current.getContext('2d');

    if (!ctx) return;

    canvasRef.current.width = width;
    canvasRef.current.height = height;
    canvasRef.current.style.width = `${width}px`;
    canvasRef.current.style.height = `${height}px`;

    const colorsArray = finalColors.split(',');
    const pxs = [];
    for (let x = 0; x < width; x += parseInt(finalGap.toString(), 10)) {
      for (let y = 0; y < height; y += parseInt(finalGap.toString(), 10)) {
        const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];

        const dx = x - width / 2;
        const dy = y - height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const delay = reducedMotion ? 0 : distance;
        
        pxs.push(
          new Pixel(
            canvasRef.current,
            ctx,
            x,
            y,
            color,
            getEffectiveSpeed(finalSpeed, reducedMotion),
            delay
          )
        );
      }
    }
    pixelsRef.current = pxs;
  }, [finalGap, finalSpeed, finalColors, reducedMotion]);

  // Animation function with useCallback
  const doAnimate = useCallback((fnName: keyof Pixel) => {
    if (animationRef.current !== null) {
      animationRef.current = requestAnimationFrame(() => doAnimate(fnName));
    }
    
    const timeNow = performance.now();
    const timePassed = timeNow - timePreviousRef.current;
    const timeInterval = 1000 / 60; // ~60 FPS

    if (timePassed < timeInterval) return;
    timePreviousRef.current = timeNow - (timePassed % timeInterval);

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !canvasRef.current) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    let allIdle = true;
    for (let i = 0; i < pixelsRef.current.length; i++) {
      const pixel = pixelsRef.current[i];
      // Type assertion to ensure TypeScript knows we're calling a method
      const method = pixel[fnName] as unknown as () => void;
      method.call(pixel);
      if (!pixel.isIdle) {
        allIdle = false;
      }
    }
    if (allIdle) {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
  }, []);

  // Handle animation with useCallback
  const handleAnimation = useCallback((name: keyof Pixel) => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(() => doAnimate(name));
  }, [doAnimate]);

  // Event handlers with useCallback
  const onMouseEnter = useCallback(() => handleAnimation('appear'), [handleAnimation]);
  const onMouseLeave = useCallback(() => handleAnimation('disappear'), [handleAnimation]);
  
  const onFocus = useCallback<React.FocusEventHandler<HTMLDivElement>>((e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    handleAnimation('appear');
  }, [handleAnimation]);
  
  const onBlur = useCallback<React.FocusEventHandler<HTMLDivElement>>((e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    handleAnimation('disappear');
  }, [handleAnimation]);

  // Container class with useMemo
  const containerClassName = useMemo(() => (
    cn(styles.container, className)
  ), [className]);

  useEffect(() => {
    // Initialize pixels on mount
    initPixels();
    
    // Set up resize observer
    const observer = new ResizeObserver(() => {
      initPixels();
    });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    // Cleanup function
    return () => {
      observer.disconnect();
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [initPixels]);

  return (
    <div
      ref={containerRef}
      className={containerClassName}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={finalNoFocus ? undefined : onFocus}
      onBlur={finalNoFocus ? undefined : onBlur}
      tabIndex={finalNoFocus ? -1 : 0}
    >
      <canvas className={styles.canvas} ref={canvasRef} />
      {children}
    </div>
  );
});

PixelCard.displayName = 'PixelCard';

export default PixelCard;
