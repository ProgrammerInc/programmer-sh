/**
 * Custom hooks for the Dither component
 */

import { ThreeEvent } from '@react-three/fiber';
import { Effect } from 'postprocessing';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { DEFAULT_RETRO_EFFECT_UNIFORMS, DITHER_FRAGMENT_SHADER } from './dither.constants';
import { MousePosition, WaveUniforms } from './dither.types';

/**
 * RetroEffect implementation for dithering and pixelation
 */
export class RetroEffectImpl extends Effect {
  declare public uniforms: Map<string, THREE.Uniform<number>>;

  constructor() {
    const uniforms = new Map<string, THREE.Uniform<number>>([
      ['colorNum', new THREE.Uniform(DEFAULT_RETRO_EFFECT_UNIFORMS.colorNum)],
      ['pixelSize', new THREE.Uniform(DEFAULT_RETRO_EFFECT_UNIFORMS.pixelSize)]
    ]);
    super('RetroEffect', DITHER_FRAGMENT_SHADER, { uniforms });
    this.uniforms = uniforms;
  }

  set colorNum(value: number) {
    this.uniforms.get('colorNum')!.value = value;
  }

  get colorNum(): number {
    return this.uniforms.get('colorNum')!.value;
  }

  set pixelSize(value: number) {
    this.uniforms.get('pixelSize')!.value = value;
  }

  get pixelSize(): number {
    return this.uniforms.get('pixelSize')!.value;
  }
}

/**
 * Hook for managing mouse position state
 *
 * @param enableMouseInteraction Whether mouse interaction is enabled
 * @returns Mouse position state and update handler
 */
export const useMousePosition = (enableMouseInteraction: boolean) => {
  const [mousePos, setMousePos] = useState<MousePosition>({
    x: 0,
    y: 0
  });

  const handlePointerMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (enableMouseInteraction) {
        setMousePos({ x: e.pageX, y: e.pageY });
      }
    },
    [enableMouseInteraction]
  );

  return { mousePos, setMousePos, handlePointerMove };
};

/**
 * Hook for creating and managing shader uniforms
 *
 * @param params Configuration parameters for the shader
 * @returns Uniforms object for the shader
 */
export const useShaderUniforms = ({
  size,
  waveSpeed,
  waveFrequency,
  waveAmplitude,
  waveColor,
  mousePos,
  enableMouseInteraction,
  mouseRadius
}: {
  size: { width: number; height: number };
  waveSpeed: number;
  waveFrequency: number;
  waveAmplitude: number;
  waveColor: [number, number, number];
  mousePos: MousePosition;
  enableMouseInteraction: boolean;
  mouseRadius: number;
}) => {
  return useMemo<WaveUniforms>(() => {
    return {
      time: new THREE.Uniform(0),
      resolution: new THREE.Uniform(new THREE.Vector2(size.width, size.height)),
      waveSpeed: new THREE.Uniform(waveSpeed),
      waveFrequency: new THREE.Uniform(waveFrequency),
      waveAmplitude: new THREE.Uniform(waveAmplitude),
      waveColor: new THREE.Uniform(new THREE.Color(...waveColor)),
      mousePos: new THREE.Uniform(new THREE.Vector2(mousePos.x, mousePos.y)),
      enableMouseInteraction: new THREE.Uniform(enableMouseInteraction ? 1 : 0),
      mouseRadius: new THREE.Uniform(mouseRadius)
    };
  }, [
    size,
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    waveColor,
    mousePos,
    enableMouseInteraction,
    mouseRadius
  ]);
};

/**
 * Hook for managing shader material
 *
 * @param vertexShader Vertex shader code
 * @param fragmentShader Fragment shader code
 * @param uniforms Shader uniforms
 * @returns THREE.ShaderMaterial instance
 */
export const useShaderMaterial = (
  vertexShader: string,
  fragmentShader: string,
  uniforms: WaveUniforms
) => {
  return useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms
    });
  }, [vertexShader, fragmentShader, uniforms]);
};

/**
 * Hook for managing RetroEffect settings
 *
 * @param effectRef Reference to the RetroEffect instance
 * @param colorNum Number of colors for dithering
 * @param pixelSize Size of pixels for pixelation
 */
export const useRetroEffect = (
  effectRef: React.RefObject<RetroEffectImpl>,
  colorNum: number,
  pixelSize: number
) => {
  useEffect(() => {
    if (effectRef.current) {
      effectRef.current.colorNum = colorNum;
      effectRef.current.pixelSize = pixelSize;
    }
  }, [effectRef, colorNum, pixelSize]);
};

/**
 * Hook for managing resolution updates
 *
 * @param uniforms Shader uniforms
 * @param size Canvas size
 */
export const useResolutionUpdate = (
  uniforms: WaveUniforms,
  size: { width: number; height: number }
) => {
  useEffect(() => {
    if (uniforms.resolution) {
      uniforms.resolution.value.set(size.width, size.height);
    }
  }, [size, uniforms]);
};
