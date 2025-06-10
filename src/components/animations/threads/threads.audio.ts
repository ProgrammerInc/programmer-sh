'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Audio data type containing frequency information
 */
export interface AudioData {
  /** Average volume level from 0 to 1 */
  volume: number;
  /** Bass frequency level from 0 to 1 */
  bass: number;
  /** Mid frequency level from 0 to 1 */
  mid: number;
  /** Treble frequency level from 0 to 1 */
  treble: number;
  /** Full frequency data array */
  frequencyData: Uint8Array;
}

/**
 * Audio analyzer options
 */
export interface AudioAnalyzerOptions {
  /** Whether to enable audio analysis */
  enabled?: boolean;
  /** Audio sensitivity multiplier */
  sensitivity?: number;
  /** Frequency range for bass analysis */
  bassRange?: [number, number];
  /** Frequency range for mid analysis */
  midRange?: [number, number];
  /** Frequency range for treble analysis */
  trebleRange?: [number, number];
  /** FFT size (must be power of 2) */
  fftSize?: number;
  /** Audio source: 'mic' for microphone or 'file' for audio file */
  audioSource?: 'mic' | 'file';
  /** Audio file URL if using file source */
  audioFileUrl?: string;
  /** Smoothing factor for audio data (0-1) */
  smoothingTimeConstant?: number;
  /** Smoothing for visualization (0-1) */
  visualSmoothingFactor?: number;
}

/**
 * Default audio analyzer options
 */
export const DEFAULT_AUDIO_OPTIONS: AudioAnalyzerOptions = {
  enabled: false,
  sensitivity: 1.5,
  bassRange: [20, 250],
  midRange: [250, 2000],
  trebleRange: [2000, 14000],
  fftSize: 2048,
  audioSource: 'mic',
  smoothingTimeConstant: 0.85, // Higher value for smoother transitions
  visualSmoothingFactor: 0.3 // Smooth visual changes but keep responsiveness
};

interface WebkitWindow extends Window {
  webkitAudioContext?: typeof AudioContext;
}

/**
 * Custom hook for audio analysis
 *
 * This hook analyzes audio from microphone or audio file and returns
 * frequency data that can be used for sound reactivity.
 *
 * @param options - Audio analyzer configuration options
 * @returns Audio data and control functions
 */
export function useAudioAnalyzer(options: AudioAnalyzerOptions = {}) {
  // Merge options with defaults using useMemo to prevent dependency changes
  const opts = useMemo(() => {
    return { ...DEFAULT_AUDIO_OPTIONS, ...options };
  }, [options]);

  // State for audio context and related objects
  const [isAnalyzing, setIsAnalyzing] = useState(opts.enabled || false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | MediaElementAudioSourceNode | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Track the previous audio data for smoothing transitions
  const prevDataRef = useRef<AudioData | null>(null);

  // Initial audio data
  const [audioData, setAudioData] = useState<AudioData>({
    volume: 0,
    bass: 0,
    mid: 0,
    treble: 0,
    frequencyData: new Uint8Array(0)
  });

  // Cleanup function
  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      if (audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      audioContextRef.current = null;
    }

    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.remove();
      audioElementRef.current = null;
    }

    analyserRef.current = null;
    dataArrayRef.current = null;
  }, []);

  // Initialize audio analysis
  const startAudioAnalysis = useCallback(async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);

    // Cleanup existing audio context
    cleanup();

    try {
      // Create audio context
      audioContextRef.current = new (window.AudioContext ||
        (window as WebkitWindow).webkitAudioContext)();
      const audioContext = audioContextRef.current;

      // Create analyzer node
      analyserRef.current = audioContext.createAnalyser();
      const analyser = analyserRef.current;
      analyser.fftSize = opts.fftSize || 2048;
      analyser.smoothingTimeConstant = opts.smoothingTimeConstant || 0.85; // Use the smoothing constant

      // Create data array
      const bufferLength = analyser.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      // Get audio source
      if (opts.audioSource === 'mic') {
        // Request microphone access
        streamRef.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        });
        sourceRef.current = audioContext.createMediaStreamSource(streamRef.current);
      } else if (opts.audioSource === 'file' && opts.audioFileUrl) {
        // Create audio element for file playback
        audioElementRef.current = new Audio(opts.audioFileUrl);
        audioElementRef.current.loop = true;
        await audioElementRef.current.play();
        sourceRef.current = audioContext.createMediaElementSource(audioElementRef.current);
      } else {
        throw new Error('Invalid audio source or missing file URL');
      }

      // Connect audio graph
      const source = sourceRef.current;
      source.connect(analyser);

      // Only connect to destination if using file source
      if (opts.audioSource === 'file') {
        analyser.connect(audioContext.destination);
      }

      // Start analysis loop
      const updateFrequencyData = () => {
        if (!analyser || !dataArrayRef.current || !isAnalyzing) return;

        // Get frequency data
        analyser.getByteFrequencyData(dataArrayRef.current);
        const dataArray = dataArrayRef.current;

        // Calculate frequency bands
        const sampleRate = audioContext.sampleRate;
        const binCount = analyser.frequencyBinCount;
        const nyquist = sampleRate / 2;
        const binWidth = nyquist / binCount;

        // Define frequency ranges
        const bassRange = opts.bassRange || [20, 250];
        const midRange = opts.midRange || [250, 2000];
        const trebleRange = opts.trebleRange || [2000, 14000];

        // Calculate bin indices for each range
        const bassStartBin = Math.max(1, Math.floor(bassRange[0] / binWidth));
        const bassEndBin = Math.min(binCount - 1, Math.floor(bassRange[1] / binWidth));
        const midStartBin = Math.max(1, Math.floor(midRange[0] / binWidth));
        const midEndBin = Math.min(binCount - 1, Math.floor(midRange[1] / binWidth));
        const trebleStartBin = Math.max(1, Math.floor(trebleRange[0] / binWidth));
        const trebleEndBin = Math.min(binCount - 1, Math.floor(trebleRange[1] / binWidth));

        // Calculate averages for each range
        let bassSum = 0;
        let midSum = 0;
        let trebleSum = 0;
        let volumeSum = 0;

        for (let i = 0; i < binCount; i++) {
          const amplitude = dataArray[i] / 255; // Normalize to 0-1
          volumeSum += amplitude;

          if (i >= bassStartBin && i <= bassEndBin) {
            bassSum += amplitude;
          }
          if (i >= midStartBin && i <= midEndBin) {
            midSum += amplitude;
          }
          if (i >= trebleStartBin && i <= trebleEndBin) {
            trebleSum += amplitude;
          }
        }

        const bassCount = bassEndBin - bassStartBin + 1;
        const midCount = midEndBin - midStartBin + 1;
        const trebleCount = trebleEndBin - trebleStartBin + 1;

        const sensitivity = opts.sensitivity || 1.5;
        let bassAvg = (bassSum / bassCount) * sensitivity;
        let midAvg = (midSum / midCount) * sensitivity;
        let trebleAvg = (trebleSum / trebleCount) * sensitivity;
        let volumeAvg = (volumeSum / binCount) * sensitivity;

        // Smooth audio data transitions using the previous values
        const smoothingFactor = opts.visualSmoothingFactor || 0.3;
        if (prevDataRef.current) {
          bassAvg = prevDataRef.current.bass * smoothingFactor + bassAvg * (1 - smoothingFactor);
          midAvg = prevDataRef.current.mid * smoothingFactor + midAvg * (1 - smoothingFactor);
          trebleAvg =
            prevDataRef.current.treble * smoothingFactor + trebleAvg * (1 - smoothingFactor);
          volumeAvg =
            prevDataRef.current.volume * smoothingFactor + volumeAvg * (1 - smoothingFactor);
        }

        // Clamp values
        bassAvg = Math.min(Math.max(bassAvg, 0), 1);
        midAvg = Math.min(Math.max(midAvg, 0), 1);
        trebleAvg = Math.min(Math.max(trebleAvg, 0), 1);
        volumeAvg = Math.min(Math.max(volumeAvg, 0), 1);

        // Create audio data object
        const newAudioData = {
          volume: volumeAvg,
          bass: bassAvg,
          mid: midAvg,
          treble: trebleAvg,
          frequencyData: new Uint8Array(dataArray)
        };

        // Update previous data reference for future smoothing
        prevDataRef.current = newAudioData;

        // Update state
        setAudioData(newAudioData);

        // Continue analysis loop
        animationFrameRef.current = requestAnimationFrame(updateFrequencyData);
      };

      // Start the analysis loop
      animationFrameRef.current = requestAnimationFrame(updateFrequencyData);
    } catch (error) {
      console.error('Error initializing audio analysis:', error);
      cleanup();
      setIsAnalyzing(false);
    }
  }, [isAnalyzing, cleanup, opts]);

  // Stop audio analysis
  const stopAudioAnalysis = useCallback(() => {
    setIsAnalyzing(false);
    cleanup();
  }, [cleanup]);

  // Start/stop audio analysis based on enabled option
  useEffect(() => {
    if (opts.enabled) {
      startAudioAnalysis();
    } else {
      stopAudioAnalysis();
    }

    return () => cleanup();
  }, [opts.enabled, startAudioAnalysis, stopAudioAnalysis, cleanup]);

  return {
    audioData,
    isAnalyzing,
    startAudioAnalysis,
    stopAudioAnalysis
  };
}

export function useThreadsAnimation(audioOptions?: AudioAnalyzerOptions) {
  // Use the audio analyzer hook if audio options are provided
  const { audioData } = useAudioAnalyzer({
    ...(audioOptions || {}),
    enabled: audioOptions?.enabled || false,
    audioSource: 'mic', // Default to microphone
    sensitivity: 2.0 // Increase sensitivity for better responsiveness
  });

  // Rest of the useThreadsAnimation function remains the same
}
