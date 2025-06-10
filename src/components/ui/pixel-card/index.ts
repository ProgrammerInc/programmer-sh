/**
 * Pixel Card Component
 *
 * A card component with animated pixel effects that appear on hover or focus.
 *
 * The PixelCard component provides a visually engaging card with animated pixel
 * effects using HTML Canvas. The animation shows colorful pixels that appear,
 * shimmer, and disappear based on user interaction.
 *
 * Features:
 * - Multiple color scheme variants (default, blue, yellow, pink)
 * - Customizable animation speed and density
 * - Respects user's reduced motion preferences
 * - Accessible focus interactions
 *
 * @example
 * ```tsx
 * <PixelCard>
 *   <h3>My Card Title</h3>
 *   <p>Content inside the animated card</p>
 * </PixelCard>
 *
 * <PixelCard variant="blue" gap={10} speed={0.2}>
 *   <div>Custom configuration</div>
 * </PixelCard>
 * ```
 */

// Export components and types
export * from './pixel-card';
export * from './pixel-card.types';
export * from './pixel.class';

// For backwards compatibility
import PixelCard from './pixel-card';
export default PixelCard;
