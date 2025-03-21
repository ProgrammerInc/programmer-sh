'use client';

import { createContext } from 'react';
import { AudioAnalyzerOptions, AudioData } from './threads.audio';

/**
 * Audio context state interface for the Threads animation
 */
export interface ThreadsAudioContextState {
  audioEnabled: boolean;
  audioOptions: AudioAnalyzerOptions;
  manualAudioData: AudioData;
  toggleAudio: () => void;
  updateAudioOptions: (options: Partial<AudioAnalyzerOptions>) => void;
  updateManualAudioData: (data: Partial<Omit<AudioData, 'frequencyData'>>) => void;
}

// Default audio data with empty frequency data
export const DEFAULT_AUDIO_DATA: AudioData = {
  volume: 0,
  bass: 0,
  mid: 0,
  treble: 0,
  frequencyData: new Uint8Array(0)
};

// Default audio options
export const DEFAULT_AUDIO_OPTIONS: AudioAnalyzerOptions = {
  enabled: false,
  sensitivity: 2.5, 
  bassRange: [20, 250],
  midRange: [250, 2000],
  trebleRange: [2000, 14000],
  fftSize: 2048,
  audioSource: 'mic',
  smoothingTimeConstant: 0.75, 
  visualSmoothingFactor: 0.2, 
};

// Create context with default values
export const ThreadsAudioContext = createContext<ThreadsAudioContextState>({
  audioEnabled: false,
  audioOptions: DEFAULT_AUDIO_OPTIONS,
  manualAudioData: DEFAULT_AUDIO_DATA,
  toggleAudio: () => {},
  updateAudioOptions: () => {},
  updateManualAudioData: () => {}
});
