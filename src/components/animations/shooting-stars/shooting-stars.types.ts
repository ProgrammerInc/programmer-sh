/**
 * Properties of a single shooting star
 */
export interface ShootingStar {
  /**
   * Unique identifier for the star
   */
  id: number;

  /**
   * X-coordinate position
   */
  x: number;

  /**
   * Y-coordinate position
   */
  y: number;

  /**
   * Angle of movement in degrees
   */
  angle: number;

  /**
   * Scale factor for the star's size
   */
  scale: number;

  /**
   * Speed of movement
   */
  speed: number;

  /**
   * Total distance traveled
   */
  distance: number;
}

/**
 * Props for the ShootingStars component
 */
export interface ShootingStarsProps {
  /**
   * Minimum speed of the shooting stars
   * @default 10
   */
  minSpeed?: number;

  /**
   * Maximum speed of the shooting stars
   * @default 30
   */
  maxSpeed?: number;

  /**
   * Minimum delay between shooting stars in milliseconds
   * @default 1200
   */
  minDelay?: number;

  /**
   * Maximum delay between shooting stars in milliseconds
   * @default 4200
   */
  maxDelay?: number;

  /**
   * Color of the shooting star head
   * @default '#9E00FF'
   */
  starColor?: string;

  /**
   * Color of the shooting star trail
   * @default '#2EB9DF'
   */
  trailColor?: string;

  /**
   * Width of the star element
   * @default 10
   */
  starWidth?: number;

  /**
   * Height of the star element
   * @default 1
   */
  starHeight?: number;

  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Return type for the getRandomStartPoint utility function
 */
export interface RandomStartPoint {
  x: number;
  y: number;
  angle: number;
}
