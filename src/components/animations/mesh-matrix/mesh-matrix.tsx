'use client';

import { useVideoTexture } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three';
import {
  DEFAULT_CAMERA_FOV,
  DEFAULT_CAMERA_POSITION,
  DEFAULT_CLASS_NAME,
  DEFAULT_DISTORTION_INTENSITY,
  DEFAULT_MATERIAL_OPACITY,
  DEFAULT_MESH_COLOR,
  DEFAULT_MESH_DENSITY,
  DEFAULT_MESH_SCALE
} from './mesh-matrix.constants';
import { useDistortionEffect, useMeshGeometry } from './mesh-matrix.hooks';
import { MeshMatrixProps, VideoMeshProps } from './mesh-matrix.types';

/**
 * VideoMesh Component
 *
 * Internal component that renders a distorted video texture on a wireframe mesh
 * that reacts to mouse movement.
 *
 * @param props Component props
 * @returns A Three.js mesh with interactive distortion effect
 */
const VideoMesh: React.FC<VideoMeshProps> = ({
  videoSrc,
  meshColor,
  meshDensity,
  distortionIntensity
}) => {
  // Use custom hooks to manage the mesh and distortion effect
  const meshRef = useDistortionEffect(distortionIntensity);
  const geometry = useMeshGeometry(meshDensity);
  const texture = useVideoTexture(videoSrc);

  return (
    <mesh ref={meshRef} scale={DEFAULT_MESH_SCALE}>
      <primitive attach="geometry" object={geometry} />
      <meshBasicMaterial
        map={texture}
        wireframe
        color={meshColor}
        transparent
        opacity={DEFAULT_MATERIAL_OPACITY}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

/**
 * MeshMatrix Component
 *
 * A component that displays a video with an interactive wireframe mesh overlay
 * that distorts based on mouse movement, creating a dynamic 3D effect.
 *
 * @param props Component props
 * @returns A video element with an interactive three.js canvas overlay
 */
export const MeshMatrix: React.FC<MeshMatrixProps> = ({
  videoSrc,
  meshColor = DEFAULT_MESH_COLOR,
  meshDensity = DEFAULT_MESH_DENSITY,
  distortionIntensity = DEFAULT_DISTORTION_INTENSITY,
  className = DEFAULT_CLASS_NAME
}) => {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <Canvas
        camera={{ position: DEFAULT_CAMERA_POSITION, fov: DEFAULT_CAMERA_FOV }}
        style={{ position: 'absolute', zIndex: 10 }}
      >
        <VideoMesh
          videoSrc={videoSrc}
          meshColor={meshColor}
          meshDensity={meshDensity}
          distortionIntensity={distortionIntensity}
        />
      </Canvas>
      <video
        src={videoSrc}
        className="absolute inset-0 h-full w-full object-cover dark:opacity-80"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
};

// Add display name for better debugging
MeshMatrix.displayName = 'MeshMatrix';

export default MeshMatrix;
