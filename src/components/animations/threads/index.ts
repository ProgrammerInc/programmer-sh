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
export { ThreadsAudioProvider } from './threads-audio-context';
export { ThreadsAudioDemo } from './threads-audio-demo';

// Hooks
export { useThreadsAnimation } from './threads.hooks';
export { useIsThreadsAudioAvailable, useThreadsAudio } from './use-threads-audio.hook';

// Types
export type { ThreadsAudioContextState } from './threads-audio-context-type';
export type { AudioAnalyzerOptions, AudioData } from './threads.audio';
export type { ThreadsProps } from './threads.types';

// Constants
export { DEFAULT_SETTINGS } from './threads.constants';
