/**
 * Types for the BlobBackground component
 */

/**
 * Properties for an individual blob
 */
export interface BlobProps {
  /** Color of the blob (if not using gradient) */
  color?: string;
  /** Size of the blob in pixels */
  size?: number;
  /** Blur amount in pixels */
  blur?: number;
  /** Animation speed */
  speed?: number;
  /** Opacity of the blob (0-1) */
  opacity?: number;
  /** Z-index for stacking order */
  zIndex?: number;
  /** Initial position of the blob in percentage */
  initialPosition?: { x: number; y: number };
  /** Maximum scale factor for pulse animation */
  pulseScale?: number;
  /** Speed of rotation animation */
  rotationSpeed?: number;
  /** Colors for gradient */
  gradientColors?: string[];
}

/**
 * Configuration for a blob instance
 */
export interface BlobConfig extends BlobProps {
  /** Unique identifier for the blob */
  id: string;
}

/**
 * Properties for the BlobBackground component
 */
export interface BlobBackgroundProps {
  /** Array of blob configurations */
  blobs?: BlobConfig[];
  /** Optional CSS class name */
  className?: string;
  /** Children to render inside the background */
  children?: React.ReactNode;
}
