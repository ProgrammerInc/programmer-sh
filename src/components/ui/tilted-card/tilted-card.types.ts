'use client';

import { HTMLAttributes, ReactNode } from 'react';

/**
 * TiltedCard component props
 *
 * @interface TiltedCardProps
 * @extends {HTMLAttributes<HTMLElement>}
 */
export interface TiltedCardProps extends HTMLAttributes<HTMLElement> {
  /**
   * The source URL for the card image
   */
  imageSrc: React.ComponentProps<'img'>['src'];

  /**
   * Alternative text for the image for accessibility
   * @default 'Tilted card image'
   */
  altText?: string;

  /**
   * Text displayed in the tooltip when hovering over the card
   * @default ''
   */
  captionText?: string;

  /**
   * The height of the container element
   * @default '300px'
   */
  containerHeight?: React.CSSProperties['height'];

  /**
   * The width of the container element
   * @default '100%'
   */
  containerWidth?: React.CSSProperties['width'];

  /**
   * The height of the image element
   * @default '300px'
   */
  imageHeight?: React.CSSProperties['height'];

  /**
   * The width of the image element
   * @default '300px'
   */
  imageWidth?: React.CSSProperties['width'];

  /**
   * The scale factor applied when hovering over the card
   * @default 1.1
   */
  scaleOnHover?: number;

  /**
   * The maximum rotation angle in degrees
   * @default 14
   */
  rotateAmplitude?: number;

  /**
   * Whether to show a warning on mobile devices
   * @default true
   */
  showMobileWarning?: boolean;

  /**
   * Whether to show a tooltip when hovering over the card
   * @default true
   */
  showTooltip?: boolean;

  /**
   * Content to display as an overlay on the card
   * @default null
   */
  overlayContent?: ReactNode;

  /**
   * Whether to display the overlay content
   * @default false
   */
  displayOverlayContent?: boolean;

  /**
   * CSS class name for the component
   */
  className?: string;
}
