'use client';

/**
 * Removes any rotation from a transform string and ensures a zero-degree rotation
 * 
 * @param transformStr - The original transform string
 * @returns A transform string with rotation set to 0deg
 */
export const getNoRotationTransform = (transformStr: string): string => {
  const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
  if (hasRotate) {
    return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
  } else if (transformStr === 'none') {
    return 'rotate(0deg)';
  } else {
    return `${transformStr} rotate(0deg)`;
  }
};

/**
 * Adds a horizontal offset to a transform string that may already contain a translation
 * 
 * @param baseTransform - The original transform string
 * @param offsetX - The additional X translation to apply in pixels
 * @returns A transform string with the updated translation
 */
export const getPushedTransform = (baseTransform: string, offsetX: number): string => {
  const translateRegex = /translate\(([-0-9.]+)px\)/;
  const match = baseTransform.match(translateRegex);
  if (match) {
    const currentX = parseFloat(match[1]);
    const newX = currentX + offsetX;
    return baseTransform.replace(translateRegex, `translate(${newX}px)`);
  } else {
    return baseTransform === 'none'
      ? `translate(${offsetX}px)`
      : `${baseTransform} translate(${offsetX}px)`;
  }
};
