/**
 * Props interface for the Iridescence animation component.
 */
export interface IridescenceProps {
  /**
   * RGB color values for the iridescent effect, default is white [1, 1, 1].
   */
  color?: [number, number, number];

  /**
   * Animation speed multiplier, higher values create faster animations.
   * @default 1.0
   */
  speed?: number;

  /**
   * Controls the amplitude of the mouse interaction effect.
   * @default 0.1
   */
  amplitude?: number;

  /**
   * Whether the animation reacts to mouse movements.
   * @default true
   */
  mouseReact?: boolean;
}
