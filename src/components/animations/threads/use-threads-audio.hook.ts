'use client';

import { useContext } from 'react';
import { ThreadsAudioContext, ThreadsAudioContextState } from './threads-audio-context-type';

/**
 * Hook to use the Threads audio context
 *
 * @returns Threads audio context state
 */
export function useThreadsAudio(): ThreadsAudioContextState {
  const context = useContext(ThreadsAudioContext);

  if (!context) {
    throw new Error('useThreadsAudio must be used within a ThreadsAudioProvider');
  }

  return context;
}

// Global flag to track audio context availability
let audioContextAvailable: boolean | null = null;

/**
 * Check if the Threads audio context is available
 *
 * This helper checks a global flag to avoid conditional hook calls
 *
 * @returns True if the audio context is available
 */
export function isThreadsAudioAvailable(): boolean {
  // If we've already checked, use the cached result
  if (audioContextAvailable !== null) {
    return audioContextAvailable;
  }

  // We can't call the hook directly here since this isn't a component or hook function
  // Instead, we'll just return false and let the component make the actual check
  // when it renders, which will update this flag
  return false;
}

/**
 * Hook to safely check for audio context availability
 *
 * Use this hook in your components to check if the audio context exists
 * and update the global flag
 *
 * @returns True if audio context is available
 */
export function useIsThreadsAudioAvailable(): boolean {
  try {
    useThreadsAudio();
    // If we get here, the context exists - update the flag
    audioContextAvailable = true;
    return true;
  } catch (e) {
    // Context doesn't exist - update the flag
    audioContextAvailable = false;
    return false;
  }
}
