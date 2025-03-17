/**
 * Type definitions for the ShinyText animation component
 *
 * The ShinyText component creates an animated text with a shiny effect
 * that moves across the text to create a sleek, polished appearance.
 */

/**
 * Props for the ShinyText component
 *
 * @property {string} text - The text content to display with the shiny effect
 * @property {boolean} disabled - Whether the animation is disabled
 * @property {number} speed - Animation speed in seconds (lower is faster)
 * @property {string} className - Additional CSS class names
 */
export interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}
