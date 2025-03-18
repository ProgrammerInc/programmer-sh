/**
 * Type definitions for the 3D Card component
 */

import { ElementType, ReactNode } from 'react';

/**
 * Props for the 3D Card Container component
 */
export interface CardContainerProps {
  /** Child elements to render inside the container */
  children?: ReactNode;
  /** Additional classes for the inner card element */
  className?: string;
  /** Additional classes for the outer container */
  containerClassName?: string;
}

/**
 * Props for the Card Body component
 */
export interface CardBodyProps {
  /** Child elements to render inside the body */
  children: ReactNode;
  /** Additional classes for the card body */
  className?: string;
}

/**
 * Props for the Card Item component
 */
export interface CardItemProps {
  /** The HTML element to render as */
  as?: ElementType;
  /** Child elements to render inside the item */
  children: ReactNode;
  /** Additional classes for the card item */
  className?: string;
  /** Horizontal translation in pixels when hovered */
  translateX?: number | string;
  /** Vertical translation in pixels when hovered */
  translateY?: number | string;
  /** Z-axis translation in pixels when hovered */
  translateZ?: number | string;
  /** X-axis rotation in degrees when hovered */
  rotateX?: number | string;
  /** Y-axis rotation in degrees when hovered */
  rotateY?: number | string;
  /** Z-axis rotation in degrees when hovered */
  rotateZ?: number | string;
  /** Additional props to spread onto the element */
  [key: string]: unknown;
}
