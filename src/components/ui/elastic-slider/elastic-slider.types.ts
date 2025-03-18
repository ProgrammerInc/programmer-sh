import type React from 'react';

/**
 * ElasticSlider Component Props
 * 
 * Props for the root ElasticSlider component that provides an interactive slider with elasticity effects.
 * 
 * @example
 * ```tsx
 * <ElasticSlider
 *   defaultValue={50}
 *   maxValue={100}
 *   isStepped={true}
 *   stepSize={5}
 * />
 * ```
 */
export interface ElasticSliderProps {
  /**
   * Default value of the slider
   * @default 50
   */
  defaultValue?: number;

  /**
   * Minimum value of the slider range
   * @default 0
   */
  startingValue?: number;

  /**
   * Maximum value of the slider range
   * @default 100
   */
  maxValue?: number;

  /**
   * Additional CSS class names to apply to the slider container
   */
  className?: string;

  /**
   * When true, the slider will snap to discrete step values
   * @default false
   */
  isStepped?: boolean;

  /**
   * Size of each step when isStepped is true
   * @default 1
   */
  stepSize?: number;

  /**
   * Icon displayed on the left side of the slider
   * @default <>-</>
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon displayed on the right side of the slider
   * @default <>+</>
   */
  rightIcon?: React.ReactNode;
}

/**
 * Internal Slider Component Props
 * 
 * Props for the internal Slider component used by ElasticSlider.
 * This component implements the core slider functionality.
 */
export interface SliderProps {
  /**
   * Default value of the slider
   */
  defaultValue: number;

  /**
   * Minimum value of the slider range
   */
  startingValue: number;

  /**
   * Maximum value of the slider range
   */
  maxValue: number;

  /**
   * When true, the slider will snap to discrete step values
   */
  isStepped: boolean;

  /**
   * Size of each step when isStepped is true
   */
  stepSize: number;

  /**
   * Icon displayed on the left side of the slider
   */
  leftIcon: React.ReactNode;

  /**
   * Icon displayed on the right side of the slider
   */
  rightIcon: React.ReactNode;
}
