'use client';

import { ElementType, memo } from 'react';
import { DEFAULT_SETTINGS } from './star-border.constants';
import { useCombinedClassName, useStarBorderStyles } from './star-border.hooks';
import styles from './star-border.module.css';
import { StarBorderProps } from './star-border.types';

/**
 * StarBorder component creates an animated star border effect around its children
 *
 * @template T - Element type to render as (defaults to 'button')
 * @param props - Component properties including styling options and children content
 * @returns A React component with animated star border effects
 */
export const StarBorderComponent = <T extends ElementType = 'button'>({
  as,
  className = '',
  color = DEFAULT_SETTINGS.COLOR,
  speed = DEFAULT_SETTINGS.SPEED,
  children,
  ...rest
}: StarBorderProps<T>) => {
  // Determine which element type to render
  const Component = as || DEFAULT_SETTINGS.COMPONENT;

  // Use custom hooks for styles and class names
  const cssVariables = useStarBorderStyles(color, speed);
  const combinedClassName = useCombinedClassName(styles['star-border'], className);

  return (
    <Component className={combinedClassName} style={cssVariables} {...rest}>
      <div className={styles['star-movement-bottom']}></div>
      <div className={styles['star-movement-top']}></div>
      <div className={styles.content}>{children}</div>
    </Component>
  );
};

/**
 * Memoized StarBorder component for optimal performance
 */
type StarBorderComponentType = typeof StarBorderComponent;
type MemoizedStarBorderType = StarBorderComponentType & {
  displayName?: string;
};

export const StarBorder = memo(StarBorderComponent) as MemoizedStarBorderType;

/**
 * Set display name for debugging purposes
 */
StarBorder.displayName = 'StarBorder';

export default StarBorder;
