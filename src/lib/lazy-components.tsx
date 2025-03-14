import { ComponentType, lazy } from 'react';

// Utility for lazily loading heavy animation components
// This follows the same pattern we established with magnetic-lines using CSS variables
// and external CSS files for better performance

const createLazyComponent = <T extends object>(
  importFunc: () => Promise<{ default: ComponentType<T> }>
) => {
  const LazyComponent = lazy(importFunc);
  return LazyComponent;
};

// Heavy Three.js animations
export const LazyGlobe = createLazyComponent(() => import('@/components/animations/globe/globe'));

export const LazyHyperspeed = createLazyComponent(
  () => import('@/components/animations/hyperspeed/hyperspeed')
);

export const LazyCosmicScene = createLazyComponent(
  () => import('@/components/animations/cosmic-scene/cosmic-scene')
);

export const LazyMeshMatrix = createLazyComponent(
  () => import('@/components/animations/mesh-matrix/mesh-matrix')
);

export const LazyGridDistortion = createLazyComponent(
  () => import('@/components/animations/grid-distortion/grid-distortion')
);

export const LazyMetalBalls = createLazyComponent(
  () => import('@/components/animations/meta-balls/meta-balls')
);

// Complex CPU-intensive animations
export const LazyParticles = createLazyComponent(
  () => import('@/components/animations/particles/particles')
);

export const LazyParticleNetwork = createLazyComponent(
  () => import('@/components/animations/particle-network/particle-network')
);

export const LazyAuroraBackground = createLazyComponent(
  () => import('@/components/animations/aurora-background/aurora-background')
);

export const LazyAuroraCanvas = createLazyComponent(
  () => import('@/components/animations/aurora-canvas/aurora-canvas')
);

export const LazyBackgroundBeams = createLazyComponent(
  () => import('@/components/animations/background-beams/background-beams')
);

export const LazyBackgroundBoxes = createLazyComponent(
  () => import('@/components/animations/background-boxes/background-boxes')
);

export const LazyBallpit = createLazyComponent(
  () => import('@/components/animations/ballpit/ballpit')
);

export const LazyMeteors = createLazyComponent(
  () => import('@/components/animations/meteors/meteors')
);

export const LazyParticleVeil = createLazyComponent(
  () => import('@/components/animations/particle-veil/particle-veil')
);

export const LazyVortex = createLazyComponent(
  () => import('@/components/animations/vortex/vortex')
);

// Shared loading component for animation fallbacks
export const AnimationLoader = () => (
  <div className="flex h-full w-full items-center justify-center bg-black/5 backdrop-blur-sm">
    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-purple-500"></div>
  </div>
);
