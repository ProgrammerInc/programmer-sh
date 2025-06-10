'use client';

/**
 * Rolling Gallery Props
 *
 * Props for the RollingGallery component that displays images in a 3D rotating carousel.
 *
 * @see {@link https://www.framer.com/motion/ | Framer Motion}
 */
export interface RollingGalleryProps {
  /**
   * Array of image URLs to display in the gallery.
   * If not provided, a default set of images will be used.
   */
  images?: string[];

  /**
   * Whether the gallery should automatically rotate.
   * @default false
   */
  autoplay?: boolean;

  /**
   * Whether the gallery should pause rotation when hovered.
   * Only applies when autoplay is true.
   * @default false
   */
  pauseOnHover?: boolean;

  /**
   * Optional CSS class name to apply to the container.
   */
  className?: string;
}
