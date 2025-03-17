'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, wrapEffect } from '@react-three/postprocessing';
import { memo, useRef } from 'react';
import * as THREE from 'three';
import { WAVE_FRAGMENT_SHADER, WAVE_VERTEX_SHADER } from './dither.constants';
import {
  RetroEffectImpl,
  useMousePosition,
  useResolutionUpdate,
  useRetroEffect,
  useShaderMaterial,
  useShaderUniforms
} from './dither.hooks';
import { DitheredWavesProps } from './dither.types';

/**
 * Wrapped RetroEffect component for React integration
 */
const RetroEffect = wrapEffect(RetroEffectImpl) as React.ForwardRefExoticComponent<
  React.RefAttributes<RetroEffectImpl>
>;

/**
 * DitheredWaves component that renders the wave effect with dithering
 *
 * @param props Component properties
 * @returns Memoized React component with dithered wave effect
 */
const DitheredWaves = memo(function DitheredWaves({
  waveSpeed,
  waveFrequency,
  waveAmplitude,
  waveColor,
  colorNum,
  pixelSize,
  disableAnimation,
  enableMouseInteraction,
  mouseRadius
}: DitheredWavesProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const effect = useRef<RetroEffectImpl>(null);
  const { size } = useThree();

  // Custom hooks for state and behavior management
  const { mousePos, handlePointerMove } = useMousePosition(enableMouseInteraction);

  const uniforms = useShaderUniforms({
    size,
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    waveColor,
    mousePos,
    enableMouseInteraction,
    mouseRadius
  });

  // Apply shader material with the defined uniforms
  const shaderMaterial = useShaderMaterial(WAVE_VERTEX_SHADER, WAVE_FRAGMENT_SHADER, uniforms);

  // Hooks for managing effects and updates
  useRetroEffect(effect, colorNum, pixelSize);
  useResolutionUpdate(uniforms, size);

  // Animation frame logic
  useFrame((_, delta) => {
    if (!disableAnimation && uniforms.time) {
      uniforms.time.value += delta * 0.5;
    }

    // Only update mouse position uniforms when they've changed
    if (enableMouseInteraction && uniforms.mousePos) {
      uniforms.mousePos.value.set(mousePos.x, mousePos.y);
    }
  });

  return (
    <>
      <mesh ref={mesh} onPointerMove={handlePointerMove}>
        <planeGeometry args={[2, 2]} />
        <primitive object={shaderMaterial} attach="material" />
      </mesh>
      <EffectComposer>
        <RetroEffect ref={effect} />
      </EffectComposer>
    </>
  );
});

export default DitheredWaves;
