'use client';

import { useVideoTexture } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import type { BufferGeometry, Mesh } from 'three';
import * as THREE from 'three';

interface MeshProps {
  videoSrc: string;
  meshColor: string;
  meshDensity: number;
  distortionIntensity: number;
}

function VideoMesh({ videoSrc, meshColor, meshDensity, distortionIntensity }: MeshProps) {
  const meshRef = useRef<Mesh>(null);
  const { viewport, mouse } = useThree();
  const texture = useVideoTexture(videoSrc);

  const geometry = new THREE.PlaneGeometry(
    viewport.width,
    viewport.height,
    meshDensity,
    meshDensity
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const positions = (meshRef.current.geometry as BufferGeometry).attributes.position
      .array as Float32Array;

    const scaledMouseX = (mouse.x * viewport.width) / 2;
    const scaledMouseY = (mouse.y * viewport.height) / 2;
    const time = clock.getElapsedTime();

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];

      const distance = Math.sqrt(Math.pow(x - scaledMouseX, 2) + Math.pow(y - scaledMouseY, 2));

      const baseWave = Math.sin(distance * 0.3 + time) * 0.1;
      const mouseInfluence = Math.max(0, 1 - distance / 2);
      const distortion = mouseInfluence * distortionIntensity;

      positions[i + 2] = baseWave + distortion * Math.sin(distance - time);
    }

    (meshRef.current.geometry as BufferGeometry).attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} scale={[1, 1, 1]}>
      <primitive attach="geometry" object={geometry} />
      <meshBasicMaterial
        map={texture}
        wireframe
        color={meshColor}
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export interface MeshMatrixProps {
  videoSrc: string;
  meshColor?: string;
  meshDensity?: number;
  distortionIntensity?: number;
  className?: string;
}

export function MeshMatrix({
  videoSrc,
  meshColor = '#ffffff',
  meshDensity = 30,
  distortionIntensity = 0.5,
  className = ''
}: MeshMatrixProps) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
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
}

export default MeshMatrix;
