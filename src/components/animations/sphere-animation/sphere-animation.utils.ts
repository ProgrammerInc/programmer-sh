/**
 * Utility functions for the Sphere Animation component
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
 * Fits an element to its parent container with optional padding
 *
 * @param el - SVG or HTML element to resize
 * @param padding - Padding to maintain around the element (in pixels)
 */
export const fitElementToParent = (el: SVGElement | HTMLElement, padding: number): void => {
  const parent = el.parentElement;
  if (!parent) return;

  const parentWidth = parent.offsetWidth;
  const parentHeight = parent.offsetHeight;

  if (el instanceof HTMLElement) {
    const elementWidth = el.offsetWidth;
    const elementHeight = el.offsetHeight;
    const scaleFactor = Math.min(
      (parentWidth - padding * 2) / elementWidth,
      (parentHeight - padding * 2) / elementHeight
    );

    el.style.transform = `scale(${scaleFactor})`;
  }
};

/**
 * Updates the gradient colors in an SVG element
 *
 * @param svgElement - The SVG element containing the gradient
 * @param gradientId - The ID of the gradient element
 * @param colors - Array of colors to apply to the gradient stops
 */
export const updateGradientColors = (
  svgElement: SVGSVGElement,
  gradientId: string,
  colors: string[]
): void => {
  const gradient = svgElement.querySelector(`#${gradientId}`);
  if (gradient) {
    const stops = gradient.querySelectorAll('stop');
    stops.forEach((stop, i) => {
      if (i < colors.length) {
        stop.setAttribute('stop-color', colors[i]);
      }
    });
  }
};
