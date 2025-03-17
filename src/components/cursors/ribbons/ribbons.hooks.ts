/**
 * Custom hooks for the Ribbons cursor component.
 */
import { Renderer, Transform, Vec3 } from 'ogl';
import { useCallback, useEffect, useRef } from 'react';

import { CANVAS_STYLES, DEFAULT_VALUES } from './ribbons.constants';
import type { RibbonLine, RibbonsProps } from './ribbons.types';
import {
  applyCanvasStyles,
  calculateMouseOffset,
  createPoints,
  createPolyline,
  createRenderer,
  updateMousePosition
} from './ribbons.utils';

/**
 * Hook that manages the ribbons cursor effect.
 *
 * @param props - Ribbons configuration properties
 * @returns Container ref
 */
export const useRibbons = ({
  colors = DEFAULT_VALUES.colors,
  baseSpring = DEFAULT_VALUES.baseSpring,
  baseFriction = DEFAULT_VALUES.baseFriction,
  baseThickness = DEFAULT_VALUES.baseThickness,
  offsetFactor = DEFAULT_VALUES.offsetFactor,
  maxAge = DEFAULT_VALUES.maxAge,
  pointCount = DEFAULT_VALUES.pointCount,
  speedMultiplier = DEFAULT_VALUES.speedMultiplier,
  enableFade = DEFAULT_VALUES.enableFade,
  enableShaderEffect = DEFAULT_VALUES.enableShaderEffect,
  effectAmplitude = DEFAULT_VALUES.effectAmplitude,
  backgroundColor = DEFAULT_VALUES.backgroundColor
}: RibbonsProps) => {
  // Ref for the container div
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs for animation state
  const rendererRef = useRef<Renderer | null>(null);
  const sceneRef = useRef<Transform | null>(null);
  const linesRef = useRef<RibbonLine[]>([]);
  const mouseRef = useRef<Vec3>(new Vec3());
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const mountedRef = useRef<boolean>(false);

  /**
   * Handles resize events to update renderer dimensions.
   */
  const handleResize = useCallback(() => {
    const container = containerRef.current;
    if (!container || !rendererRef.current || !mountedRef.current) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    rendererRef.current.setSize(width, height);

    // Resize all polylines
    linesRef.current.forEach(line => line.polyline.resize());
  }, []);

  /**
   * Updates ribbon positions and renders frame.
   */
  const update = useCallback(() => {
    if (!mountedRef.current) return;

    animationFrameRef.current = requestAnimationFrame(update);
    const currentTime = performance.now();
    const dt = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    const tmp = new Vec3();
    linesRef.current.forEach(line => {
      tmp.copy(mouseRef.current).add(line.mouseOffset).sub(line.points[0]).multiply(line.spring);
      line.mouseVelocity.add(tmp).multiply(line.friction);
      line.points[0].add(line.mouseVelocity);

      for (let i = 1; i < line.points.length; i++) {
        if (isFinite(maxAge) && maxAge > 0) {
          const segmentDelay = maxAge / (line.points.length - 1);
          const alpha = Math.min(1, (dt * speedMultiplier) / segmentDelay);
          line.points[i].lerp(line.points[i - 1], alpha);
        } else {
          line.points[i].lerp(line.points[i - 1], 0.9);
        }
      }

      // Update time uniform for shader effects
      if (line.polyline.mesh.program.uniforms.uTime) {
        line.polyline.mesh.program.uniforms.uTime.value = currentTime * 0.001;
      }

      line.polyline.updateGeometry();
    });

    if (rendererRef.current && sceneRef.current) {
      rendererRef.current.render({ scene: sceneRef.current });
    }
  }, [maxAge, speedMultiplier]);

  /**
   * Handles mouse/touch move events to update cursor position.
   */
  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    const container = containerRef.current;
    if (!container || !mountedRef.current) return;

    updateMousePosition(e, container, mouseRef.current);
  }, []);

  /**
   * Initialize ribbons effect.
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    mountedRef.current = true;
    lastTimeRef.current = performance.now();

    // Create renderer
    const renderer = createRenderer(window.devicePixelRatio || 2, backgroundColor);
    rendererRef.current = renderer;
    const gl = renderer.gl;

    // Apply styles to canvas
    applyCanvasStyles(gl.canvas, CANVAS_STYLES);
    container.appendChild(gl.canvas);

    // Create scene
    const scene = new Transform();
    sceneRef.current = scene;

    // Initialize ribbons
    const lines: RibbonLine[] = [];
    const center = (colors.length - 1) / 2;

    colors.forEach((color, index) => {
      // Randomize properties slightly for each ribbon
      const spring = baseSpring + (Math.random() - 0.5) * 0.05;
      const friction = baseFriction + (Math.random() - 0.5) * 0.05;
      const thickness = baseThickness + (Math.random() - 0.5) * 3;
      const mouseOffset = calculateMouseOffset(index, center, offsetFactor);

      // Create points
      const points = createPoints(pointCount);

      // Create polyline
      const polyline = createPolyline(
        renderer,
        points,
        color,
        thickness,
        enableShaderEffect,
        effectAmplitude,
        enableFade
      );

      // Add to scene
      polyline.mesh.setParent(scene);

      // Create ribbon line object
      lines.push({
        spring,
        friction,
        mouseVelocity: new Vec3(),
        mouseOffset,
        points,
        polyline
      });
    });

    linesRef.current = lines;

    // Set up initial size
    handleResize();

    // Add event listeners
    window.addEventListener('resize', handleResize);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchstart', handleMouseMove);
    container.addEventListener('touchmove', handleMouseMove);

    // Start animation loop
    update();

    // Cleanup function
    return () => {
      mountedRef.current = false;

      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchstart', handleMouseMove);
      container.removeEventListener('touchmove', handleMouseMove);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      if (gl.canvas && gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }

      // Clean up references
      linesRef.current = [];
      rendererRef.current = null;
      sceneRef.current = null;
    };
  }, [
    colors,
    baseSpring,
    baseFriction,
    baseThickness,
    offsetFactor,
    maxAge,
    pointCount,
    speedMultiplier,
    enableFade,
    enableShaderEffect,
    effectAmplitude,
    backgroundColor,
    handleResize,
    handleMouseMove,
    update
  ]);

  return containerRef;
};
