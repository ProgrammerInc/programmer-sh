/**
 * Custom hooks for the Waves animation component
 */
import { CSSProperties, MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { ANIMATION_CONSTANTS, NOISE_CONSTANTS } from './waves.constants';
import { BoundingRect, Mouse, Point, WavesConfig } from './waves.types';
import { WavesNoise, calculatePointPosition, createWaveGrid, updateMouseTracking } from './waves.utils';

/**
 * Hook to manage the animation sizing and grid creation
 * @param containerRef Reference to the container element
 * @param canvasRef Reference to the canvas element
 * @param configRef Reference to the configuration
 * @returns Object containing the animation state
 */
export const useWavesSetup = (
  containerRef: MutableRefObject<HTMLDivElement | null>,
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  configRef: MutableRefObject<WavesConfig>
) => {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const boundingRef = useRef<BoundingRect>({
    width: 0,
    height: 0,
    left: 0,
    top: 0
  });
  const linesRef = useRef<Point[][]>([]);
  const noiseRef = useRef<WavesNoise>(new WavesNoise(Math.random()));
  const mouseRef = useRef<Mouse>({
    x: -10,
    y: 0,
    lx: 0,
    ly: 0,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: false
  });
  const frameIdRef = useRef<number | null>(null);

  /**
   * Set canvas size based on container dimensions
   */
  const setSize = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    
    const rect = container.getBoundingClientRect();
    boundingRef.current = {
      width: rect.width,
      height: rect.height,
      left: rect.left,
      top: rect.top
    };
    
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    ctxRef.current = canvas.getContext('2d');
  }, [canvasRef, containerRef]);

  /**
   * Create the wave lines grid
   */
  const setLines = useCallback(() => {
    const { width, height } = boundingRef.current;
    const { xGap, yGap } = configRef.current;
    linesRef.current = createWaveGrid(width, height, xGap, yGap);
  }, [configRef]);

  /**
   * Move the wave points based on noise and mouse influence
   */
  const movePoints = useCallback((time: number) => {
    const lines = linesRef.current;
    const mouse = mouseRef.current;
    const noise = noiseRef.current;
    const { 
      waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, 
      friction, tension, maxCursorMove 
    } = configRef.current;
    
    lines.forEach(pts => {
      pts.forEach(p => {
        // Calculate wave movement using Perlin noise
        const move = noise.perlin2(
          (p.x + time * waveSpeedX) * NOISE_CONSTANTS.X_SCALE, 
          (p.y + time * waveSpeedY) * NOISE_CONSTANTS.Y_SCALE
        ) * NOISE_CONSTANTS.PERLIN_MULTIPLIER;
        
        p.wave.x = Math.cos(move) * waveAmpX;
        p.wave.y = Math.sin(move) * waveAmpY;

        // Apply cursor influence
        const dx = p.x - mouse.sx,
          dy = p.y - mouse.sy;
        const dist = Math.hypot(dx, dy);
        const l = Math.max(ANIMATION_CONSTANTS.MIN_INFLUENCE_DISTANCE, mouse.vs);
        
        if (dist < l) {
          const s = 1 - dist / l;
          const f = Math.cos(dist * ANIMATION_CONSTANTS.WAVE_DISTORTION) * s;
          p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * ANIMATION_CONSTANTS.CURSOR_INFLUENCE_FACTOR;
          p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * ANIMATION_CONSTANTS.CURSOR_INFLUENCE_FACTOR;
        }

        // Apply spring physics
        p.cursor.vx += (0 - p.cursor.x) * tension;
        p.cursor.vy += (0 - p.cursor.y) * tension;
        p.cursor.vx *= friction;
        p.cursor.vy *= friction;
        p.cursor.x += p.cursor.vx * 2;
        p.cursor.y += p.cursor.vy * 2;
        
        // Clamp cursor influence
        p.cursor.x = Math.min(maxCursorMove, Math.max(-maxCursorMove, p.cursor.x));
        p.cursor.y = Math.min(maxCursorMove, Math.max(-maxCursorMove, p.cursor.y));
      });
    });
  }, [configRef]);

  /**
   * Draw the wave lines on the canvas
   */
  const drawLines = useCallback(() => {
    const { width, height } = boundingRef.current;
    const ctx = ctxRef.current;
    if (!ctx) return;
    
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.strokeStyle = configRef.current.lineColor;
    
    linesRef.current.forEach(points => {
      let p1 = calculatePointPosition(points[0], false);
      ctx.moveTo(p1.x, p1.y);
      
      points.forEach((p, idx) => {
        const isLast = idx === points.length - 1;
        p1 = calculatePointPosition(p, !isLast);
        const p2 = calculatePointPosition(points[idx + 1] || points[points.length - 1], !isLast);
        ctx.lineTo(p1.x, p1.y);
        if (isLast) ctx.moveTo(p2.x, p2.y);
      });
    });
    
    ctx.stroke();
  }, [configRef]);

  /**
   * Animation tick function
   */
  const tick = useCallback((t: number) => {
    const container = containerRef.current;
    if (!container) return;
    
    const mouse = mouseRef.current;
    
    // Update mouse smoothing
    mouse.sx += (mouse.x - mouse.sx) * ANIMATION_CONSTANTS.MOUSE_SMOOTHING;
    mouse.sy += (mouse.y - mouse.sy) * ANIMATION_CONSTANTS.MOUSE_SMOOTHING;
    
    // Calculate velocity and angle
    const dx = mouse.x - mouse.lx,
      dy = mouse.y - mouse.ly;
    const d = Math.hypot(dx, dy);
    
    mouse.v = d;
    mouse.vs += (d - mouse.vs) * ANIMATION_CONSTANTS.VELOCITY_SMOOTHING;
    mouse.vs = Math.min(ANIMATION_CONSTANTS.MAX_VELOCITY, mouse.vs);
    mouse.lx = mouse.x;
    mouse.ly = mouse.y;
    mouse.a = Math.atan2(dy, dx);
    
    // Update CSS variables for cursor visualization
    container.style.setProperty('--x', `${mouse.sx}px`);
    container.style.setProperty('--y', `${mouse.sy}px`);

    // Update and draw animation
    movePoints(t);
    drawLines();
    
    // Continue animation loop
    frameIdRef.current = requestAnimationFrame(tick);
  }, [containerRef, drawLines, movePoints]);

  /**
   * Handle mouse movement
   */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    updateMouseTracking(e.pageX, e.pageY, boundingRef.current, mouseRef.current);
  }, []);

  /**
   * Handle touch movement
   */
  const handleTouchMove = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    updateMouseTracking(touch.clientX, touch.clientY, boundingRef.current, mouseRef.current);
  }, []);

  /**
   * Handle window resize
   */
  const handleResize = useCallback(() => {
    setSize();
    setLines();
  }, [setSize, setLines]);

  return {
    boundingRef,
    linesRef,
    mouseRef,
    noiseRef,
    ctxRef,
    frameIdRef,
    setSize,
    setLines,
    movePoints,
    drawLines,
    tick,
    handleMouseMove,
    handleTouchMove,
    handleResize
  };
};

/**
 * Hook to manage the wave animation
 * @param containerRef Reference to the container element
 * @param canvasRef Reference to the canvas element
 * @param configRef Reference to the configuration object
 */
export const useWavesAnimation = (
  containerRef: MutableRefObject<HTMLDivElement | null>,
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  configRef: MutableRefObject<WavesConfig>
) => {
  const {
    frameIdRef,
    setSize,
    setLines,
    tick,
    handleMouseMove,
    handleTouchMove,
    handleResize
  } = useWavesSetup(containerRef, canvasRef, configRef);

  // Initialize and cleanup the animation
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !container) return;

    // Initialize
    setSize();
    setLines();
    frameIdRef.current = requestAnimationFrame(tick);
    
    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [canvasRef, containerRef, frameIdRef, handleMouseMove, handleResize, handleTouchMove, setLines, setSize, tick]);
};

/**
 * Hook to manage the waves component configuration
 * @param props Component props
 * @returns Configuration reference
 */
export const useWavesConfig = ({
  lineColor = 'black',
  waveSpeedX = 0.0125,
  waveSpeedY = 0.005,
  waveAmpX = 32,
  waveAmpY = 16,
  xGap = 32,
  yGap = 32,
  friction = 0.05,
  tension = 0.85,
  maxCursorMove = 1.5
}: {
  lineColor?: string;
  waveSpeedX?: number;
  waveSpeedY?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  xGap?: number;
  yGap?: number;
  friction?: number;
  tension?: number;
  maxCursorMove?: number;
}) => {
  const configRef = useRef<WavesConfig>({
    lineColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    friction,
    tension,
    maxCursorMove,
    xGap,
    yGap
  });

  // Update config when props change
  useEffect(() => {
    configRef.current = {
      lineColor,
      waveSpeedX,
      waveSpeedY,
      waveAmpX,
      waveAmpY,
      friction,
      tension,
      maxCursorMove,
      xGap,
      yGap
    };
  }, [
    lineColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    friction,
    tension,
    maxCursorMove,
    xGap,
    yGap
  ]);

  return configRef;
};

/**
 * Hook to manage styling for the waves component
 * @param containerRef Reference to container element
 * @param backgroundColor Background color
 * @param lineColor Line color
 * @param style Additional styles
 */
export const useWavesStyles = (
  containerRef: MutableRefObject<HTMLDivElement | null>,
  backgroundColor: string,
  lineColor: string,
  style?: CSSProperties
) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.style.setProperty('--waves-background-color', backgroundColor);
    container.style.setProperty('--waves-line-color', lineColor);

    // Apply any custom styles from the style prop
    if (style) {
      Object.entries(style).forEach(([key, value]) => {
        const cssKey = key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
        container.style.setProperty(`--waves-custom-${cssKey}`, value as string);
      });
    }
    
    return () => {
      // Clean up custom properties on unmount
      if (container && style) {
        Object.keys(style).forEach(key => {
          const cssKey = key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
          container.style.removeProperty(`--waves-custom-${cssKey}`);
        });
      }
    };
  }, [backgroundColor, containerRef, lineColor, style]);
};
