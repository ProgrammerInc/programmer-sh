/**
 * Utility functions for the Sparkles animation component
 */

import { ANIMATION, DEFAULT_SPARKLES, INTERACTIVE_MODES } from './sparkles.constants';
import { SparklesProps } from './sparkles.types';

// Import tsparticles types correctly
type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P];
};

interface ISourceOptions {
  background?: object;
  fullScreen?: object;
  fpsLimit?: number;
  interactivity?: object;
  particles?: object;
  detectRetina?: boolean;
}

/**
 * Composes CSS class names dynamically
 *
 * @param {...string} classes - CSS class names to be combined
 * @returns {string} Combined class names string
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Generates particles configuration based on component props
 *
 * @param props - Sparkles component properties
 * @returns Particles configuration object
 */
export const generateParticlesConfig = ({
  background = DEFAULT_SPARKLES.BACKGROUND,
  minSize = DEFAULT_SPARKLES.MIN_SIZE,
  maxSize = DEFAULT_SPARKLES.MAX_SIZE,
  speed = DEFAULT_SPARKLES.SPEED,
  particleColor = DEFAULT_SPARKLES.PARTICLE_COLOR,
  particleDensity = DEFAULT_SPARKLES.PARTICLE_DENSITY
}: SparklesProps): RecursivePartial<ISourceOptions> => {
  return {
    background: {
      color: {
        value: background
      }
    },
    fullScreen: {
      enable: false,
      zIndex: 1
    },
    fpsLimit: DEFAULT_SPARKLES.FPS_LIMIT,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: INTERACTIVE_MODES.CLICK
        },
        onHover: {
          enable: false,
          mode: INTERACTIVE_MODES.HOVER
        },
        resize: true // Fixed 'any' type issue
      },
      modes: {
        push: {
          quantity: INTERACTIVE_MODES.PUSH_QUANTITY
        },
        repulse: {
          distance: INTERACTIVE_MODES.REPULSE_DISTANCE,
          duration: INTERACTIVE_MODES.REPULSE_DURATION
        }
      }
    },
    particles: {
      color: {
        value: particleColor,
        animation: {
          h: {
            enable: false,
            speed: 1
          },
          s: {
            enable: false,
            speed: 1
          },
          l: {
            enable: false,
            speed: 1
          }
        }
      },
      move: {
        enable: true,
        outModes: {
          default: ANIMATION.OUT_MODE
        },
        random: false,
        speed: {
          min: 0.1,
          max: 1
        },
        straight: false
      },
      number: {
        density: {
          enable: true,
          width: ANIMATION.DENSITY_WIDTH,
          height: ANIMATION.DENSITY_HEIGHT
        },
        value: particleDensity
      },
      opacity: {
        value: {
          min: 0.1,
          max: 1
        },
        animation: {
          enable: true,
          speed: speed,
          sync: false,
          startValue: 'random'
        }
      },
      shape: {
        type: 'circle'
      },
      size: {
        value: {
          min: minSize,
          max: maxSize
        },
        animation: {
          enable: false,
          speed: 5,
          sync: false,
          startValue: 'random'
        }
      }
    },
    detectRetina: true
  };
};
