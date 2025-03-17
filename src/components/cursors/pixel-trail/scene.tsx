/**
 * Scene component for the Pixel Trail.
 */
import { useTrailTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { memo, useMemo } from 'react';
import * as THREE from 'three';
import type { SceneProps, UseTrailTextureReturn } from './pixel-trail.types';
import { DotMaterial, calculateMeshScale, configureTrailTexture } from './pixel-trail.utils';

/**
 * 3D scene containing the pixel trail effect.
 * This component handles the Three.js mesh and material setup.
 *
 * @param props - Component properties
 * @returns Scene React component
 */
export const Scene = memo(function Scene({
  gridSize,
  trailSize,
  maxAge,
  interpolate,
  easingFunction,
  pixelColor
}: SceneProps) {
  const size = useThree(s => s.size);
  const viewport = useThree(s => s.viewport);

  // Create the custom shader material
  const dotMaterial = useMemo(() => new DotMaterial(), []);
  dotMaterial.uniforms.pixelColor.value = new THREE.Color(pixelColor);

  // Create the trail texture and movement handler
  const [trail, onMove] = useTrailTexture({
    size: 512,
    radius: trailSize,
    maxAge: maxAge,
    interpolate: interpolate,
    ease: easingFunction
  }) as UseTrailTextureReturn;

  // Configure the trail texture for pixelated appearance
  configureTrailTexture(trail);

  // Calculate scale based on viewport dimensions
  const scale = calculateMeshScale(viewport.width, viewport.height);

  return (
    <mesh scale={[scale, scale, 1]} onPointerMove={onMove}>
      <planeGeometry args={[2, 2]} />
      <primitive
        object={dotMaterial}
        gridSize={gridSize}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        mouseTrail={trail}
      />
    </mesh>
  );
});

export default Scene;
