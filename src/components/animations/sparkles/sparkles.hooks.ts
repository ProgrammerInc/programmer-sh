/**
 * Custom hooks for the Sparkles animation component
 */

import { Container } from '@tsparticles/engine';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useAnimation } from 'motion/react';
import { useEffect, useState } from 'react';

/**
 * Hook to initialize the particles engine
 *
 * @returns Object containing initialization state
 */
export const useParticlesInit = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    const initEngine = async () => {
      try {
        await initParticlesEngine(async engine => {
          await loadSlim(engine);
        });
        setInit(true);
      } catch (error) {
        console.error('Failed to initialize particles engine:', error);
      }
    };

    initEngine();
  }, []);

  return { init };
};

/**
 * Hook to handle animation controls and particles loading
 *
 * @returns Animation controls and particles loaded callback
 */
export const useParticlesAnimation = () => {
  const controls = useAnimation();

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      await controls.start({
        opacity: 1,
        transition: {
          duration: 1
        }
      });
    }
  };

  return { controls, particlesLoaded };
};
