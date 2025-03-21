/**
 * Threads Animation Component
 *
 * A component that creates an interactive wave-like thread animation using WebGL.
 * The component renders animated thread lines that respond to mouse movement
 * and can be customized with different colors and behaviors.
 * 
 * Features:
 * - Interactive mouse-responsive animation
 * - Audio reactivity for sound-responsive visuals
 * - Customizable colors, amplitude, and distance
 * - Optional stars background integration
 * - Manual or automatic audio analysis modes
 *
 * @module Threads
 */

'use client';

// Components
export { default as Threads, ThreadsComponent } from './threads';
export { ThreadsAudioDemo } from './threads-audio-demo';
export { ThreadsAudioProvider } from './threads-audio-context';

// Hooks
export { useThreadsAudio, useIsThreadsAudioAvailable } from './use-threads-audio.hook';
export { useThreadsAnimation } from './threads.hooks';

// Types
export type { ThreadsProps } from './threads.types';
export type { AudioData, AudioAnalyzerOptions } from './threads.audio';
export type { ThreadsAudioContextState } from './threads-audio-context-type';

// Constants
export { DEFAULT_SETTINGS } from './threads.constants';
