/**
 * Hooks for the Orb animation component
 */

import { Mesh, Vec3 } from 'ogl';
import { useEffect, useRef } from 'react';
import { ORB_HOVER_SMOOTHING, ORB_ROTATION_SPEED } from './orb.constants';
import { fragmentShader, vertexShader } from './orb.shaders';
import {
  cleanupOrbResources,
  createOrbProgram,
  initializeOrbRenderer,
  isHoveringOverOrb,
  resizeOrbCanvas
} from './orb.utils';

/**
 * Custom hook to set up and manage the orb WebGL animation
 *
 * @param hue - Hue adjustment value in degrees
 * @param hoverIntensity - Intensity of the hover effect
 * @param rotateOnHover - Whether the orb should rotate when hovered
 * @param forceHoverState - Force the hover state to be active
 * @returns Object containing the reference to attach to the container element
 */
export const useOrbAnimation = (
  hue: number,
  hoverIntensity: number,
  rotateOnHover: boolean,
  forceHoverState: boolean
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize renderer and context
    const { renderer, gl } = initializeOrbRenderer(container);

    // Create program with shaders and uniforms
    const { geometry, program } = createOrbProgram(gl, vertexShader, fragmentShader, {
      iTime: { value: 0 },
      iResolution: {
        value: new Vec3(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
      },
      hue: { value: hue },
      hover: { value: 0 },
      rot: { value: 0 },
      hoverIntensity: { value: hoverIntensity }
    });

    // Create mesh for rendering
    const mesh = new Mesh(gl, { geometry, program });

    // Set up resize handler
    const handleResize = () => resizeOrbCanvas(container, renderer, gl, program);
    window.addEventListener('resize', handleResize);
    handleResize();

    // Set up hover state tracking
    let targetHover = 0;
    let lastTime = 0;
    let currentRot = 0;

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      targetHover = isHoveringOverOrb(container, e.clientX, e.clientY) ? 1 : 0;
    };

    const handleMouseLeave = () => {
      targetHover = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    let rafId: number;
    const update = (t: number) => {
      rafId = requestAnimationFrame(update);

      const dt = (t - lastTime) * 0.001;
      lastTime = t;

      // Update uniforms
      program.uniforms.iTime.value = t * 0.001;
      program.uniforms.hue.value = hue;
      program.uniforms.hoverIntensity.value = hoverIntensity;

      // Smooth hover transition
      const effectiveHover = forceHoverState ? 1 : targetHover;
      program.uniforms.hover.value +=
        (effectiveHover - program.uniforms.hover.value) * ORB_HOVER_SMOOTHING;

      // Handle rotation
      if (rotateOnHover && effectiveHover > 0.5) {
        currentRot += dt * ORB_ROTATION_SPEED;
      }
      program.uniforms.rot.value = currentRot;

      // Render
      renderer.render({ scene: mesh });
    };

    // Start animation loop
    rafId = requestAnimationFrame(update);

    // Cleanup function
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cleanupOrbResources(gl, container);
    };
  }, [hue, hoverIntensity, rotateOnHover, forceHoverState]);

  return { containerRef };
};
