/**
 * Type definitions for the Sparkles animation component
 */

import { Container } from '@tsparticles/engine';

/**
 * Props for the Sparkles component
 *
 * @property {string} id - Optional custom ID for the particles container
 * @property {string} className - Additional CSS class names
 * @property {string} background - Background color for the particles container
 * @property {number} particleSize - Size of particles (deprecated in favor of minSize/maxSize)
 * @property {number} minSize - Minimum size of particles
 * @property {number} maxSize - Maximum size of particles
 * @property {number} speed - Animation speed of particles
 * @property {string} particleColor - Color of particles
 * @property {number} particleDensity - Number of particles to display
 */
export interface SparklesProps {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
}

/**
 * Container loaded callback type
 *
 * @param container - The particles container
 * @returns Promise that resolves when handling is complete
 */
export type ParticlesLoadedCallback = (container?: Container) => Promise<void>;
