/**
 * Type definitions for the Threads animation component
 */

import { HTMLAttributes } from 'react';
import { AudioAnalyzerOptions, AudioData } from './threads.audio';

/**
 * Component-specific properties for the Threads component
 */
export interface ThreadsOwnProps {
  /** RGB color array for threads with values from 0 to 1 */
  color?: [number, number, number];
  /** Amplitude of thread movement (default: 1) */
  amplitude?: number;
  /** Distance between threads (default: 0) */
  distance?: number;
  /** Whether to enable mouse interaction (default: false) */
  enableMouseInteraction?: boolean;
  /** Whether to include a stars background (default: true) */
  withStars?: boolean;
  /** Audio analyzer options for sound reactivity */
  audioOptions?: AudioAnalyzerOptions;
  /** Audio data for controlled usage */
  audioData?: AudioData;
}

/**
 * Combined props type for the Threads component
 * Uses Omit to prevent collision with HTMLAttributes' color property
 */
export type ThreadsProps = ThreadsOwnProps & Omit<HTMLAttributes<HTMLDivElement>, 'color'>;

/**
 * Mouse position coordinates
 */
export interface MousePosition {
  /** X-coordinate (0-1) */
  x: number;
  /** Y-coordinate (0-1) */
  y: number;
}

/**
 * Renderer configuration options
 */
export interface RendererOptions {
  /** Device pixel ratio */
  dpr: number;
  /** Enable alpha channel */
  alpha: boolean;
}
