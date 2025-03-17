/**
 * Hooks for the Mesh Matrix animation component
 */

import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { BufferGeometry, Mesh } from 'three';
import { DEFAULT_MAX_MOUSE_DISTANCE } from './mesh-matrix.constants';
import { MeshRefType } from './mesh-matrix.types';
import { createMeshGeometry, updateMeshVertices } from './mesh-matrix.utils';

/**
 * Hook for creating and managing the mesh geometry
 *
 * @param meshDensity - Density of the mesh grid
 * @returns The created geometry
 */
export function useMeshGeometry(meshDensity: number) {
  const { viewport } = useThree();

  return createMeshGeometry(viewport.width, viewport.height, meshDensity);
}

/**
 * Hook that manages the mesh distortion effect
 *
 * @param distortionIntensity - Intensity of the distortion effect
 * @returns Ref to attach to the mesh
 */
export function useDistortionEffect(distortionIntensity: number): MeshRefType {
  const meshRef = useRef<Mesh>(null);
  const { viewport, mouse } = useThree();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    // Cast to BufferGeometry to access position attribute
    const geometry = meshRef.current.geometry as BufferGeometry;

    // Scale mouse coordinates to viewport dimensions
    const scaledMouseX = (mouse.x * viewport.width) / 2;
    const scaledMouseY = (mouse.y * viewport.height) / 2;

    // Get current time for wave animation
    const time = clock.getElapsedTime();

    // Update mesh vertices based on mouse position and time
    updateMeshVertices(
      geometry,
      scaledMouseX,
      scaledMouseY,
      time,
      distortionIntensity,
      DEFAULT_MAX_MOUSE_DISTANCE
    );
  });

  return meshRef;
}
