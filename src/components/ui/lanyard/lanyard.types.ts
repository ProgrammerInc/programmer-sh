import { RigidBodyAutoCollider, RigidBodyProps } from '@react-three/rapier';

/**
 * Lanyard Component Props
 *
 * Props for the main Lanyard component that renders a 3D interactive lanyard with a card.
 *
 * @example
 * ```tsx
 * <Lanyard position={[0, 0, 30]} gravity={[0, -40, 0]} fov={20} transparent={true} />
 * ```
 */
export interface LanyardProps {
  /**
   * The 3D position of the camera in [x, y, z] format
   *
   * @default [0, 0, 30]
   */
  position?: [number, number, number];

  /**
   * The gravity vector for the physics simulation in [x, y, z] format
   *
   * @default [0, -40, 0]
   */
  gravity?: [number, number, number];

  /**
   * The field of view for the camera in degrees
   *
   * @default 20
   */
  fov?: number;

  /**
   * Whether the canvas background should be transparent
   *
   * @default true
   */
  transparent?: boolean;
}

/**
 * Band Component Props
 *
 * Props for the Band component that represents the physical lanyard strap.
 *
 * @example
 * ```tsx
 * <Band maxSpeed={50} minSpeed={0} />
 * ```
 */
export interface BandProps {
  /**
   * The maximum speed for the lanyard movement
   *
   * @default 50
   */
  maxSpeed?: number;

  /**
   * The minimum speed for the lanyard movement
   *
   * @default 0
   */
  minSpeed?: number;
}

/**
 * Segment Props
 *
 * Props for the rigid body segments of the lanyard.
 */
export interface SegmentProps {
  /**
   * The type of rigid body
   */
  type: RigidBodyProps['type'];

  /**
   * Whether the body can sleep when inactive
   *
   * @default true
   */
  canSleep: boolean;

  /**
   * The type of auto collider to use
   *
   * @default 'none'
   */
  colliders: RigidBodyAutoCollider;

  /**
   * The amount of angular damping
   *
   * @default 4
   */
  angularDamping: number;

  /**
   * The amount of linear damping
   *
   * @default 4
   */
  linearDamping: number;
}
