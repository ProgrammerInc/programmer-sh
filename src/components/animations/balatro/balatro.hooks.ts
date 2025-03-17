/**
 * Custom hooks for the Balatro component
 */

import { Program, Renderer } from 'ogl';
import { useCallback, useMemo } from 'react';
import { CSS_CLASSES, DEFAULT_ANIMATION, DEFAULT_COLORS } from './balatro.constants';
import styles from './balatro.module.css';
import { BalatroProps } from './balatro.types';
import { hexToVec4 } from './balatro.utils';

/**
 * Hook to generate container class name with proper composition
 *
 * @returns Container class name string
 */
export function useContainerClassName(): string {
  return useMemo(() => styles[CSS_CLASSES.container], []);
}

/**
 * Hook to manage mouse movement for WebGL animation
 *
 * @param mouseInteraction - Whether mouse interaction is enabled
 * @returns Callback function for mouse movement handling
 */
export function useMouseMoveHandler(mouseInteraction = true) {
  return useCallback(
    (e: MouseEvent, container: HTMLDivElement, program: Program) => {
      if (!mouseInteraction) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      program.uniforms.uMouse.value = [x, y];
    },
    [mouseInteraction]
  );
}

/**
 * Hook to handle WebGL canvas resizing
 *
 * @returns Callback function for resize handling
 */
export function useResizeHandler() {
  return useCallback((container: HTMLDivElement, renderer: Renderer, program: Program) => {
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    const gl = renderer.gl;
    if (program) {
      program.uniforms.iResolution.value = [
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height
      ];
    }
  }, []);
}

/**
 * Hook to prepare uniform values for the shader program
 *
 * @param props - Balatro component properties
 * @returns Uniform configuration object
 */
export function useShaderUniforms(props: BalatroProps) {
  const {
    spinRotation = DEFAULT_ANIMATION.spinRotation,
    spinSpeed = DEFAULT_ANIMATION.spinSpeed,
    offset = DEFAULT_ANIMATION.offset,
    color1 = DEFAULT_COLORS.primary,
    color2 = DEFAULT_COLORS.secondary,
    color3 = DEFAULT_COLORS.tertiary,
    contrast = DEFAULT_ANIMATION.contrast,
    lighting = DEFAULT_ANIMATION.lighting,
    spinAmount = DEFAULT_ANIMATION.spinAmount,
    pixelFilter = DEFAULT_ANIMATION.pixelFilter,
    spinEase = DEFAULT_ANIMATION.spinEase,
    isRotate = DEFAULT_ANIMATION.isRotate
  } = props;

  return useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: [0, 0, 0] },
      uSpinRotation: { value: spinRotation },
      uSpinSpeed: { value: spinSpeed },
      uOffset: { value: offset },
      uColor1: { value: hexToVec4(color1) },
      uColor2: { value: hexToVec4(color2) },
      uColor3: { value: hexToVec4(color3) },
      uContrast: { value: contrast },
      uLighting: { value: lighting },
      uSpinAmount: { value: spinAmount },
      uPixelFilter: { value: pixelFilter },
      uSpinEase: { value: spinEase },
      uIsRotate: { value: isRotate },
      uMouse: { value: [0.5, 0.5] }
    }),
    [
      spinRotation,
      spinSpeed,
      offset,
      color1,
      color2,
      color3,
      contrast,
      lighting,
      spinAmount,
      pixelFilter,
      spinEase,
      isRotate
    ]
  );
}

/**
 * Hook that memoizes the aria label for the component
 *
 * @returns Accessibility aria label
 */
export function useAccessibilityLabel() {
  return useMemo(() => 'Abstract colorful Balatro-inspired animation', []);
}
