/**
 * Utility functions for the ShinyText animation component
 */

/**
 * Composes CSS class names dynamically
 *
 * @param {...string} classes - CSS class names to be combined
 * @returns {string} Combined class names string
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Generates the style object for the shiny text animation
 *
 * @param {string} backgroundImage - The gradient for the shine effect
 * @param {string} backgroundSize - Size of the background gradient
 * @param {string} animationDuration - Duration of the animation cycle
 * @returns {React.CSSProperties} Style object with the animation properties
 */
export const getShineStyles = (
  backgroundImage: string,
  backgroundSize: string,
  animationDuration: string
): React.CSSProperties => {
  return {
    backgroundImage,
    backgroundSize,
    WebkitBackgroundClip: 'text',
    animationDuration
  };
};
