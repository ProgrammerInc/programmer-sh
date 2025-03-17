/**
 * Type definitions for the Rotating Text animation component
 */
import { HTMLMotionProps } from 'framer-motion';

/**
 * Interface for the component ref methods
 */
export interface RotatingTextRef {
  /** Advances to the next text in the sequence */
  next: () => void;
  /** Goes back to the previous text in the sequence */
  previous: () => void;
  /** Jumps to a specific text index */
  jumpTo: (index: number) => void;
  /** Resets back to the first text */
  reset: () => void;
}

/**
 * Possible stagger origin points for animations
 */
export type StaggerFrom = 'first' | 'last' | 'center' | 'random' | number;

/**
 * Animation presence modes
 */
export type AnimatePresenceMode = 'sync' | 'wait';

/**
 * Text splitting strategies
 */
export type SplitBy = 'characters' | 'words' | 'lines' | string;

/**
 * Element structure after splitting text
 */
export interface TextElement {
  /** Array of characters or text segments */
  characters: string[];
  /** Whether space is needed after this element */
  needsSpace: boolean;
}

/**
 * Props for the Rotating Text component
 */
export interface RotatingTextProps extends Omit<HTMLMotionProps<'span'>, 'children'> {
  /** Array of text strings to rotate through */
  texts: string[];
  /** How AnimatePresence handles multiple children */
  animatePresenceMode?: AnimatePresenceMode;
  /** Whether AnimatePresence should animate on initial render */
  animatePresenceInitial?: boolean;
  /** Time in ms between text rotations when auto is true */
  rotationInterval?: number;
  /** Duration in ms between each staggered element */
  staggerDuration?: number;
  /** Where the stagger animation should originate from */
  staggerFrom?: StaggerFrom;
  /** Whether to loop back to the start after reaching the end */
  loop?: boolean;
  /** Whether to automatically rotate through texts */
  auto?: boolean;
  /** Strategy for splitting text into animated elements */
  splitBy?: SplitBy;
  /** Callback function when the text changes */
  onNext?: (index: number) => void;
  /** Class name for the main container */
  mainClassName?: string;
  /** Class name for the split level elements (words/lines) */
  splitLevelClassName?: string;
  /** Class name for the character level elements */
  elementLevelClassName?: string;
}
