/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef, useCallback, useMemo, memo } from 'react';

export class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

/**
 * Adjusts animation speed based on user's motion preferences
 * 
 * @param value - Original speed value
 * @param reducedMotion - Whether reduced motion is preferred
 * @returns Adjusted speed value
 */
function getEffectiveSpeed(value: any, reducedMotion: any) {
  if (reducedMotion) {
    return value * 5;
  }
  return value;
}

/**
 *  You can change/expand these as you like.
 */
const VARIANTS = {
  default: {
    activeColor: null,
    gap: 15,
    speed: 0.1,
    colors: '#ef4444,#f59e0b,#84cc16,#10b981,#06b6d4,#6366f1,#8b5cf6,#d946ef',
    noFocus: false
  },
  blue: {
    activeColor: null,
    gap: 15,
    speed: 0.1,
    colors: '#0ea5e9,#0284c7,#0369a1,#075985',
    noFocus: false
  },
  yellow: {
    activeColor: null,
    gap: 15,
    speed: 0.1,
    colors: '#fcd34d,#fbbf24,#f59e0b,#d97706',
    noFocus: false
  },
  pink: {
    activeColor: null,
    gap: 15,
    speed: 0.1,
    colors: '#f9a8d4,#f472b6,#ec4899,#db2777',
    noFocus: false
  }
} as const;

export interface PixelCardProps {
  variant?: 'default' | 'blue' | 'yellow' | 'pink';
  gap?: number;
  speed?: number;
  colors?: string;
  noFocus?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface VariantConfig {
  activeColor: string | null;
  gap: number;
  speed: number;
  colors: string;
  noFocus: boolean;
}

/**
 * PixelCard component creates a card with animated pixel effects on hover/focus
 * 
 * @param props - Component properties including styling and behavior options
 * @returns A memoized React component with animated pixel effects
 */
function PixelCardComponent({
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
    const variantCfg: VariantConfig = VARIANTS[variant] || VARIANTS.default;
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
        if (!ctx) return;
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pixel[fnName]();
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

  // Container style with useMemo
  const containerStyle = useMemo(() => (
    `h-[400px] w-[300px] relative overflow-hidden grid place-items-center aspect-[4/5] border border-[#27272a] rounded-[25px] isolate transition-colors duration-200 ease-&lsqb;cubic-bezier(0.5,1,0.89,1)&rsqb; select-none ${className}`
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
      className={containerStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={finalNoFocus ? undefined : onFocus}
      onBlur={finalNoFocus ? undefined : onBlur}
      tabIndex={finalNoFocus ? -1 : 0}
    >
      <canvas className="w-full h-full block" ref={canvasRef} />
      {children}
    </div>
  );
}

// Export memoized component
const PixelCard = memo(PixelCardComponent);
export default PixelCard;
