'use client';

import { useState, useCallback, useEffect } from 'react';
import Threads from './threads';
import { AudioAnalyzerOptions, AudioData } from './threads.audio';
import styles from './threads-audio-demo.module.css';

/**
 * Audio controls interface
 */
interface AudioControls {
  startMic: () => void;
  stopMic: () => void;
  startFile: (url: string) => void;
  stopFile: () => void;
}

/**
 * Demo component for audio-reactive Threads animation
 * 
 * This component demonstrates the Threads animation with audio reactivity,
 * providing controls for microphone input and audio file playback.
 */
export const ThreadsAudioDemo = () => {
  // State for audio options
  const [audioOptions, setAudioOptions] = useState<AudioAnalyzerOptions>({
    enabled: false,
    sensitivity: 1.2,
    bassRange: [20, 250],
    midRange: [250, 2000],
    trebleRange: [2000, 20000],
    fftSize: 2048,
    audioSource: 'mic'
  });

  // State for custom audio data (for manual slider control)
  const [manualAudioData, setManualAudioData] = useState<AudioData>({
    bass: 0,
    mid: 0,
    treble: 0,
    volume: 0,
    frequencyData: new Uint8Array(0) // Add this to satisfy the AudioData interface
  });

  // State for UI controls
  const [isManualMode, setIsManualMode] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [isAudioFileActive, setIsAudioFileActive] = useState(false);
  const [audioSrc, setAudioSrc] = useState('');
  
  // Audio element reference
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  
  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    setAudioElement(audio);
    
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Audio control handlers
  const startMic = useCallback(() => {
    setIsManualMode(false);
    setIsMicActive(true);
    setIsAudioFileActive(false);
    if (audioElement) {
      audioElement.pause();
      audioElement.src = '';
    }
    setAudioOptions(prev => ({
      ...prev,
      enabled: true,
      audioSource: 'mic'
    }));
  }, [audioElement]);

  const stopMic = useCallback(() => {
    setIsMicActive(false);
    setAudioOptions(prev => ({
      ...prev,
      enabled: false
    }));
  }, []);

  const startFile = useCallback((url: string) => {
    setIsManualMode(false);
    setIsMicActive(false);
    setIsAudioFileActive(true);
    setAudioSrc(url);
    
    if (audioElement) {
      audioElement.src = url;
      audioElement.play().catch(err => {
        console.error('Error playing audio:', err);
      });
    }
    
    setAudioOptions(prev => ({
      ...prev,
      enabled: true,
      audioSource: 'file',
      audioFileUrl: url
    }));
  }, [audioElement]);

  const stopFile = useCallback(() => {
    setIsAudioFileActive(false);
    if (audioElement) {
      audioElement.pause();
      audioElement.src = '';
    }
    setAudioOptions(prev => ({
      ...prev,
      enabled: false
    }));
  }, [audioElement]);

  // Enable manual mode
  const enableManualMode = useCallback(() => {
    setIsManualMode(true);
    setIsMicActive(false);
    setIsAudioFileActive(false);
    if (audioElement) {
      audioElement.pause();
      audioElement.src = '';
    }
    setAudioOptions(prev => ({
      ...prev,
      enabled: false
    }));
  }, [audioElement]);

  // Handle sliders for manual mode
  const handleSliderChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, type: keyof Omit<AudioData, 'frequencyData'>) => {
    const value = parseFloat(event.target.value);
    setManualAudioData(prev => ({
      ...prev,
      [type]: value
    }));
  }, []);

  // Predefined audio tracks
  const audioTracks = [
    { name: 'Electronic Beat', url: '/audio/electronic-beat.mp3' },
    { name: 'Ambient Music', url: '/audio/ambient.mp3' },
    { name: 'Bass Heavy', url: '/audio/bass-heavy.mp3' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.animationContainer}>
        <Threads 
          amplitude={1.5}
          distance={0.3}
          color={[0.3, 0.8, 1.0]}
          enableMouseInteraction={true}
          audioOptions={isManualMode ? undefined : audioOptions}
          audioData={isManualMode ? manualAudioData : undefined}
          withStars={true}
        />
      </div>
      
      <div className={styles.controls}>
        <h3>Audio Reactive Threads</h3>
        
        <div className={styles.buttonGroup}>
          <button 
            className={`${styles.controlButton} ${isMicActive ? styles.active : ''}`}
            onClick={isMicActive ? stopMic : startMic}
          >
            {isMicActive ? 'Stop Microphone' : 'Start Microphone'}
          </button>
          
          <button 
            className={`${styles.controlButton} ${isManualMode ? styles.active : ''}`}
            onClick={enableManualMode}
          >
            Manual Control
          </button>
        </div>
        
        {isManualMode && (
          <div className={styles.sliders}>
            <div className={styles.sliderContainer}>
              <label htmlFor="bass-slider">Bass: {manualAudioData.bass.toFixed(2)}</label>
              <input 
                id="bass-slider"
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={manualAudioData.bass} 
                onChange={(e) => handleSliderChange(e, 'bass')}
                aria-label="Bass level control"
                title="Adjust bass level"
              />
            </div>
            
            <div className={styles.sliderContainer}>
              <label htmlFor="mid-slider">Mid: {manualAudioData.mid.toFixed(2)}</label>
              <input 
                id="mid-slider"
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={manualAudioData.mid} 
                onChange={(e) => handleSliderChange(e, 'mid')}
                aria-label="Mid level control"
                title="Adjust mid frequencies level"
              />
            </div>
            
            <div className={styles.sliderContainer}>
              <label htmlFor="treble-slider">Treble: {manualAudioData.treble.toFixed(2)}</label>
              <input 
                id="treble-slider"
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={manualAudioData.treble} 
                onChange={(e) => handleSliderChange(e, 'treble')}
                aria-label="Treble level control"
                title="Adjust treble level"
              />
            </div>
            
            <div className={styles.sliderContainer}>
              <label htmlFor="volume-slider">Volume: {manualAudioData.volume.toFixed(2)}</label>
              <input 
                id="volume-slider"
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={manualAudioData.volume} 
                onChange={(e) => handleSliderChange(e, 'volume')}
                aria-label="Volume level control"
                title="Adjust volume level"
              />
            </div>
          </div>
        )}
        
        {!isManualMode && (
          <div className={styles.audioTracks}>
            <h4>Audio Tracks</h4>
            <div className={styles.trackList}>
              {audioTracks.map((track) => (
                <button 
                  key={track.url}
                  className={`${styles.trackButton} ${isAudioFileActive && audioSrc === track.url ? styles.active : ''}`}
                  onClick={() => isAudioFileActive && audioSrc === track.url ? stopFile() : startFile(track.url)}
                >
                  {isAudioFileActive && audioSrc === track.url ? `Stop: ${track.name}` : track.name}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className={styles.info}>
          <p>This demo shows the Threads animation reacting to audio input.</p>
          <p>Try using the microphone, playing an audio track, or manually controlling the audio parameters.</p>
        </div>
      </div>
    </div>
  );
};

export default ThreadsAudioDemo;
