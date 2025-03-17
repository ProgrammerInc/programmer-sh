/**
 * Trigger types for the animation effect
 */
export enum TriggerType {
  /** Start automatically when component mounts */
  Auto = 'auto',
  /** Start when the component scrolls into view */
  Scroll = 'scroll',
  /** Start when the component is clicked */
  Click = 'click',
  /** Start when the component is hovered */
  Hover = 'hover'
}

/**
 * Props for the FallingText component
 */
export interface FallingTextProps {
  /** Text content to animate (default: '') */
  text?: string;

  /** List of words to highlight in cyan color (default: []) */
  highlightWords?: string[];

  /** Trigger method for the animation (default: 'auto') */
  trigger?: `${TriggerType}`;

  /** Background color of the physics canvas (default: 'transparent') */
  backgroundColor?: string;

  /** Whether to show physics engine wireframes for debugging (default: false) */
  wireframes?: boolean;

  /** Gravity strength for the physics simulation (default: 1) */
  gravity?: number;

  /** Stiffness of the mouse constraint for dragging words (default: 0.2) */
  mouseConstraintStiffness?: number;

  /** Font size for the text elements (default: '1rem') */
  fontSize?: string;
}
