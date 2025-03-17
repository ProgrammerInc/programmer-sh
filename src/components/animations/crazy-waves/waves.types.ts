/**
 * Waves Animation Component Types
 */
import { CSSProperties, ReactNode } from 'react';

/**
 * Waves component own props
 */
export interface WavesOwnProps {
  /** Child components to render inside the waves container */
  children?: ReactNode;
  /** Additional class name for the content container */
  className?: string;
  /** Additional class name for the main container */
  containerClassName?: string;
  /** Color of the wave lines */
  lineColor?: string;
  /** Background color */
  backgroundColor?: string;
  /** Speed of wave movement along X axis */
  waveSpeedX?: number;
  /** Speed of wave movement along Y axis */
  waveSpeedY?: number;
  /** Wave amplitude along X axis */
  waveAmpX?: number;
  /** Wave amplitude along Y axis */
  waveAmpY?: number;
  /** Horizontal gap between points */
  xGap?: number;
  /** Vertical gap between points */
  yGap?: number;
  /** Friction applied to cursor movement */
  friction?: number;
  /** Tension for cursor movement spring effect */
  tension?: number;
  /** Maximum cursor movement offset */
  maxCursorMove?: number;
  /** Custom inline styles */
  style?: CSSProperties;
}

/**
 * Waves component props
 * Combines own props with HTML div attributes
 */
export type WavesProps = WavesOwnProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof WavesOwnProps>;

/**
 * Animation properties for the useWavesAnimation hook
 */
export interface WavesAnimationOptions {
  /** Color of the wave lines */
  lineColor?: string;
  /** Background color */
  backgroundColor?: string;
  /** Speed of wave movement along X axis */
  waveSpeedX?: number;
  /** Speed of wave movement along Y axis */
  waveSpeedY?: number;
  /** Wave amplitude along X axis */
  waveAmpX?: number;
  /** Wave amplitude along Y axis */
  waveAmpY?: number;
  /** Horizontal gap between points */
  xGap?: number;
  /** Vertical gap between points */
  yGap?: number;
  /** Friction applied to cursor movement */
  friction?: number;
  /** Tension for cursor movement spring effect */
  tension?: number;
  /** Maximum cursor movement offset */
  maxCursorMove?: number;
  /** Custom inline styles */
  style?: CSSProperties;
}

/**
 * Internal wave animation configuration
 */
export interface WavesConfig {
  lineColor: string;
  waveSpeedX: number;
  waveSpeedY: number;
  waveAmpX: number;
  waveAmpY: number;
  xGap: number;
  yGap: number;
  friction: number;
  tension: number;
  maxCursorMove: number;
}

/**
 * Point definition for wave lines
 */
export interface Point {
  x: number;
  y: number;
  wave: {
    x: number;
    y: number;
  };
  cursor: {
    x: number;
    y: number;
    vx: number;
    vy: number;
  };
}

/**
 * Mouse tracking state
 */
export interface Mouse {
  x: number;
  y: number;
  lx: number;
  ly: number;
  sx: number;
  sy: number;
  v: number;
  vs: number;
  a: number;
  set: boolean;
}
