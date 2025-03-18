'use client';

import { useGLTF, useTexture } from '@react-three/drei';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import {
  BallCollider,
  CuboidCollider,
  RigidBody,
  RigidBodyProps, 
  useRopeJoint,
  useSphericalJoint
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import cardGLB from '@/data/card.glb';
import lanyard from '@/data/lanyard.png';
import { BandProps, SegmentProps } from './lanyard.types';

// Extend the MeshLineGeometry type to include setPoints method
declare module 'three' {
  interface BufferGeometry {
    setPoints?: (points: THREE.Vector3[]) => void;
  }
}

/**
 * RigidBodyHandle is a type representing the RigidBody object with the methods we need.
 * This is the public API of RigidBody that we use.
 */
type RigidBodyHandle = {
  lerped?: THREE.Vector3;
  translation: () => THREE.Vector3;
  angvel: () => THREE.Vector3;
  rotation: () => THREE.Vector3;
  setAngvel: (vel: { x: number; y: number; z: number }) => void;
  wakeUp: () => void;
  setNextKinematicTranslation: (translation: { x: number; y: number; z: number }) => void;
};

/**
 * Band Component
 * 
 * A component that renders the physical lanyard strap with interactive physics.
 * 
 * @example
 * ```tsx
 * <Band maxSpeed={50} minSpeed={0} />
 * ```
 */
export const BandComponent: React.FC<BandProps> = ({ maxSpeed = 50, minSpeed = 0 }) => {
  // Refs for physics bodies
  const band = useRef<THREE.Mesh>(null);
  
  // Need to use 'any' for internal ref handling, but we'll type the usage properly
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fixed = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const j1 = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const j2 = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const j3 = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const card = useRef<any>(null);

  // Vectors for physics calculations
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  // Segment properties for rigid bodies
  const segmentProps: Omit<SegmentProps, 'type'> = {
    canSleep: true,
    colliders: 'cuboid', // Using a valid RigidBodyAutoCollider value
    angularDamping: 4,
    linearDamping: 4
  };

  // Load 3D models and textures
  const { nodes, materials } = useGLTF(cardGLB) as unknown as { 
    nodes: { card: THREE.Mesh; clip: THREE.Mesh; clamp: THREE.Mesh }; 
    materials: { base: THREE.MeshPhysicalMaterial; metal: THREE.MeshStandardMaterial };
  };
  const texture = useTexture(lanyard);
  
  // Create curve for the lanyard path
  const [curve] = useState<THREE.CatmullRomCurve3>(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3()
      ])
  );
  
  // State for drag interactions
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState<boolean>(false);

  // Responsive state for different screen sizes
  const [isSmall, setIsSmall] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = (): void => {
      setIsSmall(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  // Create physics joints between the segments - need to cast for proper typing
  // We need to use 'any' for the refs because the useRopeJoint and useSphericalJoint hooks
  // expect RigidBody refs but we're using a custom RigidBodyHandle type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useRopeJoint(fixed as any, j1 as any, [[0, 0, 0], [0, 0, 0], 1]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useRopeJoint(j1 as any, j2 as any, [[0, 0, 0], [0, 0, 0], 1]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useRopeJoint(j2 as any, j3 as any, [[0, 0, 0], [0, 0, 0], 1]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSphericalJoint(j3 as any, card as any, [
    [0, 0, 0],
    [0, 1.45, 0]
  ]);

  // Update cursor style based on hover and drag state
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  // Animation frame update
  useFrame((state, delta) => {
    // Handle dragging
    if (dragged && typeof dragged !== 'boolean') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      // Wake up all bodies and handle kinematic positioning
      [card, j1, j2, j3, fixed].forEach(ref => {
        if (ref.current) {
          const rb = ref.current as RigidBodyHandle;
          rb.wakeUp?.();
        }
      });
      
      if (card.current) {
        const cardBody = card.current as RigidBodyHandle;
        cardBody.setNextKinematicTranslation?.({ 
          x: vec.x - dragged.x,
          y: vec.y - dragged.y,
          z: vec.z - dragged.z
        });
      }
    }
    
    // Update physics simulation
    if (fixed.current) {
      // Handle lanyard movement
      [j1, j2].forEach(ref => {
        if (ref.current) {
          // Create lerped property safely
          const refBody = ref.current as RigidBodyHandle;
          if (!refBody.lerped) {
            refBody.lerped = new THREE.Vector3().copy(refBody.translation());
          }

          const clampedDistance = Math.max(
            0.1,
            Math.min(1, refBody.lerped.distanceTo(refBody.translation()))
          );
          refBody.lerped.lerp(
            refBody.translation(),
            delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
          );
        }
      });

      // Get RigidBody instances for type safety
      const fixedBody = fixed.current as RigidBodyHandle;
      const j1Body = j1.current as RigidBodyHandle;
      const j2Body = j2.current as RigidBodyHandle;
      const j3Body = j3.current as RigidBodyHandle;
      const cardBody = card.current as RigidBodyHandle;

      // Update curve points if all elements are available
      if (j3Body && j1Body?.lerped && j2Body?.lerped) {
        curve.points[0].copy(j3Body.translation());
        curve.points[1].copy(j2Body.lerped);
        curve.points[2].copy(j1Body.lerped);
        curve.points[3].copy(fixedBody.translation());
        
        // Update geometry for the band
        band.current?.geometry.setPoints?.(curve.getPoints(32));
      }
      
      // Apply rotational forces to the card if available
      if (cardBody) {
        ang.copy(cardBody.angvel());
        rot.copy(cardBody.rotation());
        cardBody.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
      }
    }
  });

  // Configure curve and texture
  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  // Handle pointer events without using DOM-specific methods
  const handlePointerUp = () => {
    drag(false);
  };

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (card.current) {
      const cardBody = card.current as RigidBodyHandle;
      const cardPosition = cardBody.translation();
      drag(new THREE.Vector3().copy(e.point).sub(vec.copy(cardPosition)));
    }
  };

  return (
    <>
      <group position={[0, 4, 0]}>
        {/* Fixed anchor point */}
        <RigidBody ref={fixed} type={'fixed'} {...segmentProps} />
        
        {/* Joint 1 */}
        <RigidBody
          position={[0.5, 0, 0]}
          ref={j1}
          type={'dynamic'}
          {...segmentProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        
        {/* Joint 2 */}
        <RigidBody
          position={[1, 0, 0]}
          ref={j2}
          type={'dynamic'}
          {...segmentProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        
        {/* Joint 3 */}
        <RigidBody
          position={[1.5, 0, 0]}
          ref={j3}
          type={'dynamic'}
          {...segmentProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        
        {/* Card */}
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
          {...segmentProps}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={handlePointerUp}
            onPointerDown={handlePointerDown}
          >
            {/* Card mesh */}
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            
            {/* Clip mesh */}
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            
            {/* Clamp mesh */}
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      
      {/* Band mesh */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isSmall ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
};

BandComponent.displayName = 'Band';

/**
 * Memoized Band Component
 */
export const Band = React.memo(BandComponent);
