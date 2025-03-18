/**
 * Type definitions for the 3D Pin component
 */

import { ReactNode } from 'react';

/**
 * Props for the ThreeDPin component
 */
export interface ThreeDPinProps {
  /** Child elements to render inside the pin */
  children: ReactNode;
  /** Title text to display above the pin */
  title?: string;
  /** URL to navigate to when the pin is clicked */
  href?: string;
  /** Additional classes for the inner pin content */
  className?: string;
  /** Additional classes for the pin container */
  containerClassName?: string;
}

/**
 * Props for the PinPerspective component
 */
export interface PinPerspectiveProps {
  /** Title text to display above the pin */
  title?: string;
  /** URL to navigate to when the pin is clicked */
  href?: string;
}
