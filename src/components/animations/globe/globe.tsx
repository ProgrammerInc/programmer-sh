'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { Fog, Object3D, PerspectiveCamera, Scene, Vector3 } from 'three';
import ThreeGlobe from 'three-globe';

import {
  AMBIENT_LIGHT_INTENSITY,
  ASPECT_RATIO,
  CAMERA_FAR,
  CAMERA_FOV,
  CAMERA_NEAR,
  CAMERA_Z,
  CLEAR_ALPHA,
  CLEAR_COLOR,
  DEFAULT_GLOBE_CONFIG,
  DIRECTIONAL_LEFT_LIGHT_POSITION,
  DIRECTIONAL_TOP_LIGHT_POSITION,
  FOG_FAR,
  FOG_NEAR,
  MAX_POLAR_ANGLE,
  MIN_POLAR_ANGLE,
  POINT_LIGHT_INTENSITY,
  POINT_LIGHT_POSITION
} from './globe.constants';
import { useGlobeObject } from './globe.hooks';
import { GlobeObjectProps, WorldProps } from './globe.types';

// Extend ThreeGlobe for JSX usage
export const ThreeGlobeComponent = React.forwardRef<ThreeGlobe>((props, ref) => {
  const localRef = useRef<ThreeGlobe>();

  useEffect(() => {
    if (ref && localRef.current) {
      if (typeof ref === 'function') {
        ref(localRef.current);
      } else {
        ref.current = localRef.current;
      }
    }
  }, [ref]);

  return <primitive object={new ThreeGlobe()} ref={localRef} {...props} />;
});
ThreeGlobeComponent.displayName = 'ThreeGlobeComponent';

/**
 * GlobeObject component for proper Three.js integration
 */
function GlobeObject({ properties }: GlobeObjectProps) {
  const objectRef = useRef<Object3D>(null);

  // Use custom hook to manage the globe object
  useGlobeObject(objectRef, properties);

  return <object3D ref={objectRef} />;
}

/**
 * Globe component that renders the interactive 3D globe visualization
 */
export function Globe({ globeConfig, data }: WorldProps) {
  const [error, setError] = useState<string | null>(null);

  // Merge default props with provided config
  const mergedConfig = {
    ...DEFAULT_GLOBE_CONFIG,
    ...globeConfig
  };

  return (
    <>
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white p-4 z-10">
          <p>{error}</p>
        </div>
      )}
      <GlobeObject properties={{ globeConfig: mergedConfig, data }} />
    </>
  );
}

/**
 * Component to configure the WebGL renderer
 */
export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    try {
      gl.setPixelRatio(window.devicePixelRatio);
      gl.setSize(size.width, size.height);
      gl.setClearColor(CLEAR_COLOR, CLEAR_ALPHA);
    } catch (err) {
      console.error('Error configuring WebGL renderer:', err);
    }
  }, [gl, size]);

  return null;
}

/**
 * Main World component that sets up the 3D scene and camera
 */
export function World(props: WorldProps) {
  const { globeConfig } = props;
  const [sceneError, setSceneError] = useState<string | null>(null);

  try {
    const scene = new Scene();
    scene.fog = new Fog(0xffffff, FOG_NEAR, FOG_FAR);

    return (
      <>
        {sceneError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white p-4 z-10">
            <p>{sceneError}</p>
          </div>
        )}
        <Canvas
          scene={scene}
          camera={new PerspectiveCamera(CAMERA_FOV, ASPECT_RATIO, CAMERA_NEAR, CAMERA_FAR)}
        >
          <WebGLRendererConfig />
          <ambientLight color={globeConfig.ambientLight} intensity={AMBIENT_LIGHT_INTENSITY} />
          <directionalLight
            color={globeConfig.directionalLeftLight}
            position={new Vector3(...DIRECTIONAL_LEFT_LIGHT_POSITION)}
          />
          <directionalLight
            color={globeConfig.directionalTopLight}
            position={new Vector3(...DIRECTIONAL_TOP_LIGHT_POSITION)}
          />
          <pointLight
            color={globeConfig.pointLight}
            position={new Vector3(...POINT_LIGHT_POSITION)}
            intensity={POINT_LIGHT_INTENSITY}
          />
          <Globe {...props} />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minDistance={CAMERA_Z}
            maxDistance={CAMERA_Z}
            autoRotateSpeed={globeConfig.autoRotateSpeed || DEFAULT_GLOBE_CONFIG.autoRotateSpeed}
            autoRotate={
              globeConfig.autoRotate !== undefined
                ? globeConfig.autoRotate
                : DEFAULT_GLOBE_CONFIG.autoRotate
            }
            minPolarAngle={MIN_POLAR_ANGLE}
            maxPolarAngle={MAX_POLAR_ANGLE}
          />
        </Canvas>
      </>
    );
  } catch (err) {
    console.error('Error creating 3D scene:', err);
    setSceneError('Failed to create 3D visualization');
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white p-4">
        <p>Failed to create 3D visualization</p>
      </div>
    );
  }
}

export default World;
