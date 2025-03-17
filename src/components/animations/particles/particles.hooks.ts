/**
 * Custom hooks for the Particles animation component
 */

import { Camera, Geometry, Mesh, Program, Renderer } from 'ogl';
import { useEffect, useRef } from 'react';

import {
  DEFAULT_ALPHA_PARTICLES,
  DEFAULT_CAMERA_DISTANCE,
  DEFAULT_CAMERA_FOV,
  DEFAULT_DISABLE_ROTATION,
  DEFAULT_MOUSE_POSITION,
  DEFAULT_MOVE_PARTICLES_ON_HOVER,
  DEFAULT_PARTICLE_BASE_SIZE,
  DEFAULT_PARTICLE_COLORS,
  DEFAULT_PARTICLE_COUNT,
  DEFAULT_PARTICLE_HOVER_FACTOR,
  DEFAULT_PARTICLE_SPREAD,
  DEFAULT_SIZE_RANDOMNESS,
  DEFAULT_SPEED,
  ROTATION_AMPLITUDE,
  ROTATION_SPEED
} from './particles.constants';
import { fragmentShader, vertexShader } from './particles.shaders';
import { MousePosition } from './particles.types';
import {
  calculateMousePosition,
  cleanupWebGLResources,
  generateColorValues,
  generateRandomValues,
  generateSpherePositions,
  handleCanvasResize
} from './particles.utils';

/**
 * Hook for managing the Particles animation
 *
 * @param containerRef - Reference to the container element
 * @param particleCount - Number of particles to render
 * @param particleSpread - Spread factor for particle distribution
 * @param speed - Animation speed factor
 * @param particleColors - Colors for particles (hex format)
 * @param moveParticlesOnHover - Whether particles react to mouse position
 * @param particleHoverFactor - Strength of hover effect
 * @param alphaParticles - Whether particles have alpha transparency
 * @param particleBaseSize - Base size of particles
 * @param sizeRandomness - Randomness factor for particle sizes
 * @param cameraDistance - Distance of camera from particles
 * @param disableRotation - Whether to disable automatic rotation
 * @returns Cleanup function to handle component unmount
 */
export const useParticlesAnimation = (
  containerRef: React.RefObject<HTMLDivElement>,
  {
    particleCount = DEFAULT_PARTICLE_COUNT,
    particleSpread = DEFAULT_PARTICLE_SPREAD,
    speed = DEFAULT_SPEED,
    particleColors = DEFAULT_PARTICLE_COLORS,
    moveParticlesOnHover = DEFAULT_MOVE_PARTICLES_ON_HOVER,
    particleHoverFactor = DEFAULT_PARTICLE_HOVER_FACTOR,
    alphaParticles = DEFAULT_ALPHA_PARTICLES,
    particleBaseSize = DEFAULT_PARTICLE_BASE_SIZE,
    sizeRandomness = DEFAULT_SIZE_RANDOMNESS,
    cameraDistance = DEFAULT_CAMERA_DISTANCE,
    disableRotation = DEFAULT_DISABLE_ROTATION
  }
): void => {
  // Track mouse position for interactive effects
  const mouseRef = useRef<MousePosition>(DEFAULT_MOUSE_POSITION);

  // Setup WebGL renderer and animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize renderer with transparency
    const renderer = new Renderer({ depth: false, alpha: true });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    // Set up camera
    const camera = new Camera(gl, { fov: DEFAULT_CAMERA_FOV });
    camera.position.set(0, 0, cameraDistance);

    // Create resize handler
    const resize = () => handleCanvasResize(gl.canvas, renderer, camera);
    window.addEventListener('resize', resize, false);
    resize();

    // Handle mouse movement for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = calculateMousePosition(e, container);
    };

    if (moveParticlesOnHover) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    // Generate particle data
    const count = particleCount;
    const positions = generateSpherePositions(count);
    const randoms = generateRandomValues(count);
    const colors = generateColorValues(
      count,
      particleColors.length > 0 ? particleColors : DEFAULT_PARTICLE_COLORS
    );

    // Create geometry with attributes
    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors }
    });

    // Setup shader program with uniforms
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: alphaParticles ? 1 : 0 }
      },
      transparent: true,
      depthTest: false
    });

    // Create mesh with point rendering mode
    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    // Animation loop variables
    let animationFrameId: number;
    let lastTime = performance.now();
    let elapsed = 0;

    // Animation update function
    const update = (t: number) => {
      animationFrameId = requestAnimationFrame(update);
      const delta = t - lastTime;
      lastTime = t;
      elapsed += delta * speed;

      // Update time uniform for shader animations
      program.uniforms.uTime.value = elapsed * 0.001;

      // Apply mouse interaction if enabled
      if (moveParticlesOnHover) {
        particles.position.x = -mouseRef.current.x * particleHoverFactor;
        particles.position.y = -mouseRef.current.y * particleHoverFactor;
      } else {
        particles.position.x = 0;
        particles.position.y = 0;
      }

      // Apply rotation if enabled
      if (!disableRotation) {
        particles.rotation.x = Math.sin(elapsed * ROTATION_SPEED.x) * ROTATION_AMPLITUDE.x;
        particles.rotation.y = Math.cos(elapsed * ROTATION_SPEED.y) * ROTATION_AMPLITUDE.y;
        particles.rotation.z += ROTATION_SPEED.z * speed;
      }

      // Render the scene
      renderer.render({ scene: particles, camera });
    };

    // Start animation loop
    animationFrameId = requestAnimationFrame(update);

    // Cleanup function
    return () => {
      // Remove event listeners
      window.removeEventListener('resize', resize);
      if (moveParticlesOnHover) {
        container.removeEventListener('mousemove', handleMouseMove);
      }

      // Stop animation loop
      cancelAnimationFrame(animationFrameId);

      // Clean up WebGL resources
      cleanupWebGLResources(gl.canvas, container);
    };
  }, [
    containerRef,
    particleCount,
    particleSpread,
    speed,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
    particleColors
  ]);
};
