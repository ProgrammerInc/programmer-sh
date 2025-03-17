/**
 * Spotlight Animation Component
 *
 * This module exports components that create a spotlight/glow effect with optional stars background.
 * It includes two variants:
 * - Spotlight: The original spotlight effect with SVG-based glow
 * - SpotlightEnhanced: An enhanced version with customizable animated gradient effects
 *
 * @module Spotlight
 */

export { Spotlight } from './spotlight';
export { Spotlight as SpotlightEnhanced, default } from './spotlight-new';
export * as SpotlightStyles from './spotlight.module.css';
export type { SpotlightNewProps, SpotlightProps } from './spotlight.types';
