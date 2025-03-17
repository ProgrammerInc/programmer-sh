/**
 * Custom hooks for the ShapeBlur animation component
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { DEFAULT_SHAPE_BLUR, FRAGMENT_SHADER, VERTEX_SHADER } from './shape-blur.constants';
import { ShapeBlurAnimation } from './shape-blur.types';
import { dampMousePosition, resizeRenderer } from './shape-blur.utils';

/**
 * Hook to create and manage the ShapeBlur WebGL animation
 *
 * @param {HTMLDivElement | null} container - The DOM container for the WebGL canvas
 * @param {object} props - Configuration props for the shader
 * @param {number} props.variation - Shape variation (0-3)
 * @param {number} props.pixelRatioProp - Custom pixel ratio
 * @param {number} props.shapeSize - Size of the shape
 * @param {number} props.roundness - Corner roundness for rounded rectangle
 * @param {number} props.borderSize - Border size
 * @param {number} props.circleSize - Interactive circle size
 * @param {number} props.circleEdge - Circle edge softness
 * @param {ShapeBlurAnimation} animation - Animation settings
 * @returns {void}
 */
export const useShapeBlur = (
  container: HTMLDivElement | null,
  {
    variation = DEFAULT_SHAPE_BLUR.VARIATION,
    pixelRatioProp = DEFAULT_SHAPE_BLUR.PIXEL_RATIO,
    shapeSize = DEFAULT_SHAPE_BLUR.SHAPE_SIZE,
    roundness = DEFAULT_SHAPE_BLUR.ROUNDNESS,
    borderSize = DEFAULT_SHAPE_BLUR.BORDER_SIZE,
    circleSize = DEFAULT_SHAPE_BLUR.CIRCLE_SIZE,
    circleEdge = DEFAULT_SHAPE_BLUR.CIRCLE_EDGE
  },
  animation: ShapeBlurAnimation = { damping: DEFAULT_SHAPE_BLUR.DAMPING }
): void => {
  // Store animation state between renders
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const quadRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  // Mouse tracking vectors
  const vMouseRef = useRef(new THREE.Vector2());
  const vMouseDampRef = useRef(new THREE.Vector2());
  const vResolutionRef = useRef(new THREE.Vector2());

  // Animation timing
  const timeRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!container) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera();
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create geometry and shader material
    const geo = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        u_mouse: { value: vMouseDampRef.current },
        u_resolution: { value: vResolutionRef.current },
        u_pixelRatio: { value: pixelRatioProp },
        u_shapeSize: { value: shapeSize },
        u_roundness: { value: roundness },
        u_borderSize: { value: borderSize },
        u_circleSize: { value: circleSize },
        u_circleEdge: { value: circleEdge }
      },
      defines: { VAR: variation },
      transparent: true
    });

    const quad = new THREE.Mesh(geo, material);
    scene.add(quad);

    // Store references
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    quadRef.current = quad;
    materialRef.current = material;

    // Handle pointer movement
    const onPointerMove = (e: PointerEvent | MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      vMouseRef.current.set(e.clientX - rect.left, e.clientY - rect.top);
    };

    // Add event listeners
    document.addEventListener('mousemove', onPointerMove);
    document.addEventListener('pointermove', onPointerMove);

    // Handle resizing
    const resize = () => {
      if (
        !container ||
        !rendererRef.current ||
        !cameraRef.current ||
        !quadRef.current ||
        !materialRef.current
      )
        return;

      resizeRenderer(
        rendererRef.current,
        cameraRef.current,
        quadRef.current,
        vResolutionRef.current,
        container,
        pixelRatioProp
      );

      if (materialRef.current.uniforms.u_pixelRatio) {
        materialRef.current.uniforms.u_pixelRatio.value = Math.min(
          window.devicePixelRatio || 1,
          pixelRatioProp
        );
      }
    };

    // Initialize size
    resize();
    window.addEventListener('resize', resize);

    // Create ResizeObserver for container size changes
    const ro = new ResizeObserver(() => resize());
    ro.observe(container);
    resizeObserverRef.current = ro;

    // Animation loop
    const update = () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

      timeRef.current = performance.now() * 0.001;
      const dt = timeRef.current - lastTimeRef.current;
      lastTimeRef.current = timeRef.current;

      // Apply smooth damping to mouse position
      dampMousePosition(vMouseDampRef.current, vMouseRef.current, animation.damping, dt);

      // Render scene
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    // Start animation loop
    update();

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('pointermove', onPointerMove);

      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }

      if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }

      if (quadRef.current && quadRef.current.geometry) {
        quadRef.current.geometry.dispose();
      }

      if (materialRef.current) {
        materialRef.current.dispose();
      }
    };
  }, [
    container,
    variation,
    pixelRatioProp,
    shapeSize,
    roundness,
    borderSize,
    circleSize,
    circleEdge,
    animation.damping
  ]);
};
