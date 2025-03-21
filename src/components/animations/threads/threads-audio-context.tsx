'use client';

import { useState, useCallback, useMemo, ReactNode, useEffect } from 'react';
import { AudioAnalyzerOptions, AudioData, useAudioAnalyzer } from './threads.audio';
import { 
  ThreadsAudioContext, 
  DEFAULT_AUDIO_DATA, 
  DEFAULT_AUDIO_OPTIONS 
} from './threads-audio-context-type';

/**
 * Context provider props interface
 */
interface ThreadsAudioProviderProps {
  children: ReactNode | ((context: { audioEnabled: boolean }) => ReactNode);
  initialEnabled?: boolean;
}

/**
 * Provider component for Threads audio reactivity
 *
 * @param props - Provider props
 * @returns Provider component
 */
export function ThreadsAudioProvider({
  children,
  initialEnabled = false
}: ThreadsAudioProviderProps) {
  // State for audio settings
  const [audioEnabled, setAudioEnabled] = useState(initialEnabled);
  const [audioOptions, setAudioOptions] = useState<AudioAnalyzerOptions>({
    ...DEFAULT_AUDIO_OPTIONS,
    enabled: initialEnabled,
    audioSource: 'mic', // Default to microphone
    sensitivity: 2.5, // Higher sensitivity for better visualization
  });
  const [manualAudioData, setManualAudioData] = useState<AudioData>(DEFAULT_AUDIO_DATA);

  // Initialize the audio analyzer with our options
  const { audioData, startAudioAnalysis, stopAudioAnalysis } = useAudioAnalyzer(audioOptions);
  
  // Effect to start/stop audio analysis when enabled state changes
  useEffect(() => {
    if (audioEnabled) {
      startAudioAnalysis();
    } else {
      stopAudioAnalysis();
    }
  }, [audioEnabled, startAudioAnalysis, stopAudioAnalysis]);

  // Toggle audio enabled state
  const toggleAudio = useCallback(() => {
    setAudioEnabled(prev => {
      const newState = !prev;
      setAudioOptions(current => ({
        ...current,
        enabled: newState
      }));
      return newState;
    });
  }, []);

  // Update audio options
  const updateAudioOptions = useCallback((options: Partial<AudioAnalyzerOptions>) => {
    setAudioOptions(current => ({
      ...current,
      ...options
    }));
  }, []);

  // Update manual audio data
  const updateManualAudioData = useCallback(
    (data: Partial<Omit<AudioData, 'frequencyData'>>) => {
      setManualAudioData(current => ({
        ...current,
        ...data
      }));
    },
    []
  );

  // Memoize context value
  const contextValue = useMemo(
    () => ({
      audioEnabled,
      audioOptions,
      manualAudioData: audioData || manualAudioData, // Use real audio data if available
      toggleAudio,
      updateAudioOptions,
      updateManualAudioData
    }),
    [audioEnabled, audioOptions, audioData, manualAudioData, toggleAudio, updateAudioOptions, updateManualAudioData]
  );

  return (
    <ThreadsAudioContext.Provider value={contextValue}>
      {typeof children === 'function' 
        ? children({ audioEnabled }) 
        : children}
    </ThreadsAudioContext.Provider>
  );
}
