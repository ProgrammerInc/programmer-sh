/**
 * ASCII Art Component Types
 *
 * Type definitions for the ASCII Art component.
 */

/**
 * Props for the ASCIIArt component
 */
export interface ASCIIArtProps {
  /** ASCII art to display (if not provided, default Programmer.sh logo will be used) */
  art?: string[];

  /** Whether to trigger the welcome command after rendering */
  triggerWelcome?: boolean;

  /** Delay in milliseconds before triggering the welcome command */
  welcomeDelay?: number;

  /** Additional class names for the container */
  className?: string;
}
