/**
 * Type definitions for the Gradient Animation component
 */

export interface GradientAnimationProps {
  /**
   * Start color for the gradient background
   */
  gradientBackgroundStart?: string;

  /**
   * End color for the gradient background
   */
  gradientBackgroundEnd?: string;

  /**
   * First color for the gradient animation
   */
  firstColor?: string;

  /**
   * Second color for the gradient animation
   */
  secondColor?: string;

  /**
   * Third color for the gradient animation
   */
  thirdColor?: string;

  /**
   * Fourth color for the gradient animation
   */
  fourthColor?: string;

  /**
   * Fifth color for the gradient animation
   */
  fifthColor?: string;

  /**
   * Color for the interactive pointer
   */
  pointerColor?: string;

  /**
   * Size of the gradient elements
   */
  size?: string;

  /**
   * CSS mix-blend-mode value for the gradients
   */
  blendingValue?: string;

  /**
   * Children elements to render inside the gradient animation
   */
  children?: React.ReactNode;

  /**
   * Additional className for the component
   */
  className?: string;

  /**
   * Whether the animation should react to mouse movement
   */
  interactive?: boolean;

  /**
   * Additional className for the container
   */
  containerClassName?: string;
}
