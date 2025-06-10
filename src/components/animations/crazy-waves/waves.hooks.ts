/**
 * Waves Animation Component Hooks
 *
 * Contains the core animation logic for the Waves component.
 */
import { RefObject, useCallback, useEffect, useRef } from 'react';
import { ANIMATION_SETTINGS, DEFAULT_SETTINGS } from './waves.constants';
import { Mouse, Point, WavesAnimationOptions, WavesConfig } from './waves.types';
import { Noise, calculateMovedPoint } from './waves.utils';

/**
 * Custom hook for the Waves animation
 *
 * @param canvasRef - Reference to the canvas element
 * @param containerRef - Reference to the container element
 * @param options - Animation configuration options
 * @returns Animation status object
 */
export const useWavesAnimation = (
  canvasRef: RefObject<HTMLCanvasElement>,
  containerRef: RefObject<HTMLDivElement>,
  options: WavesAnimationOptions
) => {
  // Refs for animation state
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isInitializedRef = useRef<boolean>(false);

  // Animation state refs
  const boundingRef = useRef<{
    width: number;
    height: number;
    left: number;
    top: number;
  }>({ width: 0, height: 0, left: 0, top: 0 });

  const noiseRef = useRef<Noise>(new Noise(Math.random()));
  const linesRef = useRef<Point[][]>([]);
  const mouseRef = useRef<Mouse>({
    x: 0,
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

  // Configuration with defaults
  const configRef = useRef<WavesConfig>({
    lineColor: options.lineColor ?? DEFAULT_SETTINGS.LINE_COLOR,
    waveSpeedX: options.waveSpeedX ?? DEFAULT_SETTINGS.WAVE_SPEED_X,
    waveSpeedY: options.waveSpeedY ?? DEFAULT_SETTINGS.WAVE_SPEED_Y,
    waveAmpX: options.waveAmpX ?? DEFAULT_SETTINGS.WAVE_AMP_X,
    waveAmpY: options.waveAmpY ?? DEFAULT_SETTINGS.WAVE_AMP_Y,
    friction: options.friction ?? DEFAULT_SETTINGS.FRICTION,
    tension: options.tension ?? DEFAULT_SETTINGS.TENSION,
    maxCursorMove: options.maxCursorMove ?? DEFAULT_SETTINGS.MAX_CURSOR_MOVE,
    xGap: options.xGap ?? DEFAULT_SETTINGS.X_GAP,
    yGap: options.yGap ?? DEFAULT_SETTINGS.Y_GAP
  });

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

    // Update canvas dimensions
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Re-initialize context with any needed settings
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctxRef.current = ctx;
      ctx.lineWidth = 1;
      ctx.strokeStyle = configRef.current.lineColor;
    }
  }, [canvasRef, containerRef]);

  /**
   * Initialize the grid of points
   */
  const setLines = useCallback(() => {
    const { width, height } = boundingRef.current;
    if (width === 0 || height === 0) return;

    linesRef.current = [];

    // Ensure we cover the entire container with some margin
    const oWidth = width + 100;
    const oHeight = height + 100;
    const { xGap, yGap } = configRef.current;

    // Calculate the number of lines and points needed
    const totalLines = Math.max(3, Math.floor(oWidth / xGap));
    const totalPoints = Math.max(3, Math.floor(oHeight / yGap));

    // Position lines across the container
    const xStart = (width - xGap * totalLines) / 2 - 50;
    const yStart = (height - yGap * totalPoints) / 2 - 50;

    for (let i = 0; i <= totalLines; i++) {
      const pts: Point[] = [];
      for (let j = 0; j <= totalPoints; j++) {
        pts.push({
          x: xStart + xGap * i,
          y: yStart + yGap * j,
          wave: { x: 0, y: 0 },
          cursor: { x: 0, y: 0, vx: 0, vy: 0 }
        });
      }
      linesRef.current.push(pts);
    }
  }, []);

  /**
   * Update mouse position
   */
  const updateMouse = useCallback((x: number, y: number) => {
    const mouse = mouseRef.current;
    const b = boundingRef.current;

    // Calculate mouse position relative to container
    mouse.x = x - b.left;
    mouse.y = y - b.top;

    // Initialize smoothed position on first update
    if (!mouse.set) {
      mouse.sx = mouse.x;
      mouse.sy = mouse.y;
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;
      mouse.set = true;
    }
  }, []);

  /**
   * Draw wave lines on the canvas
   */
  const drawLines = useCallback(() => {
    const { width, height } = boundingRef.current;
    const ctx = ctxRef.current;
    if (!ctx || width === 0 || height === 0) return;

    // Clear canvas and prepare for drawing
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.strokeStyle = configRef.current.lineColor;

    // Draw each line
    linesRef.current.forEach(points => {
      if (points.length === 0) return;

      // Move to first point
      const firstPoint = calculateMovedPoint(points[0]);
      ctx.moveTo(firstPoint.x, firstPoint.y);

      // Draw line segments
      for (let i = 1; i < points.length; i++) {
        const point = calculateMovedPoint(points[i]);
        ctx.lineTo(point.x, point.y);
      }
    });

    // Apply stroke to all paths
    ctx.stroke();
  }, []);

  /**
   * Move wave points based on noise and cursor
   */
  const movePoints = useCallback((time: number) => {
    const lines = linesRef.current;
    const mouse = mouseRef.current;
    const noise = noiseRef.current;
    const { waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove } =
      configRef.current;

    // Update each point in the grid
    lines.forEach(pts => {
      pts.forEach(p => {
        // Apply perlin noise for wave movement
        const move =
          noise.perlin2(
            (p.x + time * waveSpeedX) * ANIMATION_SETTINGS.NOISE_X_OFFSET,
            (p.y + time * waveSpeedY) * ANIMATION_SETTINGS.NOISE_Y_OFFSET
          ) * ANIMATION_SETTINGS.WAVE_FACTOR;

        p.wave.x = Math.cos(move) * waveAmpX;
        p.wave.y = Math.sin(move) * waveAmpY;

        // Apply cursor influence
        const dx = p.x - mouse.sx;
        const dy = p.y - mouse.sy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const l = Math.max(ANIMATION_SETTINGS.MIN_CURSOR_RADIUS, mouse.vs);

        if (dist < l) {
          const s = 1 - dist / l;
          const f = Math.cos(dist * ANIMATION_SETTINGS.DISTANCE_FACTOR) * s;
          p.cursor.vx +=
            Math.cos(mouse.a) * f * l * mouse.vs * ANIMATION_SETTINGS.CURSOR_VELOCITY_FACTOR;
          p.cursor.vy +=
            Math.sin(mouse.a) * f * l * mouse.vs * ANIMATION_SETTINGS.CURSOR_VELOCITY_FACTOR;
        }

        // Apply spring physics
        p.cursor.vx += (0 - p.cursor.x) * tension;
        p.cursor.vy += (0 - p.cursor.y) * tension;
        p.cursor.vx *= friction;
        p.cursor.vy *= friction;
        p.cursor.x += p.cursor.vx * ANIMATION_SETTINGS.CURSOR_ACCELERATION;
        p.cursor.y += p.cursor.vy * ANIMATION_SETTINGS.CURSOR_ACCELERATION;

        // Clamp movement
        p.cursor.x = Math.min(maxCursorMove, Math.max(-maxCursorMove, p.cursor.x));
        p.cursor.y = Math.min(maxCursorMove, Math.max(-maxCursorMove, p.cursor.y));
      });
    });
  }, []);

  /**
   * Animation frame callback
   */
  const animate = useCallback(
    (timestamp: number) => {
      const container = containerRef.current;
      if (!container) return;

      const mouse = mouseRef.current;

      // Smooth mouse position
      mouse.sx += (mouse.x - mouse.sx) * ANIMATION_SETTINGS.CURSOR_SMOOTHING;
      mouse.sy += (mouse.y - mouse.sy) * ANIMATION_SETTINGS.CURSOR_SMOOTHING;

      // Calculate velocity and angle
      const dx = mouse.x - mouse.lx;
      const dy = mouse.y - mouse.ly;
      const d = Math.sqrt(dx * dx + dy * dy);

      mouse.v = d;
      mouse.vs += (d - mouse.vs) * ANIMATION_SETTINGS.CURSOR_SMOOTHING;
      mouse.vs = Math.min(ANIMATION_SETTINGS.MAX_SMOOTHED_VELOCITY, mouse.vs);
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;
      mouse.a = Math.atan2(dy, dx);

      // Update CSS variables for cursor visualization
      if (container) {
        container.style.setProperty('--x', `${mouse.sx}px`);
        container.style.setProperty('--y', `${mouse.sy}px`);
      }

      // Update and draw points
      movePoints(timestamp * 0.001);
      drawLines();

      // Continue animation
      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [containerRef, drawLines, movePoints]
  );

  /**
   * Cleanup animation
   */
  const cleanup = useCallback(() => {
    if (animationFrameRef.current !== null && animationFrameRef.current !== undefined) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  /**
   * Initialize animation
   */
  const initialize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Set up canvas and context
    ctxRef.current = canvas.getContext('2d');
    if (!ctxRef.current) return;

    // Configure canvas
    setSize();
    setLines();

    // Start animation loop
    if (animationFrameRef.current === null) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    isInitializedRef.current = true;
  }, [animate, canvasRef, containerRef, setLines, setSize]);

  /**
   * Initialize animation and set up event listeners
   */
  useEffect(() => {
    // Make sure we have valid refs before proceeding
    if (!canvasRef.current || !containerRef.current) {
      // Don't set up anything if refs aren't available
      return () => {};
    }

    // Store ref values in variables to prevent null reference errors during cleanup
    const canvas = canvasRef.current;
    const container = containerRef.current;

    const onResize = () => {
      setSize();
      setLines();
    };

    const onMouseMove = (e: MouseEvent) => {
      updateMouse(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateMouse(touch.clientX, touch.clientY);
        e.preventDefault(); // Prevent scrolling when interacting with waves
      }
    };

    // Initialize animation
    initialize();

    // Add event listeners
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    // Cleanup on unmount
    return () => {
      cleanup();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [cleanup, initialize, setLines, setSize, updateMouse, canvasRef, containerRef]);

  // Update CSS variables
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (options.backgroundColor) {
      container.style.setProperty('--waves-background-color', options.backgroundColor);
    }

    if (options.lineColor) {
      container.style.setProperty('--waves-line-color', options.lineColor);
    }

    // Apply any custom styles from the style prop
    if (options.style && container) {
      Object.entries(options.style).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
          container.style.setProperty(cssKey, String(value));
        }
      });
    }
  }, [options.backgroundColor, options.lineColor, options.style, containerRef, canvasRef]);

  return {
    isAnimating: animationFrameRef.current !== null
  };
};
