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
export const LazyGlobe = createLazyComponent(
  () => import('@/components/animations/globe/globe.tsx')
);

export const LazyHyperspeed = createLazyComponent(
  () =>
    import(
      /* webpackChunkName: "hyperspeed-animation" */ '../components/animations/hyperspeed/hyperspeed.tsx'
    )
);

export const LazyCosmicScene = createLazyComponent(
  () => import('@/components/animations/cosmic-scene/cosmic-scene.tsx')
);

export const LazyMeshMatrix = createLazyComponent(
  () => import('@/components/animations/mesh-matrix/mesh-matrix.tsx')
);

export const LazyGridDistortion = createLazyComponent(
  () => import('@/components/animations/grid-distortion/grid-distortion.tsx')
);

export const LazyMetalBalls = createLazyComponent(
  () => import('@/components/animations/meta-balls/meta-balls.tsx')
);

// Complex CPU-intensive animations
export const LazyParticles = createLazyComponent(
  () => import('@/components/animations/particles/particles.tsx')
);

export const LazyParticleNetwork = createLazyComponent(
  () => import('@/components/animations/particle-network/particle-network.tsx')
);

export const LazyAuroraBackground = createLazyComponent(
  () =>
    import(
      /* webpackChunkName: "aurora-background-animation" */ '@/components/animations/aurora-background/aurora-background.tsx'
    )
);

export const LazyAuroraCanvas = createLazyComponent(
  () => import('@/components/animations/aurora-canvas/aurora-canvas.tsx')
);

export const LazyBackgroundBeams = createLazyComponent(
  () => import('@/components/animations/background-beams/background-beams.tsx')
);

export const LazyBackgroundBoxes = createLazyComponent(
  () => import('@/components/animations/background-boxes/background-boxes.tsx')
);

export const LazyBallpit = createLazyComponent(
  () =>
    import(
      /* webpackChunkName: "ballpit-animation" */ '@/components/animations/ballpit/ballpit.tsx'
    )
);

export const LazyCrazyBallpit = createLazyComponent(
  () =>
    import(
      /* webpackChunkName: "crazy-ballpit-animation" */ '@/components/animations/crazy-ballpit/ballpit.tsx'
    )
);

export const LazyMeteors = createLazyComponent(
  () => import('@/components/animations/meteors/meteors.tsx')
);

export const LazyParticleVeil = createLazyComponent(
  () => import('@/components/animations/particle-veil/particle-veil.tsx')
);

export const LazyVortex = createLazyComponent(
  () => import('@/components/animations/vortex/vortex.tsx')
);

// Shared loading component for animation fallbacks
export const AnimationLoader = () => (
  <div className="flex h-full w-full items-center justify-center bg-black/5 backdrop-blur-sm">
    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-purple-500"></div>
  </div>
);
