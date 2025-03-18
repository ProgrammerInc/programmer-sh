/**
 * Stack Component
 *
 * An interactive stack of cards with drag-and-drop capability and 3D rotation effects.
 * Built with Framer Motion for smooth animations and interactions.
 *
 * Features:
 * - Draggable cards with 3D rotation based on drag position
 * - Send cards to the back of the stack by dragging or clicking
 * - Configurable card dimensions and animation properties
 * - Optional random rotation for a more natural appearance
 * - Customizable sensitivity for drag interactions
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Stack />
 *
 * // With custom configuration
 * <Stack
 *   randomRotation={true}
 *   sensitivity={150}
 *   cardDimensions={{ width: 300, height: 200 }}
 *   sendToBackOnClick={true}
 * />
 *
 * // With custom cards data
 * <Stack
 *   cardsData={[
 *     { id: 1, img: '/image1.jpg' },
 *     { id: 2, img: '/image2.jpg' },
 *   ]}
 * />
 * ```
 */

export * from './stack';
export * from './stack.types';

// For backwards compatibility
import Stack from './stack';
export default Stack;
