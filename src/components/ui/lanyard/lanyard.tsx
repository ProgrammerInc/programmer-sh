'use client';

import { Environment, Lightformer } from '@react-three/drei';
import { Canvas, extend } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as React from 'react';

import { Band } from './lanyard-band.component';
import styles from './lanyard.module.css';
import { LanyardProps } from './lanyard.types';
import { LANYARD_DEFAULTS, createLanyardEnvironment, setupRenderer } from './lanyard.utils';

// Extend Three.js with custom geometry and material classes
extend({ MeshLineGeometry, MeshLineMaterial });

/**
 * Lanyard Component
 *
 * A 3D interactive lanyard card that swings with physics simulation.
 * The card can be grabbed, dragged, and swings realistically with physics.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Lanyard />
 *
 * // With custom settings
 * <Lanyard
 *   position={[0, 0, 35]}
 *   gravity={[0, -30, 0]}
 *   fov={25}
 *   transparent={false}
 * />
 * ```
 */
export const LanyardComponent: React.FC<LanyardProps> = ({
  position = LANYARD_DEFAULTS.POSITION,
  gravity = LANYARD_DEFAULTS.GRAVITY,
  fov = LANYARD_DEFAULTS.FOV,
  transparent = LANYARD_DEFAULTS.TRANSPARENT
}) => {
  // Get environment lighting configuration
  const environmentLights = createLanyardEnvironment();

  return (
    <div className={styles['lanyard-container']}>
      <Canvas
        camera={{ position, fov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => setupRenderer(gl, transparent)}
      >
        {/* Scene lighting */}
        <ambientLight intensity={Math.PI} />

        {/* Physics simulation */}
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band />
        </Physics>

        {/* Environment lighting */}
        <Environment blur={0.75}>
          {environmentLights.map((light, index) => (
            <Lightformer
              key={index}
              intensity={light.intensity}
              color={light.color}
              position={light.position as unknown as [number, number, number]}
              rotation={light.rotation as unknown as [number, number, number]}
              scale={light.scale as unknown as [number, number, number]}
            />
          ))}
        </Environment>
      </Canvas>
    </div>
  );
};

LanyardComponent.displayName = 'Lanyard';

/**
 * Memoized Lanyard Component
 */
export const Lanyard = React.memo(LanyardComponent);

export default Lanyard;
