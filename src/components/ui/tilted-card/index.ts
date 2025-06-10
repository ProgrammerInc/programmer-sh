'use client';

/**
 * TiltedCard Component
 *
 * A card component with interactive 3D tilt effect based on mouse position.
 * The card responds to mouse movement by tilting in the direction of the cursor
 * and provides visual feedback through rotation, scaling, and optional tooltip.
 *
 * Features:
 * - Interactive 3D rotation effect based on mouse position
 * - Smooth animations with configurable parameters
 * - Optional tooltip with customizable text
 * - Responsive design with mobile device warning
 * - Support for overlay content
 * - Configurable dimensions and appearance
 * - Accessible with proper alt text support
 *
 * @example
 * ```tsx
 * // Basic usage
 * <TiltedCard
 *   imageSrc="/path/to/image.jpg"
 *   altText="Description of the image"
 * />
 * ```
 */
import { TiltedCard } from './tilted-card';

export * from './tilted-card';
export * from './tilted-card.types';

export default TiltedCard;
